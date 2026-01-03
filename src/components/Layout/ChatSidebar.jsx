import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Settings as SettingsIcon, 
  MoreHorizontal,
  Pin,
  Star,
  Archive,
  Trash2,
  Edit2,
  LayoutGrid,
  BookOpen,
  Map,
  MessageSquare,
  LogOut,
  User,
  FileText
} from 'lucide-react';
import { useChat } from '../../context/ChatContext';

const ChatSidebar = ({ isMobileOpen, setIsMobileOpen, onOpenSettings }) => {
  const navigate = useNavigate();
  const { conversations, activeChatId, setActiveChatId, addConversation, deleteConversation, togglePin } = useChat();
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredChatId, setHoveredChatId] = useState(null);
  const [menuChatId, setMenuChatId] = useState(null);

  const filteredConversations = conversations.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedChats = filteredConversations.filter(c => c.pinned);
  const recentChats = filteredConversations.filter(c => !c.pinned);

  const handleNewChat = () => {
    addConversation('New Chat');
    navigate('/chat');
    setIsMobileOpen(false);
  };

  const ConversationItem = ({ chat }) => (
    <div 
      className={`group relative flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-colors
        ${activeChatId === chat.id 
          ? 'bg-gray-200 dark:bg-gray-800' 
          : 'hover:bg-gray-200 dark:hover:bg-gray-800/50'}
      `}
      onClick={() => { setActiveChatId(chat.id); setIsMobileOpen(false); navigate('/chat'); }}
      onMouseEnter={() => setHoveredChatId(chat.id)}
      onMouseLeave={() => setHoveredChatId(null)}
    >
      <MessageSquare size={18} className="text-gray-900 dark:text-gray-100 shrink-0" />
      <div className="flex-1 min-w-0 pr-6">
        <h4 className={`text-sm font-normal truncate ${activeChatId === chat.id ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
          {chat.title}
        </h4>
      </div>

      {/* Hover Menu Trigger */}
      {(hoveredChatId === chat.id || menuChatId === chat.id) && (
        <div className="absolute right-2 flex items-center bg-transparent">
            {chat.pinned && <Pin size={12} className="mr-2 text-gray-400" />}
            <button 
                className="p-1 rounded hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-500"
                onClick={(e) => { e.stopPropagation(); setMenuChatId(menuChatId === chat.id ? null : chat.id); }}
            >
                <MoreHorizontal size={16} />
            </button>
        </div>
      )}
      
      {/* Dropdown Menu */}
      {menuChatId === chat.id && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden text-sm animate-in fade-in zoom-in-95 duration-100">
           <button onClick={(e) => { e.stopPropagation(); togglePin(chat.id); setMenuChatId(null); }} className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-left">
             <Pin size={14} /> {chat.pinned ? 'Unpin' : 'Pin'}
           </button>
           <button className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-left">
             <Edit2 size={14} /> Rename
           </button>
           <button className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-left">
             <FileText size={14} /> Summarize
           </button>
           <button className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-left">
             <Archive size={14} /> Archive
           </button>
           <div className="h-px bg-gray-200 dark:bg-gray-700 my-1"></div>
           <button onClick={(e) => { e.stopPropagation(); deleteConversation(chat.id); setMenuChatId(null); }} className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 text-left">
             <Trash2 size={14} /> Delete
           </button>
        </div>
      )}
      
      {/* Click outside to close menu */}
      {menuChatId === chat.id && (
        <div className="fixed inset-0 z-40" onClick={(e) => { e.stopPropagation(); setMenuChatId(null); }} />
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside 
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-[260px] bg-sidebar-light dark:bg-sidebar-dark border-r border-transparent dark:border-white/5 transition-transform duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Top Header */}
        <div className="p-3 space-y-4">
           
           <button 
             onClick={handleNewChat}
             className="w-full flex items-center justify-between px-3 py-2 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-all group"
           >
             <span className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-200">
                <div className="p-0.5">
                   {/* ChatGPT New Chat Icon style */}
                   <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" className="w-6 h-6 dark:invert opacity-80" alt="New" onError={(e) => {e.target.style.display='none';}} />
                   <Plus size={16} className="hidden" /> {/* Fallback if img fails */}
                </div>
                New Chat
             </span>
             <Edit2 size={16} className="text-gray-400 opacity-0 group-hover:opacity-100" /> 
           </button>

           <div className="relative group px-1">
              <Search size={14} className="absolute left-4 top-2.5 text-gray-500 group-focus-within:text-gray-800 dark:group-focus-within:text-gray-200 transition-colors" />
              <input 
                type="text" 
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-transparent rounded-lg text-sm text-gray-700 dark:text-gray-200 placeholder-gray-500 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 focus:bg-white dark:focus:bg-gray-800 focus:border-black dark:focus:border-white outline-none transition-all shadow-sm"
              />
           </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto px-2 pb-2">
            
            {pinnedChats.length > 0 && (
                <div className="mb-4">
                    <h3 className="px-4 text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Pinned</h3>
                    <div className="space-y-0.5">
                        {pinnedChats.map(chat => <ConversationItem key={chat.id} chat={chat} />)}
                    </div>
                </div>
            )}

            <div className="mb-6">
                <h3 className="px-4 text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Today</h3>
                <div className="space-y-0.5">
                    {recentChats.map(chat => <ConversationItem key={chat.id} chat={chat} />)}
                </div>
            </div>

            {/* Apps / Legacy Navigation Links as "Tools" */}
            <div className="border-t border-gray-200 dark:border-white/10 pt-4 mt-2">
                <h3 className="px-4 text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Explore</h3>
                <Link to="/" className="flex items-center gap-3 px-3 py-2.5 mx-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-sm">
                    <LayoutGrid size={18} /> Home
                </Link>
                <Link to="/assess" className="flex items-center gap-3 px-3 py-2.5 mx-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-sm">
                    <BookOpen size={18} /> Assessment
                </Link>
                <Link to="/roadmaps" className="flex items-center gap-3 px-3 py-2.5 mx-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-sm">
                    <Map size={18} /> Roadmaps
                </Link>
            </div>
        </div>

        {/* Bottom Profile Area */}
        <div className="p-3 border-t border-gray-200 dark:border-white/10">
           <div className="flex items-center justify-between group cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-200 text-xs font-bold">
                    JD
                 </div>
                 <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">John Doe</span>
                 </div>
              </div>
              <button 
                onClick={onOpenSettings}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                title="Settings"
              >
                  <SettingsIcon size={18} />
              </button>
           </div>
        </div>
      </aside>
    </>
  );
};

export default ChatSidebar;
