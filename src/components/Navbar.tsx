import { RiLogoutCircleRLine } from "react-icons/ri";
import Logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import users from "../data/users.json";
import { User } from "./UserProfile";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

const Navbar = () => {
	const location = useLocation();

	const [nav, setNav] = useState<boolean>(false);

	const toggleNav = () => {
		setNav((prev) => !prev);
	};

	const navLinks = [
		{
			name: "Home",
			path: "/",
		},
		{
			name: "Add User",
			path: "/add-user",
		},
		{
			name: "Manage Users",
			path: "/manage-users",
		},
	];

	const usersArray =
		JSON.parse(localStorage.getItem("userData") || "null") || users;
	const activeUser =
		usersArray.filter((user: User) => user.userStatus === "Active")[0] ||
		usersArray[0];

	return (
		<>
			<div className='fixed hidden lg:flex top-0 left-0 w-full px-8 py-4 bg-white rounded-full shadow-md z-10'>
				<div className="flex items-center w-full max-w-[1440px] mx-auto">
					<div className='flex-[1.5] flex justify-between items-center'>
						<Link to='/' className='flex items-center gap-2'>
							<img src={Logo} alt='Logo' className='h-auto w-[40px]' />
							<span className='font-black text-[1.3rem] text-black'>
								Alumunite
							</span>
						</Link>
						<div className='flex items-center gap-8 font-black text-[95%]'>
							{navLinks.map((link, idx) => {
								const isActive = location.pathname === link.path;
								return (
									<Link
										key={idx}
										to={link.path}
										className={`${
											!isActive ? "text-[#B2B1B9]" : "text-black"
										} hover:text-black transition-all duration-500 ease-in-out`}>
										{link.name}
									</Link>
								);
							})}
						</div>
					</div>
					<div className='flex-1 flex justify-end'>
						<div className='flex items-center gap-8'>
							<div className='flex gap-2 items-center cursor-pointer'>
								<div className='w-[32px] h-[32px] rounded-full overflow-hidden border border-white'>
									<img
										src={activeUser.userProfileImg}
										alt='Profile'
										className='w-full h-full object-cover'
									/>
								</div>
								<span className='font-black text-black text-[90%]'>
									{activeUser.userName}
								</span>
							</div>
							<span className='cursor-pointer text-[1.2rem] text-black'>
								<RiLogoutCircleRLine />
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Mobile Nav */}
			<div className='fixed top-0 left-0 lg:hidden  w-full flex items-center px-8 py-4 bg-white rounded-lg shadow-md z-10'>
				<div className='flex-[1.5] flex justify-between items-center'>
					<Link to='/' className='flex items-center gap-2'>
						<img src={Logo} alt='Logo' className='h-auto w-[40px]' />
						<span className='font-black text-[1.3rem] text-black'>
							Alumunite
						</span>
					</Link>
					<span onClick={toggleNav}>
						<HiOutlineMenuAlt2 className='text-[2rem] text-black' />
					</span>
				</div>
			</div>
			<div
				className={`bg-black fixed top-0 ${
					nav ? "left-0" : "left-[100%]"
				} min-h-screen h-full  w-full z-20 text-white px-8 py-4 transition-all duration-500 ease-in-out`}>
				<div className='flex justify-end'>
					<span onClick={toggleNav}>
						<IoCloseOutline className='text-[2rem]' />
					</span>
				</div>
				<div className='flex flex-col items-center justify-center gap-10 mt-10'>
					{navLinks.map((link, idx) => {
						const isActive = location.pathname === link.path;
						return (
							<Link
								onClick={toggleNav}
								key={idx}
								to={link.path}
								className={`${
									!isActive ? "text-[#B2B1B9]" : "text-white"
								} transition-all duration-500 ease-in-out text-[2rem] font-black`}>
								{link.name}
							</Link>
						);
					})}
					<Link
						to='/'
						onClick={toggleNav}
						className={` hover:text-white text-[#b2b1b9] transition-all duration-500 ease-in-out text-[2rem] font-black`}>
						Logout
					</Link>
				</div>
			</div>
		</>
	);
};

export default Navbar;
