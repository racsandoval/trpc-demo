import { Service } from 'typedi';
import { Datasource } from '../../data/datasource';
import { FeedbackDatasource } from '../../data/model/datasource.model';
import { FeedbackModel } from '../model';

@Service()
export class AnswerFeedbackUseCase {
  private feedbackDatasource: FeedbackDatasource;

  constructor(private readonly datasource: Datasource) {
    this.feedbackDatasource = this.datasource.getFeedbackDatasource();
  }

  async exec(id: string): Promise<FeedbackModel> {
    const feedback = await this.feedbackDatasource.getFeedback(id);

    if (!feedback) {
      throw new Error('Feedback not found');
    }

    return this.feedbackDatasource.addAnsweredAt(id);
  }
}