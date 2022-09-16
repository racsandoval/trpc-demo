import { Service } from 'typedi';
import { AnswerFeedbackUseCase, CreateFeedbackUseCase } from '../../../domain/feedback';
import { FeedbackInputModel, FeedbackModel } from '../../../domain/model';
import { createRouter, Router } from '../router';

@Service()
export class FeedbackRouter implements Router {
  constructor(private readonly answerFeedback: AnswerFeedbackUseCase, private readonly createFeedback: CreateFeedbackUseCase) {}

  getRouter() {
    return createRouter()
      .mutation('createFeedback', {
        input: (val) => val as FeedbackInputModel,
        output: (val) => val as FeedbackModel,
        resolve: (req) => this.createFeedback.exec(req.input),
      })
      .mutation('answerFeedback', {
        input: (val) => val as string,
        output: (val) => val as FeedbackModel,
        resolve: (req) => this.answerFeedback.exec(req.input),
      });
  }
}