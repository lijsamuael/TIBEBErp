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
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  MoreHorizontal,
  Printer,
} from "lucide-react";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { setTheme } = useTheme();
  return (
    <nav className="p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
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
          <DropdownMenuContent align="end">
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
          <DropdownMenuContent align="end">
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
          <DropdownMenuTrigger asChild>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size={"sm"}>
                  <div className="flex flex-row gap-3 items-center justify-between">
                    <MoreHorizontal className="ml-auto h-4 w-4" />
                  </div>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Menu</TooltipContent>
            </Tooltip>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
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
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("system")}>
              Add/Edit Price
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
