import HeroImg from "../assets/hero.png";
import HeroImg2 from "../assets/hero2.png";
import UserProfile, { User } from "../components/UserProfile";
import users from "../data/users.json";

const Home = () => {
	const usersArray =
		JSON.parse(localStorage.getItem("userData") || "null") || users;
	const totalUsers = usersArray.length;
	const totalActiveUsers = usersArray.filter(
		(user: User) => user.userStatus === "Active"
	).length;
	const totalInactiveUsers = totalUsers - totalActiveUsers;

	const activeUser =
		usersArray.filter((user: User) => user.userStatus === "Active")[0] ||
		usersArray[0];

	return (
		<main className='flex flex-col gap-3'>
			<div className='flex flex-col md:flex-row gap-3'>
				<div
					style={{ backgroundImage: `url(${HeroImg})` }}
					className='flex-1 lg:flex-[1.5] bg-cover bg-center rounded-[15px] lg:rounded-[30px] h-[200px] lg:h-[300px] p-8 text-white shadow-md'>
					<div className='flex flex-col gap-3'>
						<span className='text-[90%]'>Dashboard Overview</span>
						<span className='text-3xl lg:text-4xl'>Hello {activeUser.userName} 👋</span>
					</div>
				</div>
				<div
					style={{ backgroundImage: `url(${HeroImg2})` }}
					className='flex-1 bg-black rounded-[15px] lg:rounded-[30px] h-[200px] lg:h-[300px] p-8 bg-cover bg-center flex gap-4 justify-center text-white'>
					<div className='flex flex-col gap-3 items-center text-center'>
						<span className='text-[80%] md:text-[1rem]'>Total Users</span>
						<span className='text-5xl lg:text-6xl'>{totalUsers}</span>
					</div>
					<div className='flex flex-col gap-3 items-center text-center'>
						<span className='text-[80%] md:text-[1rem]'>Total Active Users</span>
						<span className='text-5xl lg:text-6xl'>{totalActiveUsers}</span>
					</div>
					<div className='flex flex-col gap-3 items-center text-center'>
						<span className='text-[80%] md:text-[1rem]'>Total Inactive Users</span>
						<span className='text-5xl lg:text-6xl'>{totalInactiveUsers}</span>
					</div>
				</div>
			</div>

			<div className='flex gap-3'>
				<UserProfile />
			</div>
		</main>
	);
};

export default Home;
