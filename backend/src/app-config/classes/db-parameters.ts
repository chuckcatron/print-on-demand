export class DBParameters {
  username: string;
  password: string;
  engine: 'mysql' | 'postgres' | 'sqlite' | 'mongodb';
  host: string;
  port: number;
  dbInstanceIdentifier: string;
  dbname: string;
}
