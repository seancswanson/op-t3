import jojoLogo from "../../public/jjba_pixel_logo.png";
import Image from "next/legacy/image";

export const StandPlaceholderComponent = () => {
  return (
    <>
      <div className="flex max-w-xs flex-col items-center overflow-hidden bg-transparent">
        <div className="stand-name mb-8 flex text-xl">Stand Name</div>
        <div className="stand-picture-container relative mb-8 h-64 w-52 rounded">
          <Image
            className="lrendering-pixeated drop-shadow-2xl"
            src={`${jojoLogo.src}`}
            alt={`Jojo's Bizarre Adventure Logo`}
            layout="fill"
            objectFit="contain"
            priority={true}
          />
        </div>

        <button className="rounded-full border bg-slate-50  py-1 px-8 text-black hover:bg-slate-200">
          OP
        </button>
      </div>
    </>
  );
};
