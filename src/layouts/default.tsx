export default function DefaultLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <main className=" mx-auto px-7">{children}</main>;
}
