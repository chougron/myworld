import * as mongodb from 'mongodb';

export default class Database {
    private static instance?: mongodb.Db;

    public static getInstance = async (): Promise<mongodb.Db> => {
        if (!Database.instance) {
            await Database.createInstance();
        }
        return Database.instance;
    };

    private static createInstance = async (): Promise<void> => {
        const client = mongodb.MongoClient;
        const connected = await client.connect(
            `mongodb://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@mongo:27017`,
        );
        Database.instance = connected.db('myworld');
    };
}
