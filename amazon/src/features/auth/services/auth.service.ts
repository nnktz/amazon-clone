import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { DisplayUser } from '../models/DisplayUser.interface';
import { NewUser } from '../models/NewUser';
import { LoginUser } from '../models/LoginUser.interface';
import { Jwt } from '../models/Jwt';
import { DecodedJwt } from '../models/DecodedJwt.interface';

const register = async (newUser: NewUser): Promise<DisplayUser | null> => {
  const res = await axios.post(
    `${process.env.REACT_APP_BASE_API}/auth/register`,
    newUser
  );
  return res.data;
};

const login = async (user: LoginUser): Promise<Jwt> => {
  const res = await axios.post(
    `${process.env.REACT_APP_BASE_API}/auth/login`,
    user
  );

  if (res.data) {
    localStorage.setItem('jwt', JSON.stringify(res.data));
    const decodedJwt: DecodedJwt = jwt_decode(res.data.token);
    localStorage.setItem('user', JSON.stringify(decodedJwt.user));
  }

  return res.data;
};

const logout = (): void => {
  localStorage.removeItem('user');
  localStorage.removeItem('jwt');
};

const verifyJwt = async (jwt: string): Promise<boolean> => {
  const res = await axios.post(
    `${process.env.REACT_APP_BASE_API}/auth/verify-jwt`,
    { jwt }
  );

  if (res.data) {
    const jwtExpirationMs = res.data.exp * 1000;
    return jwtExpirationMs > Date.now();
  }

  return false;
};

const authService = {
  register,
  login,
  logout,
  verifyJwt,
};

export default authService;
