import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import AdulterantRiceBran from "@/pages/Adulterant/AdulterantRiceBran";
import AdulterantItem2 from "@/pages/Adulterant/AdulterantItem2";
import InfestantRiceBran from "@/pages/Infestant/InfestantRiceBran";
import InfestantItem2 from "@/pages/Infestant/InfestantItem2";
import { Sidebar } from "@/pages/Components/Sidebar";

function App() {
	return (
		<div className="relative flex h-screen">
			<Sidebar />
			<div className="flex-grow overflow-y-auto">
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
	);
}

export default App;
