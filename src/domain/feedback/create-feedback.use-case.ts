import { Service } from  'typedi';
import { FeedbackDatasource } from '../../data/source/feedback.datasource';
import { FeedbackInputModel, FeedbackModel } from '../model';

@Service()
export class CreateFeedbackUseCase {
  constructor(private readonly datasource: FeedbackDatasource) {}

  exec(input: FeedbackInputModel): Promise<FeedbackModel> {
    return this.datasource.createFeedback(input);
  }
}