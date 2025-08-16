import { useEffect } from "react";
import { DEFAULT_USER } from "@/utils/user";
import useWedding from "./useWedding";

const useSyncUsername = (username: string) => {
    const { setUser } = useWedding();
    useEffect(() => {
        const cleanusername = username.trim();
        setUser((prev) => {
            if (!cleanusername || cleanusername === prev?.username) return prev;

            return { ...(prev ?? DEFAULT_USER), username: cleanusername };
        });
    }, [username, setUser]);
};

export default useSyncUsername;
