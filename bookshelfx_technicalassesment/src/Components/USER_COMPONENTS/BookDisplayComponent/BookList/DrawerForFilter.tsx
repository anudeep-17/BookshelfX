import React from 'react';
import { Box, Button, CircularProgress, CssBaseline, Divider, Drawer, IconButton, Menu, MenuItem, ThemeProvider, Tooltip, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import { ChevronLeft } from '@mui/icons-material';
import { getAuthors, getAuthorsForFiltering, getCategories, getCategoriesForFiltering } from '@/Services/BookRoutines';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { usePathname } from 'next/navigation';


export default function DrawerForFilter({
    toggleDrawer,
    selectedAuthorInFilter,
    setSelectedAuthorsInFilter,
    selectedChip,
    setSelectedChip,
    selectedCategoriesInFilter,
    setSelectedCategoriesInFilter,
    SpecificCategory
}:{
    toggleDrawer: (open: boolean) => () => void,
    selectedAuthorInFilter: string[],
    setSelectedAuthorsInFilter: React.Dispatch<React.SetStateAction<string[]>>,
    selectedChip: string,
    setSelectedChip: React.Dispatch<React.SetStateAction<string>>,
    selectedCategoriesInFilter?: string[],
    setSelectedCategoriesInFilter?: React.Dispatch<React.SetStateAction<string[]>>
    SpecificCategory?: string | null
    
})

{
    const pathname = usePathname();
    const currentpath = pathname.split('/')[2];
    
    const [AllAuthors, setAllAuthors] = React.useState<string[]>([]);
    const [AllCategories, setAllCategories] = React.useState<string[]>([]);
    
    const [AuthorsLoading, setAuthorsLoading] = React.useState<boolean>(false);
    const [CategoriesLoading, setCategoriesLoading] = React.useState<boolean>(false);

    const [selectedAuthors, setSelectedAuthors] = React.useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
    const [selectedChipforAvailabilityInFilter,  setSelectedChipforAvailabilityInFilter] = React.useState<string>('');

    const handleClearFilterClick = () => 
    {
        setSelectedAuthorsInFilter([]);
        if (currentpath !== 'allcategory' && setSelectedCategoriesInFilter) 
        {
            setSelectedCategoriesInFilter([]);
        }
        setSelectedChip('');
        setSelectedAuthors([]);
        setSelectedCategories([]);
        setSelectedChipforAvailabilityInFilter('');
    }

    const handleApplyFilterClick = () => 
    {
        setSelectedAuthorsInFilter(selectedAuthors);
        if (currentpath !== ('allcategory'|| 'allbooks') && setSelectedCategoriesInFilter) 
        {
            setSelectedCategoriesInFilter(selectedCategories);
        }
        setSelectedChip(selectedChipforAvailabilityInFilter);
    }
    
    React.useEffect(() => {
        // Fetch all authors and categories
        const fetchData = async () => {
            if(currentpath !== ('allcategory'|| 'allbooks') && setSelectedCategoriesInFilter)
            {
                const allCategoryResponse = await getCategoriesForFiltering(
                    currentpath === 'featuredbooks' ? 'featuredbooks' : currentpath === 'allcategory' ? 'allcategory' : currentpath === 'favourites' ? 'favourites' : 'allbooks',
                    currentpath === 'featuredbooks' ? true : null,
                );
                if(allCategoryResponse.success)
                {
                    setAllCategories(allCategoryResponse.data.sort());
                }
            }
            
            const allAuthorsResponse = await getAuthorsForFiltering(
                currentpath === 'featuredbooks' ? 'featuredbooks' : currentpath === 'allcategory' ? 'allcategory' : currentpath === 'favourites' ? 'favourites' : 'allbooks',
                currentpath === 'featuredbooks' ? true : null,
                SpecificCategory ? SpecificCategory : null,
                null
            );
            if(allAuthorsResponse.success)
            {
                
                setAllAuthors(allAuthorsResponse.data
                    .map((authorObject: { authors: string[]; }) => authorObject.authors.join(", "))
                    .sort());
            }
        }
        setAuthorsLoading(true);
        setCategoriesLoading(true);
        fetchData();
        setAuthorsLoading(false);
        setCategoriesLoading(false);

    },[]);
    
    React.useEffect(() => {
        if(selectedAuthorInFilter.length > 0)
        {
            console.log(selectedAuthorInFilter);
            setSelectedAuthors(selectedAuthorInFilter);
        }
        if(selectedCategoriesInFilter && selectedCategoriesInFilter.length > 0)
        {
            setSelectedCategories(selectedCategoriesInFilter);
        }
        if(selectedChip.length > 0)
        {
            setSelectedChipforAvailabilityInFilter(selectedChip);
        }
    },[selectedAuthorInFilter, selectedCategoriesInFilter, selectedChip]);



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
                            variant={selectedChipforAvailabilityInFilter === 'Available' ? 'filled' : 'outlined'}
                            clickable
                            onClick={() =>  setSelectedChipforAvailabilityInFilter('Available')}
                        />
                        <Chip
                            color="primary"
                            label="Not Available"
                            variant={selectedChipforAvailabilityInFilter === 'Not Available' ? 'filled' : 'outlined'}
                            clickable
                            onClick={() =>  setSelectedChipforAvailabilityInFilter('Not Available')}
                        />
                    </Stack>
                </Stack>
            </Box>
            
            <Divider sx={{ml:2, mr:2, mt:2, mb:2}}/>

            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', alignContent: 'center', ml: 2, mr: 2 }}>
                <Accordion sx={{
                    width: '100%'
                }}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography variant="body2" sx={{ mt: 2}}>
                        Filter by Author
                    </Typography>
                    </AccordionSummary>
                    {AuthorsLoading ? (
                        <CircularProgress />
                        ) : (
                        <Stack direction="row" spacing={0} sx={{ mt: 2, mb: 2, display:'flex', flexWrap:'wrap'}}>
                            {AllAuthors.map((author, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        alignContent: 'center',
                                        mr:1
                                    }}
                                >
                                    <Checkbox
                                        checked={selectedAuthors.includes(author)}
                                        onChange={(event) => {
                                            if (event.target.checked) {
                                                setSelectedAuthors(prevAuthors => [...prevAuthors, author]);
                                            } else {
                                                setSelectedAuthors(prevAuthors => prevAuthors.filter(a => a !== author));
                                            }
                                        }}
                                    />
                                    <Typography variant="body2">
                                        {author}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                        )}
                </Accordion>
            </Box>

            {(pathname.split('/')[2] !== 'allcategory' && pathname.split('/')[2] !== 'allbooks') &&                          
            <>
            <Divider sx={{ml:2, mr:2, mt:2, mb:2}}/>

            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', alignContent: 'center', ml: 2, mr: 2 }}>
                <Accordion sx={{
                    width: '100%'
                }}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography variant="body2" sx={{ mt: 2}}>
                        Filter by Categories
                    </Typography>
                    </AccordionSummary>
                    {CategoriesLoading ? (
                        <CircularProgress />
                        ) : (
                        <Stack direction="row" spacing={0} sx={{ mt: 2, mb: 2, display:'flex', flexWrap:'wrap'}}>
                            {AllCategories.map((category, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        alignContent: 'center',
                                        mr:1
                                    }}
                                >
                                    <Checkbox
                                        checked={selectedCategories.includes(category)}
                                        onChange={(event) => {
                                            if (event.target.checked) {
                                                setSelectedCategories(prevCategories => [...prevCategories, category]);
                                            } else {
                                                setSelectedCategories(prevCategories => prevCategories.filter(c => c !== category));
                                            }
                                        }}
                                    />
                                    <Typography variant="body2">
                                        {category}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                        )}
                </Accordion>
            </Box>
            </>
            }
            
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center', ml: 2, mr: 2, mt:2, mb:2}}>
                <Button variant="contained" sx={{mr:1}}  onClick={() => {handleApplyFilterClick(); toggleDrawer(false)();}}>
                    <Typography variant="body2" >
                        Apply Filters
                    </Typography>
                </Button>
                <Button variant="outlined" onClick={() => {handleClearFilterClick(); toggleDrawer(false)();}}>
                    <Typography variant="body2">
                        Clear Filters
                    </Typography>
                </Button>
            </Box>
        </Box>
    )
}