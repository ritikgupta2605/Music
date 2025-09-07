import React, { useState, useCallback, useMemo } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  TextField,
  Box,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from '@mui/material';
import { Add, Delete, FilterList } from '@mui/icons-material';

// Mock songs data with cover images
const mockSongs = [
  {
    id: 1,
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    genre: "Rock",
    year: 1975,
    duration: "5:55",
    coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center"
  },
  {
    id: 2,
    title: "Shape of You",
    artist: "Ed Sheeran",
    album: "÷ (Divide)",
    genre: "Pop",
    year: 2017,
    duration: "3:53",
    coverImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&crop=center"
  },
  {
    id: 3,
    title: "Billie Jean",
    artist: "Michael Jackson",
    album: "Thriller",
    genre: "Pop",
    year: 1982,
    duration: "4:54",
    coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop&crop=center"
  },
  {
    id: 4,
    title: "Smells Like Teen Spirit",
    artist: "Nirvana",
    album: "Nevermind",
    genre: "Grunge",
    year: 1991,
    duration: "5:01",
    coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center"
  },
  {
    id: 5,
    title: "Hotel California",
    artist: "Eagles",
    album: "Hotel California",
    genre: "Rock",
    year: 1976,
    duration: "6:30",
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=center"
  },
  {
    id: 6,
    title: "Imagine",
    artist: "John Lennon",
    album: "Imagine",
    genre: "Rock",
    year: 1971,
    duration: "3:07",
    coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center"
  },
  {
    id: 7,
    title: "Sweet Child O' Mine",
    artist: "Guns N' Roses",
    album: "Appetite for Destruction",
    genre: "Rock",
    year: 1987,
    duration: "5:56",
    coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center"
  },
  {
    id: 8,
    title: "Stairway to Heaven",
    artist: "Led Zeppelin",
    album: "Led Zeppelin IV",
    genre: "Rock",
    year: 1971,
    duration: "8:02",
    coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center"
  },
  {
    id: 9,
    title: "Yesterday",
    artist: "The Beatles",
    album: "Help!",
    genre: "Rock",
    year: 1965,
    duration: "2:05",
    coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center"
  },
  {
    id: 10,
    title: "Purple Rain",
    artist: "Prince",
    album: "Purple Rain",
    genre: "Pop Rock",
    year: 1984,
    duration: "8:41",
    coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop&crop=center"
  },
  {
    id: 11,
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    genre: "Pop",
    year: 2020,
    duration: "3:20",
    coverImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&crop=center"
  },
  {
    id: 12,
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    genre: "Pop",
    year: 2020,
    duration: "3:23",
    coverImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&crop=center"
  },
  {
    id: 13,
    title: "Watermelon Sugar",
    artist: "Harry Styles",
    album: "Fine Line",
    genre: "Pop",
    year: 2020,
    duration: "2:54",
    coverImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&crop=center"
  },
  {
    id: 14,
    title: "Good 4 U",
    artist: "Olivia Rodrigo",
    album: "SOUR",
    genre: "Pop",
    year: 2021,
    duration: "2:58",
    coverImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&crop=center"
  },
  {
    id: 15,
    title: "Industry Baby",
    artist: "Lil Nas X",
    album: "MONTERO",
    genre: "Hip Hop",
    year: 2021,
    duration: "3:32",
    coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop&crop=center"
  }
];

