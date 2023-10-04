import HeaderComponent from '../features/products/components/Header.component';
import PaymentGateway from '../features/products/components/Payment.component';
import ProductComponent from '../features/products/components/Product.component';
import { useAppSelector } from '../hooks/redux/hooks';

const CartPage = () => {
  const { products, cart } = useAppSelector((state) => state.product);

  const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <div>
      <HeaderComponent />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 48,
          justifyContent: 'center',
          marginTop: 48,
        }}>
        {products.length > 0 &&
          products.map((product) => (
            <ProductComponent
              key={product._id}
              product={product}
            />
          ))}
      </div>

      <div style={{ width: '80%', margin: 'auto' }}>
        <hr style={{ marginTop: 16 }} />
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20 }}>
          <span style={{ marginRight: 16 }}>Subtotal ({totalQty}) items: </span>
          <span style={{ marginBottom: 48, fontWeight: 500 }}>
            ${totalPrice.toFixed(2)}
          </span>
        </div>

        {totalQty > 0 && <PaymentGateway />}
      </div>
    </div>
  );
};

export default CartPage;
