import { useState } from 'react';
import { X } from 'lucide-react';
import useStore from '../store/useStore';
import { CATEGORIES } from '../data/mockData';

const expenseCategories = Object.keys(CATEGORIES).filter(
  (c) => !['Salary', 'Freelance', 'Investments'].includes(c) || ['Investments'].includes(c)
);

const incomeCategories = ['Salary', 'Freelance', 'Investments'];

export default function TransactionModal({ transaction, onClose }) {
  const { addTransaction, updateTransaction } = useStore();
  const isEditing = !!transaction;

  const [form, setForm] = useState({
    date: transaction?.date || new Date().toISOString().split('T')[0],
    description: transaction?.description || '',
    amount: transaction?.amount || '',
    category: transaction?.category || 'Food & Dining',
    type: transaction?.type || 'expense',
  });

  const [errors, setErrors] = useState({});

  const categories = form.type === 'income' ? incomeCategories : expenseCategories;

  // Reset category when type changes
  const handleTypeChange = (type) => {
    const cats = type === 'income' ? incomeCategories : expenseCategories;
    setForm((f) => ({
      ...f,
      type,
      category: cats.includes(f.category) ? f.category : cats[0],
    }));
  };

  const validate = () => {
    const errs = {};
    if (!form.date) errs.date = 'Date is required';
    if (!form.description.trim()) errs.description = 'Description is required';
    if (!form.amount || parseFloat(form.amount) <= 0) errs.amount = 'Enter a valid amount';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...form,
      amount: parseFloat(form.amount),
    };

    if (isEditing) {
      updateTransaction(transaction.id, payload);
    } else {
      addTransaction(payload);
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3>{isEditing ? 'Edit Transaction' : 'Add Transaction'}</h3>
          <button className="modal__close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal__form">
          {/* Type toggle */}
          <div className="modal__field">
            <label>Type</label>
            <div className="modal__type-toggle">
              <button
                type="button"
                className={`modal__type-btn ${form.type === 'expense' ? 'modal__type-btn--expense' : ''}`}
                onClick={() => handleTypeChange('expense')}
              >
                Expense
              </button>
              <button
                type="button"
                className={`modal__type-btn ${form.type === 'income' ? 'modal__type-btn--income' : ''}`}
                onClick={() => handleTypeChange('income')}
              >
                Income
              </button>
            </div>
          </div>

          {/* Date */}
          <div className="modal__field">
            <label htmlFor="tx-date">Date</label>
            <input
              id="tx-date"
              type="date"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              className={errors.date ? 'input--error' : ''}
            />
            {errors.date && <span className="field-error">{errors.date}</span>}
          </div>

          {/* Description */}
          <div className="modal__field">
            <label htmlFor="tx-desc">Description</label>
            <input
              id="tx-desc"
              type="text"
              placeholder="e.g., Grocery Store"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className={errors.description ? 'input--error' : ''}
            />
            {errors.description && <span className="field-error">{errors.description}</span>}
          </div>

          {/* Amount */}
          <div className="modal__field">
            <label htmlFor="tx-amount">Amount ($)</label>
            <input
              id="tx-amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={form.amount}
              onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
              className={errors.amount ? 'input--error' : ''}
            />
            {errors.amount && <span className="field-error">{errors.amount}</span>}
          </div>

          {/* Category */}
          <div className="modal__field">
            <label htmlFor="tx-category">Category</label>
            <select
              id="tx-category"
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="modal__actions">
            <button type="button" className="btn btn--ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              {isEditing ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
