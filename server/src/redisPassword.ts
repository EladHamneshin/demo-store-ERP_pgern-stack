// import RedisClient from '@redis/client/dist/lib/client';
// import { connectToRedis } from './redisClient';

// let client: RedisClient | undefined; // Define client at a higher scope

// async function connectAndSetClient() {
//   client = await connectToRedis();
// }

// async function savePassword(username: string, password: string) {
//   if (!client) {
//     await connectAndSetClient();
//   }
//   await client.set(`password:${username}`, password);
// }

// async function getPassword(username: string) {
//   if (!client) {
//     await connectAndSetClient();
//   }
//   return client.get(`password:${username}`);
// }

// async function savePasswords(users: { username: string; password: string }[]) {
//   if (!client) {
//     await connectAndSetClient();
//   }
//   const multi = client.multi();
//   users.forEach(({ username, password }) => {
//     multi.set(`password:${username}`, password);
//   });
//   await multi.exec();
// }

// async function getPasswords(usernames: string[]) {
//   if (!client) {
//     await connectAndSetClient();
//   }
//   const multi = client.multi();
//   usernames.forEach((username) => {
//     multi.get(`password:${username}`);
//   });
//   return multi.exec();
// }
