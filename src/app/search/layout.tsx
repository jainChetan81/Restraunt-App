import Header from "@/components/Header";

export const metadata = {
    title: "Search | Open Table",
    description: "Open Table Restaurant App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}
