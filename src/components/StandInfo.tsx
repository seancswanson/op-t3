import { Stand } from "@prisma/client";
import Image from "next/legacy/image";
import { romajiText } from "../utils/handlers";
import { Dispatch, SetStateAction, useState } from "react";
import speakIcon from "../../public/speak_icon.png";
import closeIcon from "../../public/close_icon.png";
import { MouseEvent } from "react";

interface Props {
  stand: Stand | undefined;
  moreInfoSelected: boolean;
  setMoreInfoSelected: Dispatch<SetStateAction<boolean>>;
}

export default function StandInfo(props: Props) {
  const synth = window.speechSynthesis;
  const handleSpeakClick = (e: MouseEvent<HTMLButtonElement>) => {
    const utterance = new SpeechSynthesisUtterance(
      romajiText(props.stand?.name || "No name")
    );

    // As the voices were already loaded in the voice selector
    // we don't need to use the onvoiceschanged event
    utterance.voice = synth.getVoices()[69]!;
    utterance.rate = 0.8;

    synth.speak(utterance);
  };

  const handleCloseClick = () => {
    console.log('clicked')
    if (!props.moreInfoSelected) {
      return;
    }

    props.setMoreInfoSelected(!props.moreInfoSelected);
  };

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
    <div
      className={`${
        props.moreInfoSelected ? "grid" : "hidden"
      } absolute z-20 cursor-pointer flex-col items-center justify-around border-4 border-double border-slate-500 bg-slate-700 px-8 py-4 text-center shadow-2xl`}
    >
      <div className="p-x-1 mb-4 flex items-center justify-around border-2 text-xl">
        <div className="w-[32px]"></div>
        <div>Stand Info</div>
        <button onClick={handleCloseClick} className="relative top-1 ml-2">
          <Image
            className="rendering-pixelated drop-shadow-2xl"
            src={`${closeIcon.src}`}
            alt={`Icon to close the info window for ${props.stand?.name}`}
            width="20"
            height="20"
          />
        </button>
      </div>
      <div className="season mb-2 text-center">
        <div className="p-x-1 mb-1 text-xl underline">Season</div>
        <div>{props.stand?.season}</div>
      </div>
      <div className="names mb-2 flex flex-col items-center text-center">
        <div className="p-x-1 mb-1 text-xl underline">Name</div>
        <div>[US] {props.stand?.name}</div>
        <div>[JP] {props.stand?.name_jp}</div>
        <div className="flex">
          {romajiText(props.stand?.name_jp || "romaji")}{" "}
          <button onClick={handleSpeakClick} className="relative top-1 ml-2">
            <Image
              className="rendering-pixelated drop-shadow-2xl"
              src={`${speakIcon.src}`}
              alt={`Icon for to hear how the Romaji is pronounced for ${props.stand?.name}`}
              width="20"
              height="20"
            />
          </button>
        </div>
      </div>
      <div className="user mb-3 text-center">
        <div className="p-x-1 mb-1 text-xl underline">Stand User</div>
        <div className="mb-1">{props.stand?.user}</div>
        <div className="image relative m-auto h-32 w-32 rounded-full bg-center ring-2 ring-gray-300 dark:ring-gray-500">
          <Image
            className="rendering-pixelated rounded-full bg-center "
            src={`${props.stand?.user_image_0}`}
            alt={`Picture of ${props.stand?.user}`}
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
      <div className="types mb-8 text-center">
        <div className="stand-name p-x-1 mb-1 text-xl underline">
          Stand Types
        </div>
        <div className="flex justify-evenly">
          {TypePills([
            props.stand?.type_0,
            props.stand?.type_1,
            props.stand?.type_2,
          ])}
        </div>
      </div>
      <a
        className="rounded-full border bg-slate-50  py-1 px-8 text-black hover:bg-slate-200"
        href={props.stand?.reference_url}
      >
        Go to Wiki
      </a>
    </div>
  );
}
