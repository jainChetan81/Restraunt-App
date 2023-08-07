import Navbar from "@/components/Navbar";
import "./globals.css";
import AuthContext from "@/context/authContext";

export const metadata = {
	title: "Restaurant App",
	description: "Open Table Restaurant App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<div className="bg-gray-100 min-h-screen">
					<main className="max-w-screen-2xl m-auto bg-white">
						<AuthContext>
							<Navbar />
							{children}
						</AuthContext>
					</main>
				</div>
			</body>
		</html>
	);
}
