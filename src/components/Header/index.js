import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOutUserStart } from './../../redux/Users/users.actions';

//styles
import Logo from './../../assets/logo.png';
import { makeStyles } from '@material-ui/core/styles';
import {
	AppBar,
	Toolbar,
	Button,
	IconButton,
	Divider,
	Chip
} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';

const useStyles = makeStyles(theme => ({
	appBar: {
		opacity: '0.8'
	},
	logoContainer: {
		flexGrow: 1
	},
	logoButton: {
		height: '2.5rem'
	},
	divider: {
		backgroundColor: 'white',
		margin: '10px'
	}
}));

const mapState = ({ user }) => ({
	currentUser: user.currentUser
});

const Header = props => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const { admin } = props;
	const { currentUser } = useSelector(mapState);

	const signOut = () => {
		dispatch(signOutUserStart());
	};

	return (
		<AppBar position='fixed' className={classes.appBar}>
			<Toolbar>
				<div className={classes.logoContainer}>
					<IconButton component={RouterLink} to={'/'}>
						<img className={classes.logoButton} src={Logo} alt='PlanTito' />
					</IconButton>
				</div>

				{admin && currentUser && (
					<>
						<Chip
							icon={<FaceIcon />}
							label={`Welcome ${currentUser.displayName}!`}
							color='secondary'
						/>
						<Divider orientation='vertical' className={classes.divider} flexItem />
						<Button color='inherit' onClick={() => signOut()}>
							Sign Out
						</Button>
					</>
				)}

				{!admin && (
					<>
						<Button color='inherit' component={RouterLink} to={'/shop'}>
							Shop
						</Button>
						<Button color='inherit' component={RouterLink} to={'/administrator'}>
							Admin (to be removed)
						</Button>
					</>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Header;
