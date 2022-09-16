import { Service } from  'typedi';
import { Datasource } from '../../data/datasource';
import { FeedbackDatasource } from '../../data/model/datasource.model';
import { FeedbackInputModel, FeedbackModel } from '../model';

@Service()
export class CreateFeedbackUseCase {
  private feedbackDatasource: FeedbackDatasource;

  constructor(private readonly datasource: Datasource) {
    this.feedbackDatasource = this.datasource.getFeedbackDatasource();
  }

  exec(input: FeedbackInputModel): Promise<FeedbackModel> {
    return this.feedbackDatasource.createFeedback(input);
  }
}