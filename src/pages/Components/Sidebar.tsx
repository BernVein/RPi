import { useState, useEffect } from "react";
import {
	Card,
	CardBody,
	CardHeader,
	Image,
	Accordion,
	AccordionItem,
	Divider,
	Button,
	CardFooter,
} from "@heroui/react";
import {
	DetectAdulterantIcon,
	HomeIcon,
	SunIcon,
	MoonIcon,
} from "@/components/icons";
import { useTheme } from "@heroui/use-theme";

export function Sidebar() {
	const [selectedKey, setSelectedKey] = useState<string>("home");
	const { theme, setTheme } = useTheme();
	useEffect(() => {
		console.log(selectedKey);
	}, [selectedKey]);
	return (
		<div className="flex h-screen w-full overflow-hidden">
			{/* Sidebar */}
			<Card className="rounded-none h-full w-72">
				{/* Header */}
				<CardHeader className="py-4 px-4">
					<div className="flex items-center gap-3 w-full">
						<Image
							src="/vsu_logo.jpg"
							alt="VSU Logo"
							className="rounded-sm w-15 h-15 object-cover"
						/>

						<div className="flex flex-col leading-tight items-center">
							<span className="font-bold uppercase text-3xl tracking-wide">
								VISAYAS
							</span>
							<span className="text-xs font-semibold uppercase text-default-500 tracking-wider">
								STATE UNIVERSITY
							</span>
						</div>
					</div>
				</CardHeader>
				<Divider />

				<CardBody className="px-3 overflow-hidden">
					<div className="text-xs font-semibold uppercase text-default-500 tracking-wider mb-1 ml-2">
						MENU
					</div>
					<Button
						variant={selectedKey === "home" ? "flat" : "light"}
						className="justify-start"
						onPress={() => setSelectedKey("home")}
						fullWidth
						color={selectedKey === "home" ? "success" : "default"}
						startContent={<HomeIcon className="w-5 h-5" />}
					>
						<span className="text-sm font-medium">Home</span>
					</Button>
					<div className="text-xs font-semibold uppercase text-default-500 tracking-wider mt-3 mb-1 ml-2">
						DETECTION
					</div>
					<Accordion isCompact className="ml-2" showDivider={false}>
						<AccordionItem
							key="1"
							title="Adulterant"
							classNames={{
								title: "text-sm font-medium",
							}}
							startContent={
								<DetectAdulterantIcon className="w-6 h-6" />
							}
						>
							<Button
								variant={
									selectedKey === "rice-bran-adulterant"
										? "flat"
										: "light"
								}
								className="justify-start"
								onPress={() =>
									setSelectedKey("rice-bran-adulterant")
								}
								fullWidth
								color={
									selectedKey === "rice-bran-adulterant"
										? "success"
										: "default"
								}
							>
								<span className="ml-5 text-sm font-medium">
									Rice Bran
								</span>
							</Button>
							<Button
								variant={
									selectedKey === "item-2-adulterant"
										? "flat"
										: "light"
								}
								className="justify-start"
								onPress={() =>
									setSelectedKey("item-2-adulterant")
								}
								fullWidth
								color={
									selectedKey === "item-2-adulterant"
										? "success"
										: "default"
								}
							>
								<span className="ml-5 text-sm font-medium">
									Item 2
								</span>
							</Button>
						</AccordionItem>
						<AccordionItem
							key="2"
							title="Infectant"
							classNames={{
								title: "text-sm font-medium",
							}}
							startContent={
								<DetectAdulterantIcon className="w-6 h-6" />
							}
						>
							<Button
								variant={
									selectedKey === "rice-bran-infectant"
										? "flat"
										: "light"
								}
								className="justify-start"
								onPress={() =>
									setSelectedKey("rice-bran-infectant")
								}
								fullWidth
								color={
									selectedKey === "rice-bran-infectant"
										? "success"
										: "default"
								}
							>
								<span className="ml-5 text-sm font-medium">
									Rice Bran
								</span>
							</Button>
							<Button
								variant={
									selectedKey === "item-2-infectant"
										? "flat"
										: "light"
								}
								className="justify-start"
								onPress={() =>
									setSelectedKey("item-2-infectant")
								}
								fullWidth
								color={
									selectedKey === "item-2-infectant"
										? "success"
										: "default"
								}
							>
								<span className="ml-5 text-sm font-medium">
									Item 2
								</span>
							</Button>
						</AccordionItem>
					</Accordion>
				</CardBody>
				<Divider />
				<CardFooter>
					<Button
						variant="light"
						className="justify-start"
						onPress={() =>
							setTheme(theme === "dark" ? "light" : "dark")
						}
						fullWidth
						startContent={
							theme === "dark" ? (
								<SunIcon className="w-5 h-5" />
							) : (
								<MoonIcon className="w-5 h-5" />
							)
						}
					>
						<span className="text-sm font-medium">
							{theme === "dark" ? "Light Mode" : "Dark Mode"}
						</span>
					</Button>
				</CardFooter>
			</Card>

			{/* Main Content */}
			<Card className="flex-1 rounded-none">
				<CardBody className="p-10 overflow-y-auto">
					<div className="max-w-4xl mx-auto"></div>
				</CardBody>
			</Card>
		</div>
	);
}
