import { useSearchParams } from "react-router-dom";
import Login from "@/components/login/Login";
import LoginWithToken from "@/components/login/LoginWithToken";

const LoginRoute = () => {
    const [searchParams] = useSearchParams();
    const access_token = searchParams.get("access_token");
    const refresh_token = searchParams.get("refresh_token");

    return access_token && refresh_token ? (
        <LoginWithToken
            access_token={access_token}
            refresh_token={refresh_token}
        />
    ) : (
        <Login />
    );
};

export default LoginRoute;
