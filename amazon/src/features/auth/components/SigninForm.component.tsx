import { FC, FormEvent } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';

import useInput from '../../../hooks/input/use-input';
import { validateEmail } from '../../../shared/utils/validation/email';
import { validatePasswordLength } from '../../../shared/utils/validation/length';

const SignInFormComponent: FC = () => {
  const {
    text: email,
    shouldDisplayError: emailHasError,
    textChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    clearHandler: emailClearHandler,
  } = useInput(validateEmail);

  const clearForm = () => {
    emailClearHandler();
    passwordClearHandler();
  };

  const {
    text: password,
    shouldDisplayError: passwordHasError,
    textChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    clearHandler: passwordClearHandler,
  } = useInput(validatePasswordLength);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailHasError && passwordHasError) {
      return;
    }

    if (email.length === 0 || password.length === 0) {
      return;
    }

    console.log(`User: `, email, password);
    clearForm();
  };

  return (
    <>
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
              Sign In
            </Typography>

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
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              error={passwordHasError}
              helperText={
                passwordHasError ? 'Minimum 6 characters required' : ''
              }
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
              Sign In
            </Button>
          </Grid>
        </form>

        <div style={{ marginTop: 30 }}>
          <small>
            <span>By continuing, you agree to Amazon's</span>
          </small>
        </div>

        <div>
          <small>
            <a
              href='/signin'
              style={{ textDecoration: 'none' }}>
              Conditions of use
            </a>{' '}
            and{' '}
            <a
              href='/signin'
              style={{ textDecoration: 'none' }}>
              Privacy policy
            </a>
          </small>
        </div>
      </Box>

      <div style={{ marginTop: 16 }}>
        <Divider>
          <small style={{ color: '#767676' }}>New to Amazon?</small>
        </Divider>

        <Link
          to='/register'
          style={{ textDecoration: 'none', color: '#000ee' }}>
          <Button
            variant='contained'
            style={{
              width: '100%',
              marginTop: 12,
              height: 31,
              backgroundColor: '#f1f1f1',
              color: 'black',
              textTransform: 'none',
            }}>
            Register
          </Button>
        </Link>
      </div>
    </>
  );
};

export default SignInFormComponent;
