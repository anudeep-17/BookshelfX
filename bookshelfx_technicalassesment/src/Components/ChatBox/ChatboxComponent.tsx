import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AssistantIcon from '@mui/icons-material/Assistant';
import { Tooltip } from '@mui/material';

export default function ChatboxComponent() {
    return (
        <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
            <Fab color="primary" aria-label="add">
                <Tooltip title="Chat with Monika, your ">
                    <AssistantIcon />
                </Tooltip>
            </Fab>
        </Box>
    );
}