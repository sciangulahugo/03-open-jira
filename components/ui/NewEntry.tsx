import { ChangeEvent, useState, useContext } from 'react';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';
import { Box, Button, TextField } from "@mui/material"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

export const NewEntry = () => {
    const { addNewEntry } = useContext(EntriesContext);
    // Mostrar o no el formulario.
    const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

    const [inputValue, setInputValue] = useState('');
    const [touched, setTouched] = useState(false);

    const onTextFieldChanges = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    }

    const onSave = () => {
        if (!inputValue.length) return;
        addNewEntry(inputValue);
        // Reseteamos el formulario.
        setIsAddingEntry(false);
        setTouched(false);
        setInputValue('');
    }

    return (
        <Box sx={{
            marginBottom: 2,
            paddingX: 2
        }}>
            {
                isAddingEntry
                    ? (
                        <>
                            <TextField
                                fullWidth
                                sx={{
                                    marginTop: 2,
                                    marginBottom: 1,
                                }}
                                placeholder='Nueva entrada'
                                autoFocus
                                multiline
                                label='Nueva entrada'
                                helperText={!inputValue.length && touched && 'Ingrese un valor'}
                                error={!inputValue.length && touched}
                                onBlur={() => setTouched(true)}
                                value={inputValue}
                                onChange={onTextFieldChanges}
                            />


                            <Box display='flex' justifyContent='space-between'>

                                <Button
                                    variant="text"
                                    onClick={() => setIsAddingEntry(false)}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    endIcon={<SaveOutlinedIcon />}
                                    onClick={onSave}
                                >
                                    Guardar
                                </Button>
                            </Box>
                        </>
                    )
                    : <>
                        <Button
                            startIcon={<AddCircleOutlineOutlinedIcon />}
                            fullWidth
                            variant="outlined"
                            onClick={() => setIsAddingEntry(true)}
                        >
                            Agregar Tarea
                        </Button>
                    </>
            }


        </Box>
    )
}
