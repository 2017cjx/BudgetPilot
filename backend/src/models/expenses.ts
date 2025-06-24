import { Types, Document, Schema, model } from 'mongoose';
import { ICategories } from './categories';
import { IUser } from './user';

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
    type: Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  userId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v; // Exclude version key
    }
  }
});