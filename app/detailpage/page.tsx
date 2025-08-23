import ItemDetailLayout from "@/pages/templates/ItemDetails/ItemDetailLayout";

// Mock data or fetch from API
const mockItem = {
  name: "Coffee-G1",
  group: "Raw Material",
  Unit_of_Measure: "Quntal",
  valuationRate: "0.00",
  overDelivery: "0.000",
  overBilling: "0.000",
  disabled: false,
  allowAlt: false,
  maintainStock: true,
  isFixedAsset: false,
  description: "This is a variant of Coffee (Template).",
  allowSales: true,
  grantCommission: true,
  maxDiscount: "15.00"
};

export default function ItemPage() {
  return <ItemDetailLayout initialItem={mockItem} />;
}