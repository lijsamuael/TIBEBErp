"use client";

import { useEffect, useState } from "react";
import { Tag, User, Paperclip, Plus } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/organisms/SideBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/Avatar";
import { FileUploader, FileInput } from "@/components/molecules/FileUpload";
import { Button } from "@/components/atoms/Button";
import { Label } from "@/components/atoms/Label";

// Add props interface
interface AppSidebarProps {
  itemData?: {
    name?: string;
    group?: string;
    Unit_of_Measure?: string;
    valuationRate?: string;
    disabled?: boolean;
    maintainStock?: boolean;
    allowSales?: boolean;
    grantCommission?: boolean;
    allowAlt?: boolean;
    isFixedAsset?: boolean;
    overDelivery?: string;
    overBilling?: string;
    // Add any other item properties you might want to display
  };
}

export function AppSidebar({}: AppSidebarProps) {
  const [files, setFiles] = useState<File[] | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [assignedTo] = useState(true);
  const [hasAttachments] = useState(true);
  const [hasTags] = useState(true);

  useEffect(() => {
    if (!files?.[0]) {
      setAvatarUrl(null);
      return;
    }
    const url = URL.createObjectURL(files[0]);
    setAvatarUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [files]);

  return (
    <Sidebar className="gap-10">
      <SidebarContent className="mt-16">
        {/* Profile section */}
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="flex flex-col items-center gap-4 p-4">
              <Avatar className="size-56 rounded-3xl overflow-hidden border">
                <AvatarImage
                  src={avatarUrl ?? undefined}
                  alt="User"
                  className="object-cover rounded-3xl"
                />
                <AvatarFallback className="text-9xl rounded-3xl bg-muted text-muted-foreground">
                  C
                </AvatarFallback>
              </Avatar>

              <FileUploader
                value={files}
                onValueChange={setFiles}
                dropzoneOptions={{
                  accept: {
                    "image/*": [
                      ".jpg",
                      ".jpeg",
                      ".png",
                      ".gif",
                      ".webp",
                      ".avif",
                    ],
                  },
                  maxFiles: 1,
                  maxSize: 4 * 1024 * 1024,
                  multiple: false,
                }}
                className="w-full"
              >
                <FileInput className="flex flex-col items-center justify-center p-3 text-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors">
                  {files?.length ? (
                    <span className="text-xs text-muted-foreground">
                      Change
                    </span>
                  ) : (
                    <>
                      <span className="text-sm font-medium text-blue-600">
                        Upload
                      </span>
                      <span className="text-xs text-muted-foreground">
                        JPG, PNG, GIF, WEBP (max 4MB)
                      </span>
                    </>
                  )}
                </FileInput>
              </FileUploader>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="">
          <SidebarGroupContent className="text-2xl">
            <SidebarMenu>
              {/* Assigned To */}
              <SidebarMenuItem className="flex flex-row justify-between">
                <div className="flex flex-row justify-between pl-2">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <Label htmlFor="assignedTo" className=" cursor-pointer">
                      Assigned To
                    </Label>
                  </div>
                </div>
                {assignedTo && (
                  <div className="pl-6 mt-1">
                    <Button variant="ghost" size="sm" className="h-6">
                      <Plus className="h-5 w-5"></Plus>
                    </Button>
                  </div>
                )}
              </SidebarMenuItem>

              {/* Attachments */}
              <SidebarMenuItem className="flex flex-row justify-between">
                <div className="flex flex-row justify-between pl-2">
                  <div className="flex items-center gap-2">
                    <Paperclip className="h-5 w-5"></Paperclip>
                    <Label htmlFor="attachments" className="cursor-pointer">
                      Attachments
                    </Label>
                  </div>
                </div>
                {hasAttachments && (
                  <div className="pl-6 mt-1">
                    <Button variant="ghost" size="sm" className="h-6">
                      <Plus className="h-5 w-5"></Plus>
                    </Button>
                  </div>
                )}
              </SidebarMenuItem>

              {/* Tags */}
              <SidebarMenuItem className="flex flex-row justify-between">
                <div className="flex items-center justify-between pl-2">
                  <div className="flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    <Label htmlFor="tags" className="cursor-pointer">
                      Tags
                    </Label>
                  </div>
                </div>
                {hasTags && (
                  <div className="pl-6 mt-1">
                    <Button variant="ghost" size="sm" className="h-6">
                      <Plus className="h-5 w-5"></Plus>
                    </Button>
                  </div>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Item Details Section */}
      </SidebarContent>
    </Sidebar>
  );
}
