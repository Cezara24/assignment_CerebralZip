import Card from "../../Card";

function CustomersByDevice({ className = "" }) {
  return (
    <Card className="w-full h-full bg-white row-span-2 p-8 flex flex-col gap-1 justify-between">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Customers by device</h2>
        <div>Chart</div>
      </div>
    </Card>
  );
}

export default CustomersByDevice;
