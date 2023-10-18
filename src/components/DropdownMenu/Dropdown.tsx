import { useState } from "react";
import { Trash, Pencil, Share, FolderClosed, MoreVertical } from "lucide-react";
import { EditNameDialog } from "../../screens/dialogs/rename-file-dialog";

interface Props {
  uuid: string;
}

export function Dropdown({ uuid }: Props) {
  const [showDropdown, setShowDropdown] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const openEditDialog = () => {
    setShowDropdown(false);
    setShowEditModal(true);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        id={`dropdown_${uuid}`}
        data-dropdown-toggle="dropdownDots"
        className="inline-flex items-center rounded-lg p-2 text-center text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 focus:outline-none"
        type="button"
        aria-label="Dropdown to delete, edit, share, or move file"
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
            aria-labelledby="Dropdown to delete, edit, share, or move file"
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
      <EditNameDialog
        isOpen={showEditModal}
        itemName=""
        onSave={(newName) => {
          console.log(`Nuevo nombre: ${newName}`);
          setShowEditModal(false);
        }}
        onCancel={() => setShowEditModal(false)}
        fileUUID={uuid}
      />
    </div>
  );
}
