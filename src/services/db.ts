import sqlite3 from 'sqlite3';

const DATABASE_FILE = process.env.DATABASE_FILE;

if (!DATABASE_FILE) {
    throw new Error("DATABASE_FILE não informado");
}

export const openConnection = (): sqlite3.Database => {
    let db = new sqlite3.Database(DATABASE_FILE);
    return db;
}

export const createTables = (): Promise<void> => {
    const createFornecedorTableQuery = `
        CREATE TABLE IF NOT EXISTS fornecedor (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            cnpj TEXT NOT NULL,
            contato TEXT NOT NULL,
            endereco TEXT NOT NULL
        )
    `;

    const createProdutoTableQuery = `
        CREATE TABLE IF NOT EXISTS produto (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            descricao TEXT,
            preco REAL NOT NULL,
            quantidade INTEGER NOT NULL,
            imagem TEXT,
            fornecedorId INTEGER,
            FOREIGN KEY (fornecedorId) REFERENCES fornecedor(id)
        )
    `;

    const createClienteTableQuery = `
        CREATE TABLE IF NOT EXISTS cliente (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            cpf_cnpj TEXT NOT NULL,
            contato TEXT NOT NULL,
            endereco TEXT NOT NULL
        )
    `;

    const createPedidoTableQuery = `
        CREATE TABLE IF NOT EXISTS pedido (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            data DATE NOT NULL,
            clienteId INTEGER,
            status TEXT NOT NULL,
            total REAL NOT NULL,
            FOREIGN KEY (clienteId) REFERENCES cliente(id)
        )
    `;

    const createItemPedidoTableQuery = `
        CREATE TABLE IF NOT EXISTS itemPedido (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pedidoId INTEGER,
            produtoId INTEGER,
            quantidade INTEGER NOT NULL,
            precoUnitario REAL NOT NULL,
            FOREIGN KEY (pedidoId) REFERENCES pedido(id),
            FOREIGN KEY (produtoId) REFERENCES produto(id)
        )
    `;

    const createTransacaoTableQuery = `
        CREATE TABLE IF NOT EXISTS transacao (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            data DATE NOT NULL,
            tipo TEXT NOT NULL,
            valor REAL NOT NULL,
            produtoId INTEGER,
            pedidoId INTEGER,
            FOREIGN KEY (produtoId) REFERENCES produto(id),
            FOREIGN KEY (pedidoId) REFERENCES pedido(id)
        )
    `;

    const createUsuarioTableQuery = `
        CREATE TABLE IF NOT EXISTS usuario (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL,
            senha TEXT NOT NULL
        )
    `;

    let db = openConnection();
    return new Promise<void>((resolve, reject) => {
        db.serialize(() => {
            // Executa as queries para criar as tabelas
            db.run(createFornecedorTableQuery, (err) => {
                if (err) {
                    reject(err);
                }
            });
            db.run(createProdutoTableQuery, (err) => {
                if (err) {
                    reject(err);
                }
            });
            db.run(createClienteTableQuery, (err) => {
                if (err) {
                    reject(err);
                }
            });
            db.run(createPedidoTableQuery, (err) => {
                if (err) {
                    reject(err);
                }
            });
            db.run(createItemPedidoTableQuery, (err) => {
                if (err) {
                    reject(err);
                }
            });
            db.run(createTransacaoTableQuery, (err) => {
                if (err) {
                    reject(err);
                }
            });
            db.run(createUsuarioTableQuery, (err) => {
                if (err) {
                    reject(err);
                }
            });

            resolve();
        });
    })
        .finally(() => {
            db.close();
        });
}

export const dbQueryFirst = async (query: string, params?: any[]) => {
    const retorno = await dbQuery(query, params)
    return retorno[0];
}

export const dbQuery = (query: string, params?: any[]): Promise<any[]> => {
    let db = openConnection();
    return new Promise<any[]>((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    })
        .finally(() => {
            db.close();
        });
}
