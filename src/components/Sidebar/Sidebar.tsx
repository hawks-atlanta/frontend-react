import { FilePlus, FolderPlus, Home, Share2, Files } from "lucide-react";

export function Sidebar() {
  return (
    <div className="col-span-2 row-span-5 h-full bg-gray-200">
      <div className="flex flex-col justify-between">
        <div>
          <div className="mb-2 ml-1 mr-1 mt-4">
            <button className="w-full rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-700">
              <div className="flex items-center justify-center">
                <div className="min-w-6 min-h-6">
                  <FilePlus />
                </div>
                <span className="hidden md:inline">New File</span>
              </div>
            </button>
          </div>
          <div className="mb-8 ml-1 mr-1 flex items-center justify-center">
            <button className="w-full rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-700">
              <div className="flex items-center justify-center">
                <div className="min-w-6 min-h-6">
                  <FolderPlus />
                </div>
                <span className="hidden md:inline">New Folder</span>
              </div>
            </button>
          </div>
          <div className="mb-4 flex cursor-pointer items-center justify-center text-blue-500 hover:text-blue-700">
            <Home />
            <span className="hidden md:inline">Home</span>
          </div>
          <div className="mb-4 flex cursor-pointer items-center justify-center text-blue-500 hover:text-blue-700">
            <Files />
            <span className="hidden md:inline">My Files</span>
          </div>
          <div className="mb-4 flex cursor-pointer items-center justify-center text-blue-500 hover:text-blue-700">
            <Share2 />
            <span className="hidden md:inline">Shared</span>
          </div>
        </div>
      </div>
    </div>
  );
}
