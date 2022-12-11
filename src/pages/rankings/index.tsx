import Head from "next/head";
import Link from "next/link";

function Ranking() {
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
        <div className="title border-2 text-center text-4xl">OP-T3</div>
        <div className="title text-right text-4xl">
          <Link href="/">Vote</Link>
        </div>
        <div className="title text-right text-4xl">
          <Link href="rankings">Rankings</Link>
        </div>
      </header>
    </>
  );
}

export default Ranking;
