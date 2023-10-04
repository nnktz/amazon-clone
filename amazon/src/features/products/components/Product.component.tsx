import { FC, useState } from 'react';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

import { ProductDocument } from '../models/Product';
import { useAppDispatch } from '../../../hooks/redux/hooks';
import { decrementProduct, incrementProduct } from '../productSlice';

interface IProps {
  product: ProductDocument;
}

const ProductComponent: FC<IProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const [count, setCount] = useState(0);

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
          {product.price.toLocaleString()} VND
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
          size='large'
          disabled={count === 0}
          onClick={() => {
            setCount((prevCount: number) => {
              if (prevCount === 0) {
                return 0;
              }
              return prevCount - 1;
            });

            dispatch(decrementProduct(product));
          }}>
          -
        </Button>

        <span>{count}</span>

        <Button
          size='large'
          onClick={() => {
            setCount((prevCount: number) => prevCount + 1);
            dispatch(incrementProduct(product));
          }}>
          +
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductComponent;
