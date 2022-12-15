import { Outlet, Navigate } from "react-router";
import { useMyUser } from "../components/useMyUser";

const PrivateRoutes = () => {
    let user = useMyUser();
    return (
        user.split("|")[0] ==="auth" ? <Outlet/>:<Navigate to="/CCS" /> 
    )
}

export default PrivateRoutes;