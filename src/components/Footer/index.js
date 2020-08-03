import React from 'react';

//styles
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	mainBox: {
		backgroundColor: 'black',
		color: 'white',
		padding: '10px 50px 10px 50px'
	}
}));

const Footer = props => {
	const classes = useStyles();

	return (
		<Box className={classes.mainBox}>
			<Typography variant='subtitle1'>
				Copyright © 2020 PlanTito All rights reserved.
			</Typography>
		</Box>
	);
};

export default Footer;
