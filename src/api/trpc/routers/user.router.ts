import { Service } from 'typedi'
import { UserInputModel, UserModel } from '../../../domain/model';
import { CreateUserUseCase, GetUsersUseCase } from '../../../domain/user'
import { createRouter, Router } from '../router'

@Service()
export class UserRouter implements Router {
  constructor(private readonly getUsers: GetUsersUseCase, private readonly createUser: CreateUserUseCase) {}

  getRouter() {
    return createRouter()
      .query('getUsers', {
        output: (val) => val as UserModel[],
        resolve: () => this.getUsers.exec(),
      })
      .mutation('createUser', {
        input: (val) => val as UserInputModel,
        output: (val) => val as UserModel,
        resolve: (req) => this.createUser.exec(req.input),
      });
  }
}