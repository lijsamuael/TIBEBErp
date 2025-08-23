"use client";
import { Button } from "@/components/atoms/Button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/atoms/Tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/molecules/DropdownMenu";
import { SidebarTrigger } from "@/components/organisms/SideBar";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  MoreHorizontal,
  Printer,
} from "lucide-react";
import { useTheme } from "next-themes";

// Add props interface
interface NavbarProps {
  itemName: string;
  itemData?: {
    group?: string;
    status?: string;
    valuation?: string;
    Unit_of_Measure?: string;
    disabled?: boolean;
    isVariant?: boolean;
    variantOf?: string;
  };
  onSave?: () => void; // Add this
  onDuplicate?: () => void; // Add this
}

const Navbar = ({ itemName, itemData }: NavbarProps) => {
  const { setTheme } = useTheme();

  return (
    <nav className="p-4 flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="w-10" />

        {/* Display item name and details */}
        <div className="flex flex-1 flex-col md:flex-row md:items-center md:gap-4">
          <h1 className="text-xl font-bold">{itemName}</h1>
          {itemData?.group && (
            <p className="text-sm text-gray-600">{itemData.group}</p>
          )}
          {itemData?.status && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {itemData.status}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* ... rest of your navbar code remains the same ... */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size={"default"}>
              <div className="flex flex-row gap-3 items-center justify-between">
                View
                <div className="flex flex-col">
                  <ChevronUp className="h-2 w-2"></ChevronUp>
                  <ChevronDown className=" h-2 w-2"></ChevronDown>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Stock Balance
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Stock Ledger
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              Stock Project Qty
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size={"default"}>
              <div className="flex flex-row gap-3 items-center justify-between">
                Action
                <div className="flex flex-col">
                  <ChevronUp className="h-2 w-2"></ChevronUp>
                  <ChevronDown className=" h-2 w-2"></ChevronDown>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setTheme("system")}>
              Add/Edit Price
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size={"default"}>
              Duplicate
            </Button>
          </DropdownMenuTrigger>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size={"default"}>
                  <ChevronLeft className="h-4 w-4"></ChevronLeft>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Previuos Document</TooltipContent>
            </Tooltip>
          </DropdownMenuTrigger>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size={"default"}>
                  <ChevronRight className="h-4 w-4"></ChevronRight>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Next Document</TooltipContent>
            </Tooltip>
          </DropdownMenuTrigger>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size={"default"}>
                  <Printer className="h-4 w-4"></Printer>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Printer</TooltipContent>
            </Tooltip>
          </DropdownMenuTrigger>
        </DropdownMenu>

        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>Menu</TooltipContent>
          </Tooltip>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>Print</DropdownMenuItem>
            <DropdownMenuItem>Email</DropdownMenuItem>
            <DropdownMenuItem>Jump to field</DropdownMenuItem>
            <DropdownMenuItem>Links</DropdownMenuItem>
            <DropdownMenuItem>Copy to Clipboard</DropdownMenuItem>
            <DropdownMenuItem>Rename</DropdownMenuItem>
            <DropdownMenuItem>Reload</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
            <DropdownMenuItem>Undo</DropdownMenuItem>
            <DropdownMenuItem>Redo</DropdownMenuItem>
            <DropdownMenuItem>Customize</DropdownMenuItem>
            <DropdownMenuItem>Edit DocType</DropdownMenuItem>
            <DropdownMenuItem>New Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"default"} size={"default"}>
              Save
            </Button>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
