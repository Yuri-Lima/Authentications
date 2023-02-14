import Head from 'next/head';
import React, { useEffect } from 'react';
import NextLink from 'next/link';
import { Box, Button, Container, Typography } from '@mui/material';
import { dehydrate, QueryClient } from 'react-query';
import { getSession } from 'next-auth/react';
import { useAuth } from '~/hooks/useAuth';

export default function Dashboard({ session }) {

	const { signOut } = useAuth();

	return (
		<>
			<Head>
				<title>
					SBAdmin | Dashboard
				</title>
			</Head>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					backgroundImage: 'url(/static/images/auth.jpeg)',
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center'
				}}
			>
				<Container maxWidth={false}
					sx={{
						marginTop: '1rem',
						marginBottom: 'auto' 
					}}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
						}}>
						<Typography
							variant="h2"
							color="dark"
							sx={{
								marginBottom: '1rem'
							}}
						>
							Dashboard
						</Typography>
						<Button
							color="info"
							onClick={ () => {signOut();} }
							size="large"
							variant="contained"
							sx={{maxHeight: '50px'}}
						>
							Log Out
						</Button>
					</Box>
					{ (session && session.data._doc.role == 'master') &&
						<NextLink
							href="/admin/administrators"
							passHref
						>
							<a
								style={{ textDecoration: 'none' }}
							>
								Administrators
							</a>																																																																																																																																																																																																																																																																																																																																																																																																															
						</NextLink>
					}
				</Container>
			</Box>
		</>
	)
}

export const getServerSideProps = async (context) => {
	const queryClient = new QueryClient();
	const session = await getSession(context);

	if ( !session ) {
		return {
			redirect: {
				destination: '/auth/login',
				permanent: false
			},
			props: {
				dehydratedState: dehydrate(queryClient),
			}
		}
	}
	
	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			session: session,
		},
	};
};
