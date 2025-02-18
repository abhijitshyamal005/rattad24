import { connector } from "@/app/utils/connector";
import { dbConnect } from "@/app/utils/db";

async function createEarlyAccessTable() {
  try {
    const pool = await dbConnect();
    const query = `CREATE TABLE IF NOT EXISTS early_access (id SERIAL NOT NULL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL, business_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    referral_code VARCHAR(255), updates BOOLEAN DEFAULT true,
    createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;

    const res = await pool.query(query);
    await pool.end();
    connector.close();
  } catch (e) {
    console.log(e);
  }
}

export { createEarlyAccessTable };
