"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/molecules/Card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/atoms/Tabs";
import DetailsTab from "./Tabs/DetailsTab";
import SalesTab from "./Tabs/SalesTab";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";
import { Button } from "@/components/atoms/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/molecules/Dialog";

export interface CustomerDetail {
  id: string;
  name: string;
}

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
  defaultSalesUOM?: string;
  grantCommission?: boolean;
  allowSales?: boolean;
  maxDiscount?: string;
  customerDetails?: CustomerDetail[];
}

interface ItemDetailsFormProps {
  item: ItemData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onItemChange: (field: keyof ItemData, value: any) => void;
}

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

export default function ItemDetailsForm({
  item,
  onItemChange,
}: ItemDetailsFormProps) {
  const [itemGroups, setItemGroups] = React.useState(initialItemGroups);
  const [uomOptions, setUomOptions] = React.useState(initialUOMOptions); // Add setter here
  const [showGroupDropdown, setShowGroupDropdown] = React.useState(false);
  const [showUomDropdown, setShowUomDropdown] = React.useState(false);
  const [showSalesUomDropdown, setShowSalesUomDropdown] = React.useState(false);
  const [isNewGroupDialogOpen, setIsNewGroupDialogOpen] = React.useState(false);
  const [isNewUomDialogOpen, setIsNewUomDialogOpen] = React.useState(false);
  const [newGroupValue, setNewGroupValue] = React.useState("");
  const [newUomValue, setNewUomValue] = React.useState("");
  const [newUomFullForm, setNewUomFullForm] = React.useState("");
  const [descOpen, setDescOpen] = React.useState(false);
  const [uomOpen, setUomOpen] = React.useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (field: keyof ItemData, value: any) => {
    onItemChange(field, value);
  };

  const handleAddNewGroup = () => {
    if (newGroupValue.trim() && !itemGroups.includes(newGroupValue)) {
      const updatedGroups = [...itemGroups, newGroupValue];
      setItemGroups(updatedGroups); // Update the state
      handleChange("group", newGroupValue);
      setNewGroupValue("");
    }
    setIsNewGroupDialogOpen(false);
  };

  const handleAddNewUom = () => {
    if (newUomValue.trim() && !uomOptions.includes(newUomValue)) {
      const updatedUomOptions = [...uomOptions, newUomValue];
      setUomOptions(updatedUomOptions); // Update the UOM options state
      handleChange("Unit_of_Measure", newUomValue);
      setNewUomValue("");
      setNewUomFullForm("");
    }
    setIsNewUomDialogOpen(false);
  };

  return (
    <Card className="w-full shadow-lg rounded-2xl border font-sans">
      <CardContent className="p-4 sm:pl-4 sm:pr-4 sm:pt-0">
        <Tabs defaultValue="details" className="w-full p-2">
          <TabsList className="flex flex-wrap gap-2 mb-4 w-full overflow-y-auto text-sm md:text-base">
            {[
              "details",
              "dashboard",
              "inventory",
              "variants",
              "accounting",
              "purchasing",
              "sales",
              "tax",
              "quality",
              "manufacturing",
            ].map((tab) => (
              <TabsTrigger key={tab} value={tab} className="font-medium">
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="details">
            <DetailsTab
              formState={item}
              handleChange={handleChange}
              itemGroups={itemGroups} // Pass the updated itemGroups
              uomOptions={uomOptions} // Pass the updated uomOptions
              showGroupDropdown={showGroupDropdown}
              setShowGroupDropdown={setShowGroupDropdown}
              showUomDropdown={showUomDropdown}
              setShowUomDropdown={setShowUomDropdown}
              setIsNewGroupDialogOpen={setIsNewGroupDialogOpen}
              setIsNewUomDialogOpen={setIsNewUomDialogOpen}
              descOpen={descOpen}
              setDescOpen={setDescOpen}
              uomOpen={uomOpen}
              setUomOpen={setUomOpen}
            />
          </TabsContent>

          <TabsContent value="sales">
            <SalesTab
              formState={item}
              handleChange={handleChange}
              uomOptions={uomOptions} // Pass the updated uomOptions
              showSalesUomDropdown={showSalesUomDropdown}
              setShowSalesUomDropdown={setShowSalesUomDropdown}
              setIsNewUomDialogOpen={setIsNewUomDialogOpen}
            />
          </TabsContent>

          {/* Other tabs... */}
        </Tabs>

        {/* Dialog for new Item Group */}
        <Dialog
          open={isNewGroupDialogOpen}
          onOpenChange={setIsNewGroupDialogOpen}
        >
          <DialogContent className="sm:max-w-md font-sans">
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

        {/* Dialog for new UOM */}
        <Dialog open={isNewUomDialogOpen} onOpenChange={setIsNewUomDialogOpen}>
          <DialogContent className="sm:max-w-md font-sans">
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
      </CardContent>
    </Card>
  );
}
