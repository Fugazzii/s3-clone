import { Database } from "bun:sqlite";

export const db = new Database("/database/db.sqlite", { create: true });

const initialQuery: string = await Bun.file("init.sql").text();

db.run(initialQuery);

