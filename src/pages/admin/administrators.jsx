import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import NextLink from 'next/link';
import { dehydrate, QueryClient } from 'react-query';
import { getSession } from 'next-auth/react';
import { DataGrid } from '@mui/x-data-grid';
import { getAllUsers } from '~/utils/api/auth';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'User Name', width: 200 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 170 },
    { field: 'email', headerName: 'Email', width: 170 },
    { field: 'role', headerName: 'Role', width: 100 },
    { field: 'approval', headerName: 'Approval', width: 120 },
    { field: 'createdAt', headerName: 'Created Date', width: 220 },
    { field: 'lastLoginAt', headerName: 'Last Login', width: 220 }
];

export default function DataTable() {

  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    changeData();
  }, []);

  const changeData = async () => {
    const a = await getAllUsers().then(res => res);
    setData([...a.data]);
    return('');
  }
  
  useEffect(() => {
    const users = data;
    console.log('This is all Users: ', users);
    if (!users.length == 0) {
      const temp = [];

      users.map((item, key) => {
        temp.push({ 
          id: key,
          name: item.name,
          firstName: item.firstName,
          lastName: item.lastName,
          phoneNumber: item.phoneNumber,
          email: item.email,
          role: item.role,
          approval: item.approval,
          createdAt: item.createdAt,
          lastLoginAt: item.lastLoginAt
        });
      });
      setRows(temp);
    }
  }, [data]);


  const formatRows = () => {
    setRows([]);
  }

  return (
    <>
      <Head>
          <title>
              SBAdmin | Administrators
          </title>
      </Head>
      <Box
        component="main"
        sx={{
            flexGrow: 1,
            py: 8
        }}
      >
        <Container maxWidth={false}>
          <Typography
            variant="h2"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
            color="dark"
          >
            Administrators
          </Typography>
          <div style={{ width: '100%', height: 400, marginBottom: '2rem' }}
          >
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
          </div>
          <NextLink
            href="/"
            passHref
          >
            <a
              style={{ textDecoration: 'none' }}
              onClick={{formatRows}}
            >
              go Dashboard
            </a>																																																																																																																																																																																																																																																																																																																																																																																																															
          </NextLink>
        </Container>
      </Box>
    </>
  );
}

export const getServerSideProps = async (context) => {
	const queryClient = new QueryClient();
	const session = await getSession(context);
	if ( !session || session.data._doc.role == 'general' ) {
		return {
			redirect: {
				destination: '/',
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
		}
	};
};