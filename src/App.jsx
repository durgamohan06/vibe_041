import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ChatProvider } from './context/ChatContext';
import ChatLayout from './components/Layout/ChatLayout';
import Home from './pages/Home';
import AssessMyKnowledge from './pages/AssessMyKnowledge';
import Roadmap from './pages/Roadmap';
import ExploreDomains from './pages/ExploreDomains';
import NewsTrends from './pages/NewsTrends';
import ChatInterface from './pages/ChatInterface';

const Placeholder = ({ title }) => (
  <div className="flex flex-col items-center justify-center py-20 text-slate-500">
    <h1 className="text-2xl font-bold mb-2 text-slate-300">{title}</h1>
    <p>This module is currently under development.</p>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <ChatProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ChatLayout />}>
              <Route index element={<Home />} />
              <Route path="assess" element={<AssessMyKnowledge />} />
              <Route path="roadmaps" element={<Roadmap />} />
              <Route path="explore" element={<ExploreDomains />} />
              <Route path="news" element={<NewsTrends />} />
              <Route path="chat" element={<ChatInterface />} />
              <Route path="history" element={<Placeholder title="Learning History" />} />
              <Route path="settings" element={<Placeholder title="Settings" />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ChatProvider>
    </ThemeProvider>
  );
}

export default App;
