import React from 'react';

//styles
import './styles.scss';
import {
	Typography,
	Box,
	GridList,
	GridListTile,
	GridListTileBar
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const tileData = [
	{
		img:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq7WTRQ-NUy7t9V2r_wR-L65OapXzmfgaVROTP3gu1Rk5n1xO4&s',
		name: 'Name',
		price: '$10',
		description: 'An awesome plant'
	},
	{
		img:
			'https://www.ikea.com/au/en/images/products/fejka-artificial-potted-plant__0614197_PE686822_S5.JPG',
		name: 'Name',
		price: '$10',
		description: 'An awesome plant'
	},
	{
		img:
			'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/yucca-cane-plant-in-a-pot-on-a-white-background-royalty-free-image-1580856558.jpg',
		name: 'Name',
		price: '$10',
		description: 'An awesome plant'
	},
	{
		img:
			'https://www.bhg.com.au/media/20046/monstera-deliciosa.jpg?width=720&center=0.0,0.0',
		name: 'Name',
		price: '$10',
		description: 'An awesome plant'
	},
	{
		img:
			'https://pyxis.nymag.com/v1/imgs/4a7/29b/4ef2f518834dd81d8ceb374caa54fd5171-22-plant-gifts.rsquare.w700.jpg',
		name: 'Name',
		price: '$10',
		description: 'An awesome plant'
	},
	{
		img:
			'https://hgtvhome.sndimg.com/content/dam/images/grdn/fullset/2014/6/25/0/CI_04-fbfd01d70004.jpg.rend.hgtvcom.966.725.suffix/1452664590074.jpeg',
		name: 'Name',
		price: '$10',
		description: 'An awesome plant'
	}
];

const FeaturedProducts = props => {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('sm'));

	return (
		<Box className='featuredContainer'>
			<Box className='secondaryContainer'>
				<Typography variant='h4' className='subheading'>
					FEATURED PRODUCTS
				</Typography>
			</Box>

			<div className='gridContainer'>
				<GridList
					cellHeight={180}
					cols={matches ? 3 : 2}
					className='grid'
					spacing={10}
				>
					{tileData.map((tile, index) => (
						<GridListTile key={index + tile.img} className='gridTile'>
							<img src={tile.img} alt={tile.name} className='gridImage' />
							<GridListTileBar
								title={tile.name}
								subtitle={
									<span>
										Price: {tile.price}
										<span>
											<br /> Description: {tile.description}
										</span>
									</span>
								}
								className='gridTileBar'
								actionIcon={
									<IconButton>
										<InfoIcon />
									</IconButton>
								}
							/>
						</GridListTile>
					))}
				</GridList>
			</div>
		</Box>
	);
};

export default FeaturedProducts;
