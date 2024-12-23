import { dbQuery, dbQueryFirst } from "../services/db";

export type Usuario = {
    id: number;
    nome: string;
    email: string;
    senha: string;
}

const insertUsuario = async (usuario: Usuario) => {
    await dbQuery(`INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)`,
        [usuario.nome, usuario.email, usuario.senha]);
    return getUsuario (usuario.id);
}

const updateUsuario = async (usuario: Usuario) => {
    await dbQuery(`UPDATE usuario SET nome = ?, email = ?, senha = ? WHERE id = ?`,
    [usuario.nome, usuario.email, usuario.senha]);
    return getUsuario (usuario.id);
}

const listUsuario = async () => {
    const retorno = await dbQuery(`SELECT * FROM usuario`);
    console.log(retorno);
    return retorno as Usuario[];
}

const getUsuario = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM usuario where id = ?`, [id]);
    console.log(retorno);
    return retorno as Usuario | undefined;
}

const deleteUsuario = async (id: number) => {
    await dbQueryFirst(`DELETE FROM usuario where id = ?`, [id]);
}

export const usuarioModel = {
    insertUsuario,
    updateUsuario,
    listUsuario,
    getUsuario,
    deleteUsuario   
}