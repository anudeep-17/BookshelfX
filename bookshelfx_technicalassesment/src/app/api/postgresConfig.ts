import { Pool} from "pg";

export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "bookShelfX",
    password: "7761",
    port: 5432
});

