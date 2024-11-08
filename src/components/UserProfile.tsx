import { useEffect, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import users from "../data/users.json";

export interface User {
	id: number;
	userName: string;
	userProfileImg: string;
	userEmail: string;
	userRole: string;
	userStatus: string;
}

const UserProfile = () => {
	const [userData, setUserData] = useState<User[]>([]);

	useEffect(() => {
		const savedData = localStorage.getItem("userData");
		const initialData = savedData ? JSON.parse(savedData) : users;

		if (!savedData) {
			localStorage.setItem("userData", JSON.stringify(users));
		}

		setUserData(initialData);
	}, []);

	const handleDelete = (id: number) => {
		const updatedData = userData.filter((user) => user.id !== id);
		setUserData(updatedData);
		localStorage.setItem("userData", JSON.stringify(updatedData));
	};

	return (
		<section className='flex-[1.5] bg-[#fff] shadow-md rounded-[15px] lg:rounded-[30px] min-h-[300px] h-full p-4 md:p-8'>
			<div className='flex flex-col gap-3'>
				<div className='flex gap-3 py-3 md:px-6 text-[60%] md:text-[70%] text-[#b1b3b5] border-b border-[#d5d7de] font-bold uppercase'>
					<p className='flex-1'>Name</p>
					<p className='flex-[2] md:flex-1'>Email</p>
					<p className='flex-1'>Role</p>
					<p className='flex-1'>Status</p>
				</div>
				{userData.map((user) => (
					<div
						key={user.id}
						className='flex gap-3 items-center py-3 md:px-6 text-[60%] md:text-[70%] text-[#585F66] border-b border-[#d5d7de] font-medium'>
						<div className='flex-1 flex items-center gap-2 md:gap-4'>
							<div className='w-[25px] h-[25px] md:w-[30px] md:h-[30px] rounded-full overflow-hidden hidden md:block'>
								<img
									src={user.userProfileImg}
									alt='Profile img'
									className='w-full h-full object-cover'
								/>
							</div>
							<span>{user.userName}</span>
						</div>
						<p className='flex-[2] md:flex-1'>{user.userEmail}</p>
						<p className='flex-1'>{user.userRole}</p>
						<div className='flex-1 flex items-center justify-between gap-4'>
							<span>{user.userStatus}</span>
							<MdOutlineDeleteOutline
								onClick={() => handleDelete(user.id)}
								className='cursor-pointer text-[1.2rem] text-[#b1b3b5] hover:text-red-500 transition-all duration-500 ease-in-out'
							/>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default UserProfile;
