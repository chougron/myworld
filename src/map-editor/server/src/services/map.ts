import IMap from '../../../../shared/types/map';
import Database from '../database';
import { Collection, ObjectId } from 'mongodb';

const getCollection = async (): Promise<Collection> => {
    const database = await Database.getInstance();
    return database.collection('maps');
};

const saveOrReplace = async (map: IMap): Promise<IMap> => {
    const collection = await getCollection();

    if (map._id) {
        const oId = new ObjectId(map._id);
        delete map._id;

        await collection.update({ _id: oId }, map);
        return collection.findOne({ _id: oId });
    }

    const saved = await collection.insertOne(map);
    return collection.findOne({ _id: saved.insertedId });
};

export { saveOrReplace };
