import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";

function AppRouter() {
	return (
		<Router>
			<Routes>
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/users" element={<Users />} />
				<Route path="*" element={<Navigate to={"/dashboard"} />} />
			</Routes>
		</Router>
	);
}

export default AppRouter;