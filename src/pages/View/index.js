import React from 'react';

//styles
import './styles.scss';
//import { Typography } from '@material-ui/core';

//components
import CustView from './../../components/Products/CustView';

const View = props => {
	return (
		<div className='custViewPageMainContainer'>
			{/* <Typography variant='h4'>All Products</Typography> */}
			<CustView />
		</div>
	);
};

export default View;
