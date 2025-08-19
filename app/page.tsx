import ItemDetailsForm, { ItemData } from "@/pages/DetailPage";

export default function Home() {
  // Example item data
  const item: ItemData = {
    name: "Sample Item",
    group: "Default Group",
    Unit_of_Measure: "pcs",
    valuationRate: "100",
    overDelivery: "5",
    overBilling: "10",
    disabled: true,
    allowAlt: false,
    maintainStock: true,
    isFixedAsset: false,
    description: "This is a sample item description",
  };

  return (
    <div className="flex flex-col justify-center items-center p-10">
      <ItemDetailsForm item={item} />
    </div>
  );
}
