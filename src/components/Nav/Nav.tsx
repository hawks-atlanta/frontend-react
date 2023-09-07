import { Button } from "../Button/Button";
import { Link } from "react-router-dom";

export function NavbarScreen() {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex items-center font-bold text-white">
        <Link to="/">
          <img
            src="/Logos/logo.png"
            alt=""
            className="mr-2 h-16 w-16 rounded-md border border-gray-500"
          />
        </Link>
        <p className="ml-2 text-2xl">CapyFile</p>
        <div className="flex flex-grow justify-end gap-4">
          <Button text="Login" to="/login" />
          <Button text="Register" to="/register" />
        </div>
      </div>
    </nav>
  );
}
