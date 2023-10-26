import { Dropdown } from "./Dropdown";
import { FileText, Folder } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { File } from "../../types/entities";
import { DownloadFileService } from "../../services/files/download-file.service";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

interface Props {
  file: File;
}

export function FileElement({ file }: Props) {
  const [_searchParams, setSearchParams] = useSearchParams();
  const { session } = useContext(AuthContext);

  interface DownloadFileRequest {
    fileUUID: string;
    token: string;
  }

  const handleClick = () => {
    const isDirectory = !file.isFile;
    if (isDirectory) {
      setSearchParams({ directory: file.uuid });
    } else {
      const req: DownloadFileRequest = {
        token: session!.token,
        fileUUID: file.uuid
      };
      console.log(DownloadFileService(req));
    }
  };

  const handleDropdownClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      className="relative flex h-36 w-36 cursor-pointer flex-col items-center space-y-2  rounded-lg border-2 bg-white p-5 transition-colors hover:bg-gray-50 hover:shadow-sm"
      onClick={handleClick}
    >
      {file.isFile ? (
        <FileText className="h-20 w-20" strokeWidth={1.5} />
      ) : (
        <Folder className="h-20 w-20" strokeWidth={1.5} />
      )}
      <div className="absolute right-0 top-0" onClick={handleDropdownClick}>
        <Dropdown file={file} />
      </div>
      <p className="line-clamp-1 max-w-[85%]">{file.name}</p>
    </div>
  );
}
