import { Dropdown } from "../DropdownMenu/Dropdown";
import { FileText, Folder } from "lucide-react";

interface Props {
  fileName: string;
  fileExtension: string;
  fileType: string;
  uuid: number;
}

export function File({ fileName, fileExtension, fileType, uuid }: Props) {
  const handleClick = () => {
    console.log("File clicked!");
  };

  const handleDropdownClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      className="relative box-border flex h-32 w-32 cursor-pointer flex-col rounded-lg border-2 bg-white p-5"
      onClick={handleClick}
    >
      {fileType == "archive" ? (
        <FileText className="h-20 w-20" />
      ) : (
        <Folder className="h-20 w-20" />
      )}
      <div className="absolute right-0 top-0" onClick={handleDropdownClick}>
        <Dropdown uuid={uuid}></Dropdown>
      </div>
      <p className="bottom-0 left-1 w-full truncate">
        {fileName}.{fileExtension}
      </p>
    </div>
  );
}
