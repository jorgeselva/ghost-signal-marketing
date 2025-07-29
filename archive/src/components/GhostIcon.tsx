import React from 'react';
import { Img, staticFile } from 'remotion';

export const GhostIcon: React.FC<{ size?: number }> = ({ size = 40 }) => {
  return (
    <Img
      src={staticFile('ghost-logo.png')}
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
      }}
    />
  );
};