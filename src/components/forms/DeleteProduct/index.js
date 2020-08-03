import React, { useState } from 'react';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductStart } from './../../../redux/Products/products.actions';

//styles
import './styles.scss';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from '@material-ui/core';

const mapState = ({ productsData }) => ({
	selectedProduct: productsData.product
});

const DeleteProduct = props => {
	const dispatch = useDispatch();
	const { selectedProduct } = useSelector(mapState);
	const [open, setOpen] = useState(props.open);
	const { name, documentID, storageUri } = selectedProduct;

	const handleClose = success => {
		setOpen(false);
		props.handleDeleteEnd(success);
	};

	const handleDelete = () => {
		dispatch(deleteProductStart({ documentID, storageUri }, props.page));
		handleClose(true);
	};

	return (
		<>
			<Dialog open={open} onClose={handleClose} className='deleteProdDialog'>
				<DialogTitle>Delete Product</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure you want to delete <b>{name}</b>?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => handleClose(false)} color='primary'>
						No
					</Button>
					<Button onClick={handleDelete} color='primary' autoFocus>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default DeleteProduct;
