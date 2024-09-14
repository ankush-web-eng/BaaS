'use client';

import { User } from "@/types/User";
import axios from "axios";
import { useSession } from "next-auth/react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

interface UserContextProps {
    user: User | null;
    updateUser: () => void;
}

const userContext = createContext<UserContextProps | null>(null);

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<User | null>(null);
    const { data: session } = useSession();
    console.log("email is :", session?.user?.email);

    const getUser = useCallback(async () => {
        try {
            if (session?.user?.email) {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user?email=${session?.user?.email}`);
                setUser(res.data);
                console.log("User data:", res.data);
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    }, [session?.user?.email]);


    useEffect(() => {
        getUser();
    }, [getUser]);


    const updateUser = () => {
        getUser();
    }

    return (
        <userContext.Provider value={{ user, updateUser }}>
            {children}
        </userContext.Provider>
    )
}

const useUser = () => {
    const context = useContext(userContext);
    if (!context) {
        throw new Error('useUser must be used within a UserContextProvider');
    }
    return context;
}

export { UserContextProvider, useUser };