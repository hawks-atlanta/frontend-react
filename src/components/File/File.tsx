import { Dropdown } from "../Dropdown/Dropdown";
import { FileText } from "lucide-react";

export function File() {
  const handleClick = () => {
    console.log("File clicked!");
  };

  const handleDropdownClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      className="relative left-2 top-2 box-border flex h-32 w-32 cursor-pointer flex-col rounded-full border-2 bg-white p-5"
      style={{ borderRadius: "8px" }}
      onClick={handleClick}
    >
      <FileText style={{ width: "4rem", height: "4rem" }} />
      <div className="absolute right-0 top-0" onClick={handleDropdownClick}>
        <Dropdown></Dropdown>
      </div>
      <p className="absolute bottom-0 left-1 w-full truncate">Filename.ext</p>
    </div>
  );
}
