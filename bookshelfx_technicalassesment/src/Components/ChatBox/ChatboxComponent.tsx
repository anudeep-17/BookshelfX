import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AssistantIcon from '@mui/icons-material/Assistant';
import { CircularProgress, Grid, IconButton, Popover, Skeleton, Stack, TextField, ThemeProvider, Tooltip, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import theme from '../Themes';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { Book } from '../interfaceModels';
import Avatar from '@mui/material/Avatar';
import ChatSystemAvatar from '@/assets/ChatSystemAvtar.png';
import ReaderAvatar from '@/assets/ReaderAvtar.jpeg';
import { ChatGPTSupport } from '@/Services/ChatGPTRoutines';
import Chip from '@mui/material/Chip';
import Badge from '@mui/material/Badge';

export default function ChatboxComponent({book, role, informationFromLibrarian}: {book: Book, role?: string, informationFromLibrarian?: string}) {
    
    const [anchorEl, setAnchorEl] = React.useState<EventTarget & HTMLButtonElement | null>(null);
    const [fabOpen, setFabOpen] = React.useState(false);
    const [popoverOpen, setPopoverOpen] = React.useState(false);
    const [UserTyping, setUserTyping] = React.useState<string>('');
    const [Messages, setMessage] = React.useState<Array<{role: string, content: string}>>(role && role === 'librarian'? [
        { role: 'system', content: 'you are a librarian.' },
        { role: 'system', content: 'you can assist with editing books, providing information about books, authors, genres, and publishers.' },
        { role: 'system', content: `we are currently editing the book titled "${book.title}" by ${book.authors.join(", ")}. Be ready to provide editing suggestions, answer questions, and offer insights about this book.` },
        { role: 'system', content: `Information From Librarian: ${informationFromLibrarian}`},
        { role: 'assistant', content: 'Hi there, This is Monika, your librarian assistant. I am here to help you with editing and provide valuable insights about the book.' },
        { role: 'assistant', content: `Feel free to ask me anything about the editing process or about "${book.title}" by ${book.authors.join(", ")}.` },
    ]:[
        { role: 'system', content: 'you are a library assistant.' },
        { role: 'system', content: 'you can provide information about books, authors, genres, and publishers.' },
        { role: 'system', content: `we are talking about ${book.title} by ${book.authors.join(", ")} be ready to answer questions, queries, and provide insights and about this book`},
        { role: 'assistant',  content: 'Hi there, This is Monika, I am here to help you improve our reading Journey.' },
        { role: 'assistant', content: `Feel free to ask me anything about ${book.title} by ${book.authors.join(", ")}` },
    ]);

    const [showBadge, setShowBadge] = React.useState(false);

    const preselectedMessages = role && role === 'librarian'? [] : [
        "What are the benefits of reading this work?",
        "Could you offer an overview of the content?",
        "What are the central topics explored?",
        "What distinguishes the author’s viewpoint in this narrative?"
    ];

    const onSelectionMessages = role && role === 'librarian'? [] : [
        `What specific benefits can readers gain from engaging with the narrative and themes of '${book.title}' by ${book.authors.join(", ")}?`,
        `Could you summarize the key elements and storyline encapsulated within '${book.title}' by ${book.authors.join(", ")}?`,
        `What are the primary themes and messages that '${book.title}' by ${book.authors.join(", ")} seeks to convey to its audience?`,
        `In what ways does '${book.title}' by ${book.authors.join(", ")} offer a unique or innovative perspective within the ${book.category} genre?`
    ]; 
    
    const [isLoading, setIsLoading] = React.useState(false);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const currentTarget = event.currentTarget;
        showBadge && setShowBadge(false);
        setAnchorEl(currentTarget);
        setFabOpen(true);
        setTimeout(() => {
            setPopoverOpen(true);
        }, 300); 
    };

    const handleClose = () => {
        setPopoverOpen(false);
        setTimeout(() => {
            setFabOpen(false);
            setAnchorEl(null);
        }, 300); // 1000 milliseconds = 1 second delay
    };

    const fabVariants = {
        open: { y: '150%' },
        closed: { y: '0%' }
    };

    const popoverVariants = {
        open: { y: '0%' },
        closed: { y: '-100%' }
    };

    const id = fabOpen ? 'simple-popover' : undefined;

    const formatText = (input: { text: string }) => {
        // Replace custom markers with HTML tags
        const boldPattern = /\*\*(.*?)\*\*/g;
        const headingPattern = /### (.*?)(\n|$)/g;
        const formattedText = input.text
            .replace(boldPattern, '<strong>$1</strong>')
            .replace(headingPattern, '<h3>$1</h3>$2')
            .replace(/\n/g, '<br />');
    
        return formattedText;
    };

    const handleMessage = async ({messages}:{messages: {role: string, content: string}[]}) => {
        setIsLoading(true);
        const response = await ChatGPTSupport({messages});
        setIsLoading(false);
        if(response.success)
        {
            const assistantMessage = response.data.choices[0].message;
            assistantMessage.content = formatText({text: assistantMessage.content});
            console.log(assistantMessage);
            setMessage(prevMessages => [...prevMessages, assistantMessage]);
        }
    }

    const messagesEndRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [Messages]);


    const messageHandledRef = React.useRef(false);
    React.useEffect(() => {
        if (!messageHandledRef.current) {
            handleMessage({messages: Messages});
            messageHandledRef.current = true;
        }
    }, []);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setShowBadge(true);
        }, 1000);

        return () => clearTimeout(timer);  
    }, []);
    
    
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
                <motion.div
                    animate={fabOpen ? 'open' : 'closed'}
                    transition={{ ease: "linear", duration: 0.2 }}
                    variants={fabVariants}
                >
                    <Fab color="primary" variant="extended" aria-label="add" onClick={handleClick}>
                        <Tooltip title={<span style={{ fontSize: '1.2em' }}>Chat with Monika, your dedicated literary guide, designed to elevate your reading journey.</span>}>
                            <AssistantIcon sx={{mr:1}}/>
                        </Tooltip>
                        Monika’s Assistance
                    </Fab>
                </motion.div>

                <motion.div
                    animate={popoverOpen ? 'open' : 'closed'}
                    transition={{ ease: "linear", duration: 0.2 }}
                    variants={popoverVariants}
                >
                    <Popover
                        id={id}
                        open={popoverOpen}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: 600,
                                height: 650,
                                backgroundColor: 'white',
                                boxShadow: 2,
                                borderRadius: 2,
                            }}
                        >
                            
                            <Box
                                sx={{
                                    background: theme.palette.primary.main,
                                    p: 2,
                                }}
                            >
                                <Grid container justifyContent="space-between" alignItems="center">
                                    <Grid item>
                                        <Typography variant='h5' sx={{
                                            color: 'white',
                                            textAlign: 'center',
                                            letterSpacing: 2
                                        }}>
                                            ChatBox
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton color="inherit" onClick={handleClose}>
                                            <CloseIcon sx={{
                                                color: 'white', 
                                                fontSize: '1.5rem'
                                            }}/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Box>
                            
                            <Box
                                sx={{
                                    display: 'flex', 
                                    flexDirection: 'column',
                                    alignContent: 'center', 
                                    overflowY: 'auto',
                                    p:2,
                                    height: Messages.length > 6 ? 'auto' : 400,
                                }}
                            >
                                {Messages.slice(role === 'librarian'? 4 : 3).map((message, index) => (
                                    message.role === 'assistant' ? (
                                        <Box
                                        key={index}
                                        sx={{
                                            display: 'flex', 
                                            flexDirection: 'row', 
                                            justifyContent: 'flex-start',
                                            mb:1
                                        }}
                                        >
                                            {
                                                index === 0 || Messages[index + 3 - 1].role !== Messages[index + 3].role ?  <Avatar alt="Chat Assistant" src={ChatSystemAvatar.src} /> : <Box sx={{width: 40}}/>
                                            }
                                            <Box
                                                sx={{
                                                    display: 'flex', 
                                                    flexDirection: 'column', 
                                                    justifyContent: 'flex-start',
                                                    backgroundColor: '#f5f5f5',
                                                    borderRadius: 2,
                                                    ml:1,
                                                    maxWidth: '300px', // Set a maximum width
                                                }}
                                            >   
                                                <Typography variant='body1' sx={{p: 1.2}}>
                                                    <div dangerouslySetInnerHTML={{ __html: message.content }}></div>
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ) : (
                                        <Box
                                        key={index}
                                        sx={{
                                            display: 'flex', 
                                            flexDirection: 'row', 
                                            justifyContent: 'flex-end',
                                            mb:1
                                        }}
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex', 
                                                    flexDirection: 'column', 
                                                    justifyContent: 'flex-start',
                                                    backgroundColor: theme.palette.primary.main,
                                                    color: 'white',
                                                    borderRadius: 2,
                                                    mr:1,
                                                    maxWidth: '250px', // Set a maximum width
                                                }}
                                            >   
                                                <Typography variant='body1' sx={{p: 1.2}} >
                                                    {message.content}
                                                </Typography>
                                            </Box>
                                            {
                                                index === 0 || Messages[index + 3 - 1].role !== Messages[index + 3].role ?  <Avatar alt= "User" src={ReaderAvatar.src} />  : <Box sx={{width: 50}}/>
                                            }   
                                        </Box>
                                    )
                                ))}
                                <div ref={messagesEndRef} />
                            </Box> 
                    
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    p: 1, // Add some padding
                                }}
                            >
                                { Messages.length === 6 ? (
                                    <Stack direction="column" spacing={1}  sx={{ width: '100%' }}>
                                        {preselectedMessages.map((message, index) => (
                                            <Chip
                                                key={index}
                                                label={message}
                                                onClick={() => {
                                                   Messages.push({role: 'system', content: onSelectionMessages[index]});
                                                    handleMessage({messages: Messages});
                                                }} 
                                                color="primary"
                                                variant='outlined'
                                                sx={{
                                                    minWidth: 'max-content',  
                                                    boxShadow: '0 3px 5px 2px transparent',  
                                                    ':hover': {
                                                        boxShadow: '0 3px 5px 2px rgba(63, 81, 181, .3)', // Changes the shadow on hover
                                                    },
                                                    cursor: 'pointer'
                                                }}
                                                clickable
                                            />
                                        ))}
                                    </Stack>
                                ) : (
                                    null
                                )}
                            </Box>
 
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    p: 1, // Add some padding
                                }}
                            >
                                {isLoading ? (
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <CircularProgress />
                                        <Typography sx={{ ml: 1 }}>Monika is thinking...</Typography>
                                    </Box>
                                ) : (
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        placeholder="Type your message here..."
                                        value={UserTyping}
                                        onChange={(e) => setUserTyping(e.target.value)}
                                        onKeyDown={(e) => {
                                            if(e.key === 'Enter')
                                            {
                                                Messages.push({role: 'system', content: UserTyping});
                                                handleMessage({messages: Messages});
                                                setUserTyping("");
                                            }
                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <IconButton onClick={
                                                    () => {
                                                        Messages.push({role: 'system', content: UserTyping});
                                                        handleMessage({messages: Messages});
                                                        setUserTyping("");
                                                    }
                                                }>
                                                    <SendIcon />
                                                </IconButton>
                                            )
                                        }}
                                    />
                                )}
                            </Box>
                        </Box>
                    </Popover>
                </motion.div>
            </Box>
        </ThemeProvider>
    );
}