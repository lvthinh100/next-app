import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { AJAX } from "../../helpers";

const NewMeetup = function () {
  const router = useRouter();
  const addMeetupHandler = async function (meetup) {
    const data = await AJAX("/api/new-meetup", meetup);

    console.log(data);

    router.push("/");
  };

  return (
    <Fragment>
      <Head>
        <title>Add new meet up</title>
        <meta name="description" content="Add your own meetup pls" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />;
    </Fragment>
  );
};

export default NewMeetup;
