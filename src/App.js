import * as React from 'react';
import styled from 'styled-components';
import { APIProvider } from './api';
import { deezer, spotify } from './colors';
import { DeezerLike, SpotifyLike } from './Like';

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const Half = styled.div`
  align-items: center;
  background-color: ${({ bg }) => bg};
  display: flex;
  height: 100%;
  justify-content: center;
  width: 50%;

  svg {
    cursor: pointer;
    width: 200px;
  }
`;

export const App = () => {
  return (
    <APIProvider>{}
      <Container>
        <Half bg={deezer.bg}>
          <DeezerLike id={1} />
        </Half>
        <Half bg={spotify.bg}>
          <SpotifyLike id={2} />
        </Half>
      </Container>
    </APIProvider>
  );
};
