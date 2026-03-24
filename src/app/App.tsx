import Header from '../widgets/header/ui/Header';
import ProductList from '../widgets/product-list/ui/ProductList';
import CartSidebar from '../widgets/cart-sidebar/ui/CartSidebar';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <ProductList />
      </main>
      <CartSidebar />
    </div>
  );
}

export default App;
