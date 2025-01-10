import {
  IndexSpecification,
  InsertOneResult,
  MongoClient,
  ObjectId,
  Sort,
} from "mongodb";

import { CustomError } from "../custom-error/custom_error";

export const connect = async () => {
  if (process.env.MONGO_URL === undefined) {
    throw new CustomError(
      "",
      "mongodb url is not set! please set the mongodb url in .env file",
      503
    );
  }

  try {
    const client = await MongoClient.connect(process.env.MONGO_URL);
    return client;
  } catch (error) {
    throw error;
  }
};

export const insertOne = async (
  collection: string,
  data: { [key: string]: unknown }
): Promise<InsertOneResult<Document>> => {
  try {
    const client = await connect();
    const db = client.db();
    const insertResult = await db.collection(collection).insertOne(data);
    await client.close();
    return insertResult;
  } catch (error) {
    throw error;
  }
};

export const getAllData = async (
  collection: string,
  query?: { [key: string]: unknown }
) => {
  try {
    const client = await connect();
    const db = client.db();
    const data = await db.collection(collection).find(query!).toArray();
    await client.close();
    return data;
  } catch (error) {
    throw error;
  }
};

export const findOne = async (
  collection: string,
  query?: { [key: string]: unknown }
) => {
  try {
    const client = await connect();
    const db = client.db();
    const result = await db.collection(collection).findOne(query!);
    await client.close();
    return result;
  } catch (error) {
    throw error;
  }
};

export const findOneById = async (collection: string, id: string) => {
  try {
    const client = await connect();
    const db = client.db();
    const result = await db
      .collection(collection)
      .findOne({ _id: new ObjectId(id) });
    await client.close();
    return result;
  } catch (error) {
    throw error;
  }
};

export const fetchAndSortPosts = async (
  collection: string,
  sort: { [key: string]: unknown },
  filter?: { [key: string]: unknown }
) => {
  try {
    const client = await connect();
    const db = client.db();
    const data = await db
      .collection(collection)
      .aggregate([
        {
          $match: filter || {},
        },
        {
          $sort: sort,
        },
      ])
      .toArray();
    await client.close();
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateOneById = async (
  collection: string,
  id: string,
  data: { [key: string]: unknown }
) => {
  try {
    const client = await connect();
    const db = client.db();
    const result = await db
      .collection(collection)
      .updateOne({ _id: new ObjectId(id) }, { $set: data });
    await client.close();
    return result;
  } catch (error) {
    throw error;
  }
};

export const replaceOneById = async (
  collection: string,
  filter: { [key: string]: unknown },
  replacerData: { [key: string]: unknown }
) => {
  try {
    const client = await connect();
    const db = client.db();
    const result = await db
      .collection(collection)
      .replaceOne(filter, replacerData);
    await client.close();
    return result;
  } catch (error) {
    throw error;
  }
};

export const findOneAndReplace = async (
  collection: string,
  filter: { [key: string]: unknown },
  replacerData: { [key: string]: unknown }
) => {
  try {
    const client = await connect();
    const db = client.db();
    const result = await db
      .collection(collection)
      .findOneAndReplace(filter, replacerData, { returnDocument: "after" });
    await client.close();
    return result;
  } catch (error) {
    throw error;
  }
};

export const findAllPostWithSort = async (
  collection: string,
  aggregate: { [key: string]: unknown }[]
) => {
  try {
    const client = await connect();
    const db = client.db();
    const result = await db
      .collection(collection)
      .aggregate(aggregate)
      .toArray();
    await client.close();
    return result;
  } catch (error) {
    throw error;
  }
};

export const createIndexForPosts = async (
  collection: string,
  indexSpecification: IndexSpecification
) => {
  try {
    const client = await connect();
    const db = client.db();
    const result = await db
      .collection(collection)
      .createIndex(indexSpecification);
    await client.close();
    return result;
  } catch (error) {
    throw error;
  }
};

export const findAllDataWithExtraSort = async (
  collection: string,
  query: { [key: string]: unknown },
  sort: Sort
) => {
  try {
    const client = await connect();
    const db = client.db();
    const result = await db
      .collection(collection)
      .find(query)
      .sort(sort)
      .toArray();
    await client.close();
    return result;
  } catch (error) {
    throw error;
  }
};
