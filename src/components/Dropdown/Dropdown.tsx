import { useState } from "react";
import { Trash, Pencil, Share, FolderClosed } from "lucide-react";

export function Dropdown() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        id="dropdownMenuIconButton"
        data-dropdown-toggle="dropdownDots"
        className="inline-flex items-center rounded-lg bg-white p-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none"
        type="button"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <svg
          className="h-5 w-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 4 15"
        >
          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </button>
      {showDropdown && (
        <div
          id="dropdownDots"
          className="w-35 absolute right-0 z-10 mt-2 divide-y divide-gray-100 rounded-lg bg-white shadow"
        >
          <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="dropdownMenuIconButton"
          >
            <li>
              <div className="flex items-center">
                <button className="block flex w-full items-center gap-2 px-4 py-2 hover:bg-gray-100 hover:text-black">
                  <Trash />
                  Delete
                </button>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <button className="block flex w-full items-center gap-2 px-4 py-2 hover:bg-gray-100 hover:text-black">
                  <Pencil />
                  Edit
                </button>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <button className="block flex w-full items-center gap-2 px-4 py-2 hover:bg-gray-100 hover:text-black">
                  <Share />
                  Share
                </button>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <button className="block flex w-full items-center gap-2 px-4 py-2 hover:bg-gray-100 hover:text-black">
                  <FolderClosed />
                  Move
                </button>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
