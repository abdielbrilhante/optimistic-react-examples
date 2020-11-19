import * as React from 'react';

// This could be Apollo, Relay, React Query, etc

const apiContext = React.createContext();

const defaultSongs = [
  { id: 1, liked: true },
  { id: 2, liked: false },
];

const MAKE_IT_FAIL = false;

const makeLikeRequest = (id, value) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (MAKE_IT_FAIL) {
      reject(new Error('400 Bad Request'));
    } else {
      resolve({ id, liked: value });
      console.log(`Fulfilled request for #${id} | value set to ${value}`);
    }
  }, 1000);
});

export const APIProvider = ({ children }) => {
  const [songs, setSongs] = React.useState(defaultSongs);

  const findSong = (id) => songs.find((song) => song.id === id);
  const updateSong = (song) => {
    setSongs((current) => current.map((_song) => {
      return _song.id === song.id ? song : _song;
    }));
  };

  return (
    <apiContext.Provider value={{ findSong, updateSong }}>
      { children }
    </apiContext.Provider>
  );
};

export const useAPI = ({ optimistic }) => {
  const { findSong, updateSong } = React.useContext(apiContext);

  const simpleUpdate = (id, value) => {
    makeLikeRequest(id, value).then((response) => {
      updateSong(response);
    });
  };

  const optimisticUpdate = (id, value) => {
    updateSong({ id, liked: value });
    makeLikeRequest(id, value).then((response) => {
      updateSong(response);
    }).catch(() => {
      // rollback
      // updateSong({ id, liked: !value });
    });
  };

  return {
    findSong,
    saveLikedStatus: optimistic ? optimisticUpdate : simpleUpdate,
  };
};
