import React, { useState } from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    IconButton,
    Box,
    Tooltip,
    Chip
} from '@mui/material';
import {
    Delete as DeleteIcon,
    PlayArrow as PlayArrowIcon
} from '@mui/icons-material';

const GridSongCard = ({ song, onDelete, isAdmin }) => {
    const [hovered, setHovered] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    const spotifyGreen = '#1DB954';
    
    // Fallback image URLs for different music styles
    const fallbackImages = [
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1571266028243-e68fdf594e2a?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1571266028243-e68fdf594e2a?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop&crop=center'
    ];
    
    const getImageUrl = () => {
        if (imageError) {
            return fallbackImages[song.id % fallbackImages.length];
        }
        return song.coverImage || fallbackImages[0];
    };

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'rgba(40, 40, 40, 0.8)',
                border: '1px solid rgba(85, 85, 85, 0.3)',
                borderRadius: 3,
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(29, 185, 84, 0.2)',
                    borderColor: '#1DB954',
                }
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Image Container with Delete Button */}
            <Box sx={{ position: 'relative', height: 160 }}>
                <CardMedia
                    component="img"
                    image={getImageUrl()}
                    alt={song.title}
                    onLoad={() => setImageLoading(false)}
                    onError={() => {
                        setImageError(true);
                        setImageLoading(false);
                    }}
                    sx={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover',
                        filter: hovered ? 'brightness(0.7)' : 'none',
                        transition: 'all 0.3s ease',
                        bgcolor: imageLoading ? 'rgba(40, 40, 40, 0.8)' : 'transparent'
                    }}
                />
                
                {/* Loading placeholder */}
                {imageLoading && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'rgba(40, 40, 40, 0.8)',
                            color: '#1DB954',
                            fontSize: '2rem'
                        }}
                    >
                        🎵
                    </Box>
                )}
                
                {/* Play Button Overlay */}
                {hovered && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            bgcolor: 'rgba(0, 0, 0, 0.7)',
                            borderRadius: '50%',
                            p: 1,
                            backdropFilter: 'blur(10px)',
                            animation: 'fadeInScale 0.3s ease'
                        }}
                    >
                        <PlayArrowIcon 
                            sx={{ 
                                fontSize: 40, 
                                color: spotifyGreen,
                                '&:hover': {
                                    transform: 'scale(1.1)'
                                }
                            }} 
                        />
                    </Box>
                )}

                {/* Delete Button */}
                {isAdmin && onDelete && (
                    <Tooltip title="Delete Song">
                        <IconButton
                            onClick={() => onDelete(song.id)}
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                bgcolor: 'rgba(255, 107, 107, 0.9)',
                                color: 'white',
                                width: 32,
                                height: 32,
                                '&:hover': {
                                    bgcolor: '#ff5252',
                                    transform: 'scale(1.1)'
                                },
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                )}
            </Box>

            {/* Content */}
            <CardContent sx={{ 
                p: 2, 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                <Box>
                    {/* Song Title */}
                    <Typography 
                        variant="h6" 
                        component="div" 
                        sx={{
                            fontWeight: 700,
                            color: 'white',
                            fontSize: '1.1rem',
                            mb: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            minHeight: '2.6rem'
                        }}
                    >
                        {song.title}
                    </Typography>

                    {/* Artist */}
                    <Typography 
                        variant="body2" 
                        sx={{
                            color: '#b3b3b3',
                            fontWeight: 500,
                            mb: 0.5,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {song.artist}
                    </Typography>

                    {/* Album and Year */}
                    <Typography 
                        variant="body2" 
                        sx={{
                            color: '#888',
                            fontSize: '0.85rem',
                            mb: 1.5,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {song.album} • {song.year}
                    </Typography>
                </Box>

                {/* Chips */}
                <Box sx={{ 
                    display: 'flex', 
                    gap: 1.5, 
                    flexWrap: 'wrap',
                    mt: 'auto'
                }}>
                    <Chip
                        label={song.genre}
                        size="small"
                        sx={{
                            bgcolor: spotifyGreen,
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            height: 24,
                            '& .MuiChip-label': {
                                px: 1.5
                            }
                        }}
                    />
                    <Chip
                        label={song.duration}
                        size="small"
                        sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                            color: '#b3b3b3',
                            fontWeight: 500,
                            fontSize: '0.75rem',
                            height: 24,
                            '& .MuiChip-label': {
                                px: 1.5
                            }
                        }}
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

export default GridSongCard;
