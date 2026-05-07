import pool from "../src/core/database/data.js";
import allRoutesMaps from "../src/routes/allRoutes.maps.js";


const permissions = [...allRoutesMaps];

async function syncPermissions() {
    const cx = await pool.getConnection();
    await cx.beginTransaction();
    try {

        // Verificar se já existem permissões na tabela
        const [rows] = await cx.execute('SELECT COUNT(*) AS count FROM permissoes;');
        const count = rows[0].count;
        console.log(`Permissões existentes: ${count}`);

        // Se existirem, removê-las
        if(count > 0) {
            const rows = await cx.execute('DELETE FROM permissoes;');
            if(rows[0].affectedRows !== count) {
                throw new Error('Número de permissões removidas não corresponde ao esperado');
            }            
            console.log('✔ Permissões existentes removidas');

            // Zerar autoincremento da tabela permissoes
            await cx.execute('ALTER TABLE permissoes AUTO_INCREMENT = 1;');
            console.log('✔ Auto-incremento da tabela permissoes reiniciado');
        }




        // Depois, insere as permissões definidas no código
        const values = permissions.map(perm => '(?, ?, ?, ?, ?, ?, ?)').join(', ');
        const params = permissions.flatMap(perm => [
            perm.codigo,
            perm.modulo,
            perm.recurso,
            perm.metodo,
            perm.modulo.length > 0 ? `/${perm.modulo}/${perm.rota}` : `/${perm.rota}`,
            perm.descricao,
            perm.ehPublica ? 1 : 0
        ]);

        const sqlInsert = `INSERT INTO permissoes (codigo, modulo, recurso, metodo, rota_template, descricao, eh_publica) VALUES ${values}`;

        const result = await cx.execute(sqlInsert, params);
        if(result[0].affectedRows !== permissions.length) {
            throw new Error('Número de permissões inseridas não corresponde ao esperado');
        }

        //Adiciona as permissões ao perfil ADMINISTRADOR
        const sqlPerfilPermissao = `INSERT IGNORE INTO perfis_permissoes (perfil_id, permissao_id) SELECT DISTINCT perfis.id, permissoes.id FROM perfis JOIN permissoes WHERE perfis.nome = 'ADMINISTRADOR' and permissoes.eh_publica = 0;`;
        const resultPerfilPermissao = await cx.execute(sqlPerfilPermissao);

        if(resultPerfilPermissao[0].affectedRows === 0) {
            throw new Error('Erro ao vincular permissões ao perfil ADMINISTRADOR');
        }
  
        console.log(`✔ Permissões vinculadas ao perfil ADMINISTRADOR: ${resultPerfilPermissao[0].affectedRows}`);


        await cx.commit();

        console.log('✔ Permissões sincronizadas');
        process.exit(0);

    } catch (error) {
        await cx.rollback();
        console.error('Erro ao sincronizar permissões:', error);
        process.exit(1);
    } finally {
        cx.release();
    }
}

await syncPermissions();