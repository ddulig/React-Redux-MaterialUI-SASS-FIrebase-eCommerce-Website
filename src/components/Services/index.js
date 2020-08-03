import React from 'react';

//styles
import './styles.scss';
import IndoorPlantImg from './../../assets/indoor-plants.jpg';
import OutdoorPlantImg from './../../assets/outdoor-plants.jpg';
import GardenToolsImg from './../../assets/gardening-tools.jpeg';
import { Paper, Grid, Typography } from '@material-ui/core';

const Services = props => {
	return (
		<Grid container justify='center' className='servicesMainContainer'>
			<Grid item className='servicesContainer' xs={12} sm={4}>
				<Paper elevation={0} className='services'>
					<img src={IndoorPlantImg} alt='' />
					<Typography variant='h4'>Indoor Plants</Typography>
				</Paper>
			</Grid>
			<Grid item className='servicesContainer' xs={12} sm={4}>
				<Paper elevation={0} className='services middle'>
					<img src={OutdoorPlantImg} className='middleImage' alt='' />
					<Typography variant='h4' className='middleText'>
						Outdoor Plants
					</Typography>
				</Paper>
			</Grid>
			<Grid item className='servicesContainer' xs={12} sm={4}>
				<Paper elevation={0} className='services'>
					<img src={GardenToolsImg} alt='' />
					<Typography variant='h4'>Gardening Tools</Typography>
				</Paper>
			</Grid>
		</Grid>
	);
};

export default Services;
