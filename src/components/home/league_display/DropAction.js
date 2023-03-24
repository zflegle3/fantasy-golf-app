import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

export default function DropAction() {

    return (
        <Fab variant='extended' size="small" aria-label="edit">
            <PersonRemoveIcon />
        </Fab>
    );

}