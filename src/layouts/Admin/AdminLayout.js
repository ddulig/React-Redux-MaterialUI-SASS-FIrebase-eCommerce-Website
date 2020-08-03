import React from 'react';

//components
import Header from './../../components/Header';
import SideNavigation from './../../components/SideNavigation';

const AdminLayout = props => {
	return (
		<>
			<Header admin={true} />

			<div style={{ display: 'flex', height: '100%' }}>
				<div>
					<SideNavigation />
				</div>
				<div style={{ width: '100%' }}>{props.children}</div>
			</div>
		</>
	);
};

export default AdminLayout;
