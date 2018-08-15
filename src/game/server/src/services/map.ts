import IMap from '../../../../shared/types/map';
import Database from '../database';
import { Collection, ObjectId } from 'mongodb';

const getCollection = async (): Promise<Collection> => {
    const database = await Database.getInstance();
    return database.collection('maps');
};

const getById = async (id: string): Promise<IMap> => {
    const collection = await getCollection();
    const oId = new ObjectId(id);
    return collection.findOne({ _id: oId });
};

export { getById };
