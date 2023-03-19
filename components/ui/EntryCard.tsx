import { DragEvent, FC, useContext } from 'react';
import { UIContext } from '../../context/ui';
import { Entry } from "@/interfaces"
import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"

interface Props {
    entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }) => {
    const { startDragging, endDragging } = useContext(UIContext);


    const onDragStart = (event: DragEvent<HTMLDivElement>) => {
        // Definimos el datos que identifica al card.
        event.dataTransfer.setData('id', entry._id);
        // Todo: modificar el estado, para indicar que estoy haciendo drag.
        startDragging();
    }

    const onDragEnd = () => {
        // Todo: fin del drag.
        endDragging();
    }

    return (
        <Card
            sx={{
                marginBottom: 1
            }}
            // Drag
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{
                        whiteSpace: 'pre-line'
                    }}>
                        {entry.description}
                    </Typography>
                </CardContent>
                <CardActions sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    paddingRight: 2
                }}>
                    <Typography variant="body2">
                        hace 30 minutos
                    </Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}
