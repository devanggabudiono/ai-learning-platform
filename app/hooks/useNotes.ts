"use client"

import { useState, useEffect } from 'react';

export type Note = {
    id: string;
    title: string;
    content: string;
    createdAt: number;
    source?: string;
}

export function useNotes() {
    const [notes, setNotes] = useState<Note[]>([]);
    
    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('nibit_notes');
        if (saved) {
            setNotes(JSON.parse(saved));
        }
    }, []);

    // Save notes
    const addNote = (note: Omit<Note, 'id' | 'createdAt'>) => {
        const newNote: Note = {
            ...note,
            id: Date.now().toString(),
            createdAt: Date.now()
        };
        const updatedNotes = [newNote, ...notes];
        setNotes(updatedNotes);
        localStorage.setItem('nibit_notes', JSON.stringify(updatedNotes));
    };

    const deleteNote = (id: string) => {
        const updatedNotes = notes.filter(n => n.id !== id);
        setNotes(updatedNotes);
        localStorage.setItem('nibit_notes', JSON.stringify(updatedNotes));
    };

    return { notes, addNote, deleteNote };
}
