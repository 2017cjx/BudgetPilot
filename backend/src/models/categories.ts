import { Types, Document, Schema, model } from 'mongoose';

export interface ICategory extends Document {
  categoryName: string;
  userId: Types.ObjectId;

}

const categorySchema = new Schema<ICategory>({
  categoryName: {
    type: String, required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Category = model<ICategory>('Category', categorySchema);

export default Category;