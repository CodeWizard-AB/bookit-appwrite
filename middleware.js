import { NextResponse } from "next/server";
import { checkAuth } from "./actions/auth";

export const middleware = async (request) => {
	const { isAuthenticated } = await checkAuth();
	if (!isAuthenticated) {
		return NextResponse.redirect(new URL("/login", request.url));
	}
	return NextResponse.next();
};

export const config = {
	matcher: ["/rooms/:id", "/bookings", "/add-room"],
};
