/* eslint-disable @typescript-eslint/ban-ts-comment */
import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import { getOptionsForVote } from "../utils/getRandomStand";
import { useEffect, useState } from "react";
import { StandComponent } from "../components/stand-card";
import Link from "next/link";
import { StandPlaceholderComponent } from "../components/stand-card-placeholder";

const Home: NextPage = () => {
  const [ids, setIds] = useState([1, 2]);

  useEffect(() => {
    setIds(getOptionsForVote());
  }, []);

  const [first = 1, second = 2] = ids;
const handleClick = () => {
  console.log('ho)')
}
  console.log(...ids);

  const firstStand = trpc.data.getStandById.useQuery({ id: first });
  const secondStand = trpc.data.getStandById.useQuery({ id: second });
  const standsHaveData = firstStand.data && secondStand.data;

  return (
    <>
      <Head>
        <title>OP-T3 | Battle of the Stands</title>
        <meta name="description" content="Voting page of the most OP Stands." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative flex h-screen flex-col">
        <header className="absolute top-0 right-0 flex flex-col items-end p-4">
          <Link className="title border-2 text-center text-4xl" href="/">
            OP-T3
          </Link>
          <div className="title text-right text-4xl">
            <Link href="/">Vote</Link>
          </div>
          <div className="title text-right text-4xl">
            <Link href="rankings">Rankings</Link>
          </div>
        </header>
        <div className="flex h-full flex-col items-center justify-center">
          <div className="mb-4 text-center text-2xl sm:mb-8">
            Which Stand is more OP?
          </div>
          <div className="flex flex-col items-center gap-10 justify-center p-4 sm:flex-row sm:p-8">
            {standsHaveData ? (
              <StandComponent stand={firstStand.data} />
            ) : (
              <StandPlaceholderComponent />
            )}
            <div className="my-4 italic sm:my-0">or</div>
            {standsHaveData ? (
              <StandComponent stand={secondStand.data} />
            ) : (
              <StandPlaceholderComponent />
            )}
          </div>
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
