"use client";

import { Input } from "@/components/atoms/Input";
import { Checkbox } from "@/components/atoms/Checkbox";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/atoms/Collapsible";
import { Label } from "@/components/atoms/Label";
import { Button } from "@/components/atoms/Button";
import { ChevronDown, Plus } from "lucide-react";
import { ItemData } from "../ItemDetailsForm";

interface SalesTabProps {
  formState: ItemData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange: (field: keyof ItemData, value: any) => void;
  uomOptions: string[];
  showSalesUomDropdown: boolean;
  setShowSalesUomDropdown: (show: boolean) => void;
  setIsNewUomDialogOpen: (open: boolean) => void;
}

export default function SalesTab({
  formState,
  handleChange,
  uomOptions,
  showSalesUomDropdown,
  setShowSalesUomDropdown,
  setIsNewUomDialogOpen
}: SalesTabProps) {
  return (
    <div className="space-y-6">
      {/* Default Sales Unit of Measure */}
      <div className="relative">
        <Label className="font-medium text-gray-800">Default Sales Unit of Measure</Label>
        <div
          className="flex items-center justify-between border rounded-md p-2 mt-1 cursor-pointer bg-white"
          onClick={() => setShowSalesUomDropdown(!showSalesUomDropdown)}
        >
          <span className={formState.defaultSalesUOM ? "font-semibold" : "text-gray-400"}>
            {formState.defaultSalesUOM || "Select Sales UOM"}
          </span>
          <ChevronDown className="h-4 w-4" />
        </div>

        {showSalesUomDropdown && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
            {uomOptions.map((uom) => (
              <div
                key={uom}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  handleChange("defaultSalesUOM", uom);
                  setShowSalesUomDropdown(false);
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

      {/* Checkboxes */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="grantCommission"
            checked={formState.grantCommission}
            onCheckedChange={(checked) => handleChange("grantCommission", checked === true)}
          />
          <Label htmlFor="grantCommission" className="text-gray-600">Grant Commission</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="allowSales"
            checked={formState.allowSales}
            onCheckedChange={(checked) => handleChange("allowSales", checked === true)}
          />
          <Label htmlFor="allowSales" className="text-gray-600">Allow Sales</Label>
        </div>
      </div>

      {/* Max Discount */}
      <div>
        <Label className="font-medium text-gray-800">Max Discount (%)</Label>
        <Input
          value={formState.maxDiscount || ""}
          onChange={(e) => handleChange("maxDiscount", e.target.value)}
          placeholder="Enter max discount percentage"
          className="mt-1"
        />
      </div>

      {/* Customer Details Section */}
      <Collapsible>
        <CollapsibleTrigger className="flex items-center justify-between w-full font-semibold py-2 border-b text-gray-900">
          <span>Customer Details</span>
          <ChevronDown className="h-5 w-5" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-4 p-4 border rounded-lg">
            <p className="text-gray-600 mb-4">Add customer-specific details and pricing...</p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-4 py-2">Customer</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Discount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b">
                    <td className="px-4 py-2">Default Customer</td>
                    <td className="px-4 py-2">$0.00</td>
                    <td className="px-4 py-2">0%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Button className="mt-4" variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Customer Detail
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}