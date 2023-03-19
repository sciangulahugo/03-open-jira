import { Entry } from '@/interfaces';
import { EntriesState } from './';

type EntriesActionType =
    | { type: '[Entry] - AddEntry', payload: Entry }
    | { type: '[Entry] - EntryUpdated', payload: Entry }

export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {
    switch (action.type) {
        case '[Entry] - AddEntry':
            return {
                ...state,
                entries: [...state.entries, action.payload]
            }
        case '[Entry] - EntryUpdated':
            return {
                ...state,
                entries: state.entries.map(entry => {
                    // Verificamos si es la misma entrada.
                    if (entry._id === action.payload._id) {
                        // Aca le cambiamos el estado.
                        entry.status = action.payload.status;
                        // Por si modifica el texto.
                        entry.description = action.payload.description;
                    }
                    return entry;
                })
            }
        default:
            return state;
    }
}