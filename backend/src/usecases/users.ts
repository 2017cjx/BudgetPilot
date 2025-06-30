import { IUser } from '../models/user';
import { UserRepository } from '../repositories/user';

export class UserUsecase {
  static async create (values: IUser) {
    const user = await UserRepository.createUser(values);

    return user;
  }

  static async userByEmail (email: string) {
    const user = await UserRepository.getUserByEmail(email)

    return user;
  }

  static async userById (id: string) {
    const user = await UserRepository.getUserById(id)

    return user;
  }

  static async deleteUser (id: string) {
    const user = await UserRepository.deleteUserById(id)

    return user;
  }
}