import { Service } from 'typedi';
import neo4j, { Driver, ManagedTransaction, QueryResult } from 'neo4j-driver';

@Service()
export class DriverService {
  private driver: Driver;

  constructor() {
    const uri = process.env.DB_URL as string;
    const user = process.env.DB_USER as string;
    const password = process.env.DB_PASSWORD as string;

    this.driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
  }

  private getSession() {
    return this.driver.session({ database: 'neo4j' });
  }

  private execute(method: 'executeRead' | 'executeWrite') {
    return async (exec: (tx: ManagedTransaction) => Promise<QueryResult>) => {
      const session = this.getSession();

      try {
        const res = await session[method](exec);
        return res;
      } catch (error) {
        console.log(error);
        throw new Error('Database error')
      } finally {
        session.close();
      }
    }
  }

  async executeRead(exec: (tx: ManagedTransaction) => Promise<QueryResult>) {
    return this.execute('executeRead')(exec);
  }

  async executeWrite(exec: (tx: ManagedTransaction) => Promise<QueryResult>) {
    return this.execute('executeWrite')(exec);
  }
}