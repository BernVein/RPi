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
import type { Selection } from "@heroui/react";
import {
	DetectAdulterantIcon,
	HomeIcon,
	SunIcon,
	MoonIcon,
	ChevronLeft,
} from "@/components/icons";
import { useTheme } from "@heroui/use-theme";
import { useLocation, useNavigate } from "react-router-dom";

export function Sidebar() {
	const navigate = useNavigate();
	const location = useLocation();
	const [selectedKey, setSelectedKey] = useState<string>("home");
	const [expandedKeys, setExpandedKeys] = useState<Selection>(
		new Set<string>([]),
	);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		const path = location.pathname;
		if (path === "/" || path === "/home") {
			setSelectedKey("home");
			setExpandedKeys(new Set<string>([]));
		} else if (path === "/adulterant-rice-bran") {
			setSelectedKey("rice-bran-adulterant");
			setExpandedKeys(new Set<string>(["1"])); // Key for Adulterant
		} else if (path === "/adulterant-item2") {
			setSelectedKey("item-2-adulterant");
			setExpandedKeys(new Set<string>(["1"]));
		} else if (path === "/infestant-rice-bran") {
			setSelectedKey("rice-bran-infestant");
			setExpandedKeys(new Set<string>(["2"])); // Key for Infestant
		} else if (path === "/infestant-item2") {
			setSelectedKey("item-2-infestant");
			setExpandedKeys(new Set<string>(["2"]));
		}
	}, [location.pathname]);

	const handleNavigation = (path: string) => {
		navigate(path);
	};

	return (
		<div className="flex h-full overflow-hidden flex-shrink-0">
			{/* Sidebar */}
			<Card className="rounded-none h-full w-125">
				{/* Header */}
				<CardHeader className="py-4 px-4">
					<div className="flex items-center gap-3 w-full">
						<Image
							src="/vsu_logo.jpg"
							alt="VSU Logo"
							className="rounded-sm w-30 h-30 object-cover"
						/>

						<div className="flex flex-col leading-tight items-center">
							<span className="font-bold uppercase text-5xl tracking-wide">
								VISAYAS
							</span>
							<span className="text-xl font-semibold uppercase text-default-500 tracking-wider">
								STATE UNIVERSITY
							</span>
						</div>
					</div>
				</CardHeader>
				<Divider />

				<CardBody className="px-3 overflow-hidden">
					<div className="text-2xl font-semibold uppercase text-default-500 tracking-wider mb-1 ml-2">
						MENU
					</div>
					<Button
						variant={selectedKey === "home" ? "flat" : "light"}
						className="h-20 justify-start"
						onPress={() => handleNavigation("/home")}
						fullWidth
						size="lg"
						color={selectedKey === "home" ? "success" : "default"}
						startContent={<HomeIcon className="w-15" />}
					>
						<span className="text-3xl font-medium">Home</span>
					</Button>

					<div className="text-2xl font-semibold uppercase text-default-500 tracking-wider mt-3 mb-1 ml-2">
						DETECTION
					</div>
					<Accordion
						isCompact
						className="ml-2"
						showDivider={false}
						selectedKeys={expandedKeys}
						onSelectionChange={setExpandedKeys}
					>
						<AccordionItem
							key="1"
							title="Adulterant"
							classNames={{
								title: "text-3xl font-medium",
							}}
							className="mb-3"
							startContent={
								<DetectAdulterantIcon className="w-10" />
							}
							indicator={() => (
								<ChevronLeft className="w-6 h-6" />
							)}
						>
							<div className="flex flex-col gap-1">
								<Button
									variant={
										selectedKey === "rice-bran-adulterant"
											? "flat"
											: "light"
									}
									className="justify-start h-20"
									onPress={() =>
										handleNavigation(
											"/adulterant-rice-bran",
										)
									}
									fullWidth
									color={
										selectedKey === "rice-bran-adulterant"
											? "success"
											: "default"
									}
								>
									<span className="ml-5 text-3xl font-medium">
										Rice Bran
									</span>
								</Button>
								<Button
									variant={
										selectedKey === "item-2-adulterant"
											? "flat"
											: "light"
									}
									className="justify-start h-20"
									onPress={() =>
										handleNavigation("/adulterant-item2")
									}
									fullWidth
									color={
										selectedKey === "item-2-adulterant"
											? "success"
											: "default"
									}
								>
									<span className="ml-5 text-3xl font-medium">
										Item 2
									</span>
								</Button>
							</div>
						</AccordionItem>
						<AccordionItem
							key="2"
							title="Infestant"
							classNames={{
								title: "text-3xl font-medium",
							}}
							startContent={
								<DetectAdulterantIcon className="w-10" />
							}
							indicator={() => (
								<ChevronLeft className="w-6 h-6" />
							)}
						>
							<div className="flex flex-col gap-1">
								<Button
									variant={
										selectedKey === "rice-bran-infestant"
											? "flat"
											: "light"
									}
									className="justify-start h-20"
									onPress={() =>
										handleNavigation("/infestant-rice-bran")
									}
									fullWidth
									color={
										selectedKey === "rice-bran-infestant"
											? "success"
											: "default"
									}
								>
									<span className="ml-5 text-3xl font-medium">
										Rice Bran
									</span>
								</Button>
								<Button
									variant={
										selectedKey === "item-2-infestant"
											? "flat"
											: "light"
									}
									className="justify-start h-20"
									onPress={() =>
										handleNavigation("/infestant-item2")
									}
									fullWidth
									color={
										selectedKey === "item-2-infestant"
											? "success"
											: "default"
									}
								>
									<span className="ml-5 text-3xl font-medium">
										Item 2
									</span>
								</Button>
							</div>
						</AccordionItem>
					</Accordion>
				</CardBody>
				<Divider />
				<CardFooter>
					<Button
						variant="light"
						className="justify-start h-20"
						onPress={() =>
							setTheme(theme === "dark" ? "light" : "dark")
						}
						fullWidth
						startContent={
							theme === "dark" ? (
								<SunIcon className="w-10" />
							) : (
								<MoonIcon className="w-10" />
							)
						}
					>
						<span className="text-3xl font-medium">
							{theme === "dark" ? "Light Mode" : "Dark Mode"}
						</span>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
