import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { theme } from '../theme';

interface SuggestedAction {
  type: 'play' | 'question';
  title: string;
  description?: string;
}

interface SuggestedActionsProps {
  actions: SuggestedAction[];
  delay?: number;
}

export const SuggestedActions: React.FC<SuggestedActionsProps> = ({
  actions,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  
  const containerOpacity = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const headerOpacity = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        marginTop: theme.spacing.lg,
      }}
    >
      <h3
        style={{
          opacity: headerOpacity,
          fontSize: theme.fontSize.sm,
          color: theme.colors.text.secondary,
          marginBottom: theme.spacing.sm,
          fontWeight: 500,
        }}
      >
        Suggested follow-ups:
      </h3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.xs,
        }}
      >
        {actions.map((action, index) => {
          const actionOpacity = interpolate(
            frame - delay - 10 - (index * 3),
            [0, 10],
            [0, 1],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }
          );
          
          return (
            <div
              key={index}
              style={{
                opacity: actionOpacity,
                cursor: 'pointer',
                padding: `${theme.spacing.sm} ${theme.spacing.sm}`,
                borderBottom: index < actions.length - 1 ? `1px solid ${theme.colors.border}` : 'none',
                background: action.type === 'play' ? theme.colors.surfaceLight : 'transparent',
                borderRadius: theme.radius.sm,
                margin: `1px 0`,
                display: 'flex',
                alignItems: 'flex-start',
                gap: theme.spacing.xs,
                border: action.type === 'play' ? `1px solid ${theme.colors.border}` : 'none',
              }}
            >
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: theme.radius.sm,
                  background: action.type === 'play' ? theme.colors.accent.light : 'rgba(99, 102, 241, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px',
                }}
              >
                <span style={{ fontSize: '12px' }}>
                  {action.type === 'play' ? '▶' : '?'}
                </span>
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: theme.fontSize.sm,
                    color: theme.colors.text.primary,
                    fontWeight: action.type === 'play' ? 500 : 400,
                    marginBottom: action.description ? 2 : 0,
                  }}
                >
                  {action.title}
                </div>
                {action.description && (
                  <div
                    style={{
                      fontSize: theme.fontSize.xs,
                      color: theme.colors.text.secondary,
                      lineHeight: 1.3,
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                    }}
                  >
                    {action.description}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};