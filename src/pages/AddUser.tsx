import { useEffect, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import users from "../data/users.json";
import { User } from "../components/UserProfile";

interface Errors {
	userName?: string;
	userEmail?: string;
	userRole?: string;
	userStatus?: string;
	userProfileImg?: string;
}

const AddUser = () => {
	const [userData, setUserData] = useState<User>({
		id: Date.now(),
		userName: "",
		userEmail: "",
		userRole: "",
		userStatus: "",
		userProfileImg: "",
	});
	const [errors, setErrors] = useState<Errors>({});
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [allUsers, setAllUsers] = useState<User[]>([]);
	const navigate = useNavigate();

	const validateInput = () => {
		const newErrors: Errors = {};
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!userData.userName) newErrors.userName = "Username is required";
		if (!userData.userEmail.trim() || !emailRegex.test(userData.userEmail))
			newErrors.userEmail = "A valid email is required";
		if (!userData.userRole.trim())
			newErrors.userRole = "A user role is required";
		if (!userData.userStatus.trim())
			newErrors.userStatus = "User status is required";
		if (!userData.userProfileImg)
			newErrors.userProfileImg = "User profile image is required";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setUserData({ ...userData, userProfileImg: reader.result as string });
			};
			reader.readAsDataURL(file);
		}
	};

	const handleInputChange = (field: keyof User, value: string) => {
		setUserData((prev) => ({ ...prev, [field]: value }));
	};

	useEffect(() => {
		const savedData = localStorage.getItem("userData");
		const initialData: User[] = savedData ? JSON.parse(savedData) : users;
		setAllUsers(initialData);
	}, []);

	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		if (!validateInput()) {
			toast.error("Please fill all fields correctly.");
			return;
		}

		setIsLoading(true);

		const highestId = allUsers.reduce((maxId, user) => {
			return user.id > maxId ? user.id : maxId;
		}, 0);

		const newUser = { ...userData, id: highestId + 1 };
		const updatedUsers = [...allUsers, newUser];

		setAllUsers(updatedUsers);
		localStorage.setItem("userData", JSON.stringify(updatedUsers));

		toast.success("Successfully added new user", {
			position: "top-right",
		});

		setTimeout(() => {
			setIsLoading(false);
			navigate("/");
		}, 1000);
	};

	return (
		<main className='relative w-full'>
			<ToastContainer />
			<div className='px-4 py-3'>
				<form className='flex flex-col md:items-center px-1'>
					<div
						className={`py-4 w-full md:w-3/5 lg:w-2/5 border ${
							errors.userProfileImg ? "border-red-500" : "border-gray-300"
						}  bg-white rounded-lg mb-2 flex flex-col items-center justify-center min-h-[260px]`}>
						<label
							htmlFor='user-profile-img'
							className='cursor-pointer flex flex-col items-center'>
							<div className='flex justify-center items-center relative mb-3'>
								{userData.userProfileImg ? (
									<div className='w-40 h-40 relative rounded-full overflow-hidden shadow-xl'>
										<img
											src={userData.userProfileImg}
											alt='Uploaded Logo'
											className='object-cover w-full h-full'
										/>
									</div>
								) : (
									<LuImagePlus className='text-5xl text-black' />
								)}
							</div>
							<span className='text-black text-sm font-bold'>
								{userData.userProfileImg
									? "Click to change user profile image"
									: "Upload user profile image"}
							</span>
						</label>
						<input
							name='user-profile-img'
							id='user-profile-img'
							type='file'
							accept='image/*'
							onChange={handleFileChange}
							className='hidden'
						/>
						{errors.userProfileImg && (
							<p className='text-red-500 text-[12px] mt-1'>
								{errors.userProfileImg}
							</p>
						)}
					</div>

					<div className='w-full md:w-3/5 lg:w-2/5 text-sm'>
						{(["userName", "userEmail"] as const).map((field) => (
							<div key={field} className='flex flex-col gap-2 mb-3'>
								<input
									type='text'
									placeholder={field === "userName" ? "Username" : "Email"}
									value={userData[field]}
									onChange={(e) => handleInputChange(field, e.target.value)}
									className={`w-full border ${
										errors[field] ? "border-red-500" : "border-gray-300"
									} rounded-lg py-3 px-3 text-[#00000083] outline-none`}
								/>
								{errors[field] && (
									<p className='text-red-500 text-xs mt-1'>{errors[field]}</p>
								)}
							</div>
						))}

						{(["userRole", "userStatus"] as const).map((field) => (
							<div key={field} className='flex flex-col gap-2 mb-3'>
								<select
									value={userData[field]}
									onChange={(e) => handleInputChange(field, e.target.value)}
									className={`w-full border ${
										errors[field] ? "border-red-500" : "border-gray-300"
									} rounded-lg py-3 px-3 outline-none cursor-pointer`}>
									<option value='' disabled hidden>
										{field === "userRole"
											? "Select a user role"
											: "Select a user status"}
									</option>
									{field === "userRole" ? (
										<>
											<option value='Admin'>Admin</option>
											<option value='User'>User</option>
											<option value='Guest'>Guest</option>
										</>
									) : (
										<>
											<option value='Active'>Active</option>
											<option value='Inactive'>Inactive</option>
										</>
									)}
								</select>
								{errors[field] && (
									<p className='text-red-500 text-xs mt-1'>{errors[field]}</p>
								)}
							</div>
						))}
						<div className='mt-4'>
							<button
								onClick={handleSubmit}
								className='bg-black p-4 rounded-[8px] text-white w-full'>
								{isLoading ? "Loading..." : "Add user"}
							</button>
						</div>
					</div>
				</form>
			</div>
		</main>
	);
};

export default AddUser;
