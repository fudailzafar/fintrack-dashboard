import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockTransactions } from '../data/mockData';

const useStore = create(
  persist(
    (set, get) => ({
      // Role
      role: 'admin',
      setRole: (role) => set({ role }),

      // Theme
      theme: 'dark',
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

      // Active page
      activePage: 'dashboard',
      setActivePage: (activePage) => set({ activePage }),

      // Transactions
      transactions: mockTransactions,
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            {
              ...transaction,
              id: Math.max(0, ...state.transactions.map((t) => t.id)) + 1,
            },
            ...state.transactions,
          ],
        })),
      updateTransaction: (id, updates) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),
      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      // Filters
      filters: {
        search: '',
        category: 'all',
        type: 'all',
        sortBy: 'date',
        sortOrder: 'desc',
      },
      setFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),
      resetFilters: () =>
        set({
          filters: {
            search: '',
            category: 'all',
            type: 'all',
            sortBy: 'date',
            sortOrder: 'desc',
          },
        }),

      // Filtered & sorted transactions
      getFilteredTransactions: () => {
        const { transactions, filters } = get();
        let filtered = [...transactions];

        if (filters.search) {
          const q = filters.search.toLowerCase();
          filtered = filtered.filter(
            (t) =>
              t.description.toLowerCase().includes(q) ||
              t.category.toLowerCase().includes(q)
          );
        }
        if (filters.category !== 'all') {
          filtered = filtered.filter((t) => t.category === filters.category);
        }
        if (filters.type !== 'all') {
          filtered = filtered.filter((t) => t.type === filters.type);
        }

        filtered.sort((a, b) => {
          let cmp = 0;
          if (filters.sortBy === 'date') cmp = a.date.localeCompare(b.date);
          else if (filters.sortBy === 'amount') cmp = a.amount - b.amount;
          else if (filters.sortBy === 'category')
            cmp = a.category.localeCompare(b.category);
          return filters.sortOrder === 'desc' ? -cmp : cmp;
        });

        return filtered;
      },
    }),
    {
      name: 'fintrack-storage',
      partialize: (state) => ({
        transactions: state.transactions,
        theme: state.theme,
        role: state.role,
      }),
    }
  )
);

export default useStore;
