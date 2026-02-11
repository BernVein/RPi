import React, { useState } from "react";
import { Button } from "@heroui/button";
import {
	Card,
	CardBody,
	CardHeader,
	Image,
	Accordion,
	AccordionItem,
} from "@heroui/react";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { Listbox, ListboxItem, ListboxSection } from "@heroui/listbox";
import { MenuIcon, HomeIcon, DetectAdulterantIcon } from "@/components/icons";

export function Sidebar() {
	const [selectedKey, setSelectedKey] = useState<string>("home");
	const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

	return (
		<div className="flex h-screen w-full overflow-hidden bg-default-50">
			{/* Sidebar */}
			<Card
				className={`rounded-none h-full transition-all duration-300 border-r border-divider ${
					isCollapsed ? "w-20" : "w-72"
				}`}
			>
				{/* Header */}
				<CardHeader className="py-4 px-4">
					<div className="flex items-center gap-3 w-full">
						<Image
							src="/vsu_logo.jpg"
							alt="VSU Logo"
							className="rounded-full w-12 h-12 object-cover"
						/>

						{!isCollapsed && (
							<div className="flex flex-col leading-tight">
								<span className="font-bold uppercase text-xl tracking-wide">
									VISAYAS
								</span>
								<span className="text-xs font-semibold uppercase text-default-500 tracking-wider">
									STATE UNIVERSITY
								</span>
							</div>
						)}
					</div>
				</CardHeader>

				<CardBody className="px-3 overflow-hidden">
					{/* Collapse Button */}
					{/* <div
						className={`flex items-center mb-4 ${isCollapsed ? "justify-center" : "justify-end"}`}
					>
						<Button
							isIconOnly
							variant="light"
							size="sm"
							onPress={() => setIsCollapsed(!isCollapsed)}
						>
							<MenuIcon className="w-5" />
						</Button>
					</div> */}

					<ScrollShadow className="h-full pr-2">
						<Listbox
							selectedKeys={new Set([selectedKey])}
							selectionMode="single"
							hideSelectedIcon
							onAction={(key) => setSelectedKey(key as string)}
						>
							<ListboxSection title="MENU">
								{/* Home */}
								<ListboxItem
									key="home"
									startContent={<HomeIcon className="w-5" />}
									className={`${
										isCollapsed ? "justify-center px-0" : ""
									} rounded-lg`}
								>
									{!isCollapsed && (
										<span className="text-sm font-medium">
											Home
										</span>
									)}
								</ListboxItem>
							</ListboxSection>

							{/* Detect Section */}
							<ListboxSection title="DETECT">
								<ListboxItem
									key="detect-adulteration"
									className={`${isCollapsed ? "px-0" : ""} rounded-lg`}
								>
									<Accordion
										isCompact
										variant="light"
										className="w-full px-0"
									>
										<AccordionItem
											startContent={
												<DetectAdulterantIcon className="w-5" />
											}
											title={
												!isCollapsed && (
													<span className="text-sm font-medium">
														Adulteration
													</span>
												)
											}
											className="px-0"
										>
											<div className="flex flex-col gap-1 pl-6">
												<Button
													variant="light"
													className="justify-start"
												>
													Rice Bran
												</Button>
												<Button
													variant="light"
													className="justify-start"
												>
													Sample 2
												</Button>
											</div>
										</AccordionItem>
									</Accordion>
								</ListboxItem>

								<ListboxItem
									key="detect-infestation"
									className={`${isCollapsed ? "px-0" : ""} rounded-lg`}
								>
									<Accordion
										isCompact
										variant="light"
										className="w-full px-0"
									>
										<AccordionItem
											startContent={
												<DetectAdulterantIcon className="w-5" />
											}
											title={
												!isCollapsed && (
													<span className="text-sm font-medium">
														Infestation
													</span>
												)
											}
											className="px-0"
										>
											<div className="flex flex-col gap-1 pl-6">
												<Button
													variant="light"
													className="justify-start"
												>
													Sample A
												</Button>
												<Button
													variant="light"
													className="justify-start"
												>
													Sample B
												</Button>
											</div>
										</AccordionItem>
									</Accordion>
								</ListboxItem>
							</ListboxSection>
						</Listbox>
					</ScrollShadow>
				</CardBody>
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
