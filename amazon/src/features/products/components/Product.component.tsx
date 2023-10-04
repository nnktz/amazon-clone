import { FC } from 'react';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

import { ProductDocument } from '../models/Product';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux/hooks';
import { decrementProduct, incrementProduct } from '../productSlice';

interface IProps {
  product: ProductDocument;
}

const ProductComponent: FC<IProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const { cart } = useAppSelector((state) => state.product);

  let qty = 0;

  const cartItem = cart.find((item) => item._id === product._id);

  if (cartItem) {
    qty = cartItem.quantity;
  }

  return (
    <Card sx={{ width: 300, minWidth: 300 }}>
      <CardMedia
        component='img'
        height='140'
        image='https://via.placeholder.com/300.png/09f/fff'
        alt='image'
      />

      <CardContent>
        <Typography
          gutterBottom
          variant='h5'
          component='div'>
          ${product.price.toFixed(2)}
        </Typography>
        {product.description && (
          <Typography
            variant='body2'
            color='text.secondary'>
            {product.description}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          disabled={qty === 0}
          size='large'
          onClick={() => {
            dispatch(decrementProduct(product));
          }}>
          -
        </Button>

        <span>{qty}</span>

        <Button
          size='large'
          onClick={() => {
            dispatch(incrementProduct(product));
          }}>
          +
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductComponent;
