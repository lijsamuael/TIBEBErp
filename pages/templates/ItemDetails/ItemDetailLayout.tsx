"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import { AppSidebar } from "./Sidebar";
import ItemDetailsForm, { ItemData } from "./ItemDetailsForm";

interface ItemDetailLayoutProps {
  initialItem: ItemData;
}

export default function ItemDetailLayout({
  initialItem,
}: ItemDetailLayoutProps) {
  const [item, setItem] = useState<ItemData>(initialItem);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleItemChange = (field: keyof ItemData, value: any) => {
    setItem((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saving item:", item);
  };

  const handleDuplicate = () => {
    console.log("Duplicating item:", item);
  };

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Sticky Navbar at the top */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        {" "}
        {/* Added sticky, top-0, z-50, and bg-white */}
        <Navbar
          itemName={item.name}
          itemData={{
            group: item.group,
            status: item.disabled ? "Disabled" : "Active",
            valuation: item.valuationRate,
            Unit_of_Measure: item.Unit_of_Measure,
            isVariant: true,
            variantOf: "Coffee (Template)",
          }}
          onSave={handleSave}
          onDuplicate={handleDuplicate}
        />
      </div>

      {/* Content area below sticky navbar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar on the left - scrollable */}
        <div className="border-r bg-white overflow-y-auto">
          {" "}
          {/* Added overflow-y-auto */}
          <AppSidebar
            itemData={{
              name: item.name,
              group: item.group,
              Unit_of_Measure: item.Unit_of_Measure,
              valuationRate: item.valuationRate,
              disabled: item.disabled,
              maintainStock: item.maintainStock,
            }}
          />
        </div>

        {/* Main Content on the right - scrollable */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <ItemDetailsForm item={item} onItemChange={handleItemChange} />
        </main>
      </div>
    </div>
  );
}
