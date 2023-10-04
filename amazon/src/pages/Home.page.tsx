import { useEffect } from 'react';

import HeaderComponent from '../features/products/components/Header.component';
import ProductComponent from '../features/products/components/Product.component';
import { useAppDispatch, useAppSelector } from '../hooks/redux/hooks';
import { getProducts } from '../features/products/productSlice';

const HomePage = () => {
  const dispatch = useAppDispatch();

  const { products } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

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
    </div>
  );
};

export default HomePage;
