import { FC, FormEvent, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useNavigate } from 'react-router-dom';

import useInput from '../../../hooks/input/use-input';
import {
  validateNameLength,
  validatePasswordLength,
} from '../../../shared/utils/validation/length';
import { validateEmail } from '../../../shared/utils/validation/email';
import { NewUser } from '../models/NewUser';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux/hooks';
import { register, reset } from '../authSlice';

const RegistrationFormComponent: FC = () => {
  const {
    text: name,
    shouldDisplayError: nameHasError,
    textChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    clearHandler: nameClearHandler,
  } = useInput(validateNameLength);

  const {
    text: email,
    shouldDisplayError: emailHasError,
    textChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    clearHandler: emailClearHandler,
  } = useInput(validateEmail);

  const {
    text: password,
    shouldDisplayError: passwordHasError,
    textChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    clearHandler: passwordClearHandler,
  } = useInput(validatePasswordLength);

  const {
    text: confirmPassword,
    shouldDisplayError: confirmPasswordHasError,
    textChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    clearHandler: confirmPasswordClearHandler,
  } = useInput(validatePasswordLength);

  const clearForm = () => {
    nameClearHandler();
    emailClearHandler();
    passwordClearHandler();
    confirmPasswordClearHandler();
  };

  const dispatch = useAppDispatch();

  const { isLoading, isSuccess } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      clearForm();
      navigate('/signin');
    }
  }, [dispatch, isSuccess]);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return;
    }

    if (
      nameHasError &&
      emailHasError &&
      passwordHasError &&
      confirmPasswordHasError
    ) {
      return;
    }

    if (
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    ) {
      return;
    }

    const newUser: NewUser = { name, email, password };

    dispatch(register(newUser));
  };

  if (isLoading) {
    return (
      <CircularProgress
        sx={{ marginTop: 64 }}
        color='primary'
      />
    );
  }

  return (
    <Box
      sx={{
        border: 1,
        padding: 2,
        borderColor: '#cccccc',
        width: 350,
        marginTop: 2,
      }}>
      <form
        action=''
        onSubmit={onSubmitHandler}>
        <Grid
          container
          direction='column'
          justifyContent='flex-start'>
          <Typography
            variant='h4'
            component='h1'>
            Create an account
          </Typography>

          <InputLabel
            sx={{
              fontWeight: 500,
              marginTop: 1,
              color: '#000000',
            }}
            htmlFor='name'>
            Your name
          </InputLabel>

          <TextField
            type='text'
            name='name'
            id='name'
            size='small'
            variant='outlined'
            value={name}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            error={nameHasError}
            helperText={nameHasError ? 'Enter your name' : ''}
          />

          <InputLabel
            sx={{
              fontWeight: 500,
              marginTop: 1,
              color: '#000000',
            }}
            htmlFor='email'>
            Email
          </InputLabel>

          <TextField
            type='email'
            name='email'
            id='email'
            size='small'
            variant='outlined'
            value={email}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            error={emailHasError}
            helperText={emailHasError ? 'Enter your email' : ''}
          />

          <InputLabel
            sx={{
              fontWeight: 500,
              marginTop: 1,
              color: '#000000',
            }}
            htmlFor='password'>
            Password
          </InputLabel>

          <TextField
            type='password'
            name='password'
            id='password'
            size='small'
            variant='outlined'
            placeholder='Minimum 6 characters required'
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            error={passwordHasError}
            helperText={passwordHasError ? 'Minimum 6 characters required' : ''}
          />

          <InputLabel
            sx={{
              fontWeight: 500,
              marginTop: 1,
              color: '#000000',
            }}
            htmlFor='confirmPassword'>
            Re-enter password
          </InputLabel>

          <TextField
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            size='small'
            variant='outlined'
            value={confirmPassword}
            onChange={confirmPasswordChangeHandler}
            onBlur={confirmPasswordBlurHandler}
            error={confirmPassword.length > 0 && password !== confirmPassword}
            helperText={confirmPasswordHasError ? 'Passwords must match' : ''}
          />

          <Button
            type='submit'
            variant='contained'
            style={{
              marginTop: 16,
              height: 31,
              backgroundColor: '#f0c14b',
              color: 'black',
              borderColor: '#a88734 #9c7e31 #846a29',
              textTransform: 'none',
            }}>
            Register
          </Button>
        </Grid>
      </form>

      <div style={{ marginTop: 30 }}>
        <small>
          <span>By creating an account, you agree to Amazon's</span>
        </small>
      </div>

      <div>
        <small>
          <a
            href='/register'
            style={{ textDecoration: 'none' }}>
            Conditions of use
          </a>{' '}
          and{' '}
          <a
            href='/register'
            style={{ textDecoration: 'none' }}>
            Privacy policy
          </a>
        </small>
      </div>

      <Divider sx={{ marginTop: '36px', marginBottom: '36px' }} />

      <div>
        <small>
          Already have an account?{' '}
          <Link
            to='/signin'
            style={{ textDecoration: 'none', color: '#000ee' }}>
            Sign-in
          </Link>
        </small>
      </div>

      <div>
        <small>
          Buying for work?{' '}
          <a
            href='/register'
            style={{ textDecoration: 'none' }}>
            Create a free business account
          </a>
        </small>
      </div>
    </Box>
  );
};

export default RegistrationFormComponent;
