import React, { useState, useEffect, ReactNode } from "react";

interface ScalingWrapperProps {
	children: ReactNode;
	designWidth?: number;
	designHeight?: number;
}

export const ScalingWrapper: React.FC<ScalingWrapperProps> = ({
	children,
	designWidth = 1920,
	designHeight = 1080,
}) => {
	const [scale, setScale] = useState(1);
	const [dimensions, setDimensions] = useState({
		width: designWidth,
		height: designHeight,
	});

	useEffect(() => {
		const handleResize = () => {
			const windowWidth = window.innerWidth;
			const windowHeight = window.innerHeight;

			const scaleX = windowWidth / designWidth;
			const scaleY = windowHeight / designHeight;

			// Maintain aspect ratio: use the minimum scale factor to fit both width and height
			const newScale = Math.min(scaleX, scaleY);
			setScale(newScale);

			// Center the design dimensions
			setDimensions({
				width: designWidth,
				height: designHeight,
			});
		};

		window.addEventListener("resize", handleResize);
		handleResize(); // Initial call

		return () => window.removeEventListener("resize", handleResize);
	}, [designWidth, designHeight]);

	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				overflow: "hidden",
				backgroundColor: "black", // Background for pillarboxing/letterboxing
			}}
		>
			<div
				style={{
					width: `${dimensions.width}px`,
					height: `${dimensions.height}px`,
					transform: `scale(${scale})`,
					transformOrigin: "center center",
					flexShrink: 0,
				}}
			>
				{children}
			</div>
		</div>
	);
};
