import React from 'react';

//styles
import './styles.scss';
import CactusImg from './../../assets/cool-cactus.png';
import { Typography, Grid, makeStyles } from '@material-ui/core';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';

const useStyles = makeStyles(theme => ({
	item1: {
		order: 2,
		[theme.breakpoints.up('sm')]: {
			order: 1
		}
	},
	item2: {
		order: 1,
		[theme.breakpoints.up('sm')]: {
			order: 2
		}
	}
}));

const ContactUs = props => {
	const classes = useStyles();

	return (
		<Grid container className='contactUsContainer' justify='center'>
			<Grid item sm={6} xs={12} className={classes.item1 + ' contactUsDetails'}>
				<Grid container>
					<Grid item xs={2}>
						<RoomOutlinedIcon fontSize='large' color='secondary' />
					</Grid>
					<Grid item xs={10}>
						<Typography variant='h6' className='details'>
							2 Collins Street, Melbourne, Victoria, 3000
						</Typography>
					</Grid>
					<Grid item xs={2}>
						<CallOutlinedIcon fontSize='large' color='secondary' />
					</Grid>
					<Grid item xs={10}>
						<Typography variant='h6' className='details'>
							0400000000
						</Typography>
					</Grid>
					<Grid item xs={2}>
						<EmailOutlinedIcon fontSize='large' color='secondary' />
					</Grid>
					<Grid item xs={10}>
						<Typography variant='h6' className='details'>
							enquiries@pantito.com.au
						</Typography>
					</Grid>
				</Grid>
			</Grid>
			<Grid item sm={6} xs={12} className={classes.item2 + ' secondaryContainer'}>
				<Typography variant='h4' className='subheading' gutterBottom>
					Contact Us
				</Typography>

				<Typography variant='h5' className='subheadingText'>
					Got some burning plant questions? Or just want to have a chat? Come by or
					drop us a line/mail!
				</Typography>
			</Grid>

			<img src={CactusImg} className='background' alt='' />
		</Grid>
	);
};

export default ContactUs;
