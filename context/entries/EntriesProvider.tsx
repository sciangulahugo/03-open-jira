import { FC, PropsWithChildren, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './'

export interface EntriesState {
    entries: Entry[],
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'Pendiente: Esto es una description',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            _id: uuidv4(),
            description: 'En-Progreso: Esto es otra description',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            _id: uuidv4(),
            description: 'Finalizado: Esto es la mejor description',
            status: 'finished',
            createdAt: Date.now() - 100000,
        }
    ]
}

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

    const addNewEntry = (description: string) => {
        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createdAt: Date.now(),
            status: 'pending'
        }
        dispatch({
            type: '[Entry] - AddEntry',
            payload: newEntry
        })
    }

    const updateEntry = (entry: Entry) => {
        dispatch({
            type: '[Entry] - EntryUpdated',
            payload: entry
        });
    }

    return (
        <EntriesContext.Provider value={{
            ...state,
            // Aca exponemos nuestros metodos.
            addNewEntry,
            updateEntry
        }}>
            {children}
        </EntriesContext.Provider>
    )
}