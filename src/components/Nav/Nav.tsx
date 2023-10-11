import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { NavButton } from "./NavButton";

export function NavbarScreen() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname]);

  return (
    <nav className="relative h-20 bg-blue-600 p-4">
      <div className="mx-auto flex max-w-screen-2xl items-center font-bold text-white">
        <Link to="/" onClick={closeMobileMenu}>
          <img
            src="/Logos/logo.png"
            alt=""
            aria-label="CapyFile Logo"
            className="mr-2 aspect-square w-12 rounded-md border border-gray-500"
          />
        </Link>
        <p className="ml-2 text-2xl">CapyFile</p>
        <div className="flex flex-grow justify-end gap-4">
          <button
            aria-label={showMobileMenu ? "Close Menu" : "Open Menu"}
            onClick={toggleMobileMenu}
            className="md:hidden"
          >
            <Menu size={44} />
          </button>

          {showMobileMenu && (
            <div className="absolute left-0 right-0 top-full flex flex-col items-center justify-center gap-4 border bg-white p-4 md:hidden">
              <NavButton text="Login" to="/login" />
              <NavButton text="Register" to="/register" />
            </div>
          )}

          <div className="hidden gap-4 md:flex">
            <NavButton text="Login" to="/login" />
            <NavButton text="Register" to="/register" />
          </div>
        </div>
      </div>
    </nav>
  );
}
