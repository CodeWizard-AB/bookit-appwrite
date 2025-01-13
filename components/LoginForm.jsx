"use client";

import { login } from "@/actions/auth";
import { useAuth } from "@/contexts/AuthContent";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

export default function LoginForm() {
	const { setIsAuthenticated } = useAuth();
	const [state, formAction, isPending] = useActionState(login);
	const router = useRouter();

	useEffect(() => {
		if (state?.error) {
			setIsAuthenticated(false);
			toast.error(state.error);
		}
		if (state?.success) {
			setIsAuthenticated(true);
			router.push("/");
			toast.success(state.success);
		}
	}, [state]);

	return (
		<form action={formAction}>
			<h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
				Login
			</h2>

			<div className="mb-4">
				<label htmlFor="email" className="block text-gray-700 font-bold mb-2">
					Email
				</label>
				<input
					type="email"
					id="email"
					name="email"
					className="border rounded w-full py-2 px-3"
				/>
			</div>

			<div className="mb-6">
				<label
					htmlFor="password"
					className="block text-gray-700 font-bold mb-2"
				>
					Password
				</label>
				<input
					type="password"
					id="password"
					name="password"
					className="border rounded w-full py-2 px-3"
				/>
			</div>

			<div className="flex flex-col gap-5">
				<button
					type="submit"
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
					disabled={isPending}
				>
					Login
				</button>

				<p>
					No account?{" "}
					<Link href="/register" className="text-blue-500">
						Register
					</Link>
				</p>
			</div>
		</form>
	);
}
