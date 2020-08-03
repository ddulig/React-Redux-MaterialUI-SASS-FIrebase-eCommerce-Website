import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { signInStart } from './../../redux/Users/users.actions';

//redux
import { setMessage } from './../../redux/Messages/messages.actions';

//styles
import './styles.scss';
import {
	Avatar,
	Button,
	TextField,
	Link,
	Paper,
	Grid,
	Typography
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import SignInImg from './../../assets/sign-in-image.jpg';

const mapState = ({ user }) => ({
	userError: user.userError
});

const Signin = props => {
	const dispatch = useDispatch();
	const { userError } = useSelector(mapState);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		if (userError) {
			dispatch(setMessage(`SIGN IN ERROR: ${userError}`, 'error', 'user'));
		}
	}, [userError, dispatch]);

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(signInStart({ email, password }));
	};

	return (
		<Grid container component='main' className='loginMainContainer'>
			<Grid
				item
				xs={false}
				sm={5}
				md={7}
				className='image'
				style={{ backgroundImage: `url(${SignInImg})` }}
			/>
			<Grid item xs={12} sm={7} md={5} component={Paper} elevation={6} square>
				<div className='paper'>
					<Avatar className='avatar'>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Sign in
					</Typography>
					<form className='form' onSubmit={handleSubmit}>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							label='Email Address'
							name='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>

						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>

						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className='submit'
						>
							Sign In
						</Button>

						<Grid container>
							<Grid item xs>
								<Link href='#' variant='body2'>
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link href='#' variant='body2'>
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Grid>
		</Grid>
	);
};

export default Signin;
