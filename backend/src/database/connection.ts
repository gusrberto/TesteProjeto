import mysql from "mysql2/promise";

const dbPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
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