import React, { useEffect, useState } from 'react';
import { useHistory, Link as RouterLink } from 'react-router-dom';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { resetProduct } from './../../../redux/Products/products.actions';
import { setMessage } from './../../../redux/Messages/messages.actions';

//styles
import './styles.scss';
import {
	Grid,
	Typography,
	IconButton,
	Breadcrumbs,
	Link
} from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';

//components
import DeleteProduct from './../../forms/DeleteProduct';
import AddEditProduct from './../../forms/AddEditProduct';

const mapState = ({ productsData }) => ({
	selectedProduct: productsData.product,
	productError: productsData.productError
});

const AdminView = props => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { selectedProduct, productError } = useSelector(mapState);
	const [doDelete, setDoDelete] = useState(false);
	const [doEdit, setDoEdit] = useState(false);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [featured, setFeatured] = useState(false);
	const [productType, setProductType] = useState('');
	const [containerSize, setContainerSize] = useState('');
	const [growingCondition, setGrowingCondition] = useState('');
	const [plantSize, setPlantSize] = useState('');
	const [quantity, setQuantity] = useState(0);
	const [imageSrc, setImageSrc] = useState('');

	useEffect(() => {
		//only run if edit
		if (selectedProduct) {
			const {
				name,
				description,
				price,
				featured,
				imageSrc,
				productTypeVal,
				containerSizeVal,
				growingConditionVal,
				quantity,
				plantSizeVal
			} = selectedProduct;

			setName(name);
			setDescription(description);
			setPrice(price);
			setFeatured(featured);
			setProductType(productTypeVal);
			setQuantity(quantity);
			setImageSrc(imageSrc);

			//checks for undefined
			if (containerSizeVal) setContainerSize(containerSizeVal);
			if (growingConditionVal) setGrowingCondition(growingConditionVal);
			if (plantSizeVal) setPlantSize(plantSizeVal);
		}
	}, [selectedProduct]);

	const handleDeleteStart = () => {
		setDoDelete(true);
	};

	const handleDeleteEnd = success => {
		setDoDelete(false);

		if (success) {
			dispatch(resetProduct());
			dispatch(setMessage('Product successfully deleted!', 'success'));
			history.push('/administrator/products');
		}
	};

	const handleEditStart = () => {
		setDoEdit(true);
	};

	const handleEditEnd = (action, success) => {
		if (success) dispatch(setMessage('Product successfully edited!', 'success'));

		setDoEdit(false);
	};

	useEffect(() => {
		if (productError) {
			dispatch(setMessage(productError, 'error', 'product'));
		}
	}, [productError, dispatch]);

	return (
		<div className='viewMainContainer'>
			<Grid container>
				<Grid item xs={12} className='backContainer'>
					<Breadcrumbs>
						<Link color='inherit' component={RouterLink} to='/administrator/products'>
							Products
						</Link>
						<Typography color='textPrimary'>{name}</Typography>
					</Breadcrumbs>
				</Grid>
				<Grid item xs={12} className='header'>
					<Typography variant='h4' color='secondary'>
						{name}
					</Typography>
					<div>
						<IconButton onClick={handleEditStart}>
							<EditOutlinedIcon />
						</IconButton>
						<IconButton onClick={handleDeleteStart}>
							<DeleteIcon />
						</IconButton>
					</div>
				</Grid>
				<Grid item xs={12} md={6} className='imageSection'>
					<img src={imageSrc} alt='' className='image' />
				</Grid>
				<Grid item xs={12} md={6} className='formSection'>
					<Grid container>
						<Grid item xs={12}>
							<Typography variant='body2'>
								<span className='fieldName'>Price: </span> ${price}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant='body2'>
								<span className='fieldName'>Quantity: </span> {quantity}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant='body2'>
								<span className='fieldName'>Product Type: </span> {productType}
							</Typography>
						</Grid>

						{containerSize && (
							<Grid item xs={12}>
								<Typography variant='body2'>
									<span className='fieldName'>Container Size: </span>
									{containerSize}
								</Typography>
							</Grid>
						)}

						{growingCondition && (
							<Grid item xs={12}>
								<Typography variant='body2'>
									<span className='fieldName'>Growing Condition: </span>
									{growingCondition}
								</Typography>
							</Grid>
						)}

						{plantSize && (
							<Grid item xs={12}>
								<Typography variant='body2'>
									<span className='fieldName'>Plant Size: </span>
									{plantSize}
								</Typography>
							</Grid>
						)}

						<Grid item xs={12}>
							<Typography variant='body2'>
								<span className='fieldName'>Featured: </span>
								{featured ? 'Yes' : 'No'}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant='body2' className='fieldName'>
								Description:
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant='body2'>{description}</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>

			{doEdit && (
				<AddEditProduct handleAddEditEnd={handleEditEnd} open={true} page='View' />
			)}

			{doDelete && (
				<DeleteProduct handleDeleteEnd={handleDeleteEnd} open={true} page='View' />
			)}
		</div>
	);
};

export default AdminView;
