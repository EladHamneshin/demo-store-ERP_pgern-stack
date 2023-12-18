import { createClient  } from 'redis';

export const RedisClient = createClient({
    url: 'redis://localhost:6379'
});


// export const RedisClient = createClient({
//   password: 'i3UoQsicKVy7guOYg5qYrAtGU2QJLzE6',
//   socket: {
//       host: 'redis-16334.c323.us-east-1-2.ec2.cloud.redislabs.com',
//       port: 16334
//   }
// });

