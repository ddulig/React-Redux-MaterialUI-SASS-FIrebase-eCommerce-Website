import React from 'react';

//components
import Header from './../components/Header';
import Footer from './../components/Footer';

const HomepageLayout = props => {
	return (
		<>
			<Header />
			{props.children}
			<Footer />
		</>
	);
};

export default HomepageLayout;
