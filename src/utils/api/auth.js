import http from '~/utils/axios';

export const registerUser = (user) => {
	return http.post('/api/auth/new', user);
}

export const updateUser = ( user ) => {
	return http.put('/api/auth/update', user)
}

export const requestForgotPassword = ( email  ) => {
	return http.post('/api/auth/forgot-password', {
		email
	});
}

export const resetPassword = (data) => {
	return http.post('/api/auth/reset-password', data);
}

export const getAllUsers = async () => {
	return await http.post('/api/users');
}