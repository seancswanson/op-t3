import type { Stand } from "@prisma/client";
import type { Dispatch, SetStateAction } from "react";
import jojoLogo from "../../public/jjba_pixel_logo.png";

import { speakUtterance, votePercentage } from "../utils/handlers";
import Image from "next/legacy/image";

interface Props {
  stand: Stand;
  i: number;
  moreInfoSelected: boolean;
  setMoreInfoSelected: Dispatch<SetStateAction<boolean>>;
}
export const RankTile = (props: Props) => {
  const handleButtonClick = speakUtterance(props.stand);

  return (
    <div
      className="relative flex flex-col items-center border-2 border-gray-700"
      key={props.i}
      onClick={handleButtonClick}
    >
      <div className="rank self-start border-2 bg-stone-200 px-2 text-black">
        {props.i + 1}
      </div>
      <div className="stand-picture-container relative mb-2 h-24 w-24 rounded-full border-2 border-gray-700">
        <Image
          className="rendering-pixelated rounded-full"
          src={`${props.stand?.stand_image_0 ?? jojoLogo.src}`}
          alt={`Picture of ${props.stand?.name}`}
          layout="fill"
          objectFit="contain"
          priority={true}
          placeholder="blur"
          blurDataURL={`${props.stand?.stand_image_blur_0}`}
        />
      </div>
      <div className="name text-center text-2xl">{props.stand.name}</div>
      <div className="ratio flex flex-col text-center text-2xl">
        <div className="top">
          {votePercentage(props.stand.votesFor, props.stand.votesAgainst)}
        </div>
        <div className="bottom flex text-sm">
          +{props.stand.votesFor} -{props.stand.votesAgainst}
        </div>
      </div>
    </div>
  );
};
