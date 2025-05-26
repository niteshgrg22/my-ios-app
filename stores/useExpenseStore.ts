import { create } from 'zustand';

type Expense = {
  id: string;
  amount: number;
  description: string;
  group: string;
};

type ExpenseStore = {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
};

export const useExpenseStore = create<ExpenseStore>((set) => ({
  expenses: [],
  addExpense: (expense) =>
    set((state) => ({ expenses: [...state.expenses, expense] })),
}));
