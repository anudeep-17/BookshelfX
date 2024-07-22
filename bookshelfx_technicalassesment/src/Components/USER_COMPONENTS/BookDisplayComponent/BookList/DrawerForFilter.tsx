import React from 'react';
import { Box, Button, CssBaseline, Divider, Drawer, IconButton, Menu, MenuItem, ThemeProvider, Tooltip, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import { ChevronLeft } from '@mui/icons-material';
 

export default function DrawerForFilter({
    toggleDrawer,
    selectedChip,
    setSelectedChip,
    slidervaluetext_forDays
}:{
    toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void,
    selectedChip: any,
    setSelectedChip: (value: string) => void,
    slidervaluetext_forDays: (value: number) => string
})

{
    return(
        <Box sx={{ width: 250 }} role="presentation">
            <IconButton
                onClick={toggleDrawer(false)}
            >
                <ChevronLeft sx={{fontSize: '2rem'}} />
            </IconButton>
            <Typography variant="h5" sx={{ mt: 2, mb: 2, ml: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <FilterAltIcon sx={{ color: 'primary.main' }} />
                Filter Books
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', alignContent: 'center', ml: 2, mr: 2 }}>
                <Typography variant="body2" sx={{ mt: 2}}>
                    Filter by availability
                </Typography>
                <Stack direction="column" spacing={1} sx={{ mt: 2, mb: 2}}>
                    <Stack direction="row" spacing={1}>
                        <Chip
                            color="primary"
                            label="Available"
                            variant={selectedChip === 'Available' ? 'filled' : 'outlined'}
                            clickable
                            onClick={() => setSelectedChip('Available')}
                        />
                        <Chip
                            color="primary"
                            label="Not Available"
                            variant={selectedChip === 'Not Available' ? 'filled' : 'outlined'}
                            clickable
                            onClick={() => setSelectedChip('Not Available')}
                        />
                    </Stack>
                    <Typography variant="body2" sx={{ mt: 2}}>
                        Available Within
                    </Typography>
                    <Slider
                        defaultValue={1}
                        getAriaValueText={slidervaluetext_forDays}
                        valueLabelDisplay="auto"
                        shiftStep={1}
                        step={1}
                        marks
                        min={1}
                        max={10}
                    />
                </Stack>
            </Box>
            
            <Divider sx={{ml:2, mr:2}}/>

            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', alignContent: 'center', ml: 2, mr: 2 }}>
                <Typography variant="body2" sx={{ mt: 2}}>
                    Filter by Author
                </Typography>
                <Stack direction="row" spacing={0} sx={{ mt: 2, mb: 2, display:'flex', flexWrap:'wrap'}}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center',
                            mr:1
                        }}
                    >
                        <Checkbox/>
                        <Typography variant="body2">
                            Author 1
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center',
                        }}
                    >
                        <Checkbox/>
                        <Typography variant="body2">
                            Author 2
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center',
                            mr:1
                        }}
                    >
                        <Checkbox/>
                        <Typography variant="body2">
                            Author 3
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center',
                        }}
                    >
                        <Checkbox/>
                        <Typography variant="body2">
                            Author 4
                        </Typography>
                    </Box>
                </Stack>
            </Box>

            <Divider sx={{ml:2, mr:2}}/>
            
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center', ml: 2, mr: 2, mt:2}}>
                <Button variant="contained" sx={{mr:1}}>
                    <Typography variant="body2" >
                        Apply Filters
                    </Typography>
                </Button>
                <Button variant="outlined">
                    <Typography variant="body2">
                        Clear Filters
                    </Typography>
                </Button>
            </Box>
        </Box>
    )
}