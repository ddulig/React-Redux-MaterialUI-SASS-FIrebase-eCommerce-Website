import React from 'react';
import { Link } from 'react-router-dom';

//styles
import './styles.scss';
import {
	Paper,
	List,
	ListItem,
	ListItemIcon,
	ListItemText
} from '@material-ui/core';
import EcoTwoToneIcon from '@material-ui/icons/EcoTwoTone';
import BorderColorTwoToneIcon from '@material-ui/icons/BorderColorTwoTone';
import InsertChartTwoToneIcon from '@material-ui/icons/InsertChartTwoTone';

const SideNavigation = props => {
	return (
		<div className='sideNavMainConatainer'>
			<Paper className='paperContainer' elevation={10}>
				<List component='nav' className='options'>
					<ListItem component={Link} to='/administrator/dashboard' button divider>
						<ListItemIcon>
							<InsertChartTwoToneIcon color='secondary' />
						</ListItemIcon>
						<ListItemText primary='Dashboard' className='optionText' />
					</ListItem>
					<ListItem component={Link} to='/administrator/products' button divider>
						<ListItemIcon>
							<EcoTwoToneIcon color='secondary' />
						</ListItemIcon>
						<ListItemText primary='Products' className='optionText' />
					</ListItem>
					<ListItem button divider>
						<ListItemIcon>
							<BorderColorTwoToneIcon color='secondary' />
						</ListItemIcon>
						<ListItemText primary='Orders' className='optionText' />
					</ListItem>
				</List>
			</Paper>
		</div>
	);
};

export default SideNavigation;
