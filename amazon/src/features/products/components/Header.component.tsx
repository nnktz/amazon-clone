import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import { ShoppingCartOutlined } from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux/hooks';
import { logout, selectedUser } from '../../auth/authSlice';

const HeaderComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector(selectedUser);
  const { cart } = useAppSelector((state) => state.product);

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(() => totalQty);
  }, [cart]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='static'
        sx={{ backgroundColor: '#131921', color: 'white', padding: '4px' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <img
            src='/amazon-logo.png'
            alt='amazon-logo'
            width={113}
            height={50}
            style={{ paddingTop: 10, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          />

          <div style={{ display: 'flex' }}>
            <div>
              <div>Hello, {user?.name}</div>

              <Button
                sx={{ padding: 0, marginRight: 16, color: 'inherit' }}
                onClick={logoutHandler}>
                Sign out
              </Button>
            </div>

            <Button onClick={() => navigate('/cart')}>
              <Badge
                badgeContent={cartCount}
                color='primary'>
                <ShoppingCartOutlined fontSize='large' />
              </Badge>

              <span>Cart</span>
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HeaderComponent;
