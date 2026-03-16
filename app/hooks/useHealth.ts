"use client"

import { useState, useEffect } from 'react';

export type HealthLog = {
    id: string;
    title: string;
    description: string;
    date: number;
    metrics: string[]; // e.g. ["350 kcal", "145 bpm"]
    type: 'activity' | 'mental';
}

export function useHealth() {
    const [logs, setLogs] = useState<HealthLog[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('nibit_health');
        if (saved) {
            setLogs(JSON.parse(saved));
        } else {
            // Seed initial data
            const seed: HealthLog[] = [
                { id: "1", title: "Morning Run", description: "3.5 miles completed around the campus loop at a 9:00/mi pace.", date: Date.now(), metrics: ["350 kcal", "31 mins", "145 bpm avg"], type: 'activity' },
                { id: "2", title: "Mental Health Check-in", description: "Logged feeling slightly stressed due to upcoming midterms. AI Advisor suggested breathing exercises.", date: Date.now() - 86400000, metrics: ["Mood: Stressed", "Energy: Low"], type: 'mental' }
            ];
            setLogs(seed);
            localStorage.setItem('nibit_health', JSON.stringify(seed));
        }
    }, []);

    const addLog = (log: Omit<HealthLog, 'id' | 'date'>) => {
        const newLog: HealthLog = {
            ...log,
            id: Date.now().toString(),
            date: Date.now()
        };
        const updated = [newLog, ...logs];
        setLogs(updated);
        localStorage.setItem('nibit_health', JSON.stringify(updated));
    };

    return { logs, addLog };
}
