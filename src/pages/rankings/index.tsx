import { NextPage } from "next";
import { useEffect, useState } from "react";
import Image from "next/legacy/image";
import jojoLogo from "../../../public/jjba_pixel_logo.png";

import Head from "next/head";
import Link from "next/link";
import { trpc } from "../../utils/trpc";
import { Stand } from "@prisma/client";

const Ranking: NextPage = () => {
  const allStands = trpc.data.getAllStands.useQuery();
  const allStandsLoaded = allStands.data;
  if (!allStandsLoaded) {
    return <h1>Loading...</h1>;
  }

  console.log(allStands);
  const rankRow = (stand: Stand, i: number) => {
    return (
      <>
        <div
          className="rank-row flex justify-between border border-b-0"
          key={i}
        >
          <div className="left flex">
            <div className="rank self-start border-2 bg-stone-200 px-2 text-black">
              {stand.id}
            </div>
            <div className="stand flex items-center p-2 py-4">
              <div className="stand-picture-container relative h-16 w-16 rounded-full border-2 border-gray-700">
                <Image
                  className="rendering-pixelated rounded-full"
                  src={`${stand?.stand_image_0 ?? jojoLogo.src}`}
                  alt={`Picture of ${stand?.name}`}
                  layout="fill"
                  objectFit="contain"
                  priority={true}
                />
              </div>
              <div className="name  px-4 text-2xl">{stand.name}</div>
            </div>
          </div>
          <div className="right flex items-center px-4">
            <div
              className="ratio  text-2xl
          "
            >
              99.9%
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Head>
        <title>OP-T3 | Ranking of the Stands</title>
        <meta
          name="description"
          content="Ranking page of the most OP Stands."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="justify-right absolute top-0 right-0 flex flex-col p-4">
        <div className="title border-2  text-center text-4xl">OP-T3</div>
        <div className="title text-right text-4xl">
          <Link href="/">Vote</Link>
        </div>
        <div className="title text-right text-4xl">
          <Link href="rankings">Rankings</Link>
        </div>
      </header>
      <div className="m-auto mt-60 flex max-w-screen-sm flex-col justify-center gap-6">
        <div className="text-center text-2xl">Which Stand is most OP?</div>
        <div className="rankings-container">
          {allStands.data.map((stand, i) => {
            return rankRow(stand, i);
          })}
        </div>
      </div>
    </>
  );
};

export default Ranking;
