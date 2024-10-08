import { getCategories } from "@/Services/BookRoutines";
import React, { use, useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Avatar, Box, Skeleton, Typography } from "@mui/material";
import { faker } from '@faker-js/faker';
import Image from "next/image";
 
export default function RegistrationStep2({setAlertopener, setAlert, selectedCategories, setSelectedCategories}:
    {   
        setAlertopener: React.Dispatch<React.SetStateAction<boolean>>,
        setAlert: React.Dispatch<React.SetStateAction<{severity: 'success' | 'error' | 'warning', message: string}>>
        selectedCategories: string[],
        setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>,
    }) 
    {

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchCategories() {
            // Set loading to true before fetching the categories
            setIsLoading(true);
    
            // Add a delay of 1 second before fetching the categories
            setTimeout(async () => {
                const data = await getCategories();
                setCategories(data.data);
    
                // Set loading to false after the categories have been fetched
                setIsLoading(false);
            }, 1000);
        }
     
        fetchCategories();
    }, []);

    const handleCategorySelection = (category: string) => {
        if(selectedCategories.includes(category))
        {
            setSelectedCategories(selectedCategories.filter((item) => item !== category));
        }
        else
        {
            if(selectedCategories.length < 6) 
            {
                setSelectedCategories([...selectedCategories, category]);
            } else 
            {
                 setAlertopener(true);
                setAlert({severity: 'error', message: 'You can only select upto 6 categories'});
            }
        }
    }

    return (
        <>
        <Typography variant="body1" sx={{ mb:2, textAlign: 'center', mt:3, wordBreak: 'break-word' }}>
            Select upto {' '}
        <Typography variant="body1" color="text.secondary" component="span">6</Typography>
            {' '} categories
        </Typography>

        <Box component="form"
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                mt: 2, // remove margin
                padding: 0, // remove padding
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255,255,255,0.5)',
                width: '100%',
                height: '100%',
                overflow: 'auto',
                gap:1
            }}
            onSubmit={(e) => {
                e.preventDefault();
            }}
        >

            {isLoading ? (
                   Array.from({ length: 12 }).map((_, index) => (
                        <Skeleton key={index} variant="text" width={100} height={30}/>
                    ))
                ) :
                ( categories.map((category, index) => (
                    <Chip
                        key={index}  
                        label={category}
                        color="primary"
                        variant={selectedCategories.includes(category) ? "filled" : "outlined"}
                        sx={{
                            minWidth: 'max-content',  
                            boxShadow: '0 3px 5px 2px transparent',  
                            ':hover': {
                                boxShadow: '0 3px 5px 2px rgba(63, 81, 181, .3)', // Changes the shadow on hover
                            },
                        }}
                        onClick={() => handleCategorySelection(category)}
                        clickable
                    />
                )
            ))}
        </Box>
        </>
    );
}