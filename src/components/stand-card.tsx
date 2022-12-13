import jojoLogo from "../../public/jjba_pixel_logo.png";
import Image from "next/legacy/image";
import infoIcon from "../../public/info_icon.png";
import { useState } from "react";
import { Stand } from "@prisma/client";
import * as wanakana from "wanakana";

export const StandComponent = ( props: { stand: Stand[] }) => {
    const [textValue, setValue] = useState("");
    const [moreInfoSelected, setMoreInfoSelected] = useState(false);

  const stand = props.stand[0];

  const handleInfoClick = () => {
    setMoreInfoSelected(!moreInfoSelected);
  };

  const handleBgClick = () => {
    if (!moreInfoSelected) {
      return;
    }

    setMoreInfoSelected(!moreInfoSelected);
  };

  const handleOpClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Clicked!", e);
  };

  const romajiText = (value: string) => {
    const romaji = wanakana.toRomaji(value || "text");
    const fullRomaji = wanakana.tokenize(romaji)
    const formattedRomaji = fullRomaji.map((fragment) => {
      return fragment === "/" ? "" : fragment;
    }).join(' ');

    return formattedRomaji;
  }

  const TypePills = (types: (string | null | undefined)[]) => {
    return types.map((type, key) => {
      if (!type) {
        return;
      }
      return (
        <span
          key={key}
          className="text-s m-1 inline-block whitespace-nowrap rounded-full bg-blue-400 py-1 px-2.5 text-center align-baseline font-bold leading-none text-white"
        >
          {type}
        </span>
      );
    });
  };

  return (
    <>
      <div
        className="flex max-w-xs flex-col items-center overflow-hidden bg-transparent"
        onClick={handleBgClick}
      >
        <div className="stand-name mb-8 flex text-xl">
          {stand?.name}
          <button onClick={handleInfoClick} className="relative top-1 ml-2">
            <Image
              className="rendering-pixelated drop-shadow-2xl invert"
              src={`${infoIcon.src}`}
              alt={`Icon for more information about ${stand?.name}`}
              width="20"
              height="20"
            />
          </button>
        </div>
        <div className="stand-picture-container relative mb-8 h-64 w-52">
          <Image
            className="rendering-pixelated rounded drop-shadow-2xl"
            src={`${stand?.stand_image_0 ?? jojoLogo.src}`}
            alt={`Picture of ${stand?.name}`}
            layout="fill"
            objectFit="contain"
            priority={true}
          />
        </div>

        <button
          className="rounded-full border bg-slate-50  py-1 px-8 text-black hover:bg-slate-200"
          onClick={handleOpClick}
        >
          OP
        </button>
      </div>
      <div
        className={`${
          moreInfoSelected ? "grid" : "hidden"
        } absolute z-20 cursor-pointer flex-col items-center justify-around border-4 border-double border-slate-500 bg-slate-700 px-8 py-4 text-center shadow-2xl`}
        onClick={handleBgClick}
      >
        <div className="p-x-1 mb-1 border-2 text-xl">Stand Info</div>
        <div className="season mb-2 text-center">
          <div className="p-x-1 mb-1 text-xl underline">Season</div>
          <div>{stand?.season}</div>
        </div>
        <div className="names mb-2 text-center">
          <div className="p-x-1 mb-1 text-xl underline">Name</div>
          <div>[US] {stand?.name}</div>
          <div>[JP] {stand?.name_jp}</div>
          <div>
            {romajiText(stand?.name_jp || "romaji")}
          </div>
        </div>
        <div className="user mb-3 text-center">
          <div className="p-x-1 mb-1 text-xl underline">Stand User</div>
          <div className="mb-1">{stand?.user}</div>
          <div className="image relative m-auto h-32 w-32 rounded-full bg-center ring-2 ring-gray-300 dark:ring-gray-500">
            <Image
              className="rendering-pixelated rounded-full bg-center "
              src={`${stand?.user_image_0}`}
              alt={`Picture of ${stand?.user}`}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        <div className="types mb-2 text-center">
          <div className="stand-name p-x-1 mb-1 text-xl underline">
            Stand Types
          </div>
          <div className="flex justify-evenly">
            {TypePills([stand?.type_0, stand?.type_1, stand?.type_2])}
          </div>
        </div>
        <a
          className="border-4 border-double border-slate-500 hover:border-slate-300"
          href={stand?.reference_url}
        >
          - wiki link -
        </a>
      </div>
    </>
  );
};
