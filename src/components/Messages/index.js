import React from 'react';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { resetMessage } from './../../redux/Messages/messages.actions';
import { resetUserError } from './../../redux/Users/users.actions';
import { resetProductError } from './../../redux/Products/products.actions';

//styles
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const mapState = ({ messagesData }) => ({
	messageOpen: messagesData.messageOpen,
	message: messagesData.message,
	messageType: messagesData.messageType,
	component: messagesData.component
});

const Messages = props => {
	const { messageOpen, message, messageType, component } = useSelector(mapState);
	const dispatch = useDispatch();

	const Alert = props => {
		return <MuiAlert elevation={6} variant='filled' {...props} />;
	};

	const handleCloseMessage = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		dispatch(resetMessage());

		switch (component) {
			case 'user':
				return dispatch(resetUserError());
			case 'product':
				return dispatch(resetProductError());
			default:
				return null;
		}
	};

	return (
		<Snackbar
			open={messageOpen}
			autoHideDuration={6000}
			onClose={handleCloseMessage}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left'
			}}
		>
			<Alert onClose={handleCloseMessage} severity={messageType}>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default Messages;
