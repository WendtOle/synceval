import { atomWithStorage } from "jotai/utils";

export enum SortOption {
  DEFAULT = "default",
  PLAYLISTS = "playlists",
  ARTISTS = "artists",
}

export const SortOptionNames: Record<SortOption, string> = {
  [SortOption.DEFAULT]: "None",
  [SortOption.ARTISTS]: "Artists",
  [SortOption.PLAYLISTS]: "Playlists",
};

export const sortAtom = atomWithStorage<SortOption>(
  "groupBy",
  SortOption.DEFAULT,
);
