import { QueryResult } from 'neo4j-driver';
import { FeedbackModel } from '../../../../domain/model';

 export const feedbackMapper = (res: QueryResult): FeedbackModel => {
  const record = res.records[0];
  const properties = record.get(record.keys[0]).properties;
  return {
    id: properties.id,
    createdAt: new Date(properties.createdAt.toNumber()),
    ...(properties.answeredAt && { answeredAt: new Date(properties.answeredAt.toNumber()) }),
  }
 }