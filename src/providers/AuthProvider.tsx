"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

import { getUser } from "@/services/auth";

type User = {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
};

type AuthContextType = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    loading: boolean;
    loadUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [user, setUser] = useState<User | null>(null);

    // initially true
    const [loading, setLoading] = useState(true);

    const loadUser = async () => {
        try {
            const userData = await getUser();

            setUser(userData?.data || userData || null);
        } catch (error) {
            console.log(error);

            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // async wrapper
        const fetchUser = async () => {
            await loadUser();
        };

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                loadUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;
};