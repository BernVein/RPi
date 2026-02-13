import { Image, Button } from "@heroui/react";
import { CameraIcon, UploadIcon } from "@/components/icons";
import { useState } from "react";

export default function AdulterantRiceBran() {
	const [, setImageFile] = useState<File | null>(null);

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
		<div className="flex flex-col h-full w-full overflow-hidden">
			<div className="flex flex-1 w-full h-full">
				<div className="relative flex-1 overflow-hidden">
					{/* file input */}
					<input
						type="file"
						accept="image/*"
						onChange={handleFileChange}
						className="hidden"
						id="fileInput"
					/>

					{/* image */}
					<Image
						alt="Rice Bran"
						src="http://FeedAdulterantSBC.local:5000/video_feed"
						// src="http://192.168.254.111:5000/video_feed"
						fallbackSrc="https://via.placeholder.com"
						className="w-full h-full object-cover rounded-none"
					/>

					{/* buttons */}
					<div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
						<Button
							color="danger"
							size="lg"
							className="h-20 w-100 shadow-2xl"
							startContent={<CameraIcon className="w-30" />}
						>
							<p className="text-3xl">Test for Adulteration</p>
						</Button>
					</div>

					<div className="absolute bottom-10 right-10 z-10">
						<Button
							isIconOnly
							color="default"
							variant="flat"
							className="h-16 w-16 min-w-16 shadow-xl backdrop-blur-md"
							startContent={<UploadIcon className="size-8" />}
							onPress={handleUploadClick}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
