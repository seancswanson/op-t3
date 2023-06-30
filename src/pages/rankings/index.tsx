import type { NextPage } from "next";
import { useState } from "react";

import Head from "next/head";
import Link from "next/link";
import { trpc } from "../../utils/trpc";
import { RankRow } from "../../components/rank-row";
import { RankTile } from "../../components/rank-tile";

const Ranking: NextPage = () => {
  const allStands = trpc.data.getAllStands.useQuery();
  const allStandsLoaded = allStands.data;

  const [isGalleryView, setIsGalleryView] = useState(false);
  const [moreInfoSelected, setMoreInfoSelected] = useState(false);

  const handleInfoClick = () => {
    setMoreInfoSelected(!moreInfoSelected);
  };

  if (!allStandsLoaded) {
    return <h1>Loading...</h1>;
  }

  console.log(allStands);

  const galleryView = () => {
    return (
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {allStands.data.map((stand, i) => {
          return (
            <RankTile
              stand={stand}
              i={i}
              key={i}
              moreInfoSelected={moreInfoSelected}
              setMoreInfoSelected={handleInfoClick}
            />
          );
        })}
      </div>
    );
  };

  const rowView = () => {
    return (
      <div className="rankings-container">
        {allStands.data.map((stand, i) => {
          return (
            <RankRow
              stand={stand}
              i={i}
              key={i}
              moreInfoSelected={moreInfoSelected}
              setMoreInfoSelected={handleInfoClick}
            />
          );
        })}
      </div>
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
      <div className="relative flex min-h-screen flex-col  pt-[180px]">
        <header className="absolute top-0 right-0 flex flex-col items-end p-4 ">
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
        <div className="mx-auto px-4">
          <div className="mb-6 flex items-center justify-between sm:flex-row">
            <div className="text-center text-2xl sm:mb-0">
              Which Stand is most OP?
            </div>
            <button
              className="rounded-md border border-gray-500 px-3 py-1 text-gray-500 hover:bg-gray-200 sm:w-auto"
              onClick={() => setIsGalleryView(!isGalleryView)}
            >
              {isGalleryView ? "Switch to Row View" : "Switch to Gallery View"}
            </button>
          </div>
          {isGalleryView ? galleryView() : rowView()}
        </div>
      </div>
    </>
  );
};

export default Ranking;
