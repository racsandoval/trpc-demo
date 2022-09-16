import { Service } from "typedi";
import { FeedbackModel, FeedbackInputModel } from "../../../domain/model";
import { FeedbackDatasource } from "../../model/datasource.model";
import { SurrealDriver } from "../surreal-driver.service";

@Service()
export class SurrealFeedbackDatasource implements FeedbackDatasource {
  constructor(private readonly driver: SurrealDriver) {}

  async getFeedback(id: string): Promise<FeedbackModel | null> {
    const res = await this.driver.select(id);
    
    if (!res.length) {
      return null;
    }

    return res[0];
  }

  async createFeedback(input: FeedbackInputModel): Promise<FeedbackModel> {
    const query = 'CREATE feedback SET inviter = $inviterId, invitee = $inviteeId, createdAt = time::now()';
    const res = await this.driver.query(query, input);
    return res[0].result[0];
  }

  addAnsweredAt(id: string): Promise<FeedbackModel> {
    return this.driver.change(id, {
      answeredAt: new Date(),
    });
  }
}