/** Monta token composto para sessão.
 * Formato: id.user_id.token
 * @param {{id:number,usuario:number,token:string}} session
 * @returns {string}
 */
export const buildToken = (session={id:0, usuario:0, token: ''})=>{
    const {id, usuario, token} = session; 
    return `${id}.${usuario}.${token}`;
};

/** Quebra token composto em partes.
 * @param {string} buildToken
 * @returns {{id:string,usuario:string,token:string}}
 */
export const deconstructToken = (buildToken)=>{
    const values = buildToken.split('.');
    return { id: values[0], usuario: values[1], token: values[2] };
};
