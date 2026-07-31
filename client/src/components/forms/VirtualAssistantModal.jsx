import React, { useState } from 'react';
import { X, Bot, Send, User, Sparkles, MessageCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function VirtualAssistantModal() {
  const { isVirtualAssistantOpen, toggleVirtualAssistant } = useStore();
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Greetings. I am Apex Concierge, your AI health navigator. How may I assist you today? You can ask about doctors, OP timings, insurance, or health packages.'
    }
  ]);

  if (!isVirtualAssistantOpen) return null;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      let botResponse = 'Thank you for contacting Apex Health Institute. Our patient relations desk is available 24/7. Would you like to schedule an OP appointment or speak with an international patient coordinator?';

      const lower = userText.toLowerCase();
      if (lower.includes('doctor') || lower.includes('specialist')) {
        botResponse = 'We have 250+ world-renowned clinicians across Gastroenterology, Cardiology, Oncology, Neurosciences, and Orthopedics. You can filter and book doctors via our "OUR DOCTORS" tab.';
      } else if (lower.includes('package') || lower.includes('checkup')) {
        botResponse = 'Our Apex Master Health Shield includes 94 vital tests + 3D Echo + Whole Body USG. You can view and compare plans in our "Health Packages" section.';
      } else if (lower.includes('insurance') || lower.includes('cashless')) {
        botResponse = 'We partner with over 45 major health insurance providers and TPAs including Star Health, Max Bupa, HDFC Ergo, and ICICI Lombard for 100% cashless treatment.';
      } else if (lower.includes('address') || lower.includes('location')) {
        botResponse = 'Our main 1,200-bed Quaternary Campus is located at Mindspace Road, Gachibowli, Hyderabad (500032). We also have a Center of Excellence at Banjara Hills.';
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
    }, 800);
  };

  return (
    <div className="fixed bottom-24 right-6 z-[9999] w-96 max-w-[calc(100vw-2rem)] bg-white dark:bg-[#122824] rounded-3xl shadow-2xl border border-[#00695C]/20 overflow-hidden flex flex-col h-[500px] animate-in slide-in-from-bottom-5 duration-200">
      
      {/* Top Header */}
      <div className="btn-emerald-gradient p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-heading flex items-center gap-1.5">
              Apex Concierge AI <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            </h3>
            <span className="text-[10px] text-emerald-100 block">24/7 Virtual Navigator</span>
          </div>
        </div>
        <button
          onClick={toggleVirtualAssistant}
          className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F8FCFB] dark:bg-slate-900/50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#00695C] text-white rounded-br-none'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-[#122824] border-t border-slate-100 dark:border-slate-800 flex gap-2">
        <input
          type="text"
          placeholder="Ask a question..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-1 px-4 py-2 text-xs rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-[#00695C]"
        />
        <button
          type="submit"
          className="p-2.5 rounded-full btn-emerald-gradient text-white hover:scale-105 transition"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
