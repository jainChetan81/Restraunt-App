import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
	title: "Restaurant App",
	description: "Open Table Restaurant App",
	favicon: "/favicon.ico",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<div className="bg-gray-100 min-h-screen w-screen">
					<main className="max-w-screen-2xl m-auto bg-white">
						<Navbar />
						{children}
					</main>
				</div>
			</body>
		</html>
	);
}
