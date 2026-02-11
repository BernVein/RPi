export default function DefaultLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
			{children}
		</main>
	);
}
