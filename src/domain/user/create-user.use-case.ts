import { Service } from 'typedi';
import { Datasource } from '../../data/datasource';
import { UserDatasource } from '../../data/model/datasource.model';
import { UserInputModel, UserModel } from '../model';

@Service()
export class CreateUserUseCase {
  private userDatasource: UserDatasource;

  constructor(private readonly datasource: Datasource) {
    this.userDatasource = this.datasource.getUserDatasource();
  }

  async exec(input: UserInputModel): Promise<UserModel> {
    const user = await this.userDatasource.findUserByEmail(input.email);

    if (user) {
      throw new Error('User already exists');
    }

    return this.userDatasource.createUser(input);
  }
}