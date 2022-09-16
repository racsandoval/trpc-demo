import { Service } from 'typedi';
import { Datasource } from '../../data/datasource';
import { UserDatasource } from '../../data/model/datasource.model';

@Service()
export class GetUsersUseCase {
  private userDatasource: UserDatasource;

  constructor(private readonly datasource: Datasource) {
    this.userDatasource = this.datasource.getUserDatasource();
  }

  async exec() {
    return this.userDatasource.getUsers();
  }
}