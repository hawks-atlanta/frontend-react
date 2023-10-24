import { FilePlus, FolderPlus, Home, Share2, Files } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AVAILABLE_DIALOGS, FilesDialogsContext } from "../../context/index";

export function Sidebar() {
  const { openDialog } = useContext(FilesDialogsContext);

  return (
    <>
      <aside className="col-span-2 row-span-5 h-full bg-gray-200 p-4">
        <div className="flex flex-col justify-between space-y-8">
          {/* Action (blue) buttons */}
          <div className="flex flex-col gap-2">
            <button
              className="flex w-full items-center justify-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              aria-label="Upload files"
              onClick={() => {
                openDialog(AVAILABLE_DIALOGS.UPLOAD_FILE, null);
              }}
            >
              <FilePlus className="min-w-6 min-h-6" />
              <span className="hidden md:inline">Upload File</span>
            </button>
            <button
              className="flex w-full items-center justify-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              aria-label="New Folder"
              onClick={() => {
                openDialog(AVAILABLE_DIALOGS.CREATE_FOLDER, null);
              }}
            >
              <FolderPlus className="min-w-6 min-h-6" />
              <span className="hidden md:inline">New Folder</span>
            </button>
          </div>
          {/* Navigation */}
          <div className="flex flex-col gap-2">
            <div className="mb-4 flex cursor-pointer items-center justify-center gap-1.5 text-blue-600 hover:text-blue-700">
              <Home />
              <span className="hidden md:inline" aria-label="Home">
                Home
              </span>
            </div>
            <Link
              to="/files"
              className="mb-4 flex cursor-pointer items-center justify-center gap-1.5 text-blue-600 hover:text-blue-700"
            >
              <Files />
              <span className="hidden md:inline" aria-label="My Files">
                My Files
              </span>
            </Link>
            <div className="mb-4 flex cursor-pointer items-center justify-center gap-1.5 text-blue-600 hover:text-blue-700">
              <Share2 />
              <span className="hidden md:inline" aria-label="Shared">
                Shared
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

/* 
<CreateFolderDialog
  isOpen={modalIsOpen}
  currentParentDirectory={directory}
  closeModalCallback={closeModal}
/>
*/
