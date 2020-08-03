import React, { useEffect, useState, useRef } from 'react';

//redux
import { useDispatch, useSelector } from 'react-redux';
import {
	addProductStart,
	editProductStart
} from './../../../redux/Products/products.actions';

//utilities
import { useDropzone } from 'react-dropzone';

//styles
import './styles.scss';
import {
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	Switch,
	MenuItem,
	Typography
} from '@material-ui/core';
import CloudUploadTwoToneIcon from '@material-ui/icons/CloudUploadTwoTone';

const mapState = ({
	productTypesData,
	containerSizesData,
	growingConditionsData,
	plantSizesData,
	productsData
}) => ({
	productTypesData: productTypesData.productTypes,
	containerSizesData: containerSizesData.containerSizes,
	growingConditionsData: growingConditionsData.growingConditions,
	plantSizesData: plantSizesData.plantSizes,
	selectedProduct: productsData.product
});

const AddEditProduct = props => {
	const dispatch = useDispatch();
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
		accept: 'image/*',
		multiple: false
	});

	const {
		productTypesData,
		containerSizesData,
		growingConditionsData,
		plantSizesData,
		selectedProduct
	} = useSelector(mapState);

	const [open, setOpen] = useState(props.open);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [featured, setFeatured] = useState(false);
	const [productType, setProductType] = useState('');
	const [containerSize, setContainerSize] = useState('');
	const [growingCondition, setGrowingCondition] = useState('');
	const [plantSize, setPlantSize] = useState('');
	const [quantity, setQuantity] = useState('');
	const [imageSrc, setImageSrc] = useState('');

	const [borderStyle, setBorderStyle] = useState({ borderColor: 'grey' });
	const isInitialMount = useRef(true);
	const count = useRef(1);

	const action = selectedProduct ? 'Edit' : 'Add';
	const productTypePlant = 'sS0ZGlTzaKz5HUoLoWpL';
	const productTypePot = 'ElJ1oI3Paldub2LWbNnd';

	useEffect(() => {
		//only run if edit
		if (selectedProduct) {
			const {
				name,
				description,
				price,
				featured,
				productType,
				containerSize,
				growingCondition,
				plantSize,
				quantity,
				imageSrc
			} = selectedProduct;

			setName(name);
			setDescription(description);
			setPrice(price);
			setFeatured(featured);
			setProductType(productType);
			setImageSrc(imageSrc);
			setQuantity(quantity);

			//checks for undefined
			if (containerSize) setContainerSize(containerSize);
			if (growingCondition) setGrowingCondition(growingCondition);
			if (plantSize) setPlantSize(plantSize);
		}
	}, [selectedProduct]);

	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false;
		} else {
			//first call is the dropzone resetting the accepted files
			if (count.current === 1) count.current++;
			else {
				count.current = 1;

				if (acceptedFiles.length > 0) {
					setImageSrc(acceptedFiles[0]);
					setBorderStyle({ borderColor: 'green' });
				} else {
					setImageSrc('');
					setBorderStyle({ borderColor: 'red' });
					alert('NOTE: Please upload a single image file.');
				}
			}
		}
	}, [acceptedFiles]);

	const handleClose = success => {
		setOpen(false);
		resetForm();
		props.handleAddEditEnd(action, success);
	};

	const handleProductTypeOnChange = e => {
		setProductType(e.target.value);
		setContainerSize('');
		setGrowingCondition('');
		setPlantSize('');
	};

	const handleSubmit = e => {
		e.preventDefault();

		if (imageSrc === '') {
			setBorderStyle({ borderColor: 'red' });
			alert('NOTE: Please upload a single image file.');
			return;
		}

		if (action === 'Edit') {
			const { documentID, storageUri } = selectedProduct;
			dispatch(
				editProductStart(
					{
						documentID,
						details: {
							name,
							description,
							price,
							featured,
							productType,
							containerSize,
							growingCondition,
							plantSize,
							quantity,
							imageSrc,
							storageUri
						}
					},
					props.page
				)
			);
		} else {
			dispatch(
				addProductStart({
					name,
					description,
					price,
					featured,
					productType,
					containerSize,
					growingCondition,
					plantSize,
					quantity,
					imageSrc
				})
			);
		}

		handleClose(true);
	};

	const resetForm = () => {
		setName('');
		setDescription('');
		setPrice('');
		setFeatured(false);
		setProductType('');
		setContainerSize('');
		setGrowingCondition('');
		setPlantSize('');
		setQuantity('');
		setImageSrc('');
	};

	return (
		<>
			<Dialog open={open} onClose={handleClose} className='addProdDialog'>
				<form onSubmit={handleSubmit}>
					<DialogTitle>{action} Product</DialogTitle>
					<DialogContent>
						<TextField
							label='Name'
							value={name}
							onChange={e => setName(e.target.value)}
							margin='dense'
							required
							fullWidth
						/>

						<TextField
							label='Description'
							value={description}
							onChange={e => setDescription(e.target.value)}
							margin='dense'
							rows={3}
							required
							multiline
							fullWidth
						/>

						<TextField
							label='Price'
							value={price}
							onChange={e => setPrice(e.target.value)}
							margin='dense'
							type='number'
							required
							fullWidth
						/>

						<TextField
							label='Quantity'
							value={quantity}
							onChange={e => setQuantity(e.target.value)}
							margin='dense'
							type='number'
							required
							fullWidth
						/>

						<TextField
							select
							label='Product Type'
							value={productType}
							onChange={handleProductTypeOnChange}
							margin='dense'
							required
							fullWidth
						>
							{productTypesData.map(({ type, documentID }) => (
								<MenuItem key={documentID} value={documentID}>
									{type}
								</MenuItem>
							))}
						</TextField>

						<TextField
							select
							label='Growing Condition'
							value={growingCondition}
							onChange={e => setGrowingCondition(e.target.value)}
							margin='dense'
							className={productType === productTypePlant ? '' : 'hidden'}
							required={productType === productTypePlant ? true : false}
							fullWidth
						>
							{growingConditionsData.map(({ condition, documentID }) => (
								<MenuItem key={documentID} value={documentID}>
									{condition}
								</MenuItem>
							))}
						</TextField>

						<TextField
							select
							label='Container Size'
							value={containerSize}
							onChange={e => setContainerSize(e.target.value)}
							margin='dense'
							className={
								productType === productTypePot || productType === productTypePlant
									? ''
									: 'hidden'
							}
							required={
								productType === productTypePot || productType === productTypePlant
									? true
									: false
							}
							fullWidth
						>
							{containerSizesData.map(({ size, documentID }) => (
								<MenuItem key={documentID} value={documentID}>
									{size}
								</MenuItem>
							))}
						</TextField>

						<TextField
							select
							label='Plant Size'
							value={plantSize}
							onChange={e => setPlantSize(e.target.value)}
							margin='dense'
							className={productType === productTypePlant ? '' : 'hidden'}
							required={productType === productTypePlant ? true : false}
							fullWidth
						>
							{plantSizesData.map(({ size, documentID }) => (
								<MenuItem key={documentID} value={documentID}>
									{size}
								</MenuItem>
							))}
						</TextField>

						<FormControlLabel
							checked={featured}
							onChange={e => setFeatured(e.target.checked)}
							control={<Switch color='secondary' />}
							label='Featured*'
							labelPlacement='start'
							className='featured'
							required
						/>

						<div className='fileUploadContainer' style={borderStyle}>
							<div className='dropZone' {...getRootProps()}>
								<input type='file' {...getInputProps()} className='fileUploadInput' />
							</div>

							<img
								src={
									typeof imageSrc === 'string' ? imageSrc : URL.createObjectURL(imageSrc)
								}
								className='fileUploadImage'
								alt=''
							/>

							{!imageSrc && (
								<div className='fileUploadSubContainer'>
									<CloudUploadTwoToneIcon color='secondary' style={{ fontSize: 100 }} />
									<Typography className='text' color='secondary'>
										Drag and drop your file here
										<br />
										OR
										<br />
										Click to select a file*
									</Typography>
								</div>
							)}
						</div>
					</DialogContent>
					<DialogActions className='dialogActions'>
						<Button
							onClick={() => handleClose(false)}
							variant='outlined'
							color='primary'
						>
							Cancel
						</Button>
						<Button type='submit' variant='contained' color='primary'>
							Save
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</>
	);
};

export default AddEditProduct;
