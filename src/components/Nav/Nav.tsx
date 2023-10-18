import { useState, useEffect, useContext, Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, UserCircle2 } from "lucide-react";
import { NavButton } from "./NavButton";
import { AuthContext } from "../../context/AuthContext";

export function NavbarScreen() {
  const { session } = useContext(AuthContext);

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
    <nav className="relative h-20 bg-blue-600 px-4 py-2">
      <div className="mx-auto flex h-full max-w-screen-2xl items-center text-white">
        <Link to="/" onClick={closeMobileMenu}>
          <img
            src="/Logos/logo.png"
            alt=""
            aria-label="CapyFile Logo"
            className="mr-2 aspect-square w-12 rounded-md border border-gray-500"
          />
        </Link>
        <p className="ml-2 text-2xl font-bold">CapyFile</p>
        <div className="flex flex-grow justify-end gap-4">
          <button
            aria-label={showMobileMenu ? "Close Menu" : "Open Menu"}
            onClick={toggleMobileMenu}
            className="md:hidden"
          >
            <Menu size={44} />
          </button>

          {showMobileMenu && (
            <div className="absolute left-0 right-0 top-full z-50 flex flex-col items-center justify-center gap-4 border bg-white p-4 md:hidden">
              {session ? (
                <NavButton text="Profile" to="/profile" />
              ) : (
                <Fragment>
                  <NavButton text="Login" to="/login" />
                  <NavButton text="Register" to="/register" />
                </Fragment>
              )}
            </div>
          )}

          <div className="hidden gap-4 md:flex">
            {session ? (
              <Link
                to="/profile"
                className="flex items-center gap-x-2"
                aria-label="Go to profile page"
              >
                {/* show user avatar and username if logged in */}
                <span className="font-semibold">{session.username}</span>
                <UserCircle2 className="h-10 w-10" strokeWidth={1.5} />
              </Link>
            ) : (
              <Fragment>
                {/* show login and register buttons if not logged in */}
                <NavButton text="Login" to="/login" />
                <NavButton text="Register" to="/register" />
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
