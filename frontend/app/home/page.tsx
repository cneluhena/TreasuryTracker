'use client'
import { getCookie } from "cookies-next";
import { cookies} from "next/headers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


interface UserDetails {
    username:string,
}

const HomePage = () =>{
    const router = useRouter();
    const [userDetails, setUserDetails] = useState<UserDetails>();
    useEffect(() => {
        // Fetch user details when component mounts
        fetchUserDetails();
      }, []); // State to store user details


    const fetchUserDetails = async () => {
        try {
         
          const token = localStorage.getItem('token');
          
          if (!token) {
            throw new Error('No token found');
          }
          // Send request to backend with token
          const response = await fetch('http://localhost:5000/user/profile', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
    
          if (response.ok) {
            const data = await response.json();
            setUserDetails(data); // Set user details in state
          } else {
            router.push('/login')
            throw new Error('Failed to fetch user details');
          }
        } catch (error) {
          console.error('Error fetching user details:');
        }
      };


    return(
        <div>
            Welcome {userDetails?.username}
        </div>
    )
}

export default HomePage;