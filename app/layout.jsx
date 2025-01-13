import Header from "@/components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/contexts/AuthContent";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Bookit App | Book a Room",
	description: "Book a meeting or conference room for your next event",
};

export default function RootLayout({ children }) {
	return (
		<AuthProvider>
			<html lang="en">
				<body
					className={`${inter.className} antialiased`}
					data-new-gr-c-s-check-loaded="14.1216.0"
					data-gr-ext-installed=""
					cz-shortcut-listen="true"
				>
					<Toaster />
					<Header />
					<main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
						{children}
					</main>
					<Footer />
				</body>
			</html>
		</AuthProvider>
	);
}
