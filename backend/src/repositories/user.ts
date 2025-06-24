import User, { IUser } from '../models/user';
import { ErrorResponse } from '../utils/errorResponse';

export class UserRepository {
  static async createUser (values: IUser) {
    const user = new User({
      username: values.username,
      email: values.email,
      password: values.password,
      token: values.token,
    });

    try {
      const savedUser = await user.save();
      return savedUser;
    } catch (error:any) {
      throw new ErrorResponse('Error creating user: ', 500, error.message);
    }
  }

  static async getUserByEmail (email: string) {
    const user = User.findOne({ email })

    return user;
  }

  static async getUserById (id: string) {
    const user = User.findById(id)

    return user;
  }

  static async deleteUserById (id: string) {
    const user = User.findByIdAndDelete(id);

    return user;
  }
}