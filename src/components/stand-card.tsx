import jojoLogo from "../../public/jjba_pixel_logo.png";
import Image from "next/legacy/image";
import infoIcon from "../../public/info_icon.png";
import { useState } from "react";
import type { Stand } from "@prisma/client";
import StandInfo from "./StandInfo";

export const StandCardComponent = (props: {
  stand: Stand[];
  handleOpClick: (id: number) => void;
}) => {
  const [moreInfoSelected, setMoreInfoSelected] = useState(false);

  const stand = props.stand[0];

  const handleInfoClick = () => {
    setMoreInfoSelected(!moreInfoSelected);
  };

  return (
    <>
      <div className="flex max-w-xs flex-col items-center overflow-hidden bg-transparent">
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
        <div className="stand-picture-container  relative mb-8 h-64 w-52">
          <Image
            className="rendering-pixelated rounded drop-shadow-2xl"
            src={`${stand?.stand_image_0 ?? jojoLogo.src}`}
            alt={`Picture of ${stand?.name}`}
            layout="fill"
            objectFit="contain"
            priority={true}
            placeholder="blur"
            blurDataURL={`${stand?.stand_image_blur_0}`}
          />
        </div>
        <button
          className="rounded-full border bg-slate-50  py-1 px-8 text-black hover:bg-slate-200"
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          onClick={() => props.handleOpClick(stand!.id)}
        >
          OP
        </button>
      </div>
      <StandInfo
        stand={stand}
        moreInfoSelected={moreInfoSelected}
        setMoreInfoSelected={setMoreInfoSelected}
      />
    </>
  );
};
