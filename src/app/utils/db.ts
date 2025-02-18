"use server";
import { AuthTypes, IpAddressTypes } from "@google-cloud/cloud-sql-connector";
import { connector } from "./connector";

import { Pool } from "pg";

// const connector = new Connector();
const dbConnect = async (): Promise<Pool> => {
	const options = await connector.getOptions({
		instanceConnectionName: process.env.INSTANCE_CONNECTION!,
		authType: AuthTypes.IAM,
		// authType: AuthTypes.PASSWORD,
		// ipType: IpAddressTypes.PUBLIC,
	});

	const pool = new Pool({
		...options,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		max: 5,
	});
	return pool;
};

export { dbConnect };
