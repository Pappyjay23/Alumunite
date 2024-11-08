import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import ManageUsers from "./pages/ManageUsers";

const App = () => {
	return (
		<BrowserRouter>
			<div className='bg-[#F1F4FA] min-h-screen h-full text-[#838383]'>
				<Navbar />
				<div className='px-4 md:px-8 pb-5 pt-[5.5rem] max-w-[1440px] mx-auto'>
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
