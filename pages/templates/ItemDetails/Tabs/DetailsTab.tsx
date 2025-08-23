"use client";

import { Input } from "@/components/atoms/Input";
import { Checkbox } from "@/components/atoms/Checkbox";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/atoms/Collapsible";
import { Label } from "@/components/atoms/Label";
import { ChevronDown, Plus } from "lucide-react";
import { ItemData } from "../ItemDetailsForm";

interface DetailsTabProps {
  formState: ItemData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange: (field: keyof ItemData, value: any) => void;
  itemGroups: string[];
  uomOptions: string[];
  showGroupDropdown: boolean;
  setShowGroupDropdown: (show: boolean) => void;
  showUomDropdown: boolean;
  setShowUomDropdown: (show: boolean) => void;
  setIsNewGroupDialogOpen: (open: boolean) => void;
  setIsNewUomDialogOpen: (open: boolean) => void;
  descOpen: boolean;
  setDescOpen: (open: boolean) => void;
  uomOpen: boolean;
  setUomOpen: (open: boolean) => void;
}

export default function DetailsTab({
  formState,
  handleChange,
  itemGroups,
  uomOptions,
  showGroupDropdown,
  setShowGroupDropdown,
  showUomDropdown,
  setShowUomDropdown,
  setIsNewGroupDialogOpen,
  setIsNewUomDialogOpen,
  descOpen,
  setDescOpen,
  uomOpen,
  setUomOpen,
}: DetailsTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {/* Left side */}
      <div className="space-y-5">
        <div>
          <Label className="font-medium text-gray-800">Item Name</Label>
          <Input
            value={formState.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Enter item name"
            className="mt-1 font-semibold"
          />
        </div>

        {/* Item Group Select */}
        <div className="relative">
          <Label className="font-medium text-gray-800">Item Group *</Label>
          <div
            className="flex items-center justify-between border rounded-md p-2 mt-1 cursor-pointer bg-white"
            onClick={() => setShowGroupDropdown(!showGroupDropdown)}
          >
            <span
              className={formState.group ? "font-semibold" : "text-gray-400"}
            >
              {formState.group || "Select Item Group"}
            </span>
            <ChevronDown className="h-4 w-4" />
          </div>

          {showGroupDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
              {itemGroups.map((group) => (
                <div
                  key={group}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    handleChange("group", group);
                    setShowGroupDropdown(false);
                  }}
                >
                  {group}
                </div>
              ))}
              <div
                className="p-2 text-blue-600 hover:bg-gray-100 cursor-pointer flex items-center gap-2 border-t"
                onClick={() => {
                  console.log("Create group clicked");
                  setIsNewGroupDialogOpen(true);
                }}
              >
                <Plus className="h-4 w-4" />
                <span>Create a new Item Group</span>
              </div>
            </div>
          )}
        </div>

        {/* Unit of Measure Select */}
        <div className="relative">
          <Label className="font-medium text-gray-800">
            Default Unit of Measure *
          </Label>
          <div
            className="flex items-center justify-between border rounded-md p-2 mt-1 cursor-pointer bg-white"
            onClick={() => setShowUomDropdown(!showUomDropdown)}
          >
            <span
              className={
                formState.Unit_of_Measure ? "font-semibold" : "text-gray-400"
              }
            >
              {formState.Unit_of_Measure || "Select Unit of Measure"}
            </span>
            <ChevronDown className="h-4 w-4" />
          </div>

          {showUomDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
              {uomOptions.map((uom) => (
                <div
                  key={uom}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    handleChange("Unit_of_Measure", uom);
                    setShowUomDropdown(false);
                  }}
                >
                  {uom}
                </div>
              ))}
              <div
                className="p-2 text-blue-600 hover:bg-gray-100 cursor-pointer flex items-center gap-2 border-t"
                onClick={() => setIsNewUomDialogOpen(true)}
              >
                <Plus className="h-4 w-4" />
                <span>Create a new UOM</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right side */}
      <div className="space-y-5">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="disabled"
            checked={formState.disabled}
            onCheckedChange={(checked) =>
              handleChange("disabled", checked === true)
            }
          />
          <Label htmlFor="disabled" className="text-gray-600">
            Disabled
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="allowAlt"
            checked={formState.allowAlt}
            onCheckedChange={(checked) =>
              handleChange("allowAlt", checked === true)
            }
          />
          <Label htmlFor="allowAlt" className="text-gray-600">
            Allow Alternative Item
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="maintainStock"
            checked={formState.maintainStock}
            onCheckedChange={(checked) =>
              handleChange("maintainStock", checked === true)
            }
          />
          <Label htmlFor="maintainStock" className="text-gray-600">
            Maintain Stock
          </Label>
        </div>
        <div>
          <Label className="font-medium text-gray-800">Valuation Rate</Label>
          <Input
            value={formState.valuationRate}
            onChange={(e) => handleChange("valuationRate", e.target.value)}
            placeholder="Enter valuation rate"
            className="mt-1 font-semibold"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isFixedAsset"
            checked={formState.isFixedAsset}
            onCheckedChange={(checked) =>
              handleChange("isFixedAsset", checked === true)
            }
          />
          <Label htmlFor="isFixedAsset" className="text-gray-600">
            Is Fixed Asset
          </Label>
        </div>
        <div>
          <Label className="font-medium text-gray-800">
            Over Delivery/Receipt Allowance (%)
          </Label>
          <Input
            value={formState.overDelivery}
            onChange={(e) => handleChange("overDelivery", e.target.value)}
            placeholder="e.g. 5"
            className="mt-1 font-semibold"
          />
        </div>
        <div>
          <Label className="font-medium text-gray-800">
            Over Billing Allowance (%)
          </Label>
          <Input
            value={formState.overBilling}
            onChange={(e) => handleChange("overBilling", e.target.value)}
            placeholder="e.g. 10"
            className="mt-1 font-semibold"
          />
        </div>
      </div>

      {/* Collapsibles */}
      <div className="md:col-span-2 mt-6 md:mt-8 space-y-4">
        <Collapsible open={descOpen} onOpenChange={setDescOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full font-semibold py-2 border-b text-gray-900">
            <span>Description</span>
            <ChevronDown
              className={`h-5 w-5 transition-transform ${
                descOpen ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <textarea
              className="w-full border rounded-lg p-3 mt-2 text-gray-900 font-sans"
              placeholder="Write description here..."
              value={formState.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </CollapsibleContent>
        </Collapsible>
        <Collapsible open={uomOpen} onOpenChange={setUomOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full font-semibold py-2 border-b text-gray-900">
            <span>Units of Measure</span>
            <ChevronDown
              className={`h-5 w-5 transition-transform ${
                uomOpen ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <p className="text-gray-700 mt-2 font-sans">
              Add alternative Unit of Measures ...
            </p>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
