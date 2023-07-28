'use client';

import { RootState } from '@/redux/store';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchUser } from '../api/api';
import { User } from '../types';

const ProfilePage = () => {
	const auth = useSelector((state: RootState) => state.authReducer);
	const { isAuth } = auth;
	const [user, setUser] = useState<User>();
	const router = useRouter();  // Initialize router

	useEffect(() => {
		const getUser = async () => {
			try {
				const data = await fetchUser();
				console.log('getUser', data);
				setUser(data);
			} catch (error) {
				console.error('Failed to fetch user:', error);
			}
		};

		if (isAuth) {
			// If user is authenticated, fetch the user data
			getUser();
		} else {
			// If user is not authenticated, redirect them to login
			router.push('/login');
		}
	}, [isAuth, router]);  // Add router as a dependency

	if (!isAuth) {
		// If user is not authenticated, show an error message
		return (
			<>
				<div className='mx-auto text-center min-h-[50vh] grid place-items-center text-[28px] mb-10 uppercase'>
					Redirecting...
				</div>
			</>
		);
	}
	return (
		<>
			<main className='container my-10'>
				<div className='w-3/4 md:w-1/2 mx-auto font-bold tracking-wide'>
					<header className='mb-4 border-b border-black flex justify-between'>
						<h1 className='font-bold text-2xl'>Profile</h1>
						<PencilSquareIcon className='w-5 hover:opacity-50 hover:cursor-pointer transition-all' />
					</header>
					<div className='flex flex-col gap-4'>
						<p className='flex flex-col md:flex-row  justify-between'>
							Username: <span className='font-normal'>{user?.username}</span>
						</p>
						<p className='flex flex-col md:flex-row  justify-between'>
							Email: <span className='font-normal'>{user?.email}</span>
						</p>
						<p className='flex flex-col md:flex-row  justify-between'>
							First Name:{' '}
							<span className='font-normal'>{user?.first_name}</span>
						</p>
						<p className='flex flex-col md:flex-row  justify-between'>
							Last Name: <span className='font-normal'>{user?.last_name}</span>
						</p>
						<p className='flex flex-col md:flex-row  justify-between'>
							User ID: <span className='font-normal'>{user?.id}</span>
						</p>
						<p className='flex flex-col md:flex-row  justify-between'>
							Password:{' '}
							<span className='font-normal text-purple hover:cursor-pointer hover:underline'>
								Change Password
							</span>
						</p>
						<p className='flex flex-col md:flex-row justify-between'>
							Delete Sound Sprout Account:{' '}
							<span className='font-normal text-red-500 hover:cursor-pointer hover:underline'>
								Delete Account
							</span>
						</p>
					</div>
				</div>
			</main>
		</>
	);
};

export default ProfilePage;
