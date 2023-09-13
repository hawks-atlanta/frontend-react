import { useState, useEffect } from "react";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

export function NavbarScreen() {
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          {isMobile ? (
            <div className="lg:hidden">
              <Menu size={54} onClick={toggleMobileMenu} />
              {showMobileMenu && (
                <div className="absolute right-0 top-14 rounded-lg bg-white p-2 shadow-lg">
                  <div className="mb-2 block w-full">
                    <Button text="Login" to="/login" />
                  </div>
                  <div className="block w-full">
                    <Button text="Register" to="/register" />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Button text="Login" to="/login" />
              <Button text="Register" to="/register" />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
