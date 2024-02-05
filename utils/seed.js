const connection = require("../config/connection");
const { Thought, User } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  let usersCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (usersCheck.length) {
    await connection.dropCollection("users");
  }

  let thoughtsCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (thoughtsCheck.length) {
    await connection.dropCollection("thoughts");
  }

  const thoughtsData = [
    {
      _id: "65c0420146d5485ddfc8446d",
      thoughtText: "I like chicken tenders",
      username: "CodyMcSmartman",
      createdAt: "2024-02-05T03:01:24.005+00:00",
      reactions: [
        {
          reactionBody: "Hot Take!",
          username: "John-jacob-jingleheimerschmidt",
          _id: "65c0448746d5485ddfc84473",
          reactionId: "65c0448746d5485ddfc84474",
          createdAt: "2024-02-05T03:01:24.005+00:00",
        },
      ],
      __v: 0,
      reactionCountTotal: 1,
    },
  ];

  const usersData = [
    {
      username: "RickyMcBadcode",
      email: "whatsafunction@gmail.com",
      thoughts: [],
      friends: [],
      _id: "65c037ee534825e1eabf5805",
      __v: 0,
      friendCount: 0,
    },
    {
      username: "CodyMcSmartman",
      email: "devgod@gmail.com",
      thoughts: [],
      friends: [],
      _id: "65c01339b31f1c57198e00bb",
      __v: 0,
      friendCount: 0,
    },
    {
      username: "John-jacob-jingleheimerschmidt",
      email: "mynametoo@gmail.com",
      thoughts: [],
      friends: [],
      _id: "65c03218b31f1c57198e00be",
      __v: 0,
      friendCount: 0,
    },
  ];

  await Thought.insertMany(thoughtsData);
  await User.insertMany(usersData);

  console.table(usersData);
  console.table(thoughtsData);
  console.info("database seeded");
  process.exit(0);
});
