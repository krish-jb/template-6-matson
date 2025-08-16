import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Loading from "@/components/custom/Loading";
import useWedding from "@/hooks/useWedding";
import { supabase } from "@/integrations/supabase/client";

interface LoginWithTokenProps {
    access_token: string;
    refresh_token: string;
}

const LoginWithToken: React.FC<LoginWithTokenProps> = ({
    access_token,
    refresh_token,
}) => {
    const { user, isLoggedIn } = useWedding();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;

        if (!access_token) return;

        const loginWithJwt = async (
            access_token: string,
            refresh_token: string,
        ) => {
            try {
                const { error } = await supabase.auth.setSession({
                    access_token: access_token,
                    refresh_token: refresh_token,
                });
                if (error) {
                    console.error("Failed to set session", error.message);
                }
                return { error };
            } catch (error) {
                console.error("Unexpected error: ", error.message);
                return { error: { message: "Unexpected error" } };
            }
        };

        const handleLogin = async () => {
            const { error } = await loginWithJwt(access_token, refresh_token);
            if (isMounted) {
                if (error) {
                    toast.error("Failed to login!");
                } else {
                    toast.success("Login successful!", {
                        description: "Welcome back",
                    });
                }
            }
        };

        handleLogin();

        return () => {
            isMounted = false;
        };
    }, [access_token, refresh_token]);

    useEffect(() => {
        if (isLoggedIn && user?.username) {
            navigate(`/${user?.username}`);
        }
    }, [isLoggedIn, user?.username, navigate]);

    return <Loading />;
};

export default LoginWithToken;
