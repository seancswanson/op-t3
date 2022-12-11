/* eslint-disable @typescript-eslint/ban-ts-comment */
import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import { getOptionsForVote } from "../utils/getRandomStand";
import { useEffect, useState } from "react";
import { StandComponent } from "./components/stand-card";
import Link from "next/link";

const Home: NextPage = () => {
  const [ids, setIds] = useState([1, 2]);

  useEffect(() => {
    setIds(getOptionsForVote());
  }, []);

  const [first = 1, second = 2] = ids;

  console.log(...ids);

  const firstStand = trpc.data.getStandById.useQuery({ id: first });
  const secondStand = trpc.data.getStandById.useQuery({ id: second });

  if (!firstStand.data || !secondStand.data ) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>OP-T3 | Battle of the Stands</title>
        <meta name="description" content="Voting page of the most OP Stands." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <header className="justify-right absolute top-0 right-0 flex flex-col p-4">
          <div className="title border-2 text-center text-4xl">OP-T3</div>
          <div className="title text-right text-4xl">
            <Link href="/">Vote</Link>
          </div>
          <div className="title text-right text-4xl">
            <Link href="rankings">Rankings</Link>
          </div>
        </header>
      <div className="m-auto flex h-screen max-w-screen-sm flex-col justify-center gap-6">
        <div className="text-center text-2xl">Which Stand is more OP?</div>
        <div className="flex items-center justify-around p-8">
          <StandComponent stand={firstStand.data} />
          <div className="p-8 italic">or</div>
          <StandComponent stand={secondStand.data} />
        </div>
      </div>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
