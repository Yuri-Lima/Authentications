import dbConnect from '../../../utils/dbConnect';
import NextAuth from 'next-auth';
import CredentialsProvicer from 'next-auth/providers/credentials';
import User from '../../../../models/User.model';

import { getEnv } from '../../../utils/env';
import { confirmPasswordHash } from '../../../utils/auth';

dbConnect();

export default NextAuth({
	providers: [
		CredentialsProvicer({
			name: "Credentials",
			credentials: {
				name: { label: "Username", type: "text", required: true },
				password: { label: "Password", type: "password", required: true }
			},
			async authorize(credentials, req) {
				let user;
				user = await User.findOne({ name: credentials.name });
				if ( user ) {
					const res = await confirmPasswordHash(credentials.password, user.password);
					if (res) {
						user.approval = 'Approved';
						user.loginCount = user.loginCount + 1;
						user.lastLoginAt = new Date();
						await user.save();
						return user;
					} else {
						user.approval = 'Denied';
						await user.save();
						throw Error('Password is incorrect');
					}
				}

				return null;
			}
		}),
	],
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/auth/login',
		newUser: '/auth/register'
	},
	secret: getEnv('SECRET'),
	callbacks: {
		jwt: async function ({token, user }) {
			return {
				...token,
				user: {
					...token.user,
					...user
				}
			};
		},
		session: async function ({session, user, token}) {
			const data = token.user;
			return {
				data,
			};
		}
	}
});
