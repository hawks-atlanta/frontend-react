import { Dropdown } from "../DropdownMenu/Dropdown";
import { FileText, Folder } from "lucide-react";

interface Props {
  fileName: string;
  fileExtension: string;
  fileType: string;
  uuid: number;
}

export function File({ fileName, fileExtension, fileType, uuid }: Props) {
  const isFile = fileType === "archive";

  const handleClick = () => {
    console.log("File clicked!");
  };

  const handleDropdownClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      className="relative flex h-36 w-36 cursor-pointer flex-col items-center space-y-2 rounded-lg border-2 bg-white p-5"
      onClick={handleClick}
    >
      {isFile ? (
        <FileText className="h-20 w-20" />
      ) : (
        <Folder className="h-20 w-20" />
      )}
      <div className="absolute right-0 top-0" onClick={handleDropdownClick}>
        <Dropdown uuid={uuid}></Dropdown>
      </div>
      <p className="w-ful line-clamp-1">
        {fileName}
        {isFile && `.${fileExtension}`}
      </p>
    </div>
  );
}
