import React from 'react';

//styles
import './styles.scss';
//import { Typography } from '@material-ui/core';

//components
import CustProducts from './../../components/Products/CustProducts';

const Shop = props => {
	return (
		<div className='shopPageMainContainer'>
			{/* <Typography variant='h4'>All Products</Typography> */}
			<CustProducts />
		</div>
	);
};

export default Shop;
