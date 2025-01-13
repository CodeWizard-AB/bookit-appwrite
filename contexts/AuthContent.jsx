"use client";

import { checkAuth } from "@/actions/auth";
import { createContext, useEffect, useState, useContext } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [currentUser, setCurrentUser] = useState({});

	useEffect(() => {
		(async () => {
			const { isAuthenticated, user } = await checkAuth();
			setIsAuthenticated(isAuthenticated);
			setCurrentUser(user);
		})();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				setIsAuthenticated,
				isAuthenticated,
				currentUser,
				setCurrentUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
