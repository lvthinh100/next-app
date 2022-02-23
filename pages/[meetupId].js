import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
import MeetupItem from "../components/meetups/MeetupItem";

const MeetupDetail = function (props) {
  const meetup = props.meetupData;
  return (
    <Fragment>
      <Head>
        <title>{meetup.title}</title>
      </Head>
      <MeetupItem
        key={meetup.id}
        id={meetup.id}
        image={meetup.image}
        title={meetup.title}
        address={meetup.address}
      />
    </Fragment>
  );
};

export const getStaticPaths = async function () {
  const client = await MongoClient.connect(
    "mongodb+srv://thinh1:matkhaucailon123@cluster0.bciun.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupCollection = db.collection("meetups");
  const idList = await meetupCollection.find({}, { _id: 1 }).toArray();
  return {
    fallback: "blocking",
    paths: idList.map((meetup) => {
      return {
        params: {
          meetupId: meetup._id.toString(),
        },
      };
    }),
  };
};

export const getStaticProps = async function (context) {
  const { meetupId } = context.params;
  const client = await MongoClient.connect(
    "mongodb+srv://thinh1:matkhaucailon123@cluster0.bciun.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupCollection = db.collection("meetups");
  const meetup = await meetupCollection.findOne({ _id: ObjectId(meetupId) });
  return {
    props: {
      meetupData: {
        ...meetup,
        id: meetup._id.toString(),
        _id: null,
      },
    },
  };
};

export default MeetupDetail;
