import CartSidebar from "../widgets/cart-sidebar/ui/CartSidebar";
import ProductList from "../widgets/product-list/ui/ProductList";

export default function HomePage() {
  return (
    <>
      <main className="main-content">
        <ProductList />
      </main>
      <CartSidebar />
    </>
  );
}
