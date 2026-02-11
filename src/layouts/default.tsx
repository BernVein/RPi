import { Sidebar } from "@/pages/Components/Sidebar";

export default function DefaultLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="relative flex h-screen">
			<Sidebar />
			<main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
				{children}
			</main>
		</div>
	);
}
