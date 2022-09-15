import { Service } from "typedi";
import { createRouter, Router } from "./router";
import { FeedbackRouter, UserRouter } from "./routers";

@Service()
export class AppRouter implements Router {
  constructor(private readonly userRouter: UserRouter, private readonly feedbackRouter: FeedbackRouter) {}

  getRouter() {
    return createRouter()
    .merge('user.', this.userRouter.getRouter())
    .merge('feedback.', this.feedbackRouter.getRouter());
  }
}