'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserDetails {
    username: string,
}

const HomePage = () => {
    const router = useRouter();
    const [userDetails, setUserDetails] = useState<UserDetails>();

    useEffect(() => {
        // Fetch user details when component mounts
        fetchUserDetails();
    }, []); // State to store user details

    const fetchUserDetails = async () => {
        try {
            //const token = localStorage.getItem('token');
            // Send request to backend with token
            const response = await fetch('http://localhost:5000/user/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setUserDetails(data); // Set user details in state
            } else {
                router.push('/login');
                throw new Error('Failed to fetch user details');
            }
        } catch (error) {
            console.error('Error fetching user details:');
        }
    };

    return (
        <>
            <div>
                Welcome {userDetails?.username}
            </div>
            <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                <div className="p-6">
                    <h5 className="block mb-2 font-sans text-2xl text-gray-900 antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                        Investment Summary
                    </h5>
                    <div className="relative">
                        <table className="w-full text-sm text-left rtl:text-right dark:text-gray-400">
                            <tbody>
                                <tr className="bg-white dark:bg-gray-800">
                                    <th scope="row" className="px-4 py-2 font-medium whitespace-nowrap dark:text-white text-lg">
                                        Total Investments
                                    </th>
                                    <td className="px-1 py-4">
                                        $2999
                                    </td>
                                </tr>
                                <tr className="bg-white dark:bg-gray-800">
                                    <th scope="row" className="px-4 py-2 font-medium whitespace-nowrap dark:text-white text-lg">
                                        Expected Returns
                                    </th>
                                    <td className="px-1 py-4">
                                        $1999
                                    </td>
                                </tr>
                                <tr className="bg-white dark:bg-gray-800">
                                    <th scope="row" className="px-4 py-2 font-medium whitespace-nowrap dark:text-white text-lg">
                                        Latest Upcoming Investment
                                    </th>
                                    <td className="px-1 py-4">
                                        $99
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="p-6 pt-0">
                    <button
                        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                        type="button">
                        Read More
                    </button>
                </div>
            </div>
        </>
    );
}

export default HomePage;
