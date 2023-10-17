import { Dropdown } from "../DropdownMenu/Dropdown";
import { FileText, Folder } from "lucide-react";
import { useSearchParams } from "react-router-dom";

interface Props {
  fileName: string;
  fileExtension: string;
  fileType: string;
  uuid: string;
}

export function FileElement({
  fileName,
  fileExtension,
  fileType,
  uuid
}: Props) {
  const isFile = fileType === "file";
  let [searchParams, setSearchParams] = useSearchParams();

  const handleClick = () => {
    if(!isFile){
      setSearchParams({directory: uuid})
    }
  };

  const handleDropdownClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      className="relative flex h-36 w-36 cursor-pointer flex-col items-center space-y-2 rounded-lg border-2 bg-white p-5 transition-colors hover:bg-gray-50 hover:shadow-sm"
      onClick={handleClick}
    >
      {isFile ? (
        <FileText className="h-20 w-20" strokeWidth={1.5} />
      ) : (
        <Folder className="h-20 w-20" strokeWidth={1.5} />
      )}
      <div className="absolute right-0 top-0" onClick={handleDropdownClick}>
        <Dropdown uuid={uuid}></Dropdown>
      </div>
      <p className="w-ful line-clamp-1">
        {fileName}
      </p>
    </div>
  );
}
