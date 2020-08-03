import messagesTypes from './messages.types';

const INITIAL_STATE = {
	messageOpen: false,
	message: null,
	messageType: 'success',
	component: null
};

const messagesReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case messagesTypes.SET_MESSAGE:
			return {
				...state,
				messageOpen: true,
				message: action.message,
				messageType: action.messageType,
				component: action.component
			};
		case messagesTypes.RESET_MESSAGE:
			return {
				...state,
				...INITIAL_STATE
			};
		default:
			return state;
	}
};

export default messagesReducer;
