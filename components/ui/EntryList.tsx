import { FC, useContext, useMemo } from 'react';
import { EntryStatus } from "@/interfaces"
import { Box, List, Paper } from "@mui/material"
import { EntryCard } from "./EntryCard"
import { EntriesContext } from '../../context/entries';

// Penfing - In-progress - Finished
interface Props {
    status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {

    // Filtramos.
    const { entries } = useContext(EntriesContext);
    // Revisar esto.
    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries, status]);

    return (
        <Box component='div'>
            <Paper sx={{
                height: 'calc(100vh - 200px)',
                overflow: 'scroll',
                backgroundColor: 'transparent',
                '&::-webkit-scrollbar': { display: 'none' },
                padding: '1px 5px'
            }}>
                {/* Todo: cambiara si estoy haciendo drag o no */}
                <List sx={{
                    opacity: 1
                }}>
                    {
                        entriesByStatus.map((entry) => (
                            <EntryCard key={entry._id} entry={entry} />
                        ))
                    }
                </List>
            </Paper>
        </Box>
    )
}
