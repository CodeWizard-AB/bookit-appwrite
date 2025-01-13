"use client";

import { logout } from "@/actions/auth";
import { useAuth } from "@/contexts/AuthContent";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaSignOutAlt } from "react-icons/fa";

export default function Logout() {
	const { setIsAuthenticated } = useAuth();
	const router = useRouter();

	const handleLogout = async () => {
		const { success, error } = await logout();

		if (success) {
			setIsAuthenticated(false);
			router.push("/login");
		} else {
			setIsAuthenticated(true);
			toast.error(error);
		}
	};

	return (
		<button
			onClick={handleLogout}
			className="mx-3 text-gray-800 hover:text-gray-600"
		>
			<FaSignOutAlt className="inline mr-1" /> Sign Out
		</button>
	);
}
