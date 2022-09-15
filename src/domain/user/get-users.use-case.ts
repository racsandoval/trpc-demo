import { Service } from 'typedi';
import { UserDatasource } from '../../data/source/user.datasource';

@Service()
export class GetUsersUseCase {
  constructor(private readonly datasource: UserDatasource) {}

  async exec() {
    return this.datasource.getUsers();
  }
}