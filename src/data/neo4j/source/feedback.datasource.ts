import { Service } from 'typedi';
import { FeedbackInputModel, FeedbackModel } from '../../../domain/model';
import { FeedbackDatasource } from '../../model/datasource.model';
import { DriverService } from '../driver.service';
import { feedbackMapper } from './mapper/feedback.mapper';

@Service()
export class Neo4jFeedbackDatasource implements FeedbackDatasource {
  constructor(private readonly driver: DriverService) {}

  async getFeedback(id: string): Promise<FeedbackModel | null> {
    const query = `
      MATCH (inviter:USER) - [rel:ASK_FEEDBACK] -> (invitee:USER)
      WHERE rel.id = $id
      RETURN rel
    `;

    const res = await this.driver.executeRead(async tx => await tx.run(query, { id }));
    return feedbackMapper(res);
  }

  async createFeedback({ inviterId, inviteeId }: FeedbackInputModel): Promise<FeedbackModel> {
    const mutation = `
      MATCH (inviter:USER) WHERE inviter.id = $inviterId
      MATCH (invitee:USER) WHERE invitee.id = $inviteeId
      MERGE (inviter) - [feedback:ASK_FEEDBACK { id: randomUUID(), createdAt: timestamp() }] -> (invitee)
      RETURN feedback
    `;

    const res = await this.driver.executeWrite(async tx => await tx.run(mutation, { inviterId, inviteeId }));
    return feedbackMapper(res);
  }

  async addAnsweredAt(id: string): Promise<FeedbackModel> {
    const mutation = `
      MATCH (inviter:USER) - [rel:ASK_FEEDBACK] -> (invitee:USER)
      WHERE rel.id = $id
      SET rel.answeredAt = timestamp()
      RETURN rel
    `;

    const res = await this.driver.executeWrite(async tx => await tx.run(mutation, { id }));
    return feedbackMapper(res);
  }
}