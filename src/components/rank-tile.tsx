import { Stand } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import jojoLogo from "../../public/jjba_pixel_logo.png";
import { MouseEvent } from "react";

import { handleSpeakClick, romajiText } from "../utils/handlers";
import Image from "next/legacy/image";

interface Props {
  stand: Stand;
  i: number;
  moreInfoSelected: boolean;
  setMoreInfoSelected: Dispatch<SetStateAction<boolean>>;
}
export const RankTile = (props: Props) => {
      const synth = window.speechSynthesis;
      const handleSpeakClick = () => {
        const utterance = new SpeechSynthesisUtterance(
          romajiText(props.stand?.name || "No name")
        );

        // As the voices were already loaded in the voice selector
        // we don't need to use the onvoiceschanged event
        utterance.voice = synth.getVoices()[69]!;
        utterance.rate = 0.8;

        synth.speak(utterance);
      };
  return (
    <div
      className="relative flex flex-col items-center border-2 border-gray-700"
      key={props.i}
      onClick={handleSpeakClick}
    >
      <div className="rank self-start border-2 bg-stone-200 px-2 text-black">
        {props.stand.id}
      </div>
      <div className="stand-picture-container relative mb-2 h-24 w-24 rounded-full border-2 border-gray-700">
        <Image
          className="rendering-pixelated rounded-full"
          src={`${props.stand?.stand_image_0 ?? jojoLogo.src}`}
          alt={`Picture of ${props.stand?.name}`}
          layout="fill"
          objectFit="contain"
          priority={true}
        />
      </div>
      <div className="name text-center text-2xl">{props.stand.name}</div>
      <div className="ratio text-center text-2xl">99.9%</div>
    </div>
  );
};
