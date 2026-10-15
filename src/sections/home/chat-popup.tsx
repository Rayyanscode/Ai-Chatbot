'use client';

import { useState, useRef, useEffect } from 'react';
// @mui
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
// api
import { sendBusinessChat } from 'src/api/business';
import type { ChatMessage } from 'src/types/business';

// ----------------------------------------------------------------------

type Props = {
  publicKey: string;
  businessName: string;
};

export default function ChatPopup({ publicKey, businessName }: Props) {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, chatOpen]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setInput('');
    setIsTyping(true);

    try {
      const reply = await sendBusinessChat(publicKey, text, nextHistory);
      const botMsg: ChatMessage = {
        id: `${Date.now()}-bot`,
        role: 'assistant',
        content: reply || getFallbackReply(text, businessName),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const botMsg: ChatMessage = {
        id: `${Date.now()}-bot`,
        role: 'assistant',
        content: getFallbackReply(text, businessName),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <Tooltip title={chatOpen ? 'Close chat' : 'Chat with AI'} placement="left">
        <Fab
          aria-label={chatOpen ? 'Close chat' : 'Open AI chat'}
          onClick={() => setChatOpen((prev) => !prev)}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            bgcolor: '#64BFB8',
            color: '#fff',
            '&:hover': { bgcolor: '#4fa8a1' },
            zIndex: 1300,
            width: 60,
            height: 60,
            fontSize: 26,
          }}
        >
          {chatOpen ? '✕' : '💬'}
        </Fab>
      </Tooltip>

      <Fade in={chatOpen}>
        <Paper
          elevation={8}
          sx={{
            position: 'fixed',
            bottom: 96,
            right: 24,
            width: { xs: 'calc(100vw - 48px)', sm: 380 },
            height: 410,
            borderRadius: 3,
            display: chatOpen ? 'flex' : 'none',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 1200,
          }}
        >
          <Box
            sx={{
              px: 2.5,
              py: 1.5,
              bgcolor: '#64BFB8',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.25)', width: 36, height: 36, fontSize: 16 }}>
              AI
            </Avatar>
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography variant="subtitle2" fontWeight={700} noWrap>
                {businessName} — AI Assistant
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.85 }}>
                Online · Typically replies instantly
              </Typography>
            </Box>
            <IconButton size="small" onClick={() => setChatOpen(false)} sx={{ color: '#fff' }}>
              ✕
            </IconButton>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              px: 2,
              py: 2,
              bgcolor: 'grey.50',
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
            }}
          >
            {messages.map((msg) => (
              <Box
                key={msg.id}
                sx={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <Box
                  sx={{
                    maxWidth: '80%',
                    px: 2,
                    py: 1,
                    borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    bgcolor: msg.role === 'user' ? '#64BFB8' : 'background.paper',
                    color: msg.role === 'user' ? '#fff' : 'text.primary',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                  }}
                >
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                    {msg.content}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      mt: 0.5,
                      opacity: 0.6,
                      textAlign: msg.role === 'user' ? 'right' : 'left',
                    }}
                  >
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                </Box>
              </Box>
            ))}

            {isTyping && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={14} sx={{ color: '#64BFB8' }} />
                <Typography variant="caption" color="text.secondary">
                  AI is typing…
                </Typography>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          <Box
            sx={{
              px: 2,
              py: 1.5,
              borderTop: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
              display: 'flex',
              gap: 1,
              alignItems: 'flex-end',
            }}
          >
            <TextField
              fullWidth
              size="small"
              multiline
              maxRows={3}
              placeholder="Type your message…"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&.Mui-focused fieldset': { borderColor: '#64BFB8' },
                },
              }}
            />
            <IconButton
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              sx={{
                bgcolor: '#64BFB8',
                color: '#fff',
                borderRadius: 2,
                '&:hover': { bgcolor: '#4fa8a1' },
                '&:disabled': { bgcolor: 'action.disabledBackground' },
                p: 1,
                flexShrink: 0,
              }}
            >
              ➤
            </IconButton>
          </Box>
        </Paper>
      </Fade>
    </>
  );
}

function getFallbackReply(userInput: string, businessName: string): string {
  const lower = userInput.toLowerCase();

  if (lower.includes('hour') || lower.includes('open') || lower.includes('time')) {
    return `${businessName} is open Monday–Friday, 9 AM to 6 PM, and Saturday 10 AM to 4 PM. We are closed on Sundays. Would you like to schedule an appointment?`;
  }
  if (
    lower.includes('price') ||
    lower.includes('cost') ||
    lower.includes('fee') ||
    lower.includes('pricing')
  ) {
    return `Our pricing depends on the specific service or product. Could you tell me more about what you're looking for? I can give you a more accurate estimate.`;
  }
  if (
    lower.includes('contact') ||
    lower.includes('reach') ||
    lower.includes('email') ||
    lower.includes('phone')
  ) {
    return `You can reach ${businessName} via the contact details shown on this page. Our team typically responds within 1 business day. Is there something specific I can help you with right now?`;
  }
  if (lower.includes('location') || lower.includes('address') || lower.includes('where')) {
    return `You can find our address listed on this page. We also offer virtual consultations — just let me know your preference!`;
  }
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return `Hello there! I'm here to help with any questions about ${businessName}. What would you like to know?`;
  }
  if (lower.includes('thank')) {
    return `You're welcome! Feel free to ask if you have any other questions. We're happy to help!`;
  }
  if (lower.includes('refund') || lower.includes('return') || lower.includes('cancel')) {
    return `We have a clear refund and cancellation policy. Generally, requests made within 14 days are eligible for a full refund. For specifics, I'd recommend reaching out to our team directly so we can review your case.`;
  }

  return `Thanks for your question! I'll make sure to connect you with the right information about ${businessName}. For complex queries, our team is available via email or phone listed above. Is there anything else I can assist you with?`;
}
