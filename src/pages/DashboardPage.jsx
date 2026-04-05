import { useMemo } from 'react';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowLeftRight,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import useStore from '../store/useStore';
import {
  getMonthlyData,
  getCategoryTotals,
  formatCurrency,
  formatDate,
  CATEGORIES,
} from '../data/mockData';

function SummaryCard({ icon: Icon, label, value, trend, trendLabel, color }) {
  const isPositive = trend >= 0;
  return (
    <div className="summary-card animate-fade-in">
      <div className="summary-card__icon" style={{ background: color }}>
        <Icon size={20} color="#fff" />
      </div>
      <div className="summary-card__content">
        <span className="summary-card__label">{label}</span>
        <span className="summary-card__value">{value}</span>
        {trend !== undefined && (
          <span className={`summary-card__trend ${isPositive ? 'trend--up' : 'trend--down'}`}>
            {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {Math.abs(trend).toFixed(1)}% {trendLabel}
          </span>
        )}
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip__label">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="chart-tooltip__item" style={{ color: p.color }}>
          {p.name}: {formatCurrency(p.value)}
        </p>
      ))}
    </div>
  );
}

function CustomPieTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip__item" style={{ color: payload[0].payload.color }}>
        {payload[0].name}: {formatCurrency(payload[0].value)}
      </p>
    </div>
  );
}

export default function DashboardPage() {
  const transactions = useStore((s) => s.transactions);

  const totals = useMemo(() => {
    const income = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    return { income, expense, balance: income - expense, count: transactions.length };
  }, [transactions]);

  const monthlyData = useMemo(() => getMonthlyData(transactions), [transactions]);
  const categoryData = useMemo(() => getCategoryTotals(transactions), [transactions]);

  // Compute trends (compare last 2 months)
  const trends = useMemo(() => {
    if (monthlyData.length < 2) return {};
    const curr = monthlyData[monthlyData.length - 1];
    const prev = monthlyData[monthlyData.length - 2];
    return {
      income: prev.income ? ((curr.income - prev.income) / prev.income) * 100 : 0,
      expense: prev.expense ? ((curr.expense - prev.expense) / prev.expense) * 100 : 0,
    };
  }, [monthlyData]);

  const recentTransactions = useMemo(
    () => [...transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5),
    [transactions]
  );

  return (
    <div className="dashboard">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Your financial overview at a glance</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards stagger">
        <SummaryCard
          icon={Wallet}
          label="Total Balance"
          value={formatCurrency(totals.balance)}
          color="var(--accent-gradient)"
        />
        <SummaryCard
          icon={TrendingUp}
          label="Total Income"
          value={formatCurrency(totals.income)}
          trend={trends.income}
          trendLabel="vs last month"
          color="linear-gradient(135deg, #10b981 0%, #059669 100%)"
        />
        <SummaryCard
          icon={TrendingDown}
          label="Total Expenses"
          value={formatCurrency(totals.expense)}
          trend={trends.expense}
          trendLabel="vs last month"
          color="linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
        />
        <SummaryCard
          icon={ArrowLeftRight}
          label="Transactions"
          value={totals.count}
          color="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
        />
      </div>

      {/* Charts Row */}
      <div className="charts-row">
        {/* Balance Trend */}
        <div className="chart-card animate-fade-in">
          <h3 className="chart-card__title">Balance Trend</h3>
          <p className="chart-card__desc">Monthly income, expenses & running balance</p>
          <div className="chart-card__chart">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
                <XAxis dataKey="month" stroke="var(--text-tertiary)" fontSize={12} tickLine={false} />
                <YAxis stroke="var(--text-tertiary)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="income" name="Income" stroke="#10b981" strokeWidth={2} fill="url(#gradIncome)" />
                <Area type="monotone" dataKey="expense" name="Expense" stroke="#ef4444" strokeWidth={2} fill="url(#gradExpense)" />
                <Area type="monotone" dataKey="balance" name="Balance" stroke="#6366f1" strokeWidth={2.5} fill="url(#gradBalance)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Spending Breakdown */}
        <div className="chart-card animate-fade-in">
          <h3 className="chart-card__title">Spending Breakdown</h3>
          <p className="chart-card__desc">Expenses by category</p>
          <div className="chart-card__chart chart-card__chart--pie">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Legend below chart */}
            <div className="pie-legend">
              {categoryData.slice(0, 6).map((cat) => (
                <div key={cat.name} className="pie-legend__item">
                  <span className="pie-legend__dot" style={{ background: cat.color }} />
                  <span className="pie-legend__name">{cat.name}</span>
                  <span className="pie-legend__value">{formatCurrency(cat.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="recent-tx animate-fade-in">
        <div className="recent-tx__header">
          <h3>Recent Transactions</h3>
          <button
            className="btn btn--ghost btn--sm"
            onClick={() => useStore.getState().setActivePage('transactions')}
          >
            View All
          </button>
        </div>
        <div className="recent-tx__list">
          {recentTransactions.map((tx) => (
            <div key={tx.id} className="recent-tx__item">
              <div
                className="recent-tx__icon"
                style={{ background: CATEGORIES[tx.category]?.color + '20', color: CATEGORIES[tx.category]?.color }}
              >
                <ArrowLeftRight size={16} />
              </div>
              <div className="recent-tx__info">
                <span className="recent-tx__desc">{tx.description}</span>
                <span className="recent-tx__meta">{tx.category} · {formatDate(tx.date)}</span>
              </div>
              <span className={`recent-tx__amount ${tx.type === 'income' ? 'amount--income' : 'amount--expense'}`}>
                {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
