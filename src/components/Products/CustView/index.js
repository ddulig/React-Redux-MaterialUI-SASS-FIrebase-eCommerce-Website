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
	Breadcrumbs,
	Link,
	Divider,
	Button
} from '@material-ui/core';
import WifiTetheringTwoToneIcon from '@material-ui/icons/WifiTetheringTwoTone';
import HeightTwoToneIcon from '@material-ui/icons/HeightTwoTone';
import Brightness5TwoToneIcon from '@material-ui/icons/Brightness5TwoTone';
import Brightness6TwoToneIcon from '@material-ui/icons/Brightness6TwoTone';
import AcUnitTwoToneIcon from '@material-ui/icons/AcUnitTwoTone';
import FormatColorResetTwoToneIcon from '@material-ui/icons/FormatColorResetTwoTone';
import LocalFloristTwoToneIcon from '@material-ui/icons/LocalFloristTwoTone';

const mapState = ({ productsData }) => ({
	selectedProduct: productsData.product,
	productError: productsData.productError
});

const CustView = props => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { selectedProduct, productError } = useSelector(mapState);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [quantity, setQuantity] = useState('');
	const [containerSize, setContainerSize] = useState('');
	const [growingCondition, setGrowingCondition] = useState('');
	const [plantSize, setPlantSize] = useState('');
	const [imageSrc, setImageSrc] = useState('');
	const [growingConditionIcon, setGrowingConditionIcon] = useState();

	useEffect(() => {
		if (selectedProduct) {
			const {
				name,
				description,
				price,
				imageSrc,
				quantity,
				containerSizeVal,
				growingConditionVal,
				plantSizeVal
			} = selectedProduct;

			setName(name);
			setDescription(description);
			setPrice(price);
			setQuantity(quantity);
			setImageSrc(imageSrc);

			//checks for undefined
			setContainerSize(containerSizeVal ? containerSizeVal : '');
			setPlantSize(plantSizeVal ? plantSizeVal : '');
			if (growingConditionVal) {
				setGrowingCondition(growingConditionVal);

				setGrowingConditionIcon(() => {
					switch (growingConditionVal) {
						case 'Full Sun':
							return <Brightness5TwoToneIcon color='secondary' className='icon' />;
						case 'Part Shade':
							return <Brightness6TwoToneIcon color='secondary' className='icon' />;
						case 'Frost Tolerant':
							return <AcUnitTwoToneIcon color='secondary' className='icon' />;
						case 'Drought Tolerant':
							return (
								<FormatColorResetTwoToneIcon color='secondary' className='icon' />
							);
						default:
							return <LocalFloristTwoToneIcon color='secondary' className='icon' />;
					}
				});
			} else {
				setGrowingCondition('');
			}
		}
	}, [selectedProduct]);

	// useEffect(() => {
	// 	if (productError) {
	// 		dispatch(setMessage(productError, 'error', 'product'));
	// 	}
	// }, [productError, dispatch]);

	return (
		<div className='viewMainContainer'>
			<Grid container>
				<Grid item xs={12} className='backContainer'>
					<Breadcrumbs>
						<Link color='inherit' component={RouterLink} to='/shop'>
							Shop
						</Link>
						<Typography color='textPrimary'>{name}</Typography>
					</Breadcrumbs>
				</Grid>
				<Grid item xs={12} md={6} className='imageSection'>
					<img src={imageSrc} alt='' className='image' />
				</Grid>
				<Grid item xs={12} md={6} className='formSection'>
					<Grid container>
						<Grid item xs={12}>
							<Typography variant='h4' color='secondary'>
								{name}
							</Typography>
							<Divider className='divider' />
						</Grid>

						<Grid item xs={12}>
							<div className='priceContainer'>
								<Typography variant='h4'>${price}</Typography>
								{quantity === 0 ? (
									<Typography variant='h6' color='error'>
										Out of stock
									</Typography>
								) : quantity <= 10 ? (
									<>
										<Typography variant='subtitle2'>Limited stocks left!</Typography>
										<Button variant='contained' color='primary'>
											Add to Cart
										</Button>
									</>
								) : (
									<Button variant='contained' color='primary'>
										Add to Cart
									</Button>
								)}
							</div>
							<Divider className='divider' />
						</Grid>

						<Grid item xs={12}>
							<Typography variant='body2' className='fieldName'>
								Description:
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant='body2'>{description}</Typography>
							<Divider className='divider' />
						</Grid>

						<Grid container>
							{containerSize && (
								<Grid item xs={4} className='iconContainer'>
									<WifiTetheringTwoToneIcon color='secondary' className='icon' />
									<Typography variant='body2'>Size of {containerSize}</Typography>
								</Grid>
							)}

							{plantSize && (
								<Grid item xs={4} className='iconContainer'>
									<HeightTwoToneIcon color='secondary' className='icon' />
									<Typography variant='body2'>{plantSize}</Typography>
								</Grid>
							)}

							{growingCondition && (
								<Grid item xs={4} className='iconContainer'>
									{growingConditionIcon}
									<Typography variant='body2'>{growingCondition}</Typography>
								</Grid>
							)}
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
};

export default CustView;
