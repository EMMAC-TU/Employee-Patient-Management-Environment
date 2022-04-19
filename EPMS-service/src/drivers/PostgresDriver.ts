import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config()
/**
 * 
 */
export class PostgresDriver {
    private static _client: Client;

    private constructor() {}

    /**
     * 
     */
    public static async connect(): Promise<void> {
        try {
            if (!this._client) {
                this._client = new Client(process.env.DBURI);
                await this._client.connect();
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * 
     */
    public static async disconnect(): Promise<void> {
        if (this._client) {
            this._client.end()
        }
    }

    static get client(): Client {
        if (!this._client) {
            throw new Error("Connection to PostgresDB has not been established");
        }
        return this._client
    }
}
