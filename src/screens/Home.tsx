import { useState } from "react";
import { File } from "../components/File/File";
import { UpdatePassword } from "../components/UpdatePassword/UpdatePassword";
import {
  FilePlus,
  FolderPlus,
  Home,
  Share2,
  Files,
  UserCircle2
} from "lucide-react";
export function Homepage() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="grid-rows-8 grid h-screen grid-cols-12">
      {/*Header*/}
      <div className="col-span-12 row-span-1 flex items-center justify-between bg-blue-500 text-white">
        <div
          className="ml-10 flex items-center justify-center text-white cursor-pointer"
        >
          <img
            src="/Logos/logo.png"
            alt=""
            className="mr-2 h-12 w-12 rounded-md border border-gray-500"
          />
          <span className="hidden md:inline">CapyFile</span>
        </div>
        <div className="relative">
          <div
            className="mr-10 flex items-center justify-center text-white cursor-pointer"
            onClick={toggleDropdown}
          >
            <span className="mr-4 hidden md:inline">Username</span>
            <UserCircle2 className="h-10 w-10"></UserCircle2>
          </div>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <UpdatePassword />
                <a
                  href="#"
                  className="bg-white-600 block px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-gray-900"
                >
                  Logout
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      {/*Sidebar*/}
      <div className="col-span-2 row-span-5 bg-gray-200 ">
        <div className="flex min-h-full flex-col justify-between">
          <div>
            <div className="mb-2 ml-1 mr-1 mt-4">
              <button className="w-full rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-700">
                <div className="flex items-center justify-center">
                  <FilePlus />
                  <span className="hidden md:inline">New File</span>
                </div>
              </button>
            </div>
            <div className="mb-8 ml-1 mr-1 flex items-center justify-center">
              <button className="w-full rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-700">
                <div className="flex items-center justify-center">
                  <FolderPlus />
                  <span className="hidden md:inline">New Folder</span>
                </div>
              </button>
            </div>
            <div
              className="mb-4 flex items-center justify-center text-blue-500 hover:text-blue-700 cursor-pointer"
            >
              <Home />
              <span className="hidden md:inline">Home</span>
            </div>
            <div
              className="mb-4 flex items-center justify-center text-blue-500 hover:text-blue-700 cursor-pointer"
            >
              <Files />
              <span className="hidden md:inline">My Files</span>
            </div>
            <div
              className="mb-4 flex items-center justify-center text-blue-500 hover:text-blue-700 cursor-pointer"
            >
              <Share2 />
              <span className="hidden md:inline">Shared</span>
            </div>
          </div>
        </div>
      </div>
      {/*Main*/}
      <div className="col-span-10 row-span-5 mx-6 bg-white">
        <div className="flex flex-col">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search files"
              className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2"
            />
          </div>
          <div className="flex flex-wrap">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="flex-grow p-1">
                <File />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
