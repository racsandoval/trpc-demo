import { Service } from 'typedi';
import { FeedbackDatasource, UserDatasource } from './model/datasource.model';
import { Neo4jFeedbackDatasource } from './neo4j/source/feedback.datasource';
import { Neo4jUserDatasource } from './neo4j/source/user.datasource';
import { SurrealFeedbackDatasource } from './surreal/source/feedback.datasource';
import { SurrealUserDatasource } from './surreal/source/user.datasource';

enum DatasourceType {
  NEO4J = 'NEO4J',
  SURREAL = 'SURREAL',
}

@Service()
export class Datasource {
  private type: DatasourceType;

  constructor(
    private readonly neo4jUserDatasource: Neo4jUserDatasource,
    private readonly neo4jFeedbackDatasource: Neo4jFeedbackDatasource,

    private readonly surrealUserDatasource: SurrealUserDatasource,
    private readonly surrealFeedbackDatasource: SurrealFeedbackDatasource,
  ) {
    this.type = process.env.DB_TYPE as DatasourceType;
  }

  getUserDatasource() {
    return this.getDatasource<UserDatasource>({
      [DatasourceType.NEO4J]: this.neo4jUserDatasource,
      [DatasourceType.SURREAL]: this.surrealUserDatasource,
    })
  }

  getFeedbackDatasource() {
    return this.getDatasource<FeedbackDatasource>({
      [DatasourceType.NEO4J]: this.neo4jFeedbackDatasource,
      [DatasourceType.SURREAL]: this.surrealFeedbackDatasource,
    })
  }

  private getDatasource<T>(datasources: Record<DatasourceType, T>): T {
    switch (this.type) {
      case DatasourceType.NEO4J:
        return datasources[DatasourceType.NEO4J]
      case DatasourceType.SURREAL:
        return datasources[DatasourceType.SURREAL]
      default:
        throw new Error('wrong DB_TYPE')
    }
  }
}