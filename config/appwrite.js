"use server";

import { cookies } from "next/headers";
import { Account, Client, Databases, Storage } from "node-appwrite";

export const createAdminClient = async () => {
	const adminClient = new Client()
		.setEndpoint(process.env.APPWRITE_ENDPOINT_URL)
		.setProject(process.env.APPWRITE_PROJECT_ID)
		.setKey(process.env.APPWRITE_API_KEY);

	return {
		get account() {
			return new Account(adminClient);
		},
		get databases() {
			return new Databases(adminClient);
		},
		get storage() {
			return new Storage(adminClient);
		},
	};
};

export const createSesssionClient = async () => {
	const sessionClient = new Client()
		.setEndpoint(process.env.APPWRITE_ENDPOINT_URL)
		.setProject(process.env.APPWRITE_PROJECT_ID);

	const session = (await cookies()).get("auth-token");
	if (session && session.value) {
		sessionClient.setSession(session.value);
	}

	return {
		get account() {
			return new Account(sessionClient);
		},
	};
};
