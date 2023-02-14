import Head from 'next/head';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import { getSession } from 'next-auth/react';

import { useAuth } from '~/hooks/useAuth';

const Login = () => {
	const {signIn} = useAuth();
	const router = useRouter();
	const formik = useFormik({
		initialValues: {
			name: '',
			password: ''
		},
		validationSchema: Yup.object({
			name: Yup
				.string()
				.max(255)
				.required(
					'Username'),
			password: Yup
				.string()
				.max(255)
				.required(
					'Password is required')
		}),
		onSubmit: () => {
			signIn("credentials", {
				name: formik.values.name,
				password: formik.values.password,
				redirect: false
			}).then(({ok}) => {
				if(ok) {
					router.push('/');
				} else {
					formik.setErrors({
						user: 'Username or password is not correct.',
						password: 'Username or password is not correct.'
					});
					formik.setSubmitting(false);
				}
			});
		}
	});

	return (
		<>
			<Head>
				<title>Login | Dashboard</title>
			</Head>
			<Box
				component="main"
				sx={{
					alignItems: 'center',
					display: 'flex',
					flexGrow: 1,
					minHeight: '100%'
				}}
			>
				<Container maxWidth="sm">
					<form onSubmit={formik.handleSubmit}>
						<Box sx={{ my: 3 }}>
							<Typography
								color="textPrimary"
								variant="h4"
							>
								Sign in
							</Typography>
							<Typography
								color="textSecondary"
								gutterBottom
								variant="body2"
							>
								Sign in on the internal platform
							</Typography>
						</Box>
						<TextField
							error={Boolean(formik.touched.name && formik.errors.name)}
							fullWidth
							helperText={formik.touched.name && formik.errors.name}
							label="Username"
							margin="normal"
							name="name"
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							type="text"
							value={formik.values.name}
							variant="outlined"
						/>
						<TextField
							error={Boolean(formik.touched.password && formik.errors.password)}
							fullWidth
							helperText={formik.touched.password && formik.errors.password}
							label="Password"
							margin="normal"
							name="password"
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							type="password"
							value={formik.values.password}
							variant="outlined"
						/>
						<Box sx={{ py: 2 }}>
							<Button
								color="primary"
								disabled={formik.isSubmitting}
								fullWidth
								size="large"
								type="submit"
								variant="contained"
							>
								Sign In Now
							</Button>
						</Box>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between'
							}}
						>
							<Typography
								color="textSecondary"
								variant="body2"
							>
								Don&apos;t have an account?
								{' '}
								<NextLink
									href="/auth/register"
								>
									<Link
										to="/register"
										variant="subtitle2"
										underline="hover"
										sx={{
											cursor: 'pointer'
										}}
									>
										Sign Up
									</Link>
								</NextLink>
							</Typography>
							<NextLink
								href="/auth/forgot-password"
							>
								<Link
									to="/fogot-password"
									variant="subtitle2"
									underline="hover"
									sx={{
										cursor: 'pointer'
									}}
								>
									Forgot Password?
								</Link>
							</NextLink>
						</Box>
					</form>
				</Container>
			</Box>
		</>
	);
};

export const getServerSideProps = async (context) => {
	const session = await getSession(context);

	if ( session ) {
		return {
			redirect: {
				destination: '/'
			}
		}
	}
	
	return {
		props: {}
	};
};

export default Login;
