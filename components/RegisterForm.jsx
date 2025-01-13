"use client";

import { register } from "@/actions/auth";
import { useAuth } from "@/contexts/AuthContent";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

export default function RegisterForm() {
	const { setIsAuthenticated } = useAuth();
	const [state, formAction, isPending] = useActionState(register);

	useEffect(() => {
		if (state?.error) {
			setIsAuthenticated(false);
			toast.error(state.error);
		}
		if (state?.success) {
			setIsAuthenticated(true);
			toast.success(state.success);
		}
	}, [state]);

	return (
		<form action={formAction}>
			<h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
				Register
			</h2>

			<div className="mb-4">
				<label htmlFor="name" className="block text-gray-700 font-bold mb-2">
					Name
				</label>
				<input
					type="text"
					id="name"
					name="name"
					className="border rounded w-full py-2 px-3"
					required
				/>
			</div>

			<div className="mb-4">
				<label htmlFor="email" className="block text-gray-700 font-bold mb-2">
					Email
				</label>
				<input
					type="email"
					id="email"
					name="email"
					className="border rounded w-full py-2 px-3"
					required
				/>
			</div>

			<div className="mb-4">
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
					required
				/>
			</div>

			<div className="mb-6">
				<label
					htmlFor="confirm-password"
					className="block text-gray-700 font-bold mb-2"
				>
					Confirm Password
				</label>
				<input
					type="password"
					id="confirm-password"
					name="confirm-password"
					className="border rounded w-full py-2 px-3"
					required
				/>
			</div>

			<div className="flex flex-col gap-5">
				<button
					type="submit"
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
					disabled={isPending}
				>
					Register
				</button>

				<p>
					Have an account?{" "}
					<Link href="/login" className="text-blue-500">
						Login
					</Link>
				</p>
			</div>
		</form>
	);
}
