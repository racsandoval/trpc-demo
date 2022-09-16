import { FeedbackInputModel, FeedbackModel, UserInputModel, UserModel } from "../../domain/model";

export interface UserDatasource {
  getUsers(): Promise<UserModel[]>;
  findUserByEmail(email: string): Promise<UserModel | null>;
  createUser(input: UserInputModel): Promise<UserModel>;
}

export interface FeedbackDatasource {
  getFeedback(id: string): Promise<FeedbackModel | null>;
  createFeedback(input: FeedbackInputModel): Promise<FeedbackModel>
  addAnsweredAt(id: string): Promise<FeedbackModel>;
}