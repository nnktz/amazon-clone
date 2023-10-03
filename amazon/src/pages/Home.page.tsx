import { logout } from '../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../hooks/redux/hooks';

const HomePage = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div>
      <h1>HomePage</h1>
      <span
        style={{
          backgroundColor: 'yellow',
          height: 40,
          width: 60,
          padding: 8,
          cursor: 'pointer',
        }}
        onClick={logoutHandler}>
        Logout
      </span>
      {user?.email}
    </div>
  );
};

export default HomePage;
