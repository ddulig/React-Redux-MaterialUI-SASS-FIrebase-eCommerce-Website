import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkUserSession } from './redux/Users/users.actions';

//styles
import { CssBaseline, Box } from '@material-ui/core';
//import PlantLoader from './assets/plant-loader.gif';

// hoc
import WithAdminAuth from './hoc/withAdminAuth';
import WithoutAdminAuth from './hoc/withoutAdminAuth';

// layouts
import HomepageLayout from './layouts/HomepageLayout';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/Admin/AdminLayout';
import AdminSigninLayout from './layouts/Admin/SigninLayout';

//pages
import Homepage from './pages/Homepage';
import Shop from './pages/Shop';
import SigninPage from './pages/SigninPage';
import AdminDashboard from './pages/Admin/Dashboard';
import ManageProducts from './pages/Admin/ManageProducts';
import ViewProduct from './pages/Admin/ViewProduct';
import View from './pages/View';

//components
import Messages from './components/Messages';

function App() {
	const dispatch = useDispatch();

	//render loading while session is not grabbed??????
	useEffect(() => {
		dispatch(checkUserSession());
	}, [dispatch]);

	return (
		<>
			<CssBaseline />
			<Box height='100%'>
				<Switch>
					<Route
						exact
						path='/'
						render={() => (
							<HomepageLayout>
								<Homepage />
							</HomepageLayout>
						)}
					/>
					<Route
						exact
						path='/shop'
						render={() => (
							<MainLayout>
								<Shop />
							</MainLayout>
						)}
					/>
					<Route
						exact
						path='/products/view'
						render={() => (
							<MainLayout>
								<View />
							</MainLayout>
						)}
					/>
					<Route
						exact
						path='/administrator'
						render={() => (
							<WithoutAdminAuth>
								<AdminSigninLayout>
									<SigninPage />
								</AdminSigninLayout>
							</WithoutAdminAuth>
						)}
					/>
					<Route
						exact
						path='/administrator/dashboard'
						render={() => (
							<WithAdminAuth>
								<AdminLayout>
									<AdminDashboard />
								</AdminLayout>
							</WithAdminAuth>
						)}
					/>
					<Route
						exact
						path='/administrator/products'
						render={() => (
							<WithAdminAuth>
								<AdminLayout>
									<ManageProducts />
								</AdminLayout>
							</WithAdminAuth>
						)}
					/>
					<Route
						exact
						path='/administrator/products/view'
						render={() => (
							<WithAdminAuth>
								<AdminLayout>
									<ViewProduct />
								</AdminLayout>
							</WithAdminAuth>
						)}
					/>
				</Switch>
			</Box>

			<Messages />
		</>
	);
}

export default App;
