import { FilePlus, FolderPlus, Home, Share2, Files, X } from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { createNewDirectoryService } from "../../services/folder/new-folder.service";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { Link, useSearchParams } from "react-router-dom";

export function Sidebar() {
  const [searchParams, _setSearchParams] = useSearchParams();
  const directory = searchParams.get("directory");
  const { session } = useContext(AuthContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [folderName, setFolderName] = useState("");

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const createFolder = async () => {
    if (folderName.trim() === "") {
      return;
    }

    const token = session?.token || "";

    const createFolderRequest = {
      directoryName: folderName,
      location: directory,
      token
    };

    const response = await createNewDirectoryService(createFolderRequest);

    if (response.success) {
      toast.success("Carpeta creada exitosamente");
    } else {
      toast.error("Error al crear la carpeta: " + response.msg);
    }

    setFolderName("");
    setModalIsOpen(false);
  };

  useEffect(() => {
    createFolder();
  }, [directory]);

  return (
    <aside className="col-span-2 row-span-5 h-full bg-gray-200 p-4">
      <div className="flex flex-col justify-between space-y-8">
        {/* Action (blue) buttons */}
        <div className="flex flex-col gap-2">
          <button
            className="flex w-full items-center justify-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            aria-label="Upload files"
          >
            <FilePlus className="min-w-6 min-h-6" />
            <span className="hidden md:inline">Upload File</span>
          </button>
          <button
            className="flex w-full items-center justify-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            aria-label="New Folder"
            onClick={openModal}
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

      {/* Modal para crear una nueva carpeta */}
      {modalIsOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div className="modal absolute rounded-lg border border-black bg-white p-4 ">
            <button className="absolute right-0 top-0 p-3" onClick={closeModal}>
              <X className="h-6 w-6 text-gray-600" />
            </button>
            <h1 className="mb-4 text-xl">Ingresa el nombre de la carpeta</h1>
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              className="w-full rounded-lg border p-2"
            />
            <button
              className="hover-bg-blue-700 mt-4 rounded-full bg-blue-600 px-4 py-2 text-white"
              onClick={createFolder}
            >
              Create Folder
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
