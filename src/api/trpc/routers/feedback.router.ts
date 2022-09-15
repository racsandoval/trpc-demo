import { Service } from 'typedi';
import { AnswerFeedbackUseCase, CreateFeedbackUseCase } from '../../../domain/feedback';
import { FeedbackInputModel } from '../../../domain/model';
import { createRouter, Router } from '../router';

@Service()
export class FeedbackRouter implements Router {
  constructor(private readonly answerFeedback: AnswerFeedbackUseCase, private readonly createFeedback: CreateFeedbackUseCase) {}

  getRouter() {
    return createRouter()
      .mutation('createFeedback', {
        input: (val) => val as FeedbackInputModel,
        resolve: (req) => this.createFeedback.exec(req.input),
      })
      .mutation('answerFeedback', {
        input: (val) => val as string,
        resolve: (req) => this.answerFeedback.exec(req.input),
      });
  }
}