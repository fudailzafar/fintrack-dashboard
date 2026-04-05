// Categories with their colors and icons
export const CATEGORIES = {
  'Food & Dining': { color: '#f97316', icon: 'UtensilsCrossed' },
  'Shopping': { color: '#8b5cf6', icon: 'ShoppingBag' },
  'Transport': { color: '#3b82f6', icon: 'Car' },
  'Entertainment': { color: '#ec4899', icon: 'Gamepad2' },
  'Bills & Utilities': { color: '#ef4444', icon: 'Zap' },
  'Health': { color: '#10b981', icon: 'HeartPulse' },
  'Salary': { color: '#22c55e', icon: 'Briefcase' },
  'Freelance': { color: '#06b6d4', icon: 'Laptop' },
  'Investments': { color: '#eab308', icon: 'TrendingUp' },
  'Education': { color: '#6366f1', icon: 'GraduationCap' },
};

let idCounter = 1;
const tx = (date, description, amount, category, type) => ({
  id: idCounter++,
  date,
  description,
  amount,
  category,
  type,
});

export const mockTransactions = [
  // January 2026
  tx('2026-01-02', 'Monthly Salary', 5200, 'Salary', 'income'),
  tx('2026-01-03', 'Grocery Store', 87.50, 'Food & Dining', 'expense'),
  tx('2026-01-05', 'Electric Bill', 124.00, 'Bills & Utilities', 'expense'),
  tx('2026-01-07', 'Gym Membership', 45.00, 'Health', 'expense'),
  tx('2026-01-10', 'Freelance Web Project', 850, 'Freelance', 'income'),
  tx('2026-01-12', 'Online Shopping - Clothes', 210.00, 'Shopping', 'expense'),
  tx('2026-01-14', 'Uber Rides', 32.50, 'Transport', 'expense'),
  tx('2026-01-18', 'Restaurant Dinner', 78.00, 'Food & Dining', 'expense'),
  tx('2026-01-22', 'Netflix & Spotify', 28.99, 'Entertainment', 'expense'),
  tx('2026-01-25', 'Stock Investment', 500.00, 'Investments', 'expense'),

  // February 2026
  tx('2026-02-01', 'Monthly Salary', 5200, 'Salary', 'income'),
  tx('2026-02-03', 'Grocery Store', 95.20, 'Food & Dining', 'expense'),
  tx('2026-02-05', 'Internet Bill', 79.99, 'Bills & Utilities', 'expense'),
  tx('2026-02-08', 'Freelance Logo Design', 420, 'Freelance', 'income'),
  tx('2026-02-10', 'Gas Station', 55.00, 'Transport', 'expense'),
  tx('2026-02-12', 'New Sneakers', 149.99, 'Shopping', 'expense'),
  tx('2026-02-14', 'Valentine Dinner', 135.00, 'Food & Dining', 'expense'),
  tx('2026-02-17', 'Doctor Visit', 95.00, 'Health', 'expense'),
  tx('2026-02-20', 'Concert Tickets', 120.00, 'Entertainment', 'expense'),
  tx('2026-02-25', 'Online Course', 199.00, 'Education', 'expense'),

  // March 2026
  tx('2026-03-01', 'Monthly Salary', 5200, 'Salary', 'income'),
  tx('2026-03-02', 'Freelance App Dev', 1200, 'Freelance', 'income'),
  tx('2026-03-04', 'Grocery Store', 110.75, 'Food & Dining', 'expense'),
  tx('2026-03-06', 'Water Bill', 42.00, 'Bills & Utilities', 'expense'),
  tx('2026-03-08', 'Parking Fees', 28.00, 'Transport', 'expense'),
  tx('2026-03-11', 'Electronics - Headphones', 189.99, 'Shopping', 'expense'),
  tx('2026-03-14', 'Pizza Night', 45.00, 'Food & Dining', 'expense'),
  tx('2026-03-17', 'Gym Membership', 45.00, 'Health', 'expense'),
  tx('2026-03-20', 'Movie Tickets', 36.00, 'Entertainment', 'expense'),
  tx('2026-03-25', 'Mutual Fund', 600.00, 'Investments', 'expense'),
  tx('2026-03-28', 'Dividend Income', 85.00, 'Investments', 'income'),

  // April 2026 (partial)
  tx('2026-04-01', 'Monthly Salary', 5400, 'Salary', 'income'),
  tx('2026-04-02', 'Grocery Store', 92.30, 'Food & Dining', 'expense'),
  tx('2026-04-03', 'Phone Bill', 65.00, 'Bills & Utilities', 'expense'),
  tx('2026-04-03', 'Taxi Ride', 18.50, 'Transport', 'expense'),
  tx('2026-04-04', 'Book Purchase', 34.99, 'Education', 'expense'),
  tx('2026-04-04', 'Coffee Shop', 12.80, 'Food & Dining', 'expense'),
  tx('2026-04-04', 'Freelance Consulting', 650, 'Freelance', 'income'),

  // Older months for trend
  tx('2025-11-01', 'Monthly Salary', 5000, 'Salary', 'income'),
  tx('2025-11-05', 'Groceries', 102.00, 'Food & Dining', 'expense'),
  tx('2025-11-10', 'Electricity', 118.00, 'Bills & Utilities', 'expense'),
  tx('2025-11-15', 'Clothing', 175.00, 'Shopping', 'expense'),
  tx('2025-11-20', 'Uber', 40.00, 'Transport', 'expense'),
  tx('2025-11-25', 'Freelance Work', 600, 'Freelance', 'income'),

  tx('2025-12-01', 'Monthly Salary', 5000, 'Salary', 'income'),
  tx('2025-12-05', 'Holiday Shopping', 450.00, 'Shopping', 'expense'),
  tx('2025-12-08', 'Groceries', 130.00, 'Food & Dining', 'expense'),
  tx('2025-12-12', 'Heating Bill', 155.00, 'Bills & Utilities', 'expense'),
  tx('2025-12-15', 'Christmas Dinner', 200.00, 'Food & Dining', 'expense'),
  tx('2025-12-20', 'Year-end Bonus', 2000, 'Salary', 'income'),
  tx('2025-12-22', 'New Year Party', 85.00, 'Entertainment', 'expense'),
  tx('2025-12-28', 'Stock Investment', 800.00, 'Investments', 'expense'),
];

export const getMonthlyData = (transactions) => {
  const monthly = {};
  transactions.forEach((t) => {
    const month = t.date.substring(0, 7);
    if (!monthly[month]) monthly[month] = { income: 0, expense: 0 };
    if (t.type === 'income') monthly[month].income += t.amount;
    else monthly[month].expense += t.amount;
  });

  const sortedKeys = Object.keys(monthly).sort();
  let runningBalance = 0;
  return sortedKeys.map((key) => {
    const [year, month] = key.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const label = `${monthNames[parseInt(month) - 1]} ${year.slice(2)}`;
    runningBalance += monthly[key].income - monthly[key].expense;
    return {
      month: label,
      income: Math.round(monthly[key].income * 100) / 100,
      expense: Math.round(monthly[key].expense * 100) / 100,
      balance: Math.round(runningBalance * 100) / 100,
    };
  });
};

export const getCategoryTotals = (transactions) => {
  const totals = {};
  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      totals[t.category] = (totals[t.category] || 0) + t.amount;
    });
  return Object.entries(totals)
    .map(([name, value]) => ({
      name,
      value: Math.round(value * 100) / 100,
      color: CATEGORIES[name]?.color || '#94a3b8',
    }))
    .sort((a, b) => b.value - a.value);
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (dateStr) => {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
