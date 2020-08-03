import React from 'react';

//styles
import { Box } from '@material-ui/core';

//components
import HeroBanner from './../../components/HeroBanner';
import Services from './../../components/Services';
import FeaturedProducts from './../../components/FeaturedProducts';
import FeaturedNews from './../../components/FeaturedNews';
import ContactUs from './../../components/ContactUs';

const Homepage = props => {
	return (
		<>
			<Box width='100%' height='100%'>
				<HeroBanner />
			</Box>
			<Services />
			<FeaturedProducts />
			<FeaturedNews />
			<ContactUs />
		</>
	);
};

export default Homepage;
