import { FC, PropsWithChildren, useReducer } from 'react';
import { UIContext, uiReducer } from './'

export interface UIState {
    sidemenuOpen: boolean,
    isAddingEntry: boolean,
    isDragging: boolean,
}

const UI_INITIAL_STATE: UIState = {
    sidemenuOpen: false,
    isAddingEntry: false,
    isDragging: false
}

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    // Menu:
    const openSideMenu = () => {
        dispatch({ type: 'UI - Open Sidebar' });
    }

    const closeSideMenu = () => {
        dispatch({ type: 'UI - Close Sidebar' });
    }

    // Entries:
    const setIsAddingEntry = (status: boolean) => {
        dispatch({
            type: 'UI - Is Adding Entry',
            payload: status
        })
    }

    // Drag:
    const startDragging = () => {
        dispatch({
            type: 'UI - Start Dragging'
        });
    }

    const endDragging = () => {
        dispatch({
            type: 'UI - End Dragging'
        });
    }

    return (
        <UIContext.Provider value={{
            // sidemenuOpen: false
            ...state,
            // Methods
            openSideMenu,
            closeSideMenu,

            setIsAddingEntry,

            startDragging,
            endDragging,
        }}>
            {children}
        </UIContext.Provider>
    )
}