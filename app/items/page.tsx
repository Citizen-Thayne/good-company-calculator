import { ItemTable } from "@/components/ItemTable";
import { getAll } from "@/lib/items/loaders";

export default async function ItemsPage() {
  const itemDataObj = await getAll();

  const items = Object.values(itemDataObj).flat();

  return (
    <main>
      <h1 className="text-3xl">Items</h1>
      <ItemTable items={items} />
    </main>
  );
}
