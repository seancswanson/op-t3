import type { Stand } from "@prisma/client";
import type { MouseEvent } from "react";
import * as wanakana from "wanakana";

export const speakUtterance = (stand: Stand | undefined) => {
  return (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    e.preventDefault();
    const synth = window.speechSynthesis;
    synth.cancel();

    const utteranceText = stand?.name || "No name";
    const utterance = new SpeechSynthesisUtterance(utteranceText);
    utterance.voice = synth.getVoices()[75] ?? null;
    utterance.rate = 0.8;
    synth.speak(utterance);
  };
};

export const romajiText = (value: string) => {
  const romaji = wanakana.toRomaji(value || "text");
  const fullRomaji = wanakana.tokenize(romaji);
  const formattedRomaji = fullRomaji
    .map((fragment) => (fragment === "/" ? "" : fragment))
    .join(" ");

  return formattedRomaji;
};

export const votePercentage = (votesFor: number, votesAgainst: number) => {
  const totalVotes = votesFor + votesAgainst;
  const percentage = (votesFor / totalVotes) * 100;

  return percentage;
};
