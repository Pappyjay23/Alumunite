import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import ManageUsers from "./pages/ManageUsers";

const App = () => {
	return (
		<BrowserRouter>
			<div className='bg-[#1A1B1E] h-screen text-white'>
				<Navbar />
				<div className='px-8 py-2'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/add-user' element={<AddUser />} />
						<Route path='/manage-users' element={<ManageUsers />} />
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
};

export default App;
