import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    IconButton,
    Paper,
    Collapse,
    Stack,
    Tooltip,
    InputAdornment,
    Button
} from '@mui/material';
import {
    Clear as ClearIcon,
    Search as SearchIcon,
    Sort as SortIcon,
    Group as GroupIcon
} from '@mui/icons-material';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';

const filterFields = [
    { value: 'title', label: 'Title' },
    { value: 'artist', label: 'Artist' },
    { value: 'album', label: 'Album' },
    { value: 'genre', label: 'Genre' },
    { value: 'year', label: 'Year' }
];

const FilterControls = ({
    onFilter,
    onSort,
    onGroupBy,
    onClear
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [filterField, setFilterField] = useState('title');
    const [filterValue, setFilterValue] = useState('');
    const [sortField, setSortField] = useState('title');
    const [groupField, setGroupField] = useState('album');
    const [hasActiveFilters, setHasActiveFilters] = useState(false);

    useEffect(() => {
        if (filterValue.trim()) {
            onFilter(filterField, filterValue);
        } else {
            onClear();
        }

        const hasActiveFilter = filterValue.trim() !== '';
        const hasActiveSort = sortField !== 'title';
        const hasActiveGroup = groupField !== 'album';
        setHasActiveFilters(hasActiveFilter || hasActiveSort || hasActiveGroup);
    }, [filterField, filterValue, onFilter, onClear, sortField, groupField]);

    useEffect(() => {
        onSort(sortField);

        const hasActiveFilter = filterValue.trim() !== '';
        const hasActiveSort = sortField !== 'title';
        const hasActiveGroup = groupField !== 'album';
        setHasActiveFilters(hasActiveFilter || hasActiveSort || hasActiveGroup);
    }, [sortField, onSort, filterValue, groupField]);

    useEffect(() => {
        onGroupBy(groupField);

        const hasActiveFilter = filterValue.trim() !== '';
        const hasActiveSort = sortField !== 'title';
        const hasActiveGroup = groupField !== 'album';
        setHasActiveFilters(hasActiveFilter || hasActiveSort || hasActiveGroup);
    }, [groupField, onGroupBy, filterValue, sortField]);

    const handleClearFilters = () => {
        setFilterValue('');
        setFilterField('title');
        setSortField('title');
        setGroupField('album');
        onClear();
        setHasActiveFilters(false);
    };

    return (
        <Box sx={{ mb: 2 }}>
            {/* Enhanced Toggle Button */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                <Button
                    onClick={() => setIsExpanded(!isExpanded)}
                    startIcon={isExpanded ? <FilterListOffIcon /> : <FilterListIcon />}
                    sx={{
                        bgcolor: '#1DB954',
                        color: 'white',
                        '&:hover': {
                            bgcolor: '#1ed760',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 20px rgba(29, 185, 84, 0.4)',
                        },
                        boxShadow: '0 4px 16px rgba(29, 185, 84, 0.3)',
                        borderRadius: '30px',
                        px: 4,
                        py: 2,
                        minWidth: 140,
                        fontWeight: 700,
                        textTransform: 'none',
                        fontSize: '1rem',
                        letterSpacing: '0.5px',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: '-100%',
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                            transition: 'left 0.5s',
                        },
                        '&:hover::before': {
                            left: '100%',
                        }
                    }}
                >
                    {isExpanded ? 'Hide Filters' : 'Show Filters'}
                </Button>
                
                {/* Active Filters Indicator */}
                {hasActiveFilters && (
                    <Box sx={{
                        bgcolor: '#ff6b6b',
                        color: 'white',
                        borderRadius: '20px',
                        px: 2,
                        py: 0.5,
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        animation: 'pulse 2s infinite',
                        '@keyframes pulse': {
                            '0%': { opacity: 1 },
                            '50%': { opacity: 0.7 },
                            '100%': { opacity: 1 }
                        }
                    }}>
                        Active Filters
                    </Box>
                )}
            </Box>

            <Collapse in={isExpanded} timeout={400}>
                <Paper
                    elevation={0}
                    sx={{
                        bgcolor: 'rgba(40, 40, 40, 0.95)',
                        border: '2px solid transparent',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        mt: 2,
                        width: '100%',
                        backdropFilter: 'blur(20px)',
                        background: 'linear-gradient(135deg, rgba(40, 40, 40, 0.95) 0%, rgba(60, 60, 60, 0.9) 100%)',
                        '&:hover': {
                            borderColor: '#1DB954',
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(29, 185, 84, 0.2)',
                            transform: 'translateY(-2px)'
                        }
                    }}
                >
                    <Box sx={{ p: 3, width: '100%' }}>
                        <Stack
                            direction={{ xs: 'column', lg: 'row' }}
                            spacing={2}
                            alignItems={{ xs: 'stretch', lg: 'center' }}
                            justifyContent="space-between"
                            sx={{ width: '100%' }}
                        >

                            {/* Search Section */}
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: { xs: 'stretch', sm: 'center' }, 
                                gap: { xs: 2, sm: 3 }, 
                                flex: 1, 
                                minWidth: { xs: '100%', lg: 400 },
                                flexDirection: { xs: 'column', sm: 'row' },
                                mb: { xs: 3, lg: 0 }
                            }}>
                                {/* Filter By Dropdown */}
                                <Box sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: 2,
                                    width: { xs: '100%', sm: 'auto' },
                                    minWidth: { xs: '100%', sm: 200 }
                                }}>
                                    <FormControl sx={{ 
                                        minWidth: { xs: '100%', sm: 160 },
                                        width: { xs: '100%', sm: 'auto' }
                                    }} size="small">
                                        <InputLabel sx={{ 
                                            color: '#b3b3b3', 
                                            fontWeight: 500,
                                            fontSize: { xs: '0.9rem', sm: '1rem' }
                                        }}>Filter By</InputLabel>
                                        <Select
                                            value={filterField}
                                            label="Filter By"
                                            onChange={(e) => setFilterField(e.target.value)}
                                            sx={{
                                                bgcolor: 'rgba(62, 62, 62, 0.8)',
                                                color: 'white',
                                                borderRadius: '12px',
                                                fontSize: { xs: '0.9rem', sm: '1rem' },
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#404040',
                                                },
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#1DB954',
                                                },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#1DB954',
                                                    borderWidth: 2,
                                                },
                                                '& .MuiSvgIcon-root': {
                                                    color: '#1DB954',
                                                }
                                            }}
                                        >
                                            {filterFields.map((field) => (
                                                <MenuItem
                                                    key={field.value}
                                                    value={field.value}
                                                    sx={{
                                                        bgcolor: '#3E3E3E',
                                                        color: 'white',
                                                        fontSize: { xs: '0.9rem', sm: '1rem' },
                                                        '&:hover': {
                                                            bgcolor: '#404040',
                                                        },
                                                        '&.Mui-selected': {
                                                            bgcolor: '#1DB954',
                                                            '&:hover': {
                                                                bgcolor: '#1ed760',
                                                            }
                                                        }
                                                    }}
                                                >
                                                    {field.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>

                                {/* Search Input */}
                                <TextField
                                    placeholder="Search songs, artists, albums..."
                                    value={filterValue}
                                    onChange={(e) => setFilterValue(e.target.value)}
                                    size="small"
                                    sx={{
                                        width: { xs: '100%', sm: 'auto' },
                                        minWidth: { xs: '100%', sm: 280 },
                                        flex: { xs: 'none', sm: 1 },
                                        '& .MuiOutlinedInput-root': {
                                            bgcolor: 'rgba(62, 62, 62, 0.8)',
                                            color: 'white',
                                            borderRadius: '12px',
                                            fontSize: { xs: '0.9rem', sm: '1rem' },
                                            '& fieldset': {
                                                borderColor: '#404040',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#1DB954',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#1DB954',
                                                borderWidth: 2,
                                            },
                                        },
                                        '& .MuiInputBase-input': {
                                            color: 'white',
                                            fontSize: { xs: '0.9rem', sm: '1rem' },
                                            '&::placeholder': {
                                                color: '#b3b3b3',
                                                opacity: 1,
                                                fontSize: { xs: '0.85rem', sm: '1rem' }
                                            }
                                        }
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon sx={{ 
                                                    color: '#1DB954', 
                                                    fontSize: { xs: 18, sm: 20 } 
                                                }} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: filterValue && (
                                            <InputAdornment position="end">
                                                <Tooltip title="Clear search">
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => setFilterValue('')}
                                                        edge="end"
                                                        sx={{ 
                                                            color: '#1DB954',
                                                            '&:hover': {
                                                                bgcolor: 'rgba(29, 185, 84, 0.1)'
                                                            }
                                                        }}
                                                    >
                                                        <ClearIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Box>


                            {/* Sort and Group Controls */}
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 4,
                                flexDirection: { xs: 'column', sm: 'row' },
                                minWidth: { xs: '100%', lg: 'auto' }
                            }}>
                                {/* Sort Control */}
                                <Box sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: 2,
                                    minWidth: { xs: '100%', sm: 200 }
                                }}>
                                    <FormControl sx={{ minWidth: 160, flex: 1 }} size="small">
                                        <InputLabel sx={{ color: '#b3b3b3', fontWeight: 500 }}>Sort By</InputLabel>
                                        <Select
                                            value={sortField}
                                            label="Sort By"
                                            onChange={(e) => setSortField(e.target.value)}
                                            sx={{
                                                bgcolor: 'rgba(62, 62, 62, 0.8)',
                                                color: 'white',
                                                borderRadius: '12px',
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#404040',
                                                },
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#1DB954',
                                                },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#1DB954',
                                                    borderWidth: 2,
                                                },
                                                '& .MuiSvgIcon-root': {
                                                    color: '#1DB954',
                                                }
                                            }}
                                        >
                                            {filterFields.map((field) => (
                                                <MenuItem
                                                    key={field.value}
                                                    value={field.value}
                                                    sx={{
                                                        bgcolor: '#3E3E3E',
                                                        color: 'white',
                                                        '&:hover': {
                                                            bgcolor: '#404040',
                                                        },
                                                        '&.Mui-selected': {
                                                            bgcolor: '#1DB954',
                                                            '&:hover': {
                                                                bgcolor: '#1ed760',
                                                            }
                                                        }
                                                    }}
                                                >
                                                    {field.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>

                                {/* Group Control */}
                                <Box sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: 2,
                                    minWidth: { xs: '100%', sm: 200 }
                                }}>
                                    <FormControl sx={{ minWidth: 160, flex: 1 }} size="small">
                                        <InputLabel sx={{ color: '#b3b3b3', fontWeight: 500 }}>Group By</InputLabel>
                                        <Select
                                            value={groupField}
                                            label="Group By"
                                            onChange={(e) => setGroupField(e.target.value)}
                                            sx={{
                                                bgcolor: 'rgba(62, 62, 62, 0.8)',
                                                color: 'white',
                                                borderRadius: '12px',
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#404040',
                                                },
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#1DB954',
                                                },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#1DB954',
                                                    borderWidth: 2,
                                                },
                                                '& .MuiSvgIcon-root': {
                                                    color: '#1DB954',
                                                }
                                            }}
                                        >
                                            {filterFields.map((field) => (
                                                <MenuItem
                                                    key={field.value}
                                                    value={field.value}
                                                    sx={{
                                                        bgcolor: '#3E3E3E',
                                                        color: 'white',
                                                        '&:hover': {
                                                            bgcolor: '#404040',
                                                        },
                                                        '&.Mui-selected': {
                                                            bgcolor: '#1DB954',
                                                            '&:hover': {
                                                                bgcolor: '#1ed760',
                                                            }
                                                        }
                                                    }}
                                                >
                                                    {field.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>

                            {/* Clear All Button */}
                            {hasActiveFilters && (
                                <Box sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    mt: { xs: 3, lg: 0 }
                                }}>
                                    <Tooltip title="Clear all filters">
                                        <Button
                                            onClick={handleClearFilters}
                                            variant="outlined"
                                            size="large"
                                            sx={{
                                                borderColor: '#ff6b6b',
                                                color: '#ff6b6b',
                                                bgcolor: 'rgba(255, 107, 107, 0.1)',
                                                '&:hover': {
                                                    borderColor: '#ff5252',
                                                    bgcolor: 'rgba(255, 107, 107, 0.2)',
                                                    transform: 'scale(1.05)',
                                                },
                                                borderRadius: '25px',
                                                textTransform: 'none',
                                                fontWeight: 600,
                                                px: 4,
                                                py: 1.5,
                                                fontSize: '1rem',
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                boxShadow: '0 4px 12px rgba(255, 107, 107, 0.3)',
                                            }}
                                        >
                                            Clear All Filters
                                        </Button>
                                    </Tooltip>
                                </Box>
                            )}
                        </Stack>
                    </Box>
                </Paper>
            </Collapse>
        </Box>
    );
};

export default FilterControls; 