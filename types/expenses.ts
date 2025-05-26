export type Expense = {
  id: string;
  amount: number;
  description: string;
  group: string;
  payer: 'you' | 'someone';
  created_at?: string;
};
