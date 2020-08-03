import messagesTypes from './messages.types';

export const setMessage = (message, messageType, component = null) => ({
	type: messagesTypes.SET_MESSAGE,
	message,
	messageType,
	component
});

export const resetMessage = () => ({
	type: messagesTypes.RESET_MESSAGE
});
