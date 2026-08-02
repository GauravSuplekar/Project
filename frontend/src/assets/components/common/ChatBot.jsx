import { useState } from 'react';
import { createPortal } from 'react-dom';

const quickReplies = [
  { label: 'How do I register?', value: 'register' },
  { label: 'How do I apply?', value: 'apply' },
  { label: 'How do interviews work?', value: 'interview' },
  { label: 'Need help logging in?', value: 'login' },
];

const getBotReply = (text) => {
  const message = text.toLowerCase();

  if (message.includes('register') || message.includes('signup')) {
    return 'You can register from the Sign up option on the home page. Choose whether you are a candidate or a client, then complete the form to create your account.';
  }

  if (message.includes('login') || message.includes('sign in')) {
    return 'Use the Sign in page and select the right portal: Candidate, Client, or Admin. If you have trouble, check your email and password or use the password recovery option.';
  }

  if (message.includes('apply') || message.includes('job') || message.includes('requirement')) {
    return 'Candidates can browse available requirements, view details, and submit applications from the candidate dashboard.';
  }

  if (message.includes('interview')) {
    return 'Interview updates and joining links can be managed from the interview section in your dashboard.';
  }

  if (message.includes('contact') || message.includes('support')) {
    return 'You can also reach our support team through the Contact page for account or platform questions.';
  }

  return 'I can help with registration, login, applications, interviews, and general navigation. Try one of the quick options below or ask a question in your own words.';
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hi there! I am your AI assistant. I can help with registration, login, applications, and interviews. How may I assist you today?',
    },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = (text) => {
    const trimmedText = text?.trim();

    if (!trimmedText) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: trimmedText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    window.setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        sender: 'bot',
        text: getBotReply(trimmedText),
      };
      setMessages((prev) => [...prev, reply]);
    }, 350);
  };

  const content = (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col items-end gap-3">
      <div
        className={`relative overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-2xl transition-all duration-300 ease-out ${
          isOpen ? 'w-80 opacity-100 sm:w-96' : 'w-0 opacity-0'
        }`}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        <div className="bg-brand px-4 py-3 text-white">
          <div className="font-semibold">Recruitment Assistant</div>
          <div className="text-sm text-white/80">Ask me anything about the platform</div>
        </div>

        <div className="flex max-h-96 flex-col gap-2 overflow-y-auto bg-slate-50 p-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                message.sender === 'user'
                  ? 'ml-auto bg-brand text-white'
                  : 'bg-white text-slate-700 shadow-sm'
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>

        <div className="border-t border-slate-200 bg-white p-3">
          <div className="mb-2 flex flex-wrap gap-2">
            {quickReplies.map((reply) => (
              <button
                key={reply.label}
                type="button"
                onClick={() => sendMessage(reply.value)}
                className="rounded-full border border-slate-200 px-2.5 py-1 text-xs text-slate-600 transition hover:bg-slate-100"
              >
                {reply.label}
              </button>
            ))}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(input);
            }}
            className="flex gap-2"
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your question..."
              className="flex-1 rounded-full border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
            />
            <button
              type="submit"
              className="rounded-full bg-brand px-3 py-2 text-sm font-semibold text-white transition hover:scale-[1.02]"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative flex items-center gap-2 rounded-full border-4 border-white bg-brand px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(10,102,194,0.45)] transition-all duration-300 hover:scale-105"
        aria-label="Toggle chatbot"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-brand/40 opacity-75" />
        <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white/20 animate-bounce">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M7 8h10M7 12h6" strokeLinecap="round" />
            <path d="M5 4h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-4 4V6a2 2 0 0 1 2-2Z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="relative">Need help?</span>
      </button>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(content, document.body) : null;
};

export default ChatBot;
