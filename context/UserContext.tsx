'use client';

import { User } from "@/types/User";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface UserContextProps {
    user: User | null;
    updateUser: () => void;
}

const userContext = createContext<UserContextProps | null>(null);

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<User | null>(null);

    const getUser = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`);
            setUser(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

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