import { Image, Button } from "@heroui/react";
import { CameraIcon, UploadIcon } from "@/components/icons";
import { useState } from "react";

export default function AdulterantRiceBran() {
	const [, setImageFile] = useState<File | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || e.target.files.length === 0) return;
		setImageFile(e.target.files[0]);
	};

	const handleCaptureClick = async () => {
		try {
			const res = await fetch("http://192.168.1.100:5000/capture"); // Use IP
			if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
			const data = await res.json();
			if (data.status === "error") throw new Error(data.message);
			alert(`Captured!\nFilename: ${data.filename}`);
		} catch (err: any) {
			console.error(err);
			alert(`Capture failed! ${err.message}`);
		}
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
				const res = await fetch(
					"http://FeedAdulterantSBC.local:5000/capture",
					{
						method: "POST",
						body: formData,
					},
				);
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
		<div className="flex flex-col h-full w-full overflow-hidden p-8">
			{/* Top 3/4: Title and Image Stream */}
			<div className="h-3/4 flex flex-col items-center justify-center gap-6">
				<h1 className="text-5xl font-bold text-center">
					Detect Rice Bran Adulteration
				</h1>

				<div className="w-full flex-1 flex items-center justify-center min-h-0">
					<div className="relative aspect-video h-full max-w-full shadow-2xl rounded-3xl overflow-hidden border-4 border-white/10">
						<Image
							alt="Rice Bran"
							src="http://FeedAdulterantSBC.local:5000/video_feed"
							fallbackSrc="https://via.placeholder.com/1920x1080?text=Waiting+for+Video+Feed..."
							className="w-full h-full object-cover"
							removeWrapper
						/>
					</div>
				</div>
			</div>

			{/* file input (hidden) */}
			<input
				type="file"
				accept="image/*"
				onChange={handleFileChange}
				className="hidden"
				id="fileInput"
			/>

			{/* Bottom 1/4: Action Buttons */}
			<div className="h-1/4 flex items-center justify-center gap-8">
				<Button
					color="danger"
					size="lg"
					className="h-24 px-12 rounded-2xl"
					startContent={<CameraIcon className="w-10 h-10" />}
					onPress={handleCaptureClick}
				>
					<span className="text-4xl font-semibold">
						Capture & Analyze
					</span>
				</Button>

				<Button
					isIconOnly
					color="default"
					variant="flat"
					className="h-20 w-20 min-w-20 rounded-2xl shadow-xl backdrop-blur-md bg-white/10 border border-white/20 transition-all hover:bg-white/20"
					onPress={handleUploadClick}
				>
					<UploadIcon className="w-10 h-10" />
				</Button>
			</div>
		</div>
	);
}
