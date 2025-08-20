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
import { ChevronDown, Plus } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/molecules/Dialog";

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

// Sample data for dropdown options
const initialItemGroups = [
  "Raw Material",
  "Finished Goods",
  "Subassemblies",
  "Consumables",
  "Services",
];
const initialUOMOptions = [
  "Calibre",
  "Meter",
  "Nos",
  "Pair",
  "Quntal",
  "Set",
  "Unit",
];

export default function ItemDetailsForm({ item }: ItemDetailsFormProps) {
  // Form state from props
  const [formState, setFormState] = React.useState<ItemData>({
    name: item.name ?? "",
    group: item.group ?? "",
    Unit_of_Measure: item.Unit_of_Measure ?? "",
    valuationRate: item.valuationRate ?? "",
    overDelivery: item.overDelivery ?? "",
    overBilling: item.overBilling ?? "",
    disabled: item.disabled ?? false,
    allowAlt: item.allowAlt ?? false,
    maintainStock: item.maintainStock ?? false,
    isFixedAsset: item.isFixedAsset ?? false,
    description: item.description ?? "",
  });

  // State for dropdown options
  const [itemGroups, setItemGroups] = React.useState(initialItemGroups);
  const [uomOptions, setUomOptions] = React.useState(initialUOMOptions);

  // State for dropdown visibility
  const [showGroupDropdown, setShowGroupDropdown] = React.useState(false);
  const [showUomDropdown, setShowUomDropdown] = React.useState(false);

  // State for dialogs
  const [isNewGroupDialogOpen, setIsNewGroupDialogOpen] = React.useState(false);
  const [isNewUomDialogOpen, setIsNewUomDialogOpen] = React.useState(false);

  // State for new values
  const [newGroupValue, setNewGroupValue] = React.useState("");
  const [newUomValue, setNewUomValue] = React.useState("");
  const [newUomFullForm, setNewUomFullForm] = React.useState("");

  const [descOpen, setDescOpen] = React.useState(false);
  const [uomOpen, setUomOpen] = React.useState(false);

  React.useEffect(() => {
    setFormState({
      name: item.name ?? "",
      group: item.group ?? "",
      Unit_of_Measure: item.Unit_of_Measure ?? "",
      valuationRate: item.valuationRate ?? "",
      overDelivery: item.overDelivery ?? "",
      overBilling: item.overBilling ?? "",
      disabled: item.disabled ?? false,
      allowAlt: item.allowAlt ?? false,
      maintainStock: item.maintainStock ?? false,
      isFixedAsset: item.isFixedAsset ?? false,
      description: item.description ?? "",
    });
  }, [item]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (field: keyof ItemData, value: any) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddNewGroup = () => {
    if (newGroupValue.trim() && !itemGroups.includes(newGroupValue)) {
      setItemGroups([...itemGroups, newGroupValue]);
      handleChange("group", newGroupValue);
      setNewGroupValue("");
    }
    setIsNewGroupDialogOpen(false);
  };

  const handleAddNewUom = () => {
    if (newUomValue.trim() && !uomOptions.includes(newUomValue)) {
      setUomOptions([...uomOptions, newUomValue]);
      handleChange("Unit_of_Measure", newUomValue);
      setNewUomValue("");
      setNewUomFullForm("");
    }
    setIsNewUomDialogOpen(false);
  };

  return (
    <>
      <Card className="w-full shadow-lg rounded-2xl border">
        <CardContent className="p-4 sm:pl-4 sm:pr-4 sm:pt-0">
          <Tabs defaultValue="details" className="w-full p-2">
            <TabsList className="flex flex-wrap gap-2 mb-4 w-full overflow-y-auto text-base">
              <TabsTrigger value="details" className="text-base">
                Details
              </TabsTrigger>
              <TabsTrigger value="dashboard"  className="text-base">
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
                    value={formState.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Enter item name"
                    className="mt-1 text-base font-bold"
                  />
                </div>

                {/* Item Group Select */}
                <div className="relative">
                  <Label className="text-base font-medium text-gray-800">
                    Item Group *
                  </Label>
                  <div
                    className="flex items-center justify-between border rounded-md p-2 mt-1 cursor-pointer bg-white"
                    onClick={() => setShowGroupDropdown(!showGroupDropdown)}
                  >
                    <span
                      className={
                        formState.group ? "font-bold" : "text-gray-400"
                      }
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
                        onClick={() => setIsNewGroupDialogOpen(true)}
                      >
                        <Plus className="h-4 w-4" />
                        <span>Create a new Item Group</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Unit of Measure Select */}
                <div className="relative">
                  <Label className="text-base font-medium text-gray-800">
                    Default Unit of Measure *
                  </Label>
                  <div
                    className="flex items-center justify-between border rounded-md p-2 mt-1 cursor-pointer bg-white"
                    onClick={() => setShowUomDropdown(!showUomDropdown)}
                  >
                    <span
                      className={
                        formState.Unit_of_Measure
                          ? "font-bold"
                          : "text-gray-400"
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
                  <Label htmlFor="disabled" className="text-base text-gray-600">
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
                  <Label htmlFor="allowAlt" className="text-base text-gray-600">
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
                    value={formState.valuationRate}
                    onChange={(e) =>
                      handleChange("valuationRate", e.target.value)
                    }
                    placeholder="Enter valuation rate"
                    className="mt-1 text-base font-bold"
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
                  <Label
                    htmlFor="isFixedAsset"
                    className="text-base text-gray-600"
                  >
                    Is Fixed Asset
                  </Label>
                </div>
                <div>
                  <Label className="text-base font-medium text-gray-800">
                    Over Delivery/Receipt Allowance (%)
                  </Label>
                  <Input
                    value={formState.overDelivery}
                    onChange={(e) =>
                      handleChange("overDelivery", e.target.value)
                    }
                    placeholder="e.g. 5"
                    className="mt-1 text-base font-bold"
                  />
                </div>
                <div>
                  <Label className="text-base font-medium text-gray-800">
                    Over Billing Allowance (%)
                  </Label>
                  <Input
                    value={formState.overBilling}
                    onChange={(e) =>
                      handleChange("overBilling", e.target.value)
                    }
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
                      value={formState.description}
                      onChange={(e) =>
                        handleChange("description", e.target.value)
                      }
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

      {/* Dialog for adding new Item Group */}
      <Dialog
        open={isNewGroupDialogOpen}
        onOpenChange={setIsNewGroupDialogOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Item Group</DialogTitle>
            <DialogDescription>
              Add a new item group to the list of options.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="newGroup">Item Group Name *</Label>
              <Input
                id="newGroup"
                value={newGroupValue}
                onChange={(e) => setNewGroupValue(e.target.value)}
                placeholder="Enter new item group"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsNewGroupDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddNewGroup}>Add New Group</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog for adding new UOM */}
      <Dialog open={isNewUomDialogOpen} onOpenChange={setIsNewUomDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Unit of Measure</DialogTitle>
            <DialogDescription>
              Add a new unit of measure to the list of options.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="newUom">UOM Name *</Label>
              <Input
                id="newUom"
                value={newUomValue}
                onChange={(e) => setNewUomValue(e.target.value)}
                placeholder="Enter new UOM"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="uomFullForm">Edit Full Form (Optional)</Label>
              <Input
                id="uomFullForm"
                value={newUomFullForm}
                onChange={(e) => setNewUomFullForm(e.target.value)}
                placeholder="Enter full form of UOM"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsNewUomDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddNewUom}>Add New UOM</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
