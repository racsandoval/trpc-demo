import { Service } from 'typedi'
import { UserInputModel } from '../../../domain/model';
import { CreateUserUseCase, GetUsersUseCase } from '../../../domain/user'
import { createRouter, Router } from '../router'

@Service()
export class UserRouter implements Router {
  constructor(private readonly getUsers: GetUsersUseCase, private readonly createUser: CreateUserUseCase) {}

  getRouter() {
    return createRouter()
      .query('getUsers', {
        resolve: () => this.getUsers.exec(),
      })
      .mutation('createUser', {
        input: (val) => val as UserInputModel,
        resolve: (req) => this.createUser.exec(req.input),
      });
  }
}