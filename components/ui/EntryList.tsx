import { DragEvent, FC, useContext, useMemo } from 'react';
import { Box, List, Paper } from "@mui/material"

import { EntryCard } from "./EntryCard"
import { EntryStatus } from "@/interfaces"

import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

import styles from './EntryList.module.css';


// Penfing - In-progress - Finished
interface Props {
    status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {

    // Filtramos.
    const { entries, updateEntry } = useContext(EntriesContext);
    const { isDragging, endDragging } = useContext(UIContext);
    // Todo: Revisar esto.
    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries, status]);

    // Dejar caer algo.
    const allowDrop = (event: DragEvent<HTMLDivElement>) => {
        // Prevenimos el defaul.
        event.preventDefault();
    }

    // Cuando dejamos caer.
    const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
        const id = event.dataTransfer.getData('id');
        // Cuando hacemos el drop, es cuando actualizamos nuestras entradas.
        const entry = entries.find(e => e._id === id)!;
        // IMPORTANTE: aca actualizamos el estado de nuestro entry, para que lo cambie a su respectivo lugar.
        entry.status = status;
        updateEntry(entry);
        endDragging();
    }

    return (
        <Box
            component='div'
            // Nota: necesitamos inidar el drop, y si puede estar esperando que caiga algo.
            onDrop={onDropEntry}
            onDragOver={allowDrop}
            className={isDragging ? styles.dragging : ''}
        >
            <Paper sx={{
                height: 'calc(100vh - 200px)',
                overflow: 'scroll',
                backgroundColor: 'transparent',
                '&::-webkit-scrollbar': { display: 'none' },
                padding: '1px 5px'
            }}>
                {/* Todo: cambiara si estoy haciendo drag o no */}
                <List sx={{
                    opacity: isDragging ? 0.2 : 1,
                    transition: 'all .3s'
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
