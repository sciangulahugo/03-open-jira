import { useContext } from 'react';
import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"

const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Draf'];

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import { UIContext } from '../../context/ui/UIContext';

export const Sidebar = () => {
    // Aca usamos nuestro contexto.
    const { sidemenuOpen, closeSideMenu } = useContext(UIContext);
    return (
        <Drawer
            anchor="left"
            open={sidemenuOpen}
            onClose={closeSideMenu}
        >
            <Box sx={{ width: 250 }}>
                <Box
                    sx={{ padding: '5px 10px' }}
                >
                    <Typography variant="h4">
                        Menu
                    </Typography>
                </Box>
                <List>
                    {
                        menuItems.map((text, index) => (
                            <ListItemButton key={index}>
                                <ListItemIcon>
                                    {index % 2 ? <EmailOutlinedIcon /> : <InboxOutlinedIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        ))
                    }
                </List>
                <Divider />
                <List>
                    {
                        menuItems.map((text, index) => (
                            <ListItemButton key={index}>
                                <ListItemIcon>
                                    {index % 2 ? <EmailOutlinedIcon /> : <InboxOutlinedIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        ))
                    }
                </List>
            </Box>
        </Drawer>
    )
}
