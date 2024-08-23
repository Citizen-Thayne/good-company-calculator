import { DemandSection } from '../components/demandSection'
import { ProductSection } from '../components/productSection'
import { UserProductsContextProvider } from '../lib/userProductsContext'

export default function Home() {
  return (
    <UserProductsContextProvider>
      <main className="flex min-h-screen flex-col  gap-4">
        <ProductSection />
        <DemandSection />
      </main>
    </UserProductsContextProvider>
  )
}
