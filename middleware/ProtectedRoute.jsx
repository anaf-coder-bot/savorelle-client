import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingToken from "../src/components/LoadingToken";

export default function ProtectedRoute({ children, allowedRoles }) {
    const { accessToken, user, loading } = useAuth();

    if (allowedRoles && loading) return <LoadingToken />

    if (!accessToken) return <Navigate to={"/login"} replace/>

    if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to={"/login"} replace />
    return children;
};