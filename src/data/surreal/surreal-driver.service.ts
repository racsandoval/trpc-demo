const Surreal = require('surrealdb.js');
import { Service } from 'typedi';

@Service()
export class SurrealDriver {
  private db: any;

  constructor() {
    this.db = new Surreal(process.env.SURREAL_DB_URL);
    this.signin();
  }

  private async signin() {
    await this.db.signin({ user: process.env.SURREAL_DB_USER, pass: process.env.SURREAL_DB_PASSWORD });
    await this.db.use('test', 'test')
  }

  create(entity: string, input: any) {
    return this.db.create(entity, input);
  }

  change(entity: string, input: any) {
    return this.db.change(entity, input);
  }

  query(query: string, vars: any = {}) {
    return this.db.query(query, vars);
  }

  select(entity: string) {
    return this.db.select(entity);
  }
}