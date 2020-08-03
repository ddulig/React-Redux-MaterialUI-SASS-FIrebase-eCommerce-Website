import React from 'react';

//styles
import './styles.scss';

//components
import AdminView from './../../../components/Products/AdminView';

const ManageProducts = props => {
	return (
		<div className='viewProductMainContainer'>
			<AdminView />
		</div>
	);
};

export default ManageProducts;
