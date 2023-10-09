import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

interface AuthMiddlewareProps {
  children: React.ReactNode;
  mustBeAuthenticated?: boolean;
}

export const AuthMiddleware = ({
  children,
  mustBeAuthenticated
}: AuthMiddlewareProps) => {
  const { isSessionLoading, session } = useContext(AuthContext);

  // Show an spinner if session is loading
  if (isSessionLoading) {
    return (
      <div className="p-4">
        <Loader2 className="mx-auto animate-spin" />
      </div>
    );
  }

  // Redirect to login if user is not authenticated
  if (mustBeAuthenticated && !session) {
    toast.error("You must be authenticated to access this page");
    return <Navigate to={"/login"} />;
  }

  // Redirect to files if user is already authenticated
  if (!mustBeAuthenticated && session) {
    toast.error("You are already authenticated");
    return <Navigate to={"/files"} />;
  }

  return children;
};
