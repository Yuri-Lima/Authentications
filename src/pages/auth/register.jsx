import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
	Box,
	Button,
	Container,
	Grid,
	Link,
	MenuItem,
	TextField,
	Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useMutation } from 'react-query';

import { registerUser } from '~/utils/api/auth';

const Register = () => {
	const router = useRouter();
	const { mutate: registerUserMutation } = useMutation( registerUser, {
		onSuccess: () => {
			router.push('/');
		},
		onError: (err) => {
			formik.setSubmitting(false);
			formik.setErrors({
				name: "Username is not correct",
				email: "Email address is not correct"
			});
		}
	} );
	const formik = useFormik({
		initialValues: {
			email: '',
			firstName: '',
			lastName: '',
			name: '',
			password: '',
			phoneNumber: '',
			role: ''
		},
		validationSchema: Yup.object({
			email: Yup
				.string()
				.email(
					'Must be a valid email')
				.max(255)
				.required(
					'Email is required'),
			firstName: Yup
				.string()
				.max(255)
				.required(
					'First name is required'),
			lastName: Yup
				.string()
				.max(255)
				.required(
					'Last name is required'),
			name: Yup
				.string()
				.max(255)
				.required(
					'Username is required'),
			password: Yup
				.string()
				.max(255)
				.required(
					'Password is required'),
			phoneNumber: Yup
				.string(),
			role: Yup
				.string()
				.required(
					'Role is required')
		}),
		onSubmit: () => {
			registerUserMutation(formik.values);
		}
	});

	return (
		<>
			<Head>
				<title>
					Register | Dashboard
				</title>
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
					<Box
						mt={2}
						sx={{
							display: 'flex',
							justifyContent: 'space-between'
						}}
					>
						<NextLink
							href="/"
							passHref
						>
							<Button
							component="a"
							startIcon={<ArrowBackIcon fontSize="small" />}
							>
							Dashboard
							</Button>
						</NextLink>
					</Box>
					<form onSubmit={formik.handleSubmit}>
						<Box sx={{ my: 3 }}>
							<Typography
								color="textPrimary"
								variant="h4"
							>
								Create a new account
							</Typography>
							<Typography
								color="textSecondary"
								gutterBottom
								variant="body2"
							>
								Use your email to create a new account
							</Typography>
						</Box>
						<Grid
							container
							spacing={2}
						>
							<Grid
								item
								sm={6}
							>
								<TextField
									error={Boolean(formik.touched.firstName && formik.errors.firstName)}
									fullWidth
									helperText={formik.touched.firstName && formik.errors.firstName}
									label="First Name"
									margin="normal"
									name="firstName"
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.firstName}
									variant="outlined"
								/>
							</Grid>
							<Grid
								item
								sm={6}
							>
								<TextField
									error={Boolean(formik.touched.lastName && formik.errors.lastName)}
									fullWidth
									helperText={formik.touched.lastName && formik.errors.lastName}
									label="Last Name"
									margin="normal"
									name="lastName"
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.lastName}
									variant="outlined"
								/>
							</Grid>
						</Grid>
						<TextField
							error={Boolean(formik.touched.name && formik.errors.name)}
							fullWidth
							helperText={formik.touched.name && formik.errors.name}
							label="Username"
							margin="normal"
							name="name"
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.name}
							variant="outlined"
						/>
						<TextField
							error={Boolean(formik.touched.phoneNumber && formik.errors.phoneNumber)}
							fullWidth
							helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
							label="PhoneNumber"
							margin="normal"
							name="phoneNumber"
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.phoneNumber}
							variant="outlined"
						/>
						<TextField
							error={Boolean(formik.touched.email && formik.errors.email)}
							fullWidth
							helperText={formik.touched.email && formik.errors.email}
							label="Email Address"
							margin="normal"
							name="email"
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							type="email"
							value={formik.values.email}
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
						<TextField
							fullWidth
							label="Role"
							margin="normal"
							name="role"
							variant="outlined"
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.role}
							select
						>
							<MenuItem value="master">Master</MenuItem>
							<MenuItem value="general">General</MenuItem>
						</TextField>
						<Box sx={{ py: 2 }}>
							<Button
								color="primary"
								disabled={formik.isSubmitting}
								fullWidth
								size="large"
								type="submit"
								variant="contained"
							>
								Sign Up Now
							</Button>
						</Box>
						<Typography
							color="textSecondary"
							variant="body2"
							sx={{ marginBottom: '1.5rem' }}
						>
							Have an account?
							{' '}
							<NextLink
								href="/auth/login"
								passHref
							>
								<Link
									variant="subtitle2"
									underline="hover"
								>
									Sign In
								</Link>
							</NextLink>
						</Typography>
					</form>
				</Container>
			</Box>
		</>
	);
};

export default Register;
