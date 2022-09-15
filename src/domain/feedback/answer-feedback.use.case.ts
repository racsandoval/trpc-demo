import { Service } from 'typedi';
import { FeedbackDatasource } from '../../data/source/feedback.datasource';
import { FeedbackModel } from '../model';

@Service()
export class AnswerFeedbackUseCase {
  constructor(private readonly datasource: FeedbackDatasource) {}

  async exec(id: string): Promise<FeedbackModel> {
    const feedback = await this.datasource.getFeedback(id);

    if (!feedback) {
      throw new Error('Feedback not found');
    }

    return this.datasource.addAnsweredAt(id);
  }
}