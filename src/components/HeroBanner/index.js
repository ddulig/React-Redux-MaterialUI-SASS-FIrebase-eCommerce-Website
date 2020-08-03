import React from 'react';

//styles
import './styles.scss';
import HeroBannerImg from './../../assets/above-shot-1.png';
import { Box, Typography, Button } from '@material-ui/core';
import MapIcon from '@material-ui/icons/Map';
import ShopIcon from '@material-ui/icons/Shop';

const HeroBanner = props => {
	return (
		<>
			<Box className='heroBannerContainer' height='100%'>
				<Box
					className='heroBanner'
					style={{ backgroundImage: `url(${HeroBannerImg})` }}
					height='100%'
				/>

				<Box className='textContainer'>
					<Typography variant='h1' className='heading' color='secondary'>
						ONE STOP PLANT SHOP
					</Typography>
					<Typography variant='h5' color='secondary' gutterBottom>
						800 varieties, free delivery, direct-from-grower pricing. It's hands down,
						the easiest and cheapest way to buy plants.
					</Typography>
					<Box className='buttonContainer'>
						<Button variant='contained' color='primary' startIcon={<MapIcon />}>
							Come Visit Us
						</Button>
						<Button variant='contained' color='primary' startIcon={<ShopIcon />}>
							Shop Online
						</Button>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default HeroBanner;
