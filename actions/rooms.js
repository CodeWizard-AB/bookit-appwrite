"use server";

import { createAdminClient } from "@/config/appwrite";
import { redirect } from "next/navigation";

export const getAllRooms = async () => {
	try {
		const { databases } = await createAdminClient();

		const { documents: rooms } = await databases.listDocuments(
			process.env.APPWRITE_DATABASE_ID,
			process.env.APPWRITE_COLLECTION_ROOMS_ID
		);

		return rooms;
	} catch (error) {
		console.log("Failed to get rooms", error);
		redirect("/error");
	}
};

export const getRoom = async (id) => {
	try {
		const { databases } = await createAdminClient();

		const room = await databases.getDocument(
			process.env.APPWRITE_DATABASE_ID,
			process.env.APPWRITE_COLLECTION_ROOMS_ID,
			id
		);

		return room;
	} catch (error) {
		console.log("Failed to get room", error);
		redirect("/error");
	}
};
