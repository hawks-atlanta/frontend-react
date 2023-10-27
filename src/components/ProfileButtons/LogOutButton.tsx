import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

interface LogOutProps {
  onClick: () => void;
}

export function LogOut({ onClick }: LogOutProps) {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    onClick();
    logout();
  };

  return (
    <Link
      className="w-full rounded-lg border border-blue-600 bg-white p-2 text-center text-lg font-bold text-blue-600"
      onClick={handleLogout}
      to={"/"}
    >
      Log out
    </Link>
  );
}
