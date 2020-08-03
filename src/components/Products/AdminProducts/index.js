import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

//redux
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchProductsStart,
	fetchProductStart,
	setProduct,
	resetProduct
} from './../../../redux/Products/products.actions';
import { fetchProductTypesStart } from './../../../redux/ProductTypes/productTypes.actions';
import { fetchContainerSizesStart } from './../../../redux/ContainerSizes/containerSizes.actions';
import { fetchGrowingConditionsStart } from './../../../redux/GrowingConditions/growingConditions.actions';
import { fetchPlantSizesStart } from './../../../redux/PlantSizes/plantSizes.actions';
import { setMessage } from './../../../redux/Messages/messages.actions';

//components
import DeleteProduct from './../../forms/DeleteProduct';
import AddEditProduct from './../../forms/AddEditProduct';
import Pagination from './../../Pagination';

//styles
import './styles.scss';
import {
	Grid,
	Box,
	Typography,
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia
} from '@material-ui/core';

const mapState = ({ productsData }) => ({
	products: productsData.products,
	productError: productsData.productError
});

const Products = props => {
	const { products, productError } = useSelector(mapState);
	const dispatch = useDispatch();
	const history = useHistory();
	const [doDelete, setDoDelete] = useState(false);
	const [doAddEdit, setDoAddEdit] = useState(false);
	const [renderProducts, setRenderProducts] = useState([]);

	const handleAddStart = () => {
		dispatch(resetProduct());
		setDoAddEdit(true);
	};

	const handEditStart = product => {
		dispatch(setProduct(product));
		setDoAddEdit(true);
	};

	const handleAddEditEnd = (action, success) => {
		if (action === 'Edit') dispatch(resetProduct());

		if (success) {
			if (action === 'Edit')
				dispatch(setMessage('Product successfully edited!', 'success'));
			else dispatch(setMessage('Product successfully added!', 'success'));
		}

		setDoAddEdit(false);
	};

	const handleDeleteStart = product => {
		dispatch(setProduct(product));
		setDoDelete(true);
	};

	const handleDeleteEnd = success => {
		dispatch(resetProduct());

		if (success) dispatch(setMessage('Product successfully deleted!', 'success'));

		setDoDelete(false);
	};

	const handleViewProduct = product => {
		dispatch(fetchProductStart(product.documentID));
		history.push('/administrator/products/view');
	};

	useEffect(() => {
		if (productError) {
			dispatch(setMessage(productError, 'error', 'product'));
		}
	}, [productError, dispatch]);

	useEffect(() => {
		dispatch(fetchProductsStart());
		dispatch(fetchProductTypesStart());
		dispatch(fetchContainerSizesStart());
		dispatch(fetchGrowingConditionsStart());
		dispatch(fetchPlantSizesStart());
	}, [dispatch]);

	useEffect(
		() => {
			setRenderProducts(
				products.map(product => {
					const { name, imageSrc, documentID } = product;

					return (
						<Grid
							key={documentID}
							item
							xs={12}
							sm={6}
							md={4}
							lg={3}
							className='productContainer'
						>
							<Card className='product'>
								<CardActionArea onClick={() => handleViewProduct(product)}>
									<CardMedia
										component='img'
										height={150}
										image={imageSrc}
										className='cardImage'
									/>
									<CardContent className='cardContent'>
										<Typography variant='subtitle2' component='h2'>
											{name}
										</Typography>
									</CardContent>
								</CardActionArea>
								<CardActions className='cardActions'>
									<Button
										size='small'
										variant='outlined'
										color='primary'
										onClick={() => handEditStart(product)}
										fullWidth
									>
										Edit
									</Button>
									<Button
										size='small'
										color='primary'
										variant='contained'
										onClick={() => handleDeleteStart(product)}
										fullWidth
									>
										Delete
									</Button>
								</CardActions>
							</Card>
						</Grid>
					);
				})
			);
		},
		// eslint-disable-next-line
		[products]
	);

	return (
		<Box className='productsMainContainer'>
			<div className='addProduct'>
				<Button
					color='secondary'
					variant='contained'
					onClick={() => handleAddStart()}
				>
					Add Product
				</Button>
			</div>

			<Grid container>
				<Pagination itemsPerPage={12}>{renderProducts}</Pagination>
			</Grid>

			{doAddEdit && (
				<AddEditProduct
					handleAddEditEnd={handleAddEditEnd}
					open={true}
					page='Manage'
				/>
			)}
			{doDelete && (
				<DeleteProduct
					handleDeleteEnd={handleDeleteEnd}
					open={true}
					page='Manage'
				/>
			)}
		</Box>
	);
};

export default Products;
