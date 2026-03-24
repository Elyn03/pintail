import { products } from '../../../shared/api/fakeApi';
import { ProductCard } from '../../../entities/product';
import type { Product } from '../../../entities/product/types';

export default function ProductList() {
  return (
    <section className="product-list">
      <h2>Nos produits</h2>
      <div className="grid">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
