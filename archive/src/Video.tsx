import React from 'react';
import { Composition } from 'remotion';
import { GhostSignalChat } from './compositions/GhostSignalChat';
import { SimpleGhostSignalChat } from './compositions/SimpleGhostSignalChat';

export const RemotionVideo: React.FC = () => {
  return (
    <>
      <Composition
        id="GhostSignalChat"
        component={GhostSignalChat}
        durationInFrames={450}
        fps={30}
        width={1600}
        height={1000}
      />
      <Composition
        id="SimpleGhostSignalChat"
        component={SimpleGhostSignalChat}
        durationInFrames={300}
        fps={30}
        width={840}
        height={690}
      />
    </>
  );
};