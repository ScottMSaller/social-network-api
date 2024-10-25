import connection from './config/connection.ts';
import User from './models/User.js';
import Thought from './models/Thought.js';

connection.once('open', async () => {
  console.log('connected to MongoDB');

  await User.deleteMany({});
  await Thought.deleteMany({});

  const users = [
    {
      username: 'johnDoe',
      email: 'john.doe@gmail.com',
    },
    {
      username: 'janeDoe',
      email: 'jane.doe@gmail.com',
    },
    {
      username: 'aliceWonder',
      email: 'alice.wonderland@gmail.com',
    },
    {
      username: 'bobBuilder',
      email: 'bob.builder@yahoo.com',
    },
    {
      username: 'charlieBrown',
      email: 'charlie.brown@hotmail.com',
    },
  ];

  const thoughts = [
    {
      thoughtText: 'I love social networking platforms!',
      username: 'johnDoe',
    },
    {
      thoughtText: 'This is my first post!',
      username: 'janeDoe',
    },
    {
      thoughtText: 'I wonder if cats dream about us.',
      username: 'aliceWonder',
    },
    {
      thoughtText: 'Bob the builder can fix it!',
      username: 'bobBuilder',
    },
    {
      thoughtText: 'I miss playing in the baseball team.',
      username: 'charlieBrown',
    },
  ];
  const insertedUsers = await User.insertMany(users);

  for (let thought of thoughts) {
    const user = insertedUsers.find((user) => user.username === thought.username);

    const newThought = await Thought.create({ ...thought, userId: user._id });

    await User.findOneAndUpdate(
      { _id: user._id },
      { $addToSet: { thoughts: newThought._id } }
    );
  }

  console.log('Seed data successfully inserted!');
  process.exit(0);
});
