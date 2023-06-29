import type { Stand } from "@prisma/client";
import type { MouseEvent } from "react";
import * as wanakana from "wanakana";

export const speakUtterance =
  (stand: Stand | undefined) => (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(stand?.name || "No name");

    // As the voices were already loaded in the voice selector
    // we don't need to use the onvoiceschanged event
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    utterance.voice = synth.getVoices()[69]!;
    utterance.rate = 0.8;

    synth.speak(utterance);
  };

export const romajiText = (value: string) => {
  const romaji = wanakana.toRomaji(value || "text");
  const fullRomaji = wanakana.tokenize(romaji);
  const formattedRomaji = fullRomaji
    .map((fragment) => {
      return fragment === "/" ? "" : fragment;
    })
    .join(" ");

  return formattedRomaji;
};
