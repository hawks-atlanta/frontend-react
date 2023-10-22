import { useState, useEffect, useContext, Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, UserCircle2 } from "lucide-react";
import { NavButton } from "./NavButton";
import { UpdatePassword } from "../UpdatePassword/UpdatePasswordButton";
import { AuthContext } from "../../context/AuthContext";

export function NavbarScreen() {
  const { session } = useContext(AuthContext);

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();

  const closeMenus = () => {
    setShowMobileMenu(false);
    setShowProfileMenu(false);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  useEffect(() => {
    closeMenus();
  }, [location.pathname]);

  return (
    <nav className="relative h-20 bg-blue-600 px-4 py-2">
      <div className="mx-auto flex h-full max-w-screen-2xl items-center text-white">
        <Link to="/" onClick={closeMenus}>
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
                <Fragment>
                  <UpdatePassword></UpdatePassword>
                  <NavButton text="Logout" to="/" />
                </Fragment>
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
              <button
                className="flex items-center gap-x-2 font-semibold"
                onClick={toggleProfileMenu}
              >
                {session.username}
                {/* show user avatar and username if logged in */}
                <UserCircle2 className="h-10 w-10" strokeWidth={1.5} />
              </button>
            ) : (
              <Fragment>
                {/* show login and register buttons if not logged in */}
                <NavButton text="Login" to="/login" />
                <NavButton text="Register" to="/register" />
              </Fragment>
            )}
          </div>
          {showProfileMenu && (
            <div
              role="dialog"
              className="absolute top-full z-10 flex w-80 flex-col items-center justify-center gap-4 border bg-white p-4"
            >
              <UpdatePassword />
              <NavButton text="Logout" to="/" />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
