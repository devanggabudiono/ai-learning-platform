"use client"

import { useState, useEffect } from 'react';

export type Transaction = {
    id: string;
    title: string;
    amount: number;
    category: string;
    type: 'income' | 'expense';
    date: number;
}

export function useFinance() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [balance, setBalance] = useState(1240.50); // Mocks Initial

    useEffect(() => {
        const saved = localStorage.getItem('nibit_finance');
        if (saved) {
            setTransactions(JSON.parse(saved));
        } else {
            // Seed with initial data if empty
            const seed: Transaction[] = [
                { id: "1", title: "University Textbooks", amount: 120, category: "Education", type: "expense", date: Date.now() - 86400000 },
                { id: "2", title: "Campus Coffee Shop", amount: 4.50, category: "Food", type: "expense", date: Date.now() - 172800000 },
                { id: "3", title: "Part-time Job Deposit", amount: 450, category: "Income", type: "income", date: Date.now() - 259200000 },
            ];
            setTransactions(seed);
            localStorage.setItem('nibit_finance', JSON.stringify(seed));
        }
    }, []);

    const addTransaction = (t: Omit<Transaction, 'id' | 'date'>) => {
        const newTx: Transaction = {
            ...t,
            id: Date.now().toString(),
            date: Date.now()
        };
        const updated = [newTx, ...transactions];
        setTransactions(updated);
        
        // Update mock balance
        setBalance(prev => t.type === 'income' ? prev + t.amount : prev - t.amount);
        localStorage.setItem('nibit_finance', JSON.stringify(updated));
    };

    const deleteTransaction = (id: string) => {
        const tx = transactions.find(t => t.id === id);
        if (tx) {
            setBalance(prev => tx.type === 'income' ? prev - tx.amount : prev + tx.amount);
            const updated = transactions.filter(t => t.id !== id);
            setTransactions(updated);
            localStorage.setItem('nibit_finance', JSON.stringify(updated));
        }
    };

    return { transactions, balance, addTransaction, deleteTransaction };
}
