import { NextResponse } from "next/server";
import { pool } from "../postgresConfig";

export async function GET(){
    try {
        const result = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public';");
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred.' });
    }
}
