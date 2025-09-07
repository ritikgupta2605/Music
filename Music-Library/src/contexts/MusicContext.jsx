import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { mockSongs } from '../data/mockSongs.js';

const MusicContext = createContext(undefined);

export const useMusic = () => {
    const context = useContext(MusicContext);
    if (!context) {
        console.error('MusicContext is undefined. Make sure MusicProvider is wrapping the component.');
        throw new Error('useMusic must be used within a MusicProvider');
    }
    return context;
};

export const MusicProvider = ({ children }) => {
    const [songs, setSongs] = useState(mockSongs);
    const [filterField, setFilterField] = useState(null);
    const [filterValue, setFilterValue] = useState('');
    const [sortField, setSortField] = useState('title');
    const [groupField, setGroupField] = useState('album');

    const filterBy = useCallback((field, value) => {
        setFilterField(field);
        setFilterValue(value);
    }, []);

    const sortBy = useCallback((field) => {
        setSortField(field);
    }, []);

    const groupBy = useCallback((field) => {
        setGroupField(field);
    }, []);

    const clearFilters = useCallback(() => {
        setFilterField(null);
        setFilterValue('');
        setSortField('title');
        setGroupField('album');
    }, []);

    const addSong = useCallback((song) => {
        setSongs(prev => [...prev, { ...song, id: Math.max(...prev.map(s => s.id)) + 1 }]);
    }, []);

    const deleteSong = useCallback((id) => {
        setSongs(prev => prev.filter(song => song.id !== id));
    }, []);

    const filteredSongs = useMemo(() => {
        let result = [...songs];


        if (filterField && filterValue) {
            result = result.filter(song => {
                const fieldValue = String(song[filterField]).toLowerCase();
                return fieldValue.includes(filterValue.toLowerCase());
            });
        }


        result.sort((a, b) => {
            const aValue = String(a[sortField]).toLowerCase();
            const bValue = String(b[sortField]).toLowerCase();
            return aValue.localeCompare(bValue);
        });

        return result;
    }, [songs, filterField, filterValue, sortField]);

    const groupedSongs = useMemo(() => {
        if (!filteredSongs.length) {
            return { 'All Songs': [] };
        }

        return filteredSongs.reduce((groups, song) => {
            const key = String(song[groupField]);
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(song);
            return groups;
        }, {});
    }, [filteredSongs, groupField]);

    const value = {
        songs,
        filteredSongs,
        groupedSongs,
        filterBy,
        sortBy,
        groupBy,
        clearFilters,
        addSong,
        deleteSong
    };

    return (
        <MusicContext.Provider value={value}>
            {children}
        </MusicContext.Provider>
    );
}; 