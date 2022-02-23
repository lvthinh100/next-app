import { ObjectID } from "bson";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = function (props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetup</title>
      </Head>
      <MeetupList meetups={props.meetupsData} />;
    </Fragment>
  );
};

export const getStaticProps = async function () {
  const client = await MongoClient.connect(
    "mongodb+srv://thinh1:matkhaucailon123@cluster0.bciun.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find().toArray();

  client.close();
  return {
    props: {
      meetupsData: meetups.map((meetup) => {
        return {
          ...meetup,
          id: meetup._id.toString(),
          _id: null,
        };
      }),
    },
    revalidate: 1,
  };
};

export default HomePage;
