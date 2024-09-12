import mysql from "mysql2/promise";

const dbPool = mysql.createPool({
    host: process.env.DB_HOST,          // Host do banco de dados (geralmente um URL ou IP)
    user: process.env.DB_USER,          // Usuário com permissões para acessar o banco de dados
    password: process.env.DB_PASSWORD,  // Senha do usuário
    database: process.env.DB_NAME,      // Nome do banco de dados
});

(async () => {
    try {
        // Testa a conexão ao banco de dados
        const connection = await dbPool.getConnection();
        console.log("Conexão com o banco de dados estabelecida com sucesso!");
        connection.release(); // Libera a conexão de volta ao pool
    } catch (error: unknown) {
        if (error instanceof Error)
            console.error("Erro ao conectar ao banco de dados:", error.message);
        else
            console.error("Erro desconhecido");
    }
})();

export default dbPool;