import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { theme } from '../theme';

interface CompetitivePlayProps {
  title: string;
  description: string;
  metrics?: string;
  tag?: string;
  delay?: number;
  index: number;
}

export const CompetitivePlay: React.FC<CompetitivePlayProps> = ({
  title,
  description,
  metrics,
  tag,
  delay = 0,
  index,
}) => {
  const frame = useCurrentFrame();
  
  const opacity = interpolate(frame - delay - (index * 10), [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  const translateX = interpolate(frame - delay - (index * 10), [0, 20], [-30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${translateX}px)`,
        background: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.radius.sm,
        padding: theme.spacing.md,
        display: 'flex',
        gap: theme.spacing.lg,
        alignItems: 'flex-start',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: theme.radius.sm,
          background: theme.colors.accent.light,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: '24px' }}>{index === 0 ? '📊' : index === 1 ? '🎨' : '💬'}</span>
      </div>
      
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.sm,
            marginBottom: theme.spacing.sm,
          }}
        >
          <h3
            style={{
              fontSize: theme.fontSize.base,
              color: theme.colors.text.primary,
              fontWeight: 500,
              margin: 0,
              flex: 1,
            }}
          >
            {title}
          </h3>
          {tag && (
            <span
              style={{
                fontSize: '11px',
                color: theme.colors.text.secondary,
                background: theme.colors.surfaceLight,
                padding: `2px ${theme.spacing.sm}`,
                borderRadius: theme.radius.sm,
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              {tag}
            </span>
          )}
        </div>
        
        <p
          style={{
            fontSize: theme.fontSize.sm,
            color: theme.colors.text.secondary,
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          {description}
        </p>
        
        {metrics && (
          <div
            style={{
              marginTop: theme.spacing.sm,
              fontSize: theme.fontSize.xs,
              color: theme.colors.text.muted,
              fontFamily: theme.fonts.mono,
            }}
          >
            {metrics}
          </div>
        )}
      </div>
    </div>
  );
};