import { useMemo } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PiggyBank,
  BarChart3,
  Percent,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadialBarChart,
  RadialBar,
  Cell,
} from 'recharts';
import useStore from '../store/useStore';
import { getMonthlyData, getCategoryTotals, formatCurrency, CATEGORIES } from '../data/mockData';

function InsightCard({ icon: Icon, title, value, subtitle, color, trend, detail }) {
  const isPositive = trend >= 0;
  return (
    <div className="insight-card animate-fade-in">
      <div className="insight-card__icon" style={{ background: color + '18', color }}>
        <Icon size={20} />
      </div>
      <div className="insight-card__body">
        <span className="insight-card__title">{title}</span>
        <span className="insight-card__value">{value}</span>
        {subtitle && <span className="insight-card__subtitle">{subtitle}</span>}
        {detail && <span className="insight-card__detail">{detail}</span>}
        {trend !== undefined && (
          <span className={`insight-card__trend ${isPositive ? 'trend--up' : 'trend--down'}`}>
            {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {Math.abs(trend).toFixed(1)}% vs last month
          </span>
        )}
      </div>
    </div>
  );
}

function CustomBarTooltip({ active, payload, label }) {
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

export default function InsightsPage() {
  const transactions = useStore((s) => s.transactions);

  const monthlyData = useMemo(() => getMonthlyData(transactions), [transactions]);
  const categoryData = useMemo(() => getCategoryTotals(transactions), [transactions]);

  const insights = useMemo(() => {
    const income = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const balance = income - expense;
    const savingsRate = income > 0 ? ((income - expense) / income) * 100 : 0;
    const avgTransaction = transactions.length > 0 ? (income + expense) / transactions.length : 0;

    // Highest spending category
    const topCategory = categoryData[0] || { name: '-', value: 0 };
    const totalExpense = categoryData.reduce((s, c) => s + c.value, 0);
    const topCategoryPct = totalExpense > 0 ? (topCategory.value / totalExpense) * 100 : 0;

    // Monthly comparison
    let monthlyChange = { income: 0, expense: 0, savings: 0 };
    if (monthlyData.length >= 2) {
      const curr = monthlyData[monthlyData.length - 1];
      const prev = monthlyData[monthlyData.length - 2];
      monthlyChange = {
        income: prev.income ? ((curr.income - prev.income) / prev.income) * 100 : 0,
        expense: prev.expense ? ((curr.expense - prev.expense) / prev.expense) * 100 : 0,
        savings: 0,
      };
    }

    // Income vs expense ratio
    const ratio = expense > 0 ? income / expense : income > 0 ? Infinity : 0;

    return {
      income,
      expense,
      balance,
      savingsRate,
      avgTransaction,
      topCategory,
      topCategoryPct,
      monthlyChange,
      ratio,
      totalExpense,
    };
  }, [transactions, categoryData, monthlyData]);

  // Radial chart for savings rate
  const savingsRadialData = [
    { name: 'Savings Rate', value: Math.max(0, insights.savingsRate), fill: '#10b981' },
  ];

  return (
    <div className="insights">
      <div className="page-header">
        <div>
          <h1>Insights</h1>
          <p>Understand your financial patterns and trends</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="insights-grid stagger">
        <InsightCard
          icon={ShoppingCart}
          title="Top Spending Category"
          value={insights.topCategory.name}
          subtitle={formatCurrency(insights.topCategory.value)}
          detail={`${insights.topCategoryPct.toFixed(1)}% of total expenses`}
          color={CATEGORIES[insights.topCategory.name]?.color || '#6366f1'}
        />
        <InsightCard
          icon={TrendingUp}
          title="Income Trend"
          value={formatCurrency(monthlyData.length ? monthlyData[monthlyData.length - 1].income : 0)}
          subtitle="This month"
          trend={insights.monthlyChange.income}
          color="#10b981"
        />
        <InsightCard
          icon={TrendingDown}
          title="Expense Trend"
          value={formatCurrency(monthlyData.length ? monthlyData[monthlyData.length - 1].expense : 0)}
          subtitle="This month"
          trend={insights.monthlyChange.expense}
          color="#ef4444"
        />
        <InsightCard
          icon={PiggyBank}
          title="Savings Rate"
          value={`${insights.savingsRate.toFixed(1)}%`}
          subtitle={`${formatCurrency(insights.balance)} saved total`}
          color="#6366f1"
        />
        <InsightCard
          icon={DollarSign}
          title="Avg Transaction"
          value={formatCurrency(insights.avgTransaction)}
          subtitle={`Across ${transactions.length} transactions`}
          color="#f59e0b"
        />
        <InsightCard
          icon={Percent}
          title="Income / Expense Ratio"
          value={insights.ratio === Infinity ? '∞' : `${insights.ratio.toFixed(2)}x`}
          subtitle={insights.ratio >= 1 ? 'You earn more than you spend' : 'Spending exceeds income'}
          color={insights.ratio >= 1 ? '#10b981' : '#ef4444'}
        />
      </div>

      {/* Charts Row */}
      <div className="insights-charts">
        {/* Monthly Comparison Bar */}
        <div className="chart-card animate-fade-in">
          <h3 className="chart-card__title">Monthly Comparison</h3>
          <p className="chart-card__desc">Income vs expenses over time</p>
          <div className="chart-card__chart">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
                <XAxis dataKey="month" stroke="var(--text-tertiary)" fontSize={12} tickLine={false} />
                <YAxis
                  stroke="var(--text-tertiary)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomBarTooltip />} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }}
                />
                <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Savings Gauge + Top Categories */}
        <div className="chart-card animate-fade-in">
          <h3 className="chart-card__title">Savings & Top Expenses</h3>
          <p className="chart-card__desc">How well are you saving?</p>

          {/* Savings radial gauge */}
          <div className="savings-gauge">
            <ResponsiveContainer width={180} height={180}>
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="65%"
                outerRadius="90%"
                startAngle={90}
                endAngle={-270}
                data={savingsRadialData}
              >
                <RadialBar
                  background={{ fill: 'var(--bg-tertiary)' }}
                  dataKey="value"
                  cornerRadius={999}
                  max={100}
                >
                  <Cell fill="#10b981" />
                </RadialBar>
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="savings-gauge__label">
              <span className="savings-gauge__pct">{Math.max(0, insights.savingsRate).toFixed(0)}%</span>
              <span className="savings-gauge__text">saved</span>
            </div>
          </div>

          {/* Top expense categories */}
          <div className="top-categories">
            {categoryData.slice(0, 5).map((cat, i) => {
              const pct = insights.totalExpense > 0 ? (cat.value / insights.totalExpense) * 100 : 0;
              return (
                <div key={cat.name} className="top-cat" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="top-cat__header">
                    <span className="top-cat__dot" style={{ background: cat.color }} />
                    <span className="top-cat__name">{cat.name}</span>
                    <span className="top-cat__value">{formatCurrency(cat.value)}</span>
                  </div>
                  <div className="top-cat__bar-track">
                    <div
                      className="top-cat__bar-fill"
                      style={{ width: `${pct}%`, background: cat.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
