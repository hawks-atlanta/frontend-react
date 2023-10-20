import { useContext, useState } from "react";
import { Trash, Pencil, Share, FolderClosed, MoreVertical } from "lucide-react";
import { AVAILABLE_DIALOGS, FilesDialogsContext } from "../../context";
import { File } from "../../types/entities";

interface Props {
  file: File;
}

export function Dropdown({ file }: Props) {
  const { openDialog } = useContext(FilesDialogsContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const openEditDialog = () => {
    openDialog(AVAILABLE_DIALOGS.RENAME_FILE, file);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        id={`dropdown_${file.uuid}`}
        data-dropdown-toggle="dropdownDots"
        className="inline-flex items-center rounded-lg p-2 text-center text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 focus:outline-none"
        type="button"
        aria-label="Toggle options menu for ${fileName}"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <MoreVertical></MoreVertical>
      </button>
      {showDropdown && (
        <div
          id="dropdownDots"
          className="w-35 absolute right-0 z-10 mt-2 divide-y divide-gray-100 rounded-lg bg-white shadow"
        >
          <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="Toggle options menu for ${fileName}"
          >
            <li>
              <div className="flex items-center">
                <button
                  className="flex w-full items-center gap-2 px-4 py-2 hover:bg-gray-100 hover:text-black"
                  aria-label="Delete"
                >
                  <Trash />
                  Delete
                </button>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <button
                  className="flex w-full items-center gap-2 px-4 py-2 hover:bg-gray-100 hover:text-black"
                  aria-label="Edit"
                  onClick={openEditDialog}
                >
                  <Pencil />
                  Edit
                </button>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <button
                  className="flex w-full items-center gap-2 px-4 py-2 hover:bg-gray-100 hover:text-black"
                  aria-label="Share"
                >
                  <Share />
                  Share
                </button>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <button
                  className="flex w-full items-center gap-2 px-4 py-2 hover:bg-gray-100 hover:text-black"
                  aria-label="Move"
                >
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
