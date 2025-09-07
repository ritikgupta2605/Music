import React, { useState } from 'react';
import {
    Box,
    Typography,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Fab,
    useTheme,
    Slide,
    Grow,
    Zoom,
    Tooltip,
    Grid
} from '@mui/material';
import {
    Add as AddIcon,
} from '@mui/icons-material';
import { useMusic, MusicProvider } from './contexts/MusicContext.jsx';
import GridSongCard from './components/GridSongCard.jsx';
import FilterControls from './components/FilterControls.jsx';

const MusicLibraryContent = ({ isAdmin = false, onError }) => {
    const theme = useTheme();
    const {
        filterBy,
        sortBy,
        groupBy,
        addSong,
        deleteSong,
        clearFilters,
        groupedSongs
    } = useMusic();

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [newSong, setNewSong] = useState({
        title: '',
        artist: '',
        album: '',
        genre: '',
        year: new Date().getFullYear(),
        duration: '0:00'
    });

    const handleAddSong = () => {
        try {
            // Validate required fields
            if (!newSong.title.trim() || !newSong.artist.trim() || !newSong.album.trim()) {
                onError?.('Please fill in all required fields (Title, Artist, Album)');
                return;
            }
            
            addSong(newSong);
            setIsAddDialogOpen(false);
            setNewSong({
                title: '',
                artist: '',
                album: '',
                genre: '',
                year: new Date().getFullYear(),
                duration: '0:00'
            });
        } catch (error) {
            onError?.(`Failed to add song: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 2 }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                        mb: 3,
                        color: '#1DB954'
                    }}
                >
                    <Box
                        component="svg"
                        viewBox="0 0 24 24"
                        sx={{
                            width: 40,
                            height: 40,
                            fill: '#1DB954'
                        }}
                    >
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </Box>
                    <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
                        Music App
                    </Typography>
                </Box>

                <FilterControls
                    onFilter={filterBy}
                    onSort={sortBy}
                    onGroupBy={groupBy}
                    onClear={clearFilters}
                />

                {/* Display all songs in a single grid */}
                <Box sx={{ mb: 2 }}>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            color: '#1DB954', 
                            fontWeight: 700, 
                            mb: 2,
                            fontSize: '1.25rem'
                        }}
                    >
                        All Songs ({Object.values(groupedSongs).flat().length} songs)
                    </Typography>

                    {/* Grid of Songs */}
                    <Grid container spacing={2}>
                        {Object.values(groupedSongs).flat().map((song, idx) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={song.id}>
                                <GridSongCard
                                    song={song}
                                    onDelete={isAdmin ? deleteSong : undefined}
                                    isAdmin={isAdmin}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {isAdmin && (
                    <Zoom in timeout={500}>
                        <Tooltip
                            title="Add New Song"
                            placement="left"
                            arrow
                            sx={{
                                '& .MuiTooltip-tooltip': {
                                    bgcolor: '#1DB954',
                                    color: 'white',
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                                },
                                '& .MuiTooltip-arrow': {
                                    color: '#1DB954',
                                },
                            }}
                        >
                            <Fab
                                color="primary"
                                sx={{
                                    position: 'fixed',
                                    bottom: 16,
                                    right: 16,
                                    transition: 'all 0.3s ease',
                                    bgcolor: '#1DB954',
                                    animation: 'pulse 2s infinite',
                                    '@keyframes pulse': {
                                        '0%': {
                                            boxShadow: '0 0 0 0 rgba(29, 185, 84, 0.7)',
                                            transform: 'scale(1)',
                                        },
                                        '70%': {
                                            boxShadow: '0 0 0 10px rgba(29, 185, 84, 0)',
                                            transform: 'scale(1.05)',
                                        },
                                        '100%': {
                                            boxShadow: '0 0 0 0 rgba(29, 185, 84, 0)',
                                            transform: 'scale(1)',
                                        },
                                    },
                                    '&:hover': {
                                        animation: 'none',
                                        transform: 'scale(1.1)',
                                        boxShadow: '0 8px 25px rgba(29, 185, 84, 0.4)',
                                        bgcolor: '#1ed760',
                                    },
                                }}
                                onClick={() => setIsAddDialogOpen(true)}
                                aria-label="Add new song"
                            >
                                <AddIcon sx={{ fontSize: 28 }} />
                            </Fab>
                        </Tooltip>
                    </Zoom>
                )}

                <Dialog
                    open={isAddDialogOpen}
                    onClose={() => setIsAddDialogOpen(false)}
                    TransitionComponent={Slide}
                    TransitionProps={{ direction: 'up' }}
                    maxWidth="sm"
                    fullWidth
                    PaperProps={{
                        sx: {
                            borderRadius: 2,
                            boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                        }
                    }}
                >
                    <DialogTitle sx={{
                        bgcolor: '#1DB954',
                        color: 'white',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                    }}>
                        <Box
                            component="svg"
                            viewBox="0 0 24 24"
                            sx={{ width: 24, height: 24, fill: 'white' }}
                        >
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                        </Box>
                        Add New Song
                    </DialogTitle>
                    <DialogContent sx={{ pt: 3, bgcolor: 'rgba(29, 185, 84, 0.02)' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                label="Title"
                                value={newSong.title}
                                onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
                                fullWidth
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&:hover fieldset': {
                                            borderColor: '#1DB954',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#1DB954',
                                        },
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#1DB954',
                                    },
                                }}
                            />
                            <TextField
                                label="Artist"
                                value={newSong.artist}
                                onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
                                fullWidth
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&:hover fieldset': {
                                            borderColor: '#1DB954',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#1DB954',
                                        },
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#1DB954',
                                    },
                                }}
                            />
                            <TextField
                                label="Album"
                                value={newSong.album}
                                onChange={(e) => setNewSong({ ...newSong, album: e.target.value })}
                                fullWidth
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&:hover fieldset': {
                                            borderColor: '#1DB954',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#1DB954',
                                        },
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#1DB954',
                                    },
                                }}
                            />
                            <TextField
                                label="Genre"
                                value={newSong.genre}
                                onChange={(e) => setNewSong({ ...newSong, genre: e.target.value })}
                                fullWidth
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&:hover fieldset': {
                                            borderColor: '#1DB954',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#1DB954',
                                        },
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#1DB954',
                                    },
                                }}
                            />
                            <TextField
                                label="Year"
                                type="number"
                                value={newSong.year}
                                onChange={(e) => setNewSong({ ...newSong, year: parseInt(e.target.value) })}
                                fullWidth
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&:hover fieldset': {
                                            borderColor: '#1DB954',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#1DB954',
                                        },
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#1DB954',
                                    },
                                }}
                            />
                            <TextField
                                label="Duration"
                                value={newSong.duration}
                                onChange={(e) => setNewSong({ ...newSong, duration: e.target.value })}
                                fullWidth
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&:hover fieldset': {
                                            borderColor: '#1DB954',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#1DB954',
                                        },
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#1DB954',
                                    },
                                }}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ p: 2, bgcolor: 'rgba(29, 185, 84, 0.02)' }}>
                        <Button
                            onClick={() => setIsAddDialogOpen(false)}
                            variant="outlined"
                            sx={{
                                borderColor: '#1DB954',
                                color: '#1DB954',
                                '&:hover': {
                                    borderColor: '#1ed760',
                                    bgcolor: 'rgba(29, 185, 84, 0.1)',
                                },
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleAddSong}
                            variant="contained"
                            sx={{
                                bgcolor: '#1DB954',
                                '&:hover': {
                                    bgcolor: '#1ed760',
                                },
                                fontWeight: 600,
                            }}
                        >
                            Add Song
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Container>
    );
};

const MusicLibrary = (props) => {
    return (
        <MusicProvider>
            <MusicLibraryContent {...props} />
        </MusicProvider>
    );
};

export default MusicLibrary;