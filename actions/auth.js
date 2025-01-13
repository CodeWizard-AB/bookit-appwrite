"use server";

import { createAdminClient, createSesssionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import { ID } from "node-appwrite";

export const register = async (prevState, formData) => {
	const name = formData.get("name");
	const email = formData.get("email");
	const password = formData.get("password");
	const confirmPassword = formData.get("confirmPassword");

	if (!name || !email || !password) {
		return { error: "Name, email and password are required" };
	}

	if (password.length < 8) {
		return { error: "Password must be at least 8 characters long" };
	}

	if (password !== confirmPassword) {
		return { error: "Passwords do not match" };
	}

	try {
		const { account } = await createAdminClient();
		await account.create(ID.unique(), email, password, name);
		const session = await account.createEmailPasswordSession(email, password);

		(await cookies()).set("auth-token", session.secret, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
			expires: new Date(session.expire),
			path: "/",
		});

		return { success: "Registration successful" };
	} catch (error) {
		console.log("Registration failed", error);
		return { error: "Registration failed" };
	}
};

export const login = async (prevState, formData) => {
	const email = formData.get("email");
	const password = formData.get("password");

	if (!email || !password) {
		return { error: "Email and password are required" };
	}

	// * get account instance
	const { account } = await createAdminClient();

	try {
		// * generate session
		const session = await account.createEmailPasswordSession(email, password);

		// * set session cookie
		cookies().set("auth-token", session.secret, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
			expires: new Date(session.expire),
			path: "/",
		});
		return { success: "Login successful" };
	} catch (error) {
		console.log("Authentication failed", error);
		return { error: "Invalid credentials" };
	}
};

export const logout = async () => {
	const auth = (await cookies()).get("auth-token");
	if (!auth) return { error: "No session cookie found" };

	try {
		const { account } = await createSesssionClient(auth.value);
		await account.deleteSession("current");
		(await cookies()).delete("auth-token");
		return { success: "Logout successful" };
	} catch (error) {
		console.log(error);
		return { error: "Logout failed" };
	}
};

export const checkAuth = async () => {
	const auth = (await cookies()).get("auth-token");
	if (!auth) {
		return { isAuthenticated: false, error: "No session cookie found" };
	}

	try {
		const { account } = await createSesssionClient(auth.value);
		const user = await account.get();

		return {
			isAuthenticated: true,
			user: { name: user.name, email: user.email, id: user.$id },
		};
	} catch (error) {
		return { isAuthenticated: false };
	}
};
