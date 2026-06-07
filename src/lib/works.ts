import { getCollection, type CollectionEntry } from "astro:content";
import type { Track, ColorKey } from "./site";
import { TRACK_META } from "./site";

export type Work = CollectionEntry<"works">;

export async function getAllWorks(): Promise<Work[]> {
  const all = await getCollection("works", ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getFeaturedWorks(): Promise<Work[]> {
  const all = await getAllWorks();
  return all.filter((w) => w.data.featured);
}

export async function getWorksByTrack(track: Track): Promise<Work[]> {
  const all = await getAllWorks();
  return all.filter((w) => w.data.track === track);
}

export async function getWorksByColor(color: ColorKey): Promise<Work[]> {
  const all = await getAllWorks();
  return all.filter((w) => w.data.color === color);
}

export function trackMeta(track: Track) {
  return TRACK_META[track];
}

export function colorHex(color: ColorKey): string {
  return ({
    paper: "#F2EEE3",
    ink: "#0F0F0E",
    rule: "#1A1A1A",
    mute: "#6B6B6B",
    cinnabar: "#C8412C",
    cobalt: "#1E3A8A",
    ochre: "#C68E3C",
    sage: "#6B7556",
    lilac: "#8B5E83",
    umber: "#3E2C1E",
  } as const)[color];
}
