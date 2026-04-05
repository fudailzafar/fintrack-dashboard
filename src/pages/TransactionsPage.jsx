import { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  Search,
  SlidersHorizontal,
  Plus,
  Pencil,
  Trash2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Download,
  FileX2,
  RotateCcw,
} from 'lucide-react';
import useStore from '../store/useStore';
import TransactionModal from '../components/TransactionModal';
import { CATEGORIES, formatCurrency, formatDate } from '../data/mockData';

export default function TransactionsPage() {
  const role = useStore((s) => s.role);
  const filters = useStore((s) => s.filters);
  const setFilter = useStore((s) => s.setFilter);
  const resetFilters = useStore((s) => s.resetFilters);
  const deleteTransaction = useStore((s) => s.deleteTransaction);
  const transactions = useStore((s) => s.transactions);

  const isAdmin = role === 'admin';

  const filtered = useMemo(() => {
    let result = [...transactions];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }
    if (filters.category !== 'all') {
      result = result.filter((t) => t.category === filters.category);
    }
    if (filters.type !== 'all') {
      result = result.filter((t) => t.type === filters.type);
    }
    result.sort((a, b) => {
      let cmp = 0;
      if (filters.sortBy === 'date') cmp = a.date.localeCompare(b.date);
      else if (filters.sortBy === 'amount') cmp = a.amount - b.amount;
      else if (filters.sortBy === 'category') cmp = a.category.localeCompare(b.category);
      return filters.sortOrder === 'desc' ? -cmp : cmp;
    });
    return result;
  }, [transactions, filters]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState(null);

  const categories = useMemo(
    () => [...new Set(transactions.map((t) => t.category))].sort(),
    [transactions]
  );

  const handleEdit = (tx) => {
    setEditingTx(tx);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingTx(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingTx(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const toggleSort = (field) => {
    if (filters.sortBy === field) {
      setFilter('sortOrder', filters.sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setFilter('sortBy', field);
      setFilter('sortOrder', 'desc');
    }
  };

  const SortIcon = ({ field }) => {
    if (filters.sortBy !== field) return <ArrowUpDown size={13} className="sort-icon sort-icon--inactive" />;
    return filters.sortOrder === 'desc'
      ? <ArrowDown size={13} className="sort-icon sort-icon--active" />
      : <ArrowUp size={13} className="sort-icon sort-icon--active" />;
  };

  const exportCSV = () => {
    const headers = ['Date', 'Description', 'Amount', 'Category', 'Type'];
    const rows = filtered.map((t) => [t.date, `"${t.description}"`, t.amount, t.category, t.type]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fintrack-transactions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const hasActiveFilters = filters.search || filters.category !== 'all' || filters.type !== 'all';

  return (
    <div className="transactions">
      <div className="page-header">
        <div>
          <h1>Transactions</h1>
          <p>Manage and review all your financial transactions</p>
        </div>
        <div className="page-header__actions">
          <button className="btn btn--ghost btn--sm" onClick={exportCSV} id="export-csv-btn">
            <Download size={16} />
            Export CSV
          </button>
          {isAdmin && (
            <button className="btn btn--primary btn--sm" onClick={handleAdd} id="add-tx-btn">
              <Plus size={16} />
              Add Transaction
            </button>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar animate-fade-in">
        <div className="filter-bar__search">
          <Search size={16} className="filter-bar__search-icon" />
          <input
            id="tx-search"
            type="text"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={(e) => setFilter('search', e.target.value)}
          />
        </div>
        <div className="filter-bar__selects">
          <select
            id="filter-category"
            value={filters.category}
            onChange={(e) => setFilter('category', e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select
            id="filter-type"
            value={filters.type}
            onChange={(e) => setFilter('type', e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        {hasActiveFilters && (
          <button className="btn btn--ghost btn--sm" onClick={resetFilters}>
            <RotateCcw size={14} />
            Reset
          </button>
        )}
      </div>

      {/* Results count */}
      <div className="tx-meta animate-fade-in">
        <span className="tx-meta__count">
          {filtered.length} transaction{filtered.length !== 1 ? 's' : ''}
          {hasActiveFilters ? ' found' : ''}
        </span>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="empty-state animate-fade-in">
          <FileX2 size={48} strokeWidth={1.2} />
          <h3>No transactions found</h3>
          <p>Try adjusting your filters or add a new transaction.</p>
          {hasActiveFilters && (
            <button className="btn btn--ghost" onClick={resetFilters}>
              <RotateCcw size={14} /> Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="tx-table-wrapper animate-fade-in">
          <table className="tx-table" id="transactions-table">
            <thead>
              <tr>
                <th onClick={() => toggleSort('date')} className="th--sortable">
                  Date <SortIcon field="date" />
                </th>
                <th>Description</th>
                <th onClick={() => toggleSort('amount')} className="th--sortable">
                  Amount <SortIcon field="amount" />
                </th>
                <th onClick={() => toggleSort('category')} className="th--sortable">
                  Category <SortIcon field="category" />
                </th>
                <th>Type</th>
                {isAdmin && <th className="th--actions">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx, i) => (
                <tr key={tx.id} className="tx-row" style={{ animationDelay: `${Math.min(i * 30, 300)}ms` }}>
                  <td className="tx-row__date">{formatDate(tx.date)}</td>
                  <td className="tx-row__desc">
                    <span
                      className="tx-row__cat-dot"
                      style={{ background: CATEGORIES[tx.category]?.color }}
                    />
                    {tx.description}
                  </td>
                  <td className={`tx-row__amount ${tx.type === 'income' ? 'amount--income' : 'amount--expense'}`}>
                    {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </td>
                  <td>
                    <span
                      className="tx-row__badge"
                      style={{
                        background: (CATEGORIES[tx.category]?.color || '#94a3b8') + '18',
                        color: CATEGORIES[tx.category]?.color || '#94a3b8',
                      }}
                    >
                      {tx.category}
                    </span>
                  </td>
                  <td>
                    <span className={`tx-row__type-badge tx-row__type-badge--${tx.type}`}>
                      {tx.type}
                    </span>
                  </td>
                  {isAdmin && (
                    <td className="tx-row__actions">
                      <button
                        className="action-btn action-btn--edit"
                        onClick={() => handleEdit(tx)}
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        className="action-btn action-btn--delete"
                        onClick={() => handleDelete(tx.id)}
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}


      {/* Modal — portaled to body to avoid CSS transform breaking position:fixed */}
      {modalOpen && createPortal(
        <TransactionModal transaction={editingTx} onClose={handleCloseModal} />,
        document.body
      )}
    </div>
  );
}
