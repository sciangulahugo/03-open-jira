import { FC, PropsWithChildren } from 'react';

import Head from "next/head"

import { Box } from "@mui/material"
import { Navbar, Sidebar } from '../ui';

// Tramos todo lo que tenia PropsWithChildren y le agregamos nuestros props.
interface Props extends PropsWithChildren {
    title?: string;
}

export const Layout: FC<Props> = ({ children, title }) => {
    return (
        <Box sx={{
            flexFlow: 1
        }}>
            <Head>
                <title> {title} </title>
                <meta name="author" content="Hugo Sciangula" />
                <meta name="description" content={`My page ${title}`} />
            </Head>

            <Navbar />
            <Sidebar />
            <Box sx={{ padding: '10px 20px' }}>
                {children}
            </Box>
        </Box>
    )
}
