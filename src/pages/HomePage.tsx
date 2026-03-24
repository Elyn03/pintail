import { CartSidebar } from "../widgets/cart-sidebar/ui/CartSidebar";
import { Header } from "../widgets/header/ui/Header";
import { ProductList } from "../widgets/product-list/ui/ProductList";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="main-content">
        <ProductList />
      </main>
      <CartSidebar />
    </>
  );
}