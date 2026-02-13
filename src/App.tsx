import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import AdulterantRiceBran from "@/pages/Adulterant/AdulterantRiceBran";
import AdulterantItem2 from "@/pages/Adulterant/AdulterantItem2";
import InfestantRiceBran from "@/pages/Infestant/InfestantRiceBran";
import InfestantItem2 from "@/pages/Infestant/InfestantItem2";
import { Sidebar } from "@/pages/Components/Sidebar";
import { ScalingWrapper } from "@/components/ScalingWrapper";

function App() {
	return (
		<ScalingWrapper>
			<div className="relative flex w-full h-full">
				<Sidebar />
				<div className="flex-grow overflow-hidden">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/home" element={<Home />} />
						<Route
							path="/adulterant-rice-bran"
							element={<AdulterantRiceBran />}
						/>
						<Route
							path="/adulterant-item2"
							element={<AdulterantItem2 />}
						/>
						<Route
							path="/infestant-rice-bran"
							element={<InfestantRiceBran />}
						/>
						<Route
							path="/infestant-item2"
							element={<InfestantItem2 />}
						/>
					</Routes>
				</div>
			</div>
		</ScalingWrapper>
	);
}

export default App;
