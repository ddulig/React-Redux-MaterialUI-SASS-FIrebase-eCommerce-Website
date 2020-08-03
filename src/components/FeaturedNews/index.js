import React from 'react';
import Carousel from '../Carousel';

//styles
import './styles.scss';
import MonsteraImg from './../../assets/monstera.png';
import { Box, Typography, Button } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const articles = [
	{
		image:
			'https://images.pexels.com/photos/1030899/pexels-photo-1030899.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
		title: 'Virtual flower arrangement classes on Aug 8! Contact us to enquire.'
	},
	{
		image:
			'https://images.pexels.com/photos/4473398/pexels-photo-4473398.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
		title: "We're open! Business during quarantine"
	},
	{
		image:
			'https://images.pexels.com/photos/1266302/pexels-photo-1266302.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
		title: 'Water propagation and how they work'
	},
	{
		image:
			'https://images.pexels.com/photos/930004/pexels-photo-930004.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
		title: 'Plant designs for your home'
	},
	{
		image:
			'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
		title: 'Start them young: Everything about starting from seeds'
	}
];

const FeaturedNews = props => {
	return (
		<Box className='newsContainer'>
			<img src={MonsteraImg} className='newsBackground' alt='' />

			<Carousel>
				<Box className='newsHeading newsGeneric'>
					<Typography variant='h4' gutterBottom>
						Latest News
					</Typography>

					<Typography variant='h5' className='newsSubheading'>
						There's a lot going on throughout the year at PlanTito Garden Centre.
						Here's some of our latest news.
					</Typography>

					<Button
						color='primary'
						size='large'
						className='newsHeadingButton'
						endIcon={<ArrowForwardIcon />}
					>
						Browse all news
					</Button>
				</Box>
				{articles.map((article, index) => (
					<Box key={index} className='newsPosts newsGeneric'>
						<Box className='newsImageContainer'>
							<img src={article.image} className='newsImage' alt={article.title} />
						</Box>
						<Typography variant='h6'>{article.title}</Typography>
					</Box>
				))}
			</Carousel>
		</Box>
	);
};

export default FeaturedNews;
