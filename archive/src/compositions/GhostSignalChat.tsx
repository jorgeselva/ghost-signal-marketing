import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { theme } from '../theme';
import { GhostIcon } from '../components/GhostIcon';
import { ChatMessage } from '../components/ChatMessage';
import { SuggestedActions } from '../components/SuggestedActions';

export const GhostSignalChat: React.FC = () => {
  const frame = useCurrentFrame();
  
  const messages = [
    {
      text: "What's happening with our competitor's pricing strategy?",
      isUser: true,
      delay: 30,
    },
    {
      text: "I've detected significant pricing changes from your competitors this week. Anthropic reduced their Claude API pricing by 20% for enterprise customers.",
      isUser: false,
      delay: 60,
      showTyping: true,
      showAnswer: true,
    },
  ];

  const suggestedActions = [
    {
      type: 'question' as const,
      title: "What trends have we noticed in competitor feature announcements over the past month?",
    },
    {
      type: 'question' as const,
      title: "Have there been any significant changes in user sentiment or feedback on competitor products in G2 reviews?",
    },
    {
      type: 'play' as const,
      title: "Launch competitive pricing response campaign",
      description: "Counter Anthropic's pricing move with value-focused messaging",
    },
    {
      type: 'play' as const,
      title: "Update sales battlecards",
      description: "Reflect new competitive landscape and pricing dynamics",
    },
  ];

  // Progressive expansion stages
  const stage1 = frame > 30; // User question
  const stage2 = frame > 90; // AI response starts
  const messageLength = messages[1].text.length;
  const typingDuration = messageLength * 1.2; // Match ChatMessage typing duration
  const responseStartDelay = 60 + 10;
  const responseFinished = responseStartDelay + typingDuration;
  const stage3 = frame > responseFinished + 10; // Suggestions appear after typing completes
  
  // Discrete container height expansion
  let containerHeight = 450; // Initial height
  if (frame >= 30) containerHeight = 550; // After user question
  if (frame >= 90) containerHeight = 650; // After AI response starts
  if (frame >= responseFinished + 10) containerHeight = 800; // After suggestions appear

  return (
    <AbsoluteFill
      style={{
        background: 'transparent',
        fontFamily: theme.fonts.sans,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 800,
          height: containerHeight,
          display: 'flex',
          flexDirection: 'column',
          background: theme.colors.surface,
          borderRadius: theme.radius.lg,
          boxShadow: theme.shadows.lg,
          overflow: 'hidden',
        }}
      >

        {/* Chat Area */}
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            padding: `${theme.spacing.xl} ${theme.spacing.xl} ${theme.spacing.md}`,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing.lg,
            }}
          >
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message.text}
                isUser={message.isUser}
                delay={message.delay}
                showTyping={message.showTyping}
                showAnswer={message.showAnswer}
                listItems={message.listItems}
              />
            ))}

            {stage3 && (
              <SuggestedActions
                actions={suggestedActions}
                delay={responseFinished + 10}
              />
            )}
          </div>
        </div>

        {/* Input Area */}
        <div
          style={{
            padding: `${theme.spacing.sm} ${theme.spacing.xl} ${theme.spacing.xl}`,
          }}
        >
          <div
            style={{
              background: theme.colors.surfaceLight,
              borderRadius: theme.radius.lg,
              padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.md,
            }}
          >
            <input
              type="text"
              placeholder="Ask Co-Pilot Anything..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: theme.fontSize.base,
                color: theme.colors.text.muted,
                fontFamily: theme.fonts.sans,
              }}
            />
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: theme.radius.sm,
                background: theme.colors.accent.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: 'white', fontSize: '18px' }}>↑</span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};