import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { theme } from '../theme';

interface FollowUpQuestionsProps {
  questions: string[];
  delay?: number;
}

export const FollowUpQuestions: React.FC<FollowUpQuestionsProps> = ({
  questions,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  
  const containerOpacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        opacity: containerOpacity,
        marginTop: theme.spacing.xl,
      }}
    >
      <h3
        style={{
          fontSize: theme.fontSize.sm,
          color: theme.colors.text.muted,
          marginBottom: theme.spacing.sm,
          fontWeight: 400,
        }}
      >
        Suggested follow-ups
      </h3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.sm,
        }}
      >
        {questions.map((question, index) => {
          const questionOpacity = interpolate(
            frame - delay - 10 - (index * 5),
            [0, 10],
            [0, 1],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }
          );
          
          return (
            <button
              key={index}
              style={{
                opacity: questionOpacity,
                background: theme.colors.surface,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.radius.sm,
                padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                fontSize: theme.fontSize.sm,
                color: theme.colors.text.secondary,
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: theme.fonts.sans,
              }}
            >
              {question}
            </button>
          );
        })}
      </div>
    </div>
  );
};