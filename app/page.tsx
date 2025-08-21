import ItemDetailsForm, { ItemData } from "@/pages/detailpage/DetailPage";
import Navbar from "@/pages/detailpage/Navbar";

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
    <div className="flex flex-col items-end p-10">
      <Navbar></Navbar>
      <ItemDetailsForm item={item} />
    </div>
  );
}
