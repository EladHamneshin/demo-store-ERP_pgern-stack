import { createClient } from 'redis';

export const connectToRedis = async () => {
  const client = await createClient({
    url: 'redis://localhost:6379'
  })
    .on('error', err => console.log('Redis Client Error', err))
    .connect();
  
  // await client.set('key', 'value');
  // const username = 'moshe'
  // const password = '12345'
  // client.set(`password: ${username}`, password)
  // const value = await client.get('password');
  // console.log(value);
  // await client.disconnect();
  return client
}
