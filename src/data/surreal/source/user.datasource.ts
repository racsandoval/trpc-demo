import { Service } from "typedi";
import { UserModel, UserInputModel } from "../../../domain/model";
import { UserDatasource } from "../../model/datasource.model";
import { SurrealDriver } from "../surreal-driver.service";

@Service()
export class SurrealUserDatasource implements UserDatasource {
  constructor(private readonly driver: SurrealDriver) {}

  getUsers(): Promise<UserModel[]> {
    return this.driver.select('user');
  }

  async findUserByEmail(email: string): Promise<UserModel | null> {
    const res = await this.driver.query('SELECT * FROM user WHERE email = $email', { email });
    if (!res[0].result.length) {
      return null;
    }
    return res[0].result[0];
  }

  createUser(input: UserInputModel): Promise<UserModel> {
    return this.driver.create('user', input);
  }
}