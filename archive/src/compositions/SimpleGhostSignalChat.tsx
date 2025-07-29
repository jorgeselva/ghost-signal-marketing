import React from 'react';
import { AbsoluteFill, staticFile, Img } from 'remotion';
import { theme } from '../theme';
import { ChatMessage } from '../components/ChatMessage';
import { SuggestedActions } from '../components/SuggestedActions';

export const SimpleGhostSignalChat: React.FC = () => {
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
    },
  ];

  const suggestedActions = [
    {
      type: 'question' as const,
      title: "What trends have we noticed in competitor feature announcements?",
    },
    {
      type: 'play' as const,
      title: "Launch competitive pricing response campaign",
      description: "Counter Anthropic's pricing move with value-focused messaging",
    },
  ];

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
          minHeight: 500,
          height: 'auto',
          maxHeight: '90vh',
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
            padding: `${theme.spacing.lg} ${theme.spacing.lg} ${theme.spacing.md}`,
            overflowY: 'auto',
            minHeight: 0,
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
              />
            ))}

            <SuggestedActions
              actions={suggestedActions}
              delay={200}
            />
          </div>
        </div>

        {/* Input Area */}
        <div
          style={{
            padding: `${theme.spacing.sm} ${theme.spacing.lg} ${theme.spacing.lg}`,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              background: theme.colors.surfaceLight,
              borderRadius: theme.radius.lg,
              padding: `${theme.spacing.md} ${theme.spacing.lg}`,
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