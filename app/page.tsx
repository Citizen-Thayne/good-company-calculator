import { RecipeTable } from "../components/recipeTable";
import { ProductSection } from "../components/productSection";
import { ItemList } from "../components/itemList";
import {
  UserProductsContext,
  UserProductsContextProvider,
} from "../lib/userProductsContext";
import { DemandSection } from "../components/demandSection";

export default function Home() {
  return (
    <UserProductsContextProvider>
      <main className="flex min-h-screen flex-col  gap-4">
        <ProductSection />
        <DemandSection />
      </main>
    </UserProductsContextProvider>
  );
}
