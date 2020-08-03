import React from 'react';

//components
import Header from './../components/Header';
import Footer from './../components/Footer';

const MainLayout = props => {
	return (
		<div>
			<Header />
			{props.children}
			<Footer />
		</div>
	);
};

export default MainLayout;
