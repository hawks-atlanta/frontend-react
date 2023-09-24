import { useState } from "react";
import { PanelRightOpen } from "lucide-react";
import { PanelRightClose } from "lucide-react";

export function Sidebar() {
  const [selectedOption, setSelectedOption] = useState("Home");
  const [showSidebar, setShowSidebar] = useState(true);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div>
      {showSidebar ? (
        <div className="fixed h-screen w-60 bg-gray-100 p-4 text-white">
          {/* Botones superiores */}
          <div className="mb-4">
            <button className="w-full rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-700">
              New File
            </button>
          </div>
          <div className="mb-4">
            <button className="w-full rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-700">
              New Folder
            </button>
          </div>
          {/* Contenido del sidebar */}
          <ul className="flex flex-col items-center justify-center">
            <li className="mb-4">
              <a
                href="#"
                className={`text-blue-500 hover:text-blue-700 ${
                  selectedOption === "Home" ? "font-bold" : ""
                }`}
                onClick={() => handleOptionClick("Home")}
              >
                Home
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#"
                className={`text-blue-500 hover:text-blue-700 ${
                  selectedOption === "My files" ? "font-bold" : ""
                }`}
                onClick={() => handleOptionClick("My files")}
              >
                My files
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#"
                className={`text-blue-500 hover:text-blue-700 ${
                  selectedOption === "Shared" ? "font-bold" : ""
                }`}
                onClick={() => handleOptionClick("Shared")}
              >
                Shared
              </a>
            </li>
          </ul>
        </div>
      ) : null}
      <button
        className="fixed bottom-1 left-1 rounded bg-gray-100 px-6 py-3 text-sm font-bold uppercase text-black shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-gray-200"
        type="button"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? <PanelRightOpen /> : <PanelRightClose />}
      </button>
    </div>
  );
}
