import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { theme } from '../theme';
import { GhostIcon } from './GhostIcon';

interface ChatMessageProps {
  message: string;
  isUser?: boolean;
  delay?: number;
  showTyping?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isUser = false,
  delay = 0,
  showTyping = false,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  const translateY = interpolate(frame - delay, [0, 15], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const typingDuration = message.length * 1.2; // Total duration for typing
  const typingFrame = frame - delay - 10;
  
  // Accelerating typing speed: starts slow, speeds up dramatically
  const typingProgress = showTyping
    ? interpolate(
        typingFrame,
        [0, typingDuration * 0.5, typingDuration * 0.7, typingDuration],
        [0, 0.15, 0.4, 1], // First 50% of time types only 15% of text, then accelerates
        {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }
      )
    : 1;

  const displayedMessage = message.slice(0, Math.floor(message.length * typingProgress));

  return (
    <div
      style={{
        display: 'flex',
        gap: theme.spacing.md,
        opacity,
        transform: `translateY(${translateY}px)`,
        alignItems: 'flex-start',
        flexDirection: isUser ? 'row-reverse' : 'row',
      }}
    >
      {!isUser && (
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: theme.radius.full,
            background: theme.colors.surfaceLight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <GhostIcon size={20} />
        </div>
      )}
      
      <div
        style={{
          background: isUser ? theme.colors.userMessage : theme.colors.surface,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: theme.radius.md,
          padding: `${theme.spacing.md} ${theme.spacing.lg}`,
          maxWidth: '90%',
          minWidth: '200px',
          position: 'relative',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
        }}
      >
        {!isUser && (
          <div
            style={{
              fontSize: theme.fontSize.xs,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.xs,
              fontWeight: 600,
            }}
          >
            GHOST SIGNAL
          </div>
        )}
        <div
          style={{
            fontSize: theme.fontSize.base,
            color: theme.colors.text.primary,
            lineHeight: 1.5,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {displayedMessage}
          {showTyping && typingProgress < 1 && (
            <span
              style={{
                opacity: Math.sin(frame * 0.1) * 0.5 + 0.5,
                marginLeft: 2,
              }}
            >
              |
            </span>
          )}
        </div>
      </div>
    </div>
  );
};