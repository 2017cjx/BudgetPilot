import { Types, Document, Schema, model } from 'mongoose';
import Category from './categories';
import User from './user';

export interface IExpense extends Document {
  amount: number;
  description: string;
  date: Date;
  categoryId: Types.ObjectId;
  userId: Types.ObjectId;
}

const expenseSchema = new Schema<IExpense>({
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  categoryId: {
    type: Schema.Types.ObjectId, 
    ref: 'Category',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v; 
    }
  }
});

const Expense = model<IExpense>('Expense', expenseSchema);

export default Expense;