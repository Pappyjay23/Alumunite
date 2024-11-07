import { RiLogoutCircleRLine } from "react-icons/ri";
import Logo from "../assets/logo.png";
import Profile from "../assets/profile.png";
import { Link, useLocation } from "react-router-dom";
const Navbar = () => {
	const location = useLocation();

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
	return (
		<div className='flex items-center px-8 py-4'>
			<div className='flex-[1.5] flex justify-between items-center'>
				<div className='flex items-center gap-2'>
					<img src={Logo} alt='Logo' className='h-auto w-[40px]' />
					<span className='font-black text-[1.2rem]'>Alumnite</span>
				</div>
				<div className='flex items-center gap-8 font-bold'>
					{navLinks.map((link) => {
						const isActive = location.pathname === link.path;
						return (
							<Link
								to={link.path}
								className={`rounded-full py-2 px-5 ${
									!isActive
										? "text-[#bdbdbd] bg-transparent"
										: "text-white bg-[#2E3033]"
								} hover:text-white hover:bg-[#2E3033] transition-all duration-500 ease-in-out`}>
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
								src={Profile}
								alt='Profile'
								className='w-full h-full object-cover'
							/>
						</div>
						<span className='font-bold'>Jane Doe</span>
					</div>
					<span className='cursor-pointer text-[1.2rem]'>
						<RiLogoutCircleRLine />
					</span>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