const MusicLibraryComponent = ({ isAdmin }) => {
  const [songs, setSongs] = useState(mockSongs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newSong, setNewSong] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
    year: '',
    duration: '',
    coverImage: ''
  });

  // Filter and sort songs
  const filteredAndSortedSongs = useMemo(() => {
    let filtered = songs.filter(song => {
      const matchesSearch = song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           song.album.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = !selectedGenre || song.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'artist':
          return a.artist.localeCompare(b.artist);
        case 'year':
          return b.year - a.year;
        case 'duration':
          return a.duration.localeCompare(b.duration);
        default:
          return 0;
      }
    });
  }, [songs, searchTerm, selectedGenre, sortBy]);

  // Get unique genres
  const genres = useMemo(() => {
    return [...new Set(songs.map(song => song.genre))];
  }, [songs]);

  const handleAddSong = useCallback(() => {
    if (newSong.title && newSong.artist && newSong.album) {
      const song = {
        ...newSong,
        id: Math.max(...songs.map(s => s.id)) + 1,
        year: parseInt(newSong.year) || 2024
      };
      setSongs(prev => [...prev, song]);
      setNewSong({
        title: '',
        artist: '',
        album: '',
        genre: '',
        year: '',
        duration: '',
        coverImage: ''
      });
      setAddDialogOpen(false);
    }
  }, [newSong, songs]);

  const handleDeleteSong = useCallback((id) => {
    setSongs(prev => prev.filter(song => song.id !== id));
  }, []);

  const handleInputChange = (field, value) => {
    setNewSong(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Container maxWidth="xl" sx={{ py: 6, px: 3 }}>
      {/* Header Section */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 6,
        p: 3,
        bgcolor: 'rgba(29, 185, 84, 0.1)',
        borderRadius: 3,
        border: '1px solid rgba(29, 185, 84, 0.2)'
      }}>
        <Box>
          <Typography variant="h3" sx={{ 
            color: '#1DB954', 
            fontWeight: 'bold',
            mb: 1,
            background: 'linear-gradient(45deg, #1DB954, #1ed760)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            🎵 Music Library
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#b3b3b3', fontSize: '1.1rem' }}>
            Discover and manage your favorite tracks
          </Typography>
        </Box>
        {isAdmin && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setAddDialogOpen(true)}
            sx={{ 
              bgcolor: '#1DB954', 
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 'bold',
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(29, 185, 84, 0.3)',
              '&:hover': { 
                bgcolor: '#1ed760',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(29, 185, 84, 0.4)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Add Song
          </Button>
        )}
      </Box>

      {/* Search and Filter Controls */}
      <Box sx={{ 
        mb: 6, 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 2, sm: 3 }, 
        bgcolor: 'rgba(42, 42, 42, 0.8)',
        p: { xs: 3, sm: 4 },
        borderRadius: 3,
        border: '1px solid rgba(85, 85, 85, 0.3)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}>
        <TextField
          placeholder="🔍 Search songs, artists, albums..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ 
            width: { xs: '100%', sm: 'auto' },
            minWidth: { xs: 'auto', sm: 300 },
            flex: { xs: 'none', sm: 1 },
            '& .MuiOutlinedInput-root': {
              bgcolor: 'rgba(26, 26, 26, 0.8)',
              color: 'white',
              borderRadius: 2,
              fontSize: { xs: '0.9rem', sm: '1rem' },
              '&:hover': {
                bgcolor: 'rgba(26, 26, 26, 0.9)'
              }
            },
            '& .MuiInputLabel-root': {
              color: '#b3b3b3',
              fontSize: { xs: '0.9rem', sm: '1rem' }
            }
          }}
        />
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 3 },
          width: { xs: '100%', sm: 'auto' }
        }}>
          <FormControl sx={{ 
            width: { xs: '100%', sm: 'auto' },
            minWidth: { xs: 'auto', sm: 150 }
          }}>
            <InputLabel sx={{ 
              color: '#b3b3b3', 
              fontSize: { xs: '0.9rem', sm: '1rem' }
            }}>🎵 Genre</InputLabel>
            <Select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              label="🎵 Genre"
              sx={{ 
                bgcolor: 'rgba(26, 26, 26, 0.8)',
                color: 'white',
                borderRadius: 2,
                fontSize: { xs: '0.9rem', sm: '1rem' },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(85, 85, 85, 0.5)'
                },
                '&:hover': {
                  bgcolor: 'rgba(26, 26, 26, 0.9)'
                }
              }}
            >
              <MenuItem value="">All Genres</MenuItem>
              {genres.map(genre => (
                <MenuItem key={genre} value={genre}>{genre}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ 
            width: { xs: '100%', sm: 'auto' },
            minWidth: { xs: 'auto', sm: 150 }
          }}>
            <InputLabel sx={{ 
              color: '#b3b3b3', 
              fontSize: { xs: '0.9rem', sm: '1rem' }
            }}>📊 Sort By</InputLabel>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              label="📊 Sort By"
              sx={{ 
                bgcolor: 'rgba(26, 26, 26, 0.8)',
                color: 'white',
                borderRadius: 2,
                fontSize: { xs: '0.9rem', sm: '1rem' },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(85, 85, 85, 0.5)'
                },
                '&:hover': {
                  bgcolor: 'rgba(26, 26, 26, 0.9)'
                }
              }}
            >
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="artist">Artist</MenuItem>
              <MenuItem value="year">Year</MenuItem>
              <MenuItem value="duration">Duration</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Songs Grid */}
      <Grid container spacing={4}>
        {filteredAndSortedSongs.map((song) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={song.id}>
            <Card sx={{ 
              bgcolor: 'rgba(40, 40, 40, 0.9)', 
              color: 'white',
              borderRadius: 3,
              border: '1px solid rgba(85, 85, 85, 0.2)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              '&:hover': { 
                transform: 'translateY(-8px) scale(1.02)', 
                boxShadow: '0 16px 48px rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(29, 185, 84, 0.3)'
              }
            }}>
              <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                <CardMedia
                  component="img"
                  height="240"
                  image={song.coverImage}
                  alt={song.title}
                  sx={{ 
                    objectFit: 'cover',
                    bgcolor: '#333',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <Box
                  sx={{
                    height: 240,
                    bgcolor: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)',
                    display: 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    color: '#666'
                  }}
                >
                  <Typography variant="h2" sx={{ mb: 1 }}>🎵</Typography>
                  <Typography variant="body2">No Image</Typography>
                </Box>
                {/* Overlay for admin actions */}
                {isAdmin && (
                  <Box sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    bgcolor: 'rgba(0, 0, 0, 0.7)',
                    borderRadius: 2,
                    p: 0.5
                  }}>
                    <IconButton
                      onClick={() => handleDeleteSong(song.id)}
                      sx={{ 
                        color: '#ff4444',
                        '&:hover': {
                          bgcolor: 'rgba(255, 68, 68, 0.1)'
                        }
                      }}
                      size="small"
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                )}
              </Box>
              <CardContent sx={{ 
                p: 3, 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <Box>
                  <Typography variant="h6" component="div" sx={{ 
                    fontWeight: 'bold', 
                    mb: 1.5,
                    fontSize: '1.1rem',
                    lineHeight: 1.3,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    minHeight: '2.6rem'
                  }}>
                    {song.title}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: '#b3b3b3', 
                    mb: 1,
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {song.artist}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: '#888', 
                    mb: 2,
                    fontSize: '0.9rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {song.album} • {song.year}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mt: 'auto' }}>
                  <Chip 
                    label={song.genre} 
                    size="small" 
                    sx={{ 
                      bgcolor: '#1DB954', 
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '0.8rem',
                      height: 28
                    }} 
                  />
                  <Chip 
                    label={song.duration} 
                    size="small" 
                    variant="outlined"
                    sx={{ 
                      borderColor: '#555',
                      color: '#b3b3b3',
                      fontSize: '0.8rem',
                      height: 28
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredAndSortedSongs.length === 0 && (
        <Box sx={{ 
          textAlign: 'center', 
          py: 12,
          bgcolor: 'rgba(42, 42, 42, 0.3)',
          borderRadius: 3,
          border: '1px solid rgba(85, 85, 85, 0.2)'
        }}>
          <Typography variant="h4" sx={{ color: '#b3b3b3', mb: 2 }}>
            🎵 No songs found
          </Typography>
          <Typography variant="body1" sx={{ color: '#888' }}>
            Try adjusting your search or filter criteria
          </Typography>
        </Box>
      )}

      {/* Add Song Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Song</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Title"
              value={newSong.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Artist"
              value={newSong.artist}
              onChange={(e) => handleInputChange('artist', e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Album"
              value={newSong.album}
              onChange={(e) => handleInputChange('album', e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Genre"
              value={newSong.genre}
              onChange={(e) => handleInputChange('genre', e.target.value)}
              fullWidth
            />
            <TextField
              label="Year"
              type="number"
              value={newSong.year}
              onChange={(e) => handleInputChange('year', e.target.value)}
              fullWidth
            />
            <TextField
              label="Duration (e.g., 3:45)"
              value={newSong.duration}
              onChange={(e) => handleInputChange('duration', e.target.value)}
              fullWidth
            />
            <TextField
              label="Cover Image URL"
              value={newSong.coverImage}
              onChange={(e) => handleInputChange('coverImage', e.target.value)}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddSong} variant="contained" sx={{ bgcolor: '#1DB954' }}>
            Add Song
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MusicLibraryComponent;
