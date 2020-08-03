import React from 'react';

//styles
import './styles.scss';

//components
import AdminProducts from './../../../components/Products/AdminProducts';

const ManageProducts = props => {
	return (
		<div className='manageProductsMainContainer'>
			<AdminProducts />
		</div>
	);
};

export default ManageProducts;
