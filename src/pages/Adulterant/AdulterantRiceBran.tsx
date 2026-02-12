import DefaultLayout from "@/layouts/default";
import { Image, Button, Card, CardBody } from "@heroui/react";
import { CameraIcon, UploadIcon } from "@/components/icons";
import { useState } from "react";

export default function AdulterantRiceBran() {
	const [imageFile, setImageFile] = useState<File | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || e.target.files.length === 0) return;
		setImageFile(e.target.files[0]);
	};

	const handleUploadClick = () => {
		const fileInput = document.getElementById(
			"fileInput",
		) as HTMLInputElement;
		if (!fileInput) return;

		// When user selects a file, immediately upload it
		fileInput.onchange = async (e: Event) => {
			const target = e.target as HTMLInputElement;
			if (!target.files || target.files.length === 0) return;

			const file = target.files[0];
			const formData = new FormData();
			formData.append("file", file);

			try {
				const res = await fetch("http://192.168.254.135:5000/predict", {
					method: "POST",
					body: formData,
				});
				const data = await res.json();

				console.log(
					alert(
						`Prediction: ${data.label}\nConfidence: ${data.confidence}`,
					),
				);
			} catch (err) {
				console.error(err);
				alert("Upload failed!");
			}

			// Clear the input so the same file can be selected again later
			target.value = "";
		};

		// Trigger the file picker
		fileInput.click();
	};

	return (
		<DefaultLayout>
			<div className="flex flex-col h-screen gap-6 p-6">
				<h1 className="text-3xl font-semibold">
					Detect Adulterant from Rice Bran
				</h1>

				<div className="flex gap-6 w-full flex-1">
					<div className="relative flex-1 rounded-xl overflow-hidden">
						<input
							type="file"
							accept="image/*"
							onChange={handleFileChange}
							className="hidden"
							id="fileInput"
						/>
						<Image
							alt="Rice Bran"
							src="https://heroui.com/images/hero-card-complete.jpeg"
							fallbackSrc="https://via.placeholder.com/800x500"
							className="w-full h-210 object-cover"
						/>

						<div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
							<Button
								color="danger"
								size="lg"
								className="h-20 w-80"
								startContent={
									<CameraIcon className="size-15" />
								}
							>
								<p className="text-xl">Test for Adulteration</p>
							</Button>
						</div>

						<div className="absolute bottom-4 right-4 z-10">
							<Button
								color="default"
								className="h-15 w-20"
								startContent={
									<UploadIcon className="size-15" />
								}
								onPress={handleUploadClick}
							/>
						</div>
					</div>

					<div className="w-1/3">
						<Card className="h-full">
							<CardBody className="flex flex-col gap-4">
								<h2 className="text-xl font-semibold">
									Prediction Details
								</h2>
								<p>Status: -</p>
								<p>Confidence: -</p>
								<p>Inference Time: -</p>
							</CardBody>
						</Card>
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
}
