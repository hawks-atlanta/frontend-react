import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { NavbarButtonGroup } from "../Nav/NavbarButtonGroup";

export function NavbarScreen() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="mx-auto flex max-w-screen-2xl items-center font-bold text-white">
        <Link to="/">
          <img
            src="/Logos/logo.png"
            alt=""
            aria-label="CapyFile Logo"
            className="mr-2 h-16 w-16 rounded-md border border-gray-500"
          />
        </Link>
        <p className="ml-2 text-2xl">CapyFile</p>
        <div className="flex flex-grow justify-end gap-4">
          <button
            aria-label="Open menu"
            onClick={toggleMobileMenu}
            className="md:hidden"
          >
            <Menu size={54} />
          </button>

          {showMobileMenu && (
            <div className="absolute left-0 right-0 top-32 flex -translate-y-1/2 transform items-center justify-center bg-white p-2 md:hidden">
              {" "}
              <NavbarButtonGroup text="Login" to="/login" />
              <NavbarButtonGroup text="Register" to="/register" />
            </div>
          )}

          <div className="hidden md:flex">
            {" "}
            <NavbarButtonGroup text="Login" to="/login" />
            <NavbarButtonGroup text="Register" to="/register" />
          </div>
        </div>
      </div>
    </nav>
  );
}
