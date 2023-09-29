import { Dropdown } from "../Dropdown/Dropdown";
import { FileText } from "lucide-react";

interface Props {
  fileName: string;
  fileExtension: string;
}

export function File({ fileName, fileExtension }: Props) {
  const handleClick = () => {
    console.log("File clicked!");
  };

  const handleDropdownClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      className="relative left-2 top-2 box-border flex h-32 w-32 cursor-pointer flex-col rounded-lg border-2 bg-white p-5"
      onClick={handleClick}
    >
      <FileText className="h-20 w-20" />
      <div className="absolute right-0 top-0" onClick={handleDropdownClick}>
        <Dropdown></Dropdown>
      </div>
      <p className="absolute bottom-0 left-1 w-full truncate">
        {fileName}.{fileExtension}
      </p>
    </div>
  );
}
