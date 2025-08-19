"use client";

import * as React from "react";
import { Input } from "@/components/atoms/Input";
import { Checkbox } from "@/components/atoms/Checkbox";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/atoms/Collapsible";
import { Label } from "@/components/atoms/Label";
import { Card, CardContent } from "@/components/molecules/Card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/atoms/Tabs";
import { ChevronDown } from "lucide-react";
import type { CheckedState } from "@radix-ui/react-checkbox";

export interface ItemData {
  name: string;
  group: string;
  Unit_of_Measure: string;
  valuationRate: string;
  overDelivery: string;
  overBilling: string;
  disabled: boolean;
  allowAlt: boolean;
  maintainStock: boolean;
  isFixedAsset: boolean;
  description?: string;
}

interface ItemDetailsFormProps {
  item: ItemData;
}

export default function ItemDetailsForm({ item }: ItemDetailsFormProps) {
  // form state from props
  const [itemName, setItemName] = React.useState(item.name ?? "");
  const [itemGroup, setItemGroup] = React.useState(item.group ?? "");
  const [uom, setUom] = React.useState(item.Unit_of_Measure ?? "");
  const [valuationRate, setValuationRate] = React.useState(
    item.valuationRate ?? ""
  );
  const [overDelivery, setOverDelivery] = React.useState(
    item.overDelivery ?? ""
  );
  const [overBilling, setOverBilling] = React.useState(item.overBilling ?? "");
  const [description, setDescription] = React.useState(item.description ?? "");

  // checkboxes
  const [disabled, setDisabled] = React.useState(item.disabled ?? false);
  const [allowAlt, setAllowAlt] = React.useState(item.allowAlt ?? false);
  const [maintainStock, setMaintainStock] = React.useState(
    item.maintainStock ?? false
  );
  const [isFixedAsset, setIsFixedAsset] = React.useState(
    item.isFixedAsset ?? false
  );

  // collapsibles
  const [descOpen, setDescOpen] = React.useState(false);
  const [uomOpen, setUomOpen] = React.useState(false);

  React.useEffect(() => {
    // sync with parent updates
    setItemName(item.name ?? "");
    setItemGroup(item.group ?? "");
    setUom(item.Unit_of_Measure ?? "");
    setValuationRate(item.valuationRate ?? "");
    setOverDelivery(item.overDelivery ?? "");
    setOverBilling(item.overBilling ?? "");
    setDescription(item.description ?? "");
    setDisabled(item.disabled ?? false);
    setAllowAlt(item.allowAlt ?? false);
    setMaintainStock(item.maintainStock ?? false);
    setIsFixedAsset(item.isFixedAsset ?? false);
  }, [item]);

  // helper for Radix checkbox → boolean
  const handleChecked =
    (setter: React.Dispatch<React.SetStateAction<boolean>>) =>
    (checked: CheckedState) => {
      setter(checked === true); // force boolean
    };

  return (
    <Card className="w-full shadow-lg rounded-2xl border">
      <CardContent className="p-4 sm:pl-4 sm:pr-4 sm:pt-0">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className=" flex flex-wrap gap-2 mb-4 w-full overflow-y-auto text-base">
            <TabsTrigger value="details" className="text-base">
              Details
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="text-base">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="inventory" className="text-base">
              Inventory
            </TabsTrigger>
            <TabsTrigger value="variants" className="text-base">
              Variants
            </TabsTrigger>
            <TabsTrigger value="accounting" className="text-base">
              Accounting
            </TabsTrigger>
            <TabsTrigger value="purchasing" className="text-base">
              Purchasing
            </TabsTrigger>
            <TabsTrigger value="sales" className="text-base">
              Sales
            </TabsTrigger>
            <TabsTrigger value="tax" className="text-base">
              Tax
            </TabsTrigger>
            <TabsTrigger value="quality" className="text-base">
              Quality
            </TabsTrigger>
            <TabsTrigger value="manufacturing" className="text-base">
              Manufacturing
            </TabsTrigger>
          </TabsList>

          {/* Details Tab */}
          <TabsContent
            value="details"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-base"
          >
            {/* Left side */}
            <div className="space-y-5 text-base">
              <div className="text-base">
                <Label className="text-base font-medium text-gray-800">
                  Item Name
                </Label>
                <Input
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="Enter item name"
                  className="mt-1 text-base font-bold"
                />
              </div>
              <div>
                <Label className="text-base font-medium text-gray-800">
                  Item Group *
                </Label>
                <Input
                  value={itemGroup}
                  onChange={(e) => setItemGroup(e.target.value)}
                  placeholder="Enter group"
                  className="mt-1 text-base font-bold"
                />
              </div>
              <div>
                <Label className="text-base font-medium text-gray-800">
                  Default Unit of Measure *
                </Label>
                <Input
                  value={uom}
                  onChange={(e) => setUom(e.target.value)}
                  placeholder="Unit of Measure"
                  className="mt-1 text-base font-bold"
                />
              </div>
            </div>

            {/* Right side */}
            <div className="space-y-5">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="disabled"
                  checked={disabled}
                  onCheckedChange={handleChecked(setDisabled)}
                />
                <Label htmlFor="disabled" className="text-base text-gray-600">
                  Disabled
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allowAlt"
                  checked={allowAlt}
                  onCheckedChange={handleChecked(setAllowAlt)}
                />
                <Label htmlFor="allowAlt" className="text-base text-gray-600">
                  Allow Alternative Item
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="maintainStock"
                  checked={maintainStock}
                  onCheckedChange={handleChecked(setMaintainStock)}
                />
                <Label
                  htmlFor="maintainStock"
                  className="text-base text-gray-600"
                >
                  Maintain Stock
                </Label>
              </div>
              <div>
                <Label className="text-base font-medium text-gray-800">
                  Valuation Rate
                </Label>
                <Input
                  value={valuationRate}
                  onChange={(e) => setValuationRate(e.target.value)}
                  placeholder="Enter valuation rate"
                  className="mt-1 text-base font-bold"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isFixedAsset"
                  checked={isFixedAsset}
                  onCheckedChange={handleChecked(setIsFixedAsset)}
                />
                <Label
                  htmlFor="isFixedAsset"
                  className="text-base text-gray-00"
                >
                  Is Fixed Asset
                </Label>
              </div>
              <div>
                <Label className="text-base font-medium text-gray-800">
                  Over Delivery/Receipt Allowance (%)
                </Label>
                <Input
                  value={overDelivery}
                  onChange={(e) => setOverDelivery(e.target.value)}
                  placeholder="e.g. 5"
                  className="mt-1 text-base font-bold"
                />
              </div>
              <div>
                <Label className="text-base font-medium text-gray-800">
                  Over Billing Allowance (%)
                </Label>
                <Input
                  value={overBilling}
                  onChange={(e) => setOverBilling(e.target.value)}
                  placeholder="e.g. 10"
                  className="mt-1 text-base font-bold"
                />
              </div>
            </div>

            {/* Collapsibles */}
            <div className="md:col-span-2 mt-6 md:mt-8 space-y-4">
              <Collapsible open={descOpen} onOpenChange={setDescOpen}>
                <CollapsibleTrigger className="text-base flex items-center justify-between w-full font-semibold py-2 border-b text-gray-900">
                  <span>Description</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      descOpen ? "rotate-180" : ""
                    }`}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <textarea
                    className="w-full border rounded-lg p-3 mt-2 text-base text-gray-900"
                    placeholder="Write description here..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </CollapsibleContent>
              </Collapsible>

              <Collapsible open={uomOpen} onOpenChange={setUomOpen}>
                <CollapsibleTrigger className="text-base flex items-center justify-between w-full font-semibold py-2 border-b text-gray-900">
                  <span>Units of Measure</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      uomOpen ? "rotate-180" : ""
                    }`}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <p className="text-base text-gray-700 mt-2">
                    Add alternative Unit of Measures ...
                  </p>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
