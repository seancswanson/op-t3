import type { Stand } from "@prisma/client";
import jojoLogo from "../../public/jjba_pixel_logo.png";
import Image from "next/legacy/image";

import { speakUtterance, votePercentage } from "../utils/handlers";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  stand: Stand;
  i: number;
  moreInfoSelected: boolean;
  setMoreInfoSelected: Dispatch<SetStateAction<boolean>>;
}

export const RankRow = (props: Props) => {
  const handleButtonClick = speakUtterance(props.stand);
  return (
    <div
      className="rank-row flex justify-between border border-b-0"
      key={props.i}
      onClick={handleButtonClick}
    >
      <div className="left flex">
        <div className="rank self-start border-2 bg-stone-200 px-2 text-black">
          {props.i + 1}
        </div>
        <div className="stand flex items-center p-2 py-4">
          <div className="stand-picture-container relative h-16 w-16 rounded-full border-2 border-gray-700">
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
          <div className="name px-4 text-2xl">{props.stand.name}</div>
        </div>
      </div>
      <div className="right flex items-center px-4">
        <div className="ratio flex flex-col items-center text-2xl">
          <div className="top">
            {votePercentage(props.stand.votesFor, props.stand.votesAgainst)}
          </div>
          <div className="bottom flex text-sm">
            +{props.stand.votesFor} -{props.stand.votesAgainst}
          </div>{" "}
        </div>
      </div>
    </div>
  );
};
