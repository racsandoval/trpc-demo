import { Service } from 'typedi';
import { UserInputModel, UserModel } from '../../../domain/model';
import { UserDatasource } from '../../model/datasource.model';
import { DriverService } from '../driver.service';

@Service()
export class Neo4jUserDatasource implements UserDatasource {
  constructor(private readonly driver: DriverService) {}

  async getUsers(): Promise<UserModel[]> {
    const query = 'MATCH (user:USER) RETURN user';

    const res = await this.driver.executeRead(async (tx) => await tx.run(query));

    return res.records.map((record) => {
      return record.get(record.keys[0]).properties as UserModel;
    })
  }

  async findUserByEmail(email: string): Promise<UserModel | null> {
    const query = 'MATCH (user:USER) WHERE user.email = $email RETURN user';

    const res = await this.driver.executeRead(async (tx) => await tx.run(query, { email }));
    if (!res.records.length) {
      return null;
    }

    const record = res.records[0];
    return record.get(record.keys[0]).properties as UserModel;
  }

  async createUser(input: UserInputModel): Promise<UserModel> {
    const mutation = 'CREATE (user:USER { id: randomUUID(), name: $name, email: $email }) RETURN user';

    const res = await this.driver.executeWrite(async (tx) => await tx.run(mutation, input));
    const record = res.records[0];
    return record.get(record.keys[0]).properties as UserModel;
  }
}