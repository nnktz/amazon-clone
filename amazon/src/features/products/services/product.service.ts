import axios from 'axios';
import { ProductDocument } from '../models/Product';

const getProducts = async () => {
  const res = await axios.get<ProductDocument[]>(
    `${process.env.REACT_APP_BASE_API}/product`
  );

  return res;
};

const productService = {
  getProducts,
};

export default productService;
