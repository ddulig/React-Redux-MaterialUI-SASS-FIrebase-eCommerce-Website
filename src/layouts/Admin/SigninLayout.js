import React from 'react';

//components
import Header from './../../components/Header';

const AdminSigninLayout = props => {
	return (
		<>
			<Header />
			{props.children}
		</>
	);
};

export default AdminSigninLayout;
