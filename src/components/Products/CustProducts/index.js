import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

//redux
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchProductsStart,
	fetchProductStart
} from './../../../redux/Products/products.actions';

//components
import Pagination from './../../Pagination';

//styles
import './styles.scss';
import {
	Grid,
	Box,
	Typography,
	Card,
	CardActionArea,
	CardContent,
	CardMedia
} from '@material-ui/core';

const mapState = ({ productsData }) => ({
	products: productsData.products
});

const CustProducts = props => {
	const { products } = useSelector(mapState);
	const dispatch = useDispatch();
	const history = useHistory();
	const [renderProducts, setRenderProducts] = useState([]);

	const handleViewProduct = product => {
		dispatch(fetchProductStart(product.documentID));
		history.push('/products/view');
	};

	useEffect(() => {
		dispatch(fetchProductsStart());
	}, [dispatch]);

	useEffect(
		() => {
			setRenderProducts(
				products.map(product => {
					const { name, price, quantity, imageSrc, documentID } = product;

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
								<CardActionArea
									className='actionArea'
									onClick={() => handleViewProduct(product)}
								>
									{quantity > 10 && (
										<CardMedia component='img' image={imageSrc} className='cardImage' />
									)}

									{quantity > 0 && quantity <= 10 && (
										<div className='outOfStockContainer'>
											<CardMedia
												component='img'
												image={imageSrc}
												className='cardImage outOfStock'
											/>
											<Typography variant='h4'>Limited stocks!</Typography>
										</div>
									)}

									{quantity === 0 && (
										<div className='outOfStockContainer'>
											<CardMedia
												component='img'
												image={imageSrc}
												className='cardImage outOfStock'
											/>
											<Typography variant='h4' color='error'>
												Out of stock
											</Typography>
										</div>
									)}

									<CardContent>
										<Typography variant='subtitle2'>{name}</Typography>
										<Typography variant='subtitle2' color='secondary'>
											${price}
										</Typography>
									</CardContent>
								</CardActionArea>
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
			<Grid container>
				<Pagination itemsPerPage={12}>{renderProducts}</Pagination>
			</Grid>
		</Box>
	);
};

export default CustProducts;
