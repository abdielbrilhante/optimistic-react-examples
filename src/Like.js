import * as React from 'react';
import { useAPI } from './api';
import { deezer, spotify } from './colors';
import { Heart } from './Heart';

export const DeezerLike = ({ id }) => {
  const { findSong, saveLikedStatus } = useAPI({ optimistic: false });
  const song = findSong(id);

  const update = () => {
    saveLikedStatus(id, !song.liked);
  };

  return (
    <Heart filled={song.liked} onClick={update} color={deezer.accent} />
  );
};

export const SpotifyLike = ({ id }) => {
  const { findSong, saveLikedStatus } = useAPI({ optimistic: true });
  const song = findSong(id);

  const handleClick = () => {
    saveLikedStatus(id, !song.liked);
  };

  return (
    <Heart filled={song.liked} onClick={handleClick} color={spotify.accent} />
  );
};
