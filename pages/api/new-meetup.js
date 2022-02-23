import { MongoClient } from "mongodb";

const handler = async function (req, res) {
  if (req.method === "POST") {
    const data = req.body;
    // send to db
    console.log("sending");
    const client = await MongoClient.connect(
      "mongodb+srv://thinh1:matkhaucailon123@cluster0.bciun.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db();

    const meetupCollection = db.collection("meetups");

    const result = await meetupCollection.insertOne(data);

    console.log(result);
    client.close();
    res.status(201).json({ message: "insert success" });
  }
};

export default handler;
