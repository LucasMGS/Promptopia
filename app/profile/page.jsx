'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Profile from '@components/Profile';


const MyProfile = () => {

    const { data: session } = useSession();
    const router = useRouter();
    const [prompts, setPrompts] = useState([]);
    
    const handleEdit = (prompt) => {
        router.push(`/update-prompt?d=${prompt._id}`);
    }

    const handleDelete = (prompt) => {
        const hasConfirmed = confirm('Are you sure you want to delete this prompt?');
        if(!hasConfirmed) return;

        try {
            fetch(`/api/prompt/${prompt._id}`, {
                method: 'DELETE'
            }).then(() => {
                router.reload();
            });
            } catch (error) {
                console.log(error);
            }
    }


    useEffect(() => {
        const fetchPrompts = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/prompts`);
          const data = await response.json();
          console.log(data);

    
          setPrompts(data);
        }
    
        if(session?.user.id)
            fetchPrompts();
      }, []);
    
    return (
        <Profile 
            name="My"
            desc="Welcome to your personalized profile page"
            data={prompts}
            handleEdit={handleDelete}
            handleDelete={handleEdit}
        />
    )
}

export default MyProfile