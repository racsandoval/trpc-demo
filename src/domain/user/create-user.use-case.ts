import { Service } from 'typedi';
import { UserDatasource } from '../../data/source/user.datasource';
import { UserInputModel, UserModel } from '../model';

@Service()
export class CreateUserUseCase {
  constructor(private readonly datasource: UserDatasource) {}

  async exec(input: UserInputModel): Promise<UserModel> {
    const user = await this.datasource.findUserByEmail(input.email);

    if (user) {
      throw new Error('User already exists');
    }

    return this.datasource.createUser(input);
  }
}