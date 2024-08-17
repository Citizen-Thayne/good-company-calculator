
import { RecipeTable } from "../components/recipeTable";
import { ProductSection } from "../components/productSection";
import { ItemList } from "../components/itemList";
import { UserProductsContext, UserProductsContextProvider } from "../lib/userProductsContext";

export default function Home() {

  return (
    <UserProductsContextProvider>

      <main className="flex min-h-screen flex-col p-24">
        <h1 className="text-4xl">Good Company Calculator</h1>
        <ProductSection />
        <ItemList />
      </main>
    </UserProductsContextProvider>
  );
}
