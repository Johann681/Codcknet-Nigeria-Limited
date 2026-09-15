import dns from "node:dns";
import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "codcknet";
const dnsServers = (process.env.MONGODB_DNS_SERVERS || "1.1.1.1,8.8.8.8")
  .split(",")
  .map((server) => server.trim())
  .filter(Boolean);

if (dnsServers.length > 0) {
  dns.setServers(dnsServers);
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getMongoClient() {
  if (!uri) {
    throw new Error("MONGODB_URI is not set. Add it to your environment before using MongoDB.");
  }

  if (!cachedClient) {
    cachedClient = new MongoClient(uri);
    await cachedClient.connect();
  }

  return cachedClient;
}

export async function getDb() {
  if (!cachedDb) {
    const client = await getMongoClient();
    cachedDb = client.db(dbName);
  }

  return cachedDb;
}
