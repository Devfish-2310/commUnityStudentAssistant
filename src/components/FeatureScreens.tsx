import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ChevronLeft,
  Search,
  Send,
  Paperclip,
  Camera,
  MapPin,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Download,
  Phone,
  MessageSquare,
  Plus,
  Hash,
  Lock,
  Image,
  User,
  Users,
  ChevronRight,
  Star,
  Wrench,
  X,
  Pin,
  AtSign,
  Video,
  CalendarPlus
} from 'lucide-react';

// ─── Communications ─────────────────────────────────────────────────────────

export const ChatList = ({
  onSelectChat,
  onSelectChannel,
  onOpenInbox,
  onBack,
  onNewChat
}: {
  onSelectChat: (id: string) => void;
  onSelectChannel?: (name: string) => void;
  onOpenInbox?: () => void;
  onBack?: () => void;
  onNewChat?: () => void;
}) => {
  const channels = ['Welcome', 'General', 'Announcements', 'Events', 'Random'];
  const dms = [
    { id: '1', name: 'Sarah Chen', last: 'Did you finish the cleaning?', time: '2m ago', avatar: '1', unread: 2 },
    { id: '2', name: 'Management', last: 'Maintenance scheduled for room 302', time: '1h ago', avatar: 'mgmt', system: true, unread: 1 },
    { id: '3', name: 'John Doe', last: 'Leaving in 5 mins!', time: '3h ago', avatar: '4' },
  ];
  const groups = [
    { id: 'g1', name: 'Room 3 Crew', last: 'Sarah: Anyone want pizza tonight? 🍕', time: '5m ago', members: 4, unread: 3 },
    { id: 'g2', name: 'Laundry Roster', last: "John: I'll swap with you Sunday", time: '45m ago', members: 6 },
    { id: 'g3', name: 'BBQ Planning', last: "Priya: I'll bring the dessert!", time: 'Yesterday', members: 8 },
  ];

  return (
    <div className="flex flex-col h-full bg-background pb-20">
      <div className="p-6 pt-12">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {onBack && (
              <Button variant="ghost" size="icon" onClick={onBack} className="-ml-2">
                <ChevronLeft />
              </Button>
            )}
            <h1 className="text-2xl font-bold">Chats</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={onNewChat} className="text-primary">
            <Plus size={22} />
          </Button>
        </div>
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search chats..." className="pl-10 h-11 rounded-xl bg-muted/50 border-none" />
        </div>

        <div className="space-y-6">
          {/* Private Inbox */}
          <div
            className="flex items-center gap-3 p-3 rounded-2xl bg-primary/5 border border-primary/20 cursor-pointer"
            onClick={() => onOpenInbox?.()}
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Lock size={20} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-0.5">
                <span className="font-bold text-primary">Private Inbox</span>
                <Badge className="bg-primary text-primary-foreground text-[9px] h-4 px-1.5">3</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Management notifications</p>
            </div>
          </div>

          <section>
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Community Updates</h3>
            <div className="flex flex-wrap gap-2">
              {channels.map(c => (
                <Badge
                  key={c}
                  variant="secondary"
                  className="px-3 py-1.5 rounded-lg font-medium cursor-pointer"
                  onClick={() => (onSelectChannel ? onSelectChannel(c) : onSelectChat(c))}
                >
                  # {c}
                </Badge>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Group Chats</h3>
            <div className="space-y-1">
              {groups.map(grp => (
                <div
                  key={grp.id}
                  className="flex items-center gap-3 p-3 rounded-2xl active:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => onSelectChat(grp.name)}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Users size={20} />
                  </div>
                  <div className="flex-1 border-b pb-3 border-muted min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="font-bold">{grp.name}</span>
                      <span className="text-[10px] text-muted-foreground">{grp.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{grp.last}</p>
                  </div>
                  {grp.unread && (
                    <Badge className="bg-primary text-primary-foreground text-[9px] h-4 px-1.5 flex-shrink-0">
                      {grp.unread}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Direct Messages</h3>
            <div className="space-y-1">
              {dms.map(dm => (
                <div
                  key={dm.id}
                  className="flex items-center gap-3 p-3 rounded-2xl active:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => onSelectChat(dm.name)}
                >
                  <div
                    className={`w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ${dm.system ? 'bg-primary flex items-center justify-center text-primary-foreground' : 'bg-muted'}`}
                  >
                    {dm.system ? (
                      <AlertCircle size={20} />
                    ) : (
                      <img
                        src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${dm.avatar}&mouth=smile&eyes=default&eyebrows=default`}
                        alt=""
                      />
                    )}
                  </div>
                  <div className="flex-1 border-b pb-3 border-muted min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className={`font-bold ${dm.system ? 'text-primary' : ''}`}>{dm.name}</span>
                      <span className="text-[10px] text-muted-foreground">{dm.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{dm.last}</p>
                  </div>
                  {dm.unread && (
                    <Badge className="bg-primary text-primary-foreground text-[9px] h-4 px-1.5 flex-shrink-0">
                      {dm.unread}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

type MsgBadge = 'Announcement' | 'Maintenance' | 'General' | 'Events' | null;

interface ChannelMessage {
  id: number;
  text: string;
  sender: string;
  time: string;
  system?: boolean;
  pinned?: boolean;
  badge?: MsgBadge;
}

const badgeColor: Record<string, string> = {
  'Announcement': 'bg-destructive/10 text-destructive',
  'Maintenance': 'bg-chart-1/10 text-chart-1',
  'General': 'bg-muted text-muted-foreground',
  'Events': 'bg-chart-2/10 text-chart-2',
};

export const ChannelDetailScreen = ({ name, onBack }: { name: string; onBack: () => void }) => {
  const [input, setInput] = useState('');
  const [showMentions, setShowMentions] = useState(false);
  const mentions = ['Sarah', 'John', 'Priya', 'Marcus'];

  const channelMessages: Record<string, ChannelMessage[]> = {
    Welcome: [
      { id: 1, text: '📌 Welcome to Heritage Hall! Please read the house rules before settling in.', sender: 'Management', time: '1 Oct', pinned: true, badge: 'Announcement', system: true },
      { id: 2, text: '👋 Welcome to Heritage Hall! We\'re glad to have you here.', sender: 'Management', time: '1 Oct', badge: 'Announcement', system: true },
      { id: 3, text: 'Hey everyone! Super excited to be here 😊', sender: 'Alex', time: '2 Oct' },
    ],
    General: [
      { id: 1, text: 'Anyone up for the BBQ tomorrow?', sender: 'Sarah Chen', time: '10:00 AM', badge: 'General' },
      { id: 2, text: 'Absolutely! I\'ll bring the salad 🥗', sender: 'Alex', time: '10:05 AM' },
      { id: 3, text: 'I\'ll grab some drinks 🍺', sender: 'John Doe', time: '10:10 AM', badge: 'General' },
    ],
    Announcements: [
      { id: 1, text: '📌 Fire alarm inspection tomorrow 9 AM – all residents must be present.', sender: 'Management', time: '9 Oct', system: true, pinned: true, badge: 'Announcement' },
      { id: 2, text: '📢 Quarterly fire drill this Friday 10 AM. Attendance is mandatory.', sender: 'Management', time: '9 Oct', system: true, badge: 'Announcement' },
      { id: 3, text: '🔧 Plumbing work on level 3 – water will be off 9–11 AM Wednesday.', sender: 'Management', time: '11 Oct', system: true, badge: 'Maintenance' },
    ],
    Events: [
      { id: 1, text: '🎉 Monthly House BBQ this Saturday at 5 PM in the Heritage Backyard! RSVP in the Events tab.', sender: 'Management', time: '10 Oct', system: true, badge: 'Events' },
      { id: 2, text: 'Can\'t wait!! 🙌', sender: 'Sarah Chen', time: '10 Oct', badge: 'General' },
    ],
    Random: [
      { id: 1, text: 'Anyone seen my grey hoodie? Left it in the laundry room 😅', sender: 'John Doe', time: 'Yesterday', badge: 'General' },
      { id: 2, text: 'The café downstairs has oat-milk lattes now btw ☕', sender: 'Sarah Chen', time: '9:30 AM', badge: 'General' },
      { id: 3, text: 'Game-changer info Sarah 🙏', sender: 'Alex', time: '9:35 AM' },
    ],
  };

  const messages = channelMessages[name] || channelMessages['General'];
  const pinnedMsg = messages.find(m => m.pinned);

  const handleInputChange = (val: string) => {
    setInput(val);
    setShowMentions(val.endsWith('@'));
  };

  const insertMention = (name: string) => {
    setInput(prev => prev.replace(/@$/, `@${name} `));
    setShowMentions(false);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-4 pt-12 flex items-center gap-3 border-b bg-background">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft />
        </Button>
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Hash size={18} />
        </div>
        <div>
          <h3 className="font-bold text-sm">{name}</h3>
          <p className="text-[10px] text-muted-foreground">Heritage Hall Community</p>
        </div>
        <div className="ml-auto">
          <Button variant="ghost" size="icon">
            <Users size={18} />
          </Button>
        </div>
      </div>

      {/* Pinned message */}
      {pinnedMsg && (
        <div className="px-4 py-2 bg-primary/5 border-b border-primary/10 flex items-center gap-2">
          <Pin size={12} className="text-primary flex-shrink-0" />
          <p className="text-xs text-muted-foreground truncate flex-1">{pinnedMsg.text}</p>
          <Badge variant="outline" className="text-[9px] h-4 px-1.5 flex-shrink-0">Pinned</Badge>
        </div>
      )}

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map(m => (
          <div key={m.id} className={`flex gap-3 ${m.sender === 'Alex' ? 'flex-row-reverse' : ''}`}>
            {m.sender !== 'Alex' && (
              <div
                className={`w-8 h-8 rounded-full overflow-hidden flex-shrink-0 ${m.system ? 'bg-primary flex items-center justify-center text-primary-foreground' : 'bg-muted'}`}
              >
                {m.system ? (
                  <AlertCircle size={14} />
                ) : (
                  <img
                    src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${m.sender}&mouth=smile&eyes=default&eyebrows=default`}
                    alt=""
                  />
                )}
              </div>
            )}
            <div className={`max-w-[75%] ${m.sender === 'Alex' ? 'items-end' : 'items-start'} flex flex-col`}>
              {m.sender !== 'Alex' && (
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[10px] font-bold text-muted-foreground">{m.sender}</span>
                  {m.badge && (
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${badgeColor[m.badge]}`}>
                      {m.badge}
                    </span>
                  )}
                </div>
              )}
              <div
                className={`p-3 rounded-2xl text-sm ${m.sender === 'Alex' ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-muted rounded-tl-none'}`}
              >
                {m.text}
                <p className="text-[9px] mt-1 text-right opacity-70">{m.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* @ mentions popup */}
      {showMentions && (
        <div className="mx-4 mb-1 bg-background border border-border rounded-xl shadow-lg overflow-hidden">
          {mentions.map(m => (
            <div
              key={m}
              className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-muted/50"
              onClick={() => insertMention(m)}
            >
              <div className="w-7 h-7 rounded-full bg-muted overflow-hidden">
                <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${m}&mouth=smile&eyes=default&eyebrows=default`} alt="" />
              </div>
              <span className="text-sm font-medium">@{m}</span>
            </div>
          ))}
        </div>
      )}

      <div className="p-4 border-t flex gap-2 items-center pb-20">
        <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={() => handleInputChange(input + '@')}>
          <AtSign size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Paperclip size={20} />
        </Button>
        <Input
          placeholder={`Message #${name.toLowerCase()}...`}
          className="flex-1 h-11 rounded-xl bg-muted/50 border-none"
          value={input}
          onChange={e => handleInputChange(e.target.value)}
        />
        <Button size="icon" className="rounded-xl bg-primary">
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
};

export const ChatDetail = ({ name, onBack }: { name: string; onBack: () => void }) => {
  const [input, setInput] = useState('');
  const [showMentions, setShowMentions] = useState(false);
  const mentions = ['Sarah', 'John', 'Priya', 'Marcus'];

  const messages = [
    { id: 1, text: "Hey! Just checking about the house meeting tonight?", sender: "other", time: "10:00 AM" },
    { id: 2, text: "Yeah, I'll be there! Around 7 PM right?", sender: "me", time: "10:05 AM" },
    { id: 3, text: "Perfect. Don't forget to bring the bills summary.", sender: "other", time: "10:06 AM" },
    { id: 4, text: "On it! See you then 👍", sender: "me", time: "10:08 AM" },
  ];

  const handleInputChange = (val: string) => {
    setInput(val);
    setShowMentions(val.endsWith('@'));
  };

  const insertMention = (m: string) => {
    setInput(prev => prev.replace(/@$/, `@${m} `));
    setShowMentions(false);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-4 pt-12 flex items-center gap-3 border-b">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft />
        </Button>
        <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
          <img
            src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${name}&mouth=smile&eyes=default&eyebrows=default`}
            alt=""
          />
        </div>
        <div>
          <h3 className="font-bold text-sm">{name}</h3>
          <p className="text-[10px] text-chart-2">Online</p>
        </div>
      </div>
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[75%] p-3 rounded-2xl text-sm ${m.sender === 'me' ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-muted rounded-tl-none'}`}
            >
              {m.text}
              <p className="text-[9px] mt-1 text-right opacity-70">{m.time}</p>
            </div>
          </div>
        ))}
      </div>
      {showMentions && (
        <div className="mx-4 mb-1 bg-background border border-border rounded-xl shadow-lg overflow-hidden">
          {mentions.map(m => (
            <div key={m} className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-muted/50" onClick={() => insertMention(m)}>
              <div className="w-7 h-7 rounded-full bg-muted overflow-hidden">
                <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${m}&mouth=smile&eyes=default&eyebrows=default`} alt="" />
              </div>
              <span className="text-sm font-medium">@{m}</span>
            </div>
          ))}
        </div>
      )}
      <div className="p-4 border-t flex gap-2 items-center pb-20">
        <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={() => handleInputChange(input + '@')}>
          <AtSign size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Paperclip size={20} />
        </Button>
        <Input
          placeholder="Type a message..."
          className="flex-1 h-11 rounded-xl bg-muted/50 border-none"
          value={input}
          onChange={e => handleInputChange(e.target.value)}
        />
        <Button size="icon" className="rounded-xl bg-primary">
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
};

export const InboxScreen = ({ onBack }: { onBack: () => void }) => {
  const inboxMessages = [
    { id: 1, title: 'Lease Renewal Notice', preview: 'Your current lease ends on December 31. Please confirm your renewal intent by November 15.', time: 'Today, 9:00 AM', read: false, icon: '📄' },
    { id: 2, title: 'Scheduled Inspection', preview: 'A routine room inspection is scheduled for Thursday Oct 19 between 10–12 AM.', time: 'Yesterday', read: false, icon: '🔍' },
    { id: 3, title: 'Guest Policy Reminder', preview: 'Overnight guests must be registered at reception. Max 2 consecutive nights.', time: 'Oct 10', read: true, icon: '📋' },
    { id: 4, title: 'Maintenance Completed', preview: 'Your request #MR-004 (Leaking Faucet) has been resolved. Please confirm satisfaction.', time: 'Oct 8', read: true, icon: '✅' },
  ];

  return (
    <div className="flex flex-col h-full bg-background pb-20">
      <div className="p-6 pt-12">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ChevronLeft />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Private Inbox</h1>
            <p className="text-xs text-muted-foreground">Management communications</p>
          </div>
        </div>
        <div className="space-y-3">
          {inboxMessages.map(msg => (
            <Card key={msg.id} className={`rounded-2xl border-none shadow-sm ${msg.read ? 'bg-muted/20' : 'bg-primary/5 border border-primary/10'}`}>
              <CardContent className="p-4 flex gap-4">
                <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center text-xl flex-shrink-0">
                  {msg.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-sm ${msg.read ? 'font-medium' : 'font-bold'}`}>{msg.title}</span>
                    {!msg.read && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1" />}
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug line-clamp-2">{msg.preview}</p>
                  <p className="text-[10px] text-muted-foreground mt-2">{msg.time}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Tasks ───────────────────────────────────────────────────────────────────

export const TaskDetailScreen = ({
  taskId,
  onBack,
  onEdit
}: {
  taskId: number;
  onBack: () => void;
  onEdit?: () => void;
}) => {
  const [done, setDone] = useState(false);
  const [reminded, setReminded] = useState(false);

  const task = {
    id: taskId,
    title: 'Clean Kitchen Counter',
    category: 'Kitchen',
    assignee: 'Alex',
    due: 'Today, 6:00 PM',
    created: 'Oct 12, 2024',
    notes: 'Please wipe all surfaces with the antibacterial spray under the sink. Don\'t forget the stovetop.',
  };

  return (
    <div className="flex flex-col h-full bg-background p-6 pt-12 overflow-y-auto pb-24">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft />
        </Button>
        <h1 className="text-2xl font-bold">Task Details</h1>
        <Button variant="ghost" size="sm" className="ml-auto text-primary font-bold" onClick={onEdit}>
          Edit
        </Button>
      </div>

      <Card className={`rounded-3xl border-none shadow-sm mb-6 ${done ? 'bg-chart-2/10' : 'bg-muted/30'}`}>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <button
              className={`w-8 h-8 rounded-full border-2 flex-shrink-0 mt-1 flex items-center justify-center transition-colors ${done ? 'bg-chart-2 border-chart-2' : 'border-primary/50'}`}
              onClick={() => setDone(!done)}
            >
              {done && <CheckCircle2 size={16} className="text-white" />}
            </button>
            <div>
              <h2 className={`text-xl font-bold ${done ? 'line-through text-muted-foreground' : ''}`}>{task.title}</h2>
              <Badge variant="secondary" className="mt-1">{task.category}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {[
          { label: 'Assigned to', value: task.assignee, icon: User },
          { label: 'Due', value: task.due, icon: Clock },
          { label: 'Created', value: task.created, icon: Star },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <item.icon size={18} />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold">{item.label}</p>
              <p className="text-sm font-semibold">{item.value}</p>
            </div>
          </div>
        ))}

        <div className="p-4 rounded-2xl bg-muted/30">
          <p className="text-[10px] text-muted-foreground uppercase font-bold mb-2">Notes</p>
          <p className="text-sm leading-relaxed">{task.notes}</p>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant={reminded ? 'default' : 'outline'}
            className="rounded-xl h-11"
            onClick={() => setReminded(!reminded)}
          >
            {reminded ? '🔔 Reminder Set' : '🔔 Remind Me'}
          </Button>
          <Button variant="outline" className="rounded-xl h-11">
            🔁 Repeat Weekly
          </Button>
        </div>
      </div>

      <Button
        className={`w-full h-12 rounded-xl mt-6 font-bold ${done ? 'bg-chart-2 hover:bg-chart-2/90' : ''}`}
        onClick={() => setDone(true)}
      >
        {done ? '✓ Marked Complete' : 'Mark as Complete'}
      </Button>
    </div>
  );
};

export const CreateTaskScreen = ({
  onBack,
  onAssign,
  onSave
}: {
  onBack: () => void;
  onAssign?: () => void;
  onSave?: () => void;
}) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full bg-background p-6 pt-12 overflow-y-auto">
      <div className="flex items-center gap-3 mb-8">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft />
        </Button>
        <h1 className="text-2xl font-bold">New Task</h1>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold">Task Title</label>
          <Input placeholder="e.g. Vacuum the lounge..." className="h-12 rounded-xl" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold">Category</label>
          <div className="grid grid-cols-2 gap-2">
            {['Cleaning', 'Kitchen', 'Outdoors', 'Shopping', 'Admin', 'Other'].map(c => (
              <Button
                key={c}
                variant={selected === c ? 'default' : 'outline'}
                className="rounded-xl"
                onClick={() => setSelected(c)}
              >
                {c}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold">Due Date & Time</label>
          <Input type="date" className="h-12 rounded-xl" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold">Notes</label>
          <Input placeholder="Any additional instructions..." className="h-12 rounded-xl" />
        </div>

        <div
          className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 cursor-pointer"
          onClick={onAssign}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <Users size={18} />
            </div>
            <div>
              <p className="text-sm font-bold">Assign to Housemate</p>
              <p className="text-xs text-muted-foreground">Tap to choose</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-muted-foreground" />
        </div>

        <Button className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/20" onClick={onSave}>
          Create Task
        </Button>
      </div>
    </div>
  );
};

export const AssignTaskScreen = ({ onBack, onAssigned }: { onBack: () => void; onAssigned?: () => void }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const housemates = [
    { id: 1, name: 'Sarah Chen', room: 'Room 301', seed: 'sarah' },
    { id: 2, name: 'John Doe', room: 'Room 303', seed: 'john' },
    { id: 3, name: 'Priya Patel', room: 'Room 205', seed: 'priya' },
    { id: 4, name: 'Marcus Lee', room: 'Room 104', seed: 'marcus' },
  ];

  return (
    <div className="flex flex-col h-full bg-background p-6 pt-12 overflow-y-auto pb-24">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft />
        </Button>
        <h1 className="text-2xl font-bold">Assign Task</h1>
      </div>
      <p className="text-sm text-muted-foreground mb-6">Choose a housemate to assign this task to.</p>
      <div className="space-y-3 mb-8">
        {housemates.map(h => (
          <div
            key={h.id}
            className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-colors ${selected === h.id ? 'bg-primary/10 border-2 border-primary/30' : 'bg-muted/30'}`}
            onClick={() => setSelected(h.id)}
          >
            <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
              <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${h.seed}&mouth=smile&eyes=default&eyebrows=default`} alt="" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm">{h.name}</p>
              <p className="text-xs text-muted-foreground">{h.room}</p>
            </div>
            {selected === h.id && <CheckCircle2 size={20} className="text-primary" />}
          </div>
        ))}
      </div>
      <Button className="w-full h-12 rounded-xl font-bold" disabled={!selected} onClick={onAssigned}>
        Confirm Assignment
      </Button>
    </div>
  );
};

// ─── Maintenance ─────────────────────────────────────────────────────────────

export const MaintenanceScreen = ({
  onNewRequest,
  onBack,
  onViewDetail
}: {
  onNewRequest: () => void;
  onBack: () => void;
  onViewDetail?: (id: string) => void;
}) => {
  const requests = [
    { id: '1', title: 'Leaking Faucet', status: 'In Progress', location: 'Kitchen', date: 'Oct 12', ref: '#MR-005' },
    { id: '2', title: 'Lightbulb Replacement', status: 'Completed', location: 'Bedroom 2', date: 'Oct 05', ref: '#MR-004' },
    { id: '3', title: 'Door Lock Stiff', status: 'Submitted', location: 'Room 302', date: 'Oct 15', ref: '#MR-006' },
  ];

  const statusColor: Record<string, string> = {
    'Submitted': 'bg-muted text-muted-foreground',
    'Under Review': 'bg-chart-3 text-white',
    'In Progress': 'bg-chart-1 text-white',
    'Completed': 'bg-chart-2 text-white',
  };

  return (
    <div className="flex flex-col h-full bg-background p-6 pt-12 overflow-y-auto pb-24">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Maintenance</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Report & track issues</p>
        </div>
        <Button variant="outline" size="sm" onClick={onBack}>Close</Button>
      </div>

      <Button className="w-full h-14 rounded-2xl flex gap-2 text-lg font-bold mb-8" onClick={onNewRequest}>
        <Plus size={24} /> New Request
      </Button>

      {/* Status Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Submitted', count: 1, color: 'text-muted-foreground' },
          { label: 'In Progress', count: 1, color: 'text-chart-1' },
          { label: 'Completed', count: 1, color: 'text-chart-2' },
        ].map(s => (
          <Card key={s.label} className="rounded-2xl border-none bg-muted/30 shadow-sm">
            <CardContent className="p-3 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
              <p className="text-[10px] text-muted-foreground font-medium">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <section>
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">My Requests</h3>
        {requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Wrench size={28} className="text-muted-foreground" />
            </div>
            <h3 className="font-bold mb-1">No Maintenance Requests</h3>
            <p className="text-sm text-muted-foreground mb-4">Need something fixed?</p>
            <Button className="rounded-xl" onClick={onNewRequest}>Create your first request</Button>
          </div>
        ) : (
          <div className="space-y-3">
            {requests.map(req => (
              <Card
                key={req.id}
                className="rounded-2xl border-none shadow-sm bg-muted/30 cursor-pointer"
                onClick={() => onViewDetail?.(req.id)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-sm">{req.title}</h4>
                      <p className="text-[10px] text-muted-foreground">{req.ref}</p>
                    </div>
                    <Badge className={statusColor[req.status]}>{req.status}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {req.location}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {req.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export const MaintenanceDetailScreen = ({ onBack }: { onBack: () => void }) => {
  const request = {
    ref: '#MR-005',
    title: 'Leaking Faucet',
    status: 'In Progress',
    location: 'Kitchen',
    category: 'Plumbing',
    submitted: 'Oct 12, 2024',
    description: 'The kitchen tap has been dripping constantly for 3 days. It appears to be the hot water side. Has been getting worse.',
    technician: 'Robert Fox',
    eta: 'Tuesday, 2 PM',
  };

  const timeline = [
    { label: 'Submitted', done: true, date: 'Oct 12' },
    { label: 'Under Review', done: true, date: 'Oct 13' },
    { label: 'Assigned', done: true, date: 'Oct 14' },
    { label: 'In Progress', done: true, date: 'Oct 15', active: true },
    { label: 'Completed', done: false, date: '—' },
  ];

  return (
    <div className="flex flex-col h-full bg-background p-6 pt-12 overflow-y-auto pb-20">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-bold">{request.title}</h1>
          <p className="text-xs text-muted-foreground">{request.ref}</p>
        </div>
        <Badge className="bg-chart-1 text-white">{request.status}</Badge>
      </div>

      <Card className="rounded-2xl border-none shadow-sm bg-muted/30 mb-6">
        <CardContent className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Category', value: request.category },
              { label: 'Location', value: request.location },
              { label: 'Submitted', value: request.submitted },
              { label: 'Expected Fix', value: request.eta },
            ].map(d => (
              <div key={d.label}>
                <p className="text-[10px] text-muted-foreground font-bold uppercase">{d.label}</p>
                <p className={`text-sm font-semibold ${d.label === 'Expected Fix' ? 'text-primary' : ''}`}>{d.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Estimated completion highlight */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-primary/5 border border-primary/20 mb-6">
        <span className="text-2xl">📅</span>
        <div>
          <p className="text-xs text-muted-foreground font-bold uppercase">Estimated Completion</p>
          <p className="font-bold text-primary">{request.eta}</p>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-muted/30 mb-6">
        <p className="text-[10px] text-muted-foreground uppercase font-bold mb-2">Description</p>
        <p className="text-sm leading-relaxed">{request.description}</p>
      </div>

      <div className="flex items-center gap-3 p-4 rounded-2xl bg-primary/5 border border-primary/10 mb-6">
        <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
          <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=robert&mouth=smile&eyes=default&eyebrows=default" alt="" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground font-bold uppercase">Assigned Technician</p>
          <p className="font-bold text-sm">{request.technician}</p>
        </div>
        <Button size="sm" variant="outline" className="ml-auto rounded-lg">
          <MessageSquare size={14} />
        </Button>
      </div>

      <section>
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Progress Tracker</h3>
        <div className="space-y-1">
          {timeline.map((step, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="flex flex-col items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5 ${
                    step.done && !step.active ? 'bg-chart-2 text-white' :
                    step.active ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' :
                    'bg-muted text-muted-foreground border-2 border-muted-foreground/20'
                  }`}
                >
                  {step.done && !step.active ? '✓' : i + 1}
                </div>
                {i < timeline.length - 1 && <div className={`w-0.5 h-6 mt-1 ${step.done ? 'bg-chart-2' : 'bg-muted'}`} />}
              </div>
              <div className="pb-2">
                <p className={`text-sm font-semibold ${step.active ? 'text-primary' : step.done ? '' : 'text-muted-foreground'}`}>
                  {step.label}
                  {step.active && <span className="ml-2 text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">Current</span>}
                </p>
                <p className="text-[10px] text-muted-foreground">{step.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export const NewMaintenanceRequest = ({
  onBack,
  onSubmit
}: {
  onBack: () => void;
  onSubmit: () => void;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [photos, setPhotos] = useState<number[]>([]);
  const [hasVideo, setHasVideo] = useState(false);

  const addPhoto = () => setPhotos(prev => [...prev, prev.length + 1]);
  const removePhoto = (idx: number) => setPhotos(prev => prev.filter((_, i) => i !== idx));

  return (
    <div className="flex flex-col h-full bg-background p-6 pt-12 overflow-y-auto pb-24">
      <div className="flex items-center gap-3 mb-8">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft />
        </Button>
        <h1 className="text-2xl font-bold">Submit Request</h1>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold">Issue Description</label>
          <Input placeholder="Describe what's wrong in detail..." className="h-12 rounded-xl" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold">Category</label>
          <div className="grid grid-cols-2 gap-2">
            {['Plumbing', 'Electrical', 'Appliance', 'Furniture', 'Pest Control', 'Other'].map(c => (
              <Button
                key={c}
                variant={selectedCategory === c ? 'default' : 'outline'}
                className="rounded-xl"
                onClick={() => setSelectedCategory(c)}
              >
                {c}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold">Location</label>
          <Input placeholder="e.g. Kitchen, Room 302, Bathroom" className="h-12 rounded-xl" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold">Evidence</label>
          {/* Photos grid */}
          {photos.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-2">
              {photos.map((p, i) => (
                <div key={i} className="aspect-square rounded-xl bg-muted relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-chart-1/20" />
                  <Image size={20} className="relative text-muted-foreground" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1 right-1 w-5 h-5 bg-white/80 rounded-full"
                    onClick={() => removePhoto(i)}
                  >
                    <X size={10} />
                  </Button>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 h-12 rounded-xl gap-2" onClick={addPhoto}>
              <Camera size={18} />
              {photos.length === 0 ? 'Take Photo' : 'Add Another Photo'}
            </Button>
            <Button
              variant={hasVideo ? 'default' : 'outline'}
              className="flex-1 h-12 rounded-xl gap-2"
              onClick={() => setHasVideo(!hasVideo)}
            >
              <Video size={18} />
              {hasVideo ? 'Video Added ✓' : 'Attach Video'}
            </Button>
          </div>
        </div>

        <Button className="w-full h-12 rounded-xl text-lg font-bold shadow-lg shadow-primary/20" onClick={onSubmit}>
          Submit Request
        </Button>
      </div>
    </div>
  );
};

export const MaintenanceConfirmationScreen = ({ onDone }: { onDone: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full bg-background p-6 pb-24">
    <div className="w-24 h-24 rounded-full bg-chart-2/15 flex items-center justify-center mb-6 animate-in zoom-in duration-500">
      <CheckCircle2 size={48} className="text-chart-2" />
    </div>
    <h1 className="text-2xl font-bold mb-2 text-center">Request Submitted!</h1>
    <p className="text-muted-foreground text-sm text-center mb-2">
      Your maintenance request has been logged and will be reviewed shortly.
    </p>
    <Badge className="bg-muted text-muted-foreground border-none mb-8">#MR-006 • Submitted</Badge>
    <div className="w-full space-y-3">
      <div className="flex justify-between items-center p-4 rounded-2xl bg-muted/30">
        <span className="text-sm text-muted-foreground">Category</span>
        <span className="text-sm font-bold">Plumbing</span>
      </div>
      <div className="flex justify-between items-center p-4 rounded-2xl bg-muted/30">
        <span className="text-sm text-muted-foreground">Location</span>
        <span className="text-sm font-bold">Kitchen</span>
      </div>
      <div className="flex justify-between items-center p-4 rounded-2xl bg-muted/30">
        <span className="text-sm text-muted-foreground">Estimated Response</span>
        <span className="text-sm font-bold">24–48 hrs</span>
      </div>
    </div>
    <Button className="w-full h-12 rounded-xl font-bold mt-8" onClick={onDone}>
      Back to Maintenance
    </Button>
  </div>
);

// ─── Repository ───────────────────────────────────────────────────────────────

export const RepositoryScreen = ({ onBack, onOpenDoc }: { onBack: () => void; onOpenDoc?: (name: string) => void }) => {
  const [search, setSearch] = useState('');
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const topics = [
    { label: 'Noise', icon: '🔇' },
    { label: 'Cleaning', icon: '🧹' },
    { label: 'Guests', icon: '👥' },
    { label: 'Parking', icon: '🚗' },
    { label: 'Pets', icon: '🐾' },
    { label: 'Emergency', icon: '🚨' },
  ];

  const docs = [
    { name: 'House Rules 2024', size: '1.2 MB', type: 'PDF', pages: 8, topics: ['Noise', 'Cleaning', 'Guests', 'Parking', 'Pets'] },
    { name: 'Evacuation Plan', size: '0.8 MB', type: 'PDF', pages: 4, topics: ['Emergency'] },
    { name: 'Wifi & Amenities Guide', size: '0.4 MB', type: 'PDF', pages: 3, topics: ['Guests'] },
    { name: 'Cleaning Roster Template', size: '1.5 MB', type: 'PDF', pages: 2, topics: ['Cleaning'] },
    { name: 'Emergency Procedures', size: '0.9 MB', type: 'PDF', pages: 6, topics: ['Emergency', 'Noise'] },
  ];

  const filtered = docs.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase());
    const matchesTopic = !activeTopic || d.topics.includes(activeTopic);
    return matchesSearch && matchesTopic;
  });

  const handleTopicClick = (label: string) => {
    setActiveTopic(prev => prev === label ? null : label);
    setSearch('');
  };

  return (
    <div className="flex flex-col h-full bg-background p-6 pt-12 overflow-y-auto pb-24">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft />
        </Button>
        <h1 className="text-2xl font-bold">Rules & Policies</h1>
      </div>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search documents..."
          className="pl-10 h-11 rounded-xl bg-muted/50 border-none"
          value={search}
          onChange={e => { setSearch(e.target.value); setActiveTopic(null); }}
        />
      </div>
      {/* Policy section shortcuts */}
      <div className="mb-6">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Browse by Topic</p>
        <div className="grid grid-cols-3 gap-2">
          {topics.map(s => (
            <div
              key={s.label}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl cursor-pointer transition-colors ${
                activeTopic === s.label
                  ? 'bg-primary/15 border-2 border-primary/30'
                  : 'bg-muted/30 hover:bg-primary/5'
              }`}
              onClick={() => handleTopicClick(s.label)}
            >
              <span className="text-xl">{s.icon}</span>
              <span className={`text-[11px] font-bold ${activeTopic === s.label ? 'text-primary' : ''}`}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      {activeTopic && (
        <p className="text-xs text-muted-foreground mb-3">
          Showing documents tagged <span className="font-bold text-foreground">{activeTopic}</span>
        </p>
      )}
      <div className="space-y-3 overflow-y-auto">
        {filtered.map(doc => (
          <Card
            key={doc.name}
            className="rounded-2xl border-none shadow-sm bg-muted/30 cursor-pointer"
            onClick={() => onOpenDoc?.(doc.name)}
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-destructive/10 text-destructive rounded-xl flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm">{doc.name}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {doc.pages} pages • {doc.size} • {doc.type}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <ChevronRight size={18} />
              </Button>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center py-12 text-center">
            <Search size={32} className="text-muted-foreground mb-3" />
            <p className="font-bold mb-1">No results found</p>
            <p className="text-sm text-muted-foreground">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const PdfViewerScreen = ({ docName, onBack }: { docName: string; onBack: () => void }) => {
  const sections = [
    {
      id: 'noise',
      icon: '🔇',
      title: 'Noise',
      rules: [
        { title: 'Quiet Hours', body: 'Quiet hours are enforced daily from 10 PM to 8 AM. This includes music, TV, and phone calls in common areas.' },
        { title: 'Musical Instruments', body: 'Instruments are permitted until 9 PM only. Amplified music in rooms requires prior approval.' },
      ]
    },
    {
      id: 'cleaning',
      icon: '🧹',
      title: 'Cleaning',
      rules: [
        { title: 'Kitchen Hygiene', body: 'Residents must clean up immediately after cooking. Dishes cannot be left in the sink for more than 2 hours.' },
        { title: 'Common Areas', body: 'All common areas including lounges, laundry, and gym must be left clean and tidy after use.' },
      ]
    },
    {
      id: 'guests',
      icon: '👥',
      title: 'Guests',
      rules: [
        { title: 'Guest Policy', body: 'Guests are permitted for a maximum of 2 consecutive nights. All overnight guests must be registered at reception.' },
        { title: 'Guest Responsibility', body: 'Residents are responsible for the conduct of their guests at all times.' },
      ]
    },
    {
      id: 'parking',
      icon: '🚗',
      title: 'Parking',
      rules: [
        { title: 'Parking Permits', body: 'A parking permit must be displayed at all times in allocated bays. Visitor parking is available on Level B1.' },
      ]
    },
    {
      id: 'pets',
      icon: '🐾',
      title: 'Pets',
      rules: [
        { title: 'No Pets Policy', body: 'Pets are not permitted on Heritage Hall premises. Service animals are permitted with prior written approval from management.' },
      ]
    },
    {
      id: 'emergency',
      icon: '🚨',
      title: 'Emergency',
      rules: [
        { title: 'Waste Disposal', body: 'Rubbish must be sorted into recycling, general waste, and compost bins. Bins are collected Monday & Thursday.' },
        { title: 'Fire Safety', body: 'Do not tamper with fire alarms. In case of emergency, use the nearest stairwell exit. Do not use lifts during a fire alarm.' },
      ]
    },
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-4 pt-12 flex items-center gap-3 border-b bg-background">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft />
        </Button>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm truncate">{docName}</h3>
          <p className="text-[10px] text-muted-foreground">Heritage Hall Policies</p>
        </div>
        <Button variant="ghost" size="icon">
          <Download size={18} />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {sections.map(s => (
          <div key={s.id}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{s.icon}</span>
              <h3 className="font-bold text-sm uppercase tracking-wide text-muted-foreground">{s.title}</h3>
            </div>
            <div className="space-y-3">
              {s.rules.map((rule, i) => (
                <div key={i} className="p-4 rounded-2xl bg-muted/30 space-y-1">
                  <h4 className="font-bold text-sm">{rule.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{rule.body}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Contacts ─────────────────────────────────────────────────────────────────

export const ContactsScreen = ({
  onBack,
  onViewContact
}: {
  onBack: () => void;
  onViewContact?: (name: string) => void;
}) => {
  return (
    <div className="flex flex-col h-full bg-background p-6 pt-12 overflow-y-auto pb-24">
      <div className="flex items-center gap-3 mb-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft />
        </Button>
        <h1 className="text-2xl font-bold">Directory</h1>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search contacts..." className="pl-10 h-11 rounded-xl bg-muted/50 border-none" />
      </div>

      <div className="space-y-8 overflow-y-auto pb-20">
        <section>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Emergency</h3>
          <div className="space-y-3">
            {[
              { role: 'Emergency Services', name: 'Security Desk', icon: Phone, color: 'text-destructive bg-destructive/10', phone: '000', seed: '' },
              { role: 'Building Manager', name: 'Marcus Sterling', icon: User, color: 'text-chart-1 bg-chart-1/10', phone: '+61 400 111 222', seed: 'marcus' },
            ].map(contact => (
              <Card
                key={contact.name}
                className="rounded-2xl border-none shadow-sm bg-muted/30 cursor-pointer"
                onClick={() => onViewContact?.(contact.name)}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${contact.color} rounded-xl flex items-center justify-center`}>
                      <contact.icon size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{contact.name}</p>
                      <p className="text-[10px] text-muted-foreground">{contact.role}</p>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" className="rounded-lg font-bold">Call</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Building Staff</h3>
          <div className="space-y-3">
            {[
              { name: 'Elena Gomez', role: 'Main Concierge', seed: 'elena' },
              { name: 'Robert Fox', role: 'Head Maintenance', seed: 'robert' },
              { name: 'Jane Wilson', role: 'Warden', seed: 'jane' },
            ].map(staff => (
              <div
                key={staff.name}
                className="flex items-center gap-4 p-3 rounded-2xl bg-muted/20 cursor-pointer"
                onClick={() => onViewContact?.(staff.name)}
              >
                <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
                  <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${staff.seed}&mouth=smile&eyes=default&eyebrows=default`} alt="" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{staff.name}</p>
                  <p className="text-[10px] text-muted-foreground">{staff.role}</p>
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Community Residents</h3>
          <div className="space-y-3">
            {[
              { name: 'Sarah Chen', room: 'Room 301', seed: 'sarah' },
              { name: 'John Doe', room: 'Room 303', seed: 'john' },
              { name: 'Priya Patel', room: 'Room 205', seed: 'priya' },
              { name: 'Marcus Lee', room: 'Room 104', seed: 'marcuslee' },
            ].map(r => (
              <div
                key={r.name}
                className="flex items-center gap-4 p-3 rounded-2xl cursor-pointer"
                onClick={() => onViewContact?.(r.name)}
              >
                <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
                  <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${r.seed}&mouth=smile&eyes=default&eyebrows=default`} alt="" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{r.name}</p>
                  <p className="text-[10px] text-muted-foreground">{r.room}</p>
                </div>
                <MessageSquare size={16} className="text-muted-foreground" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export const ContactDetailScreen = ({ contactName, onBack, onMessage }: { contactName: string; onBack: () => void; onMessage?: () => void }) => {
  const contacts: Record<string, { role: string; phone: string; email: string; available: string; seed: string; note?: string }> = {
    'Marcus Sterling': { role: 'Building Manager', phone: '+61 400 111 222', email: 'marcus@heritagehall.edu.au', available: 'Mon–Fri 8AM–5PM', seed: 'marcus', note: 'For lease queries, noise complaints, and policy questions.' },
    'Elena Gomez': { role: 'Main Concierge', phone: '+61 400 333 444', email: 'concierge@heritagehall.edu.au', available: 'Daily 7AM–10PM', seed: 'elena', note: 'Parcel collection, key requests, and general enquiries.' },
    'Robert Fox': { role: 'Head Maintenance', phone: '+61 400 555 666', email: 'maintenance@heritagehall.edu.au', available: 'Mon–Sat 8AM–6PM', seed: 'robert', note: 'Submit requests via the app for faster processing.' },
    'Jane Wilson': { role: 'Warden', phone: '+61 400 777 888', email: 'warden@heritagehall.edu.au', available: 'On call 24/7', seed: 'jane' },
    'Sarah Chen': { role: 'Resident • Room 301', phone: '+61 412 000 001', email: 's.chen@student.edu.au', available: 'Heritage Hall', seed: 'sarah' },
    'John Doe': { role: 'Resident • Room 303', phone: '+61 412 000 002', email: 'j.doe@student.edu.au', available: 'Heritage Hall', seed: 'john' },
    'Security Desk': { role: 'Emergency Services', phone: '000', email: 'security@heritagehall.edu.au', available: '24/7', seed: 'security', note: 'Call 000 for all emergencies. Security is on-site around the clock.' },
  };

  const c = contacts[contactName] || { role: 'Contact', phone: 'N/A', email: 'N/A', available: 'N/A', seed: contactName };

  return (
    <div className="flex flex-col h-full bg-background p-6 pt-12 overflow-y-auto pb-24">
      <div className="flex items-center gap-3 mb-8">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft />
        </Button>
        <h1 className="text-xl font-bold">Contact</h1>
      </div>

      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full bg-muted overflow-hidden border-4 border-background shadow-xl mb-4">
          <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${c.seed}&mouth=smile&eyes=default&eyebrows=default`} alt="" />
        </div>
        <h2 className="text-xl font-bold">{contactName}</h2>
        <p className="text-xs text-muted-foreground mt-1">{c.role}</p>
        <div className="flex gap-3 mt-4">
          <Button className="rounded-2xl gap-2 px-6"><Phone size={16} /> Call</Button>
          <Button variant="secondary" className="rounded-2xl gap-2 px-6" onClick={onMessage}>
            <MessageSquare size={16} /> Message
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {[
          { label: 'Phone', value: c.phone },
          { label: 'Email', value: c.email },
          { label: 'Availability', value: c.available },
        ].map(item => (
          <div key={item.label} className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
            <span className="text-xs font-bold text-muted-foreground uppercase">{item.label}</span>
            <span className="text-sm font-semibold">{item.value}</span>
          </div>
        ))}
        {c.note && (
          <div className="p-4 rounded-2xl bg-muted/30">
            <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Note</p>
            <p className="text-sm leading-relaxed">{c.note}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Notifications ─────────────────────────────────────────────────────────────

export const NotificationsScreen = ({
  onBack,
  onViewEmail,
  onViewSms
}: {
  onBack: () => void;
  onViewEmail?: () => void;
  onViewSms?: () => void;
}) => {
  const notifications = [
    { id: 1, title: 'Package Delivered', desc: 'Your Amazon package is at the reception.', time: '10m ago', icon: '📦', color: 'bg-chart-2/10', type: 'push' },
    { id: 2, title: 'Rent Due Reminder', desc: 'Email alert: Your monthly rent is due in 3 days.', time: '2h ago', icon: '📧', color: 'bg-chart-1/10', type: 'email' },
    { id: 3, title: 'SMS Alert', desc: 'Text received: Maintenance visit scheduled for tomorrow.', time: '4h ago', icon: '💬', color: 'bg-chart-4/10', type: 'sms' },
    { id: 4, title: 'New House Message', desc: 'Sarah sent a message to #General', time: '5h ago', icon: '🏠', color: 'bg-chart-3/10', type: 'push' },
    { id: 5, title: 'Task Assigned', desc: 'John assigned you "Vacuum the Lounge"', time: 'Yesterday', icon: '✅', color: 'bg-primary/10', type: 'push' },
  ];

  return (
    <div className="flex flex-col h-full bg-background p-6 pt-12 overflow-y-auto pb-24">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft />
        </Button>
        <h1 className="text-2xl font-bold">Activity</h1>
        <Badge variant="secondary" className="ml-auto">5 new</Badge>
      </div>
      <div className="space-y-3">
        {notifications.map(n => (
          <div
            key={n.id}
            className="flex gap-4 p-4 rounded-2xl bg-muted/30 relative cursor-pointer"
            onClick={() => {
              if (n.type === 'email') onViewEmail?.();
              if (n.type === 'sms') onViewSms?.();
            }}
          >
            <div className={`w-12 h-12 rounded-2xl ${n.color} flex items-center justify-center text-xl flex-shrink-0`}>
              {n.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between mb-1">
                <h4 className="font-bold text-sm">{n.title}</h4>
                <span className="text-[10px] text-muted-foreground">{n.time}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-snug">{n.desc}</p>
              {(n.type === 'email' || n.type === 'sms') && (
                <Badge variant="outline" className="mt-1 text-[9px] h-4 px-1.5">
                  {n.type === 'email' ? 'Email' : 'SMS'}
                </Badge>
              )}
            </div>
            <div className="absolute top-4 right-3 w-1.5 h-1.5 bg-primary rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export const EmailAlertScreen = ({ onBack }: { onBack: () => void }) => (
  <div className="flex flex-col h-full bg-background">
    <div className="p-4 pt-12 flex items-center gap-3 border-b">
      <Button variant="ghost" size="icon" onClick={onBack}>
        <ChevronLeft />
      </Button>
      <div>
        <h3 className="font-bold text-sm">Email Alert</h3>
        <p className="text-[10px] text-muted-foreground">noreply@heritagehall.edu.au</p>
      </div>
    </div>
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="border-b pb-4 mb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold text-sm">HH</div>
          <div>
            <p className="font-bold text-sm">Heritage Hall</p>
            <p className="text-[10px] text-muted-foreground">to: alex.resident@student.edu.au</p>
          </div>
        </div>
        <h2 className="font-bold text-lg">Payment Reminder: October Rent Due</h2>
        <p className="text-xs text-muted-foreground">Oct 12, 2024 at 9:00 AM</p>
      </div>
      <div className="space-y-4 text-sm leading-relaxed">
        <p>Dear Alex,</p>
        <p>This is a friendly reminder that your <strong>October rent payment of $450.00</strong> is due in <strong>3 days</strong> on <strong>October 15, 2024</strong>.</p>
        <div className="p-4 bg-muted/40 rounded-2xl space-y-2">
          <div className="flex justify-between text-xs"><span className="text-muted-foreground">Amount Due</span><span className="font-bold">$450.00</span></div>
          <div className="flex justify-between text-xs"><span className="text-muted-foreground">Due Date</span><span className="font-bold">Oct 15, 2024</span></div>
          <div className="flex justify-between text-xs"><span className="text-muted-foreground">Property</span><span className="font-bold">Heritage Hall, Room 302</span></div>
        </div>
        <p>Please ensure payment is made via the ShareHouse app or by direct bank transfer using the reference <strong>ALEX-302-OCT</strong>.</p>
        <p>Kind regards,<br /><strong>Heritage Hall Management</strong></p>
      </div>
    </div>
    <div className="p-4 border-t">
      <Button className="w-full h-12 rounded-xl font-bold">Pay Now via App</Button>
    </div>
  </div>
);

export const SmsAlertScreen = ({ onBack }: { onBack: () => void }) => (
  <div className="flex flex-col h-full bg-background">
    <div className="p-4 pt-12 flex items-center gap-3 border-b">
      <Button variant="ghost" size="icon" onClick={onBack}>
        <ChevronLeft />
      </Button>
      <div>
        <h3 className="font-bold text-sm">SMS Alert</h3>
        <p className="text-[10px] text-muted-foreground">+61 1800 HALL</p>
      </div>
    </div>
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="space-y-4">
        {[
          { text: '[Heritage Hall] Hi Alex, your maintenance request #MR-005 (Leaking Faucet) has been assigned to Robert Fox. Scheduled repair: Oct 18. Questions? Reply HELP.', time: 'Oct 14, 9:30 AM' },
          { text: '[Heritage Hall] Reminder: Rent of $450 due Oct 15. Pay via ShareHouse app or bank transfer ref ALEX-302-OCT. Reply STOP to unsubscribe.', time: 'Oct 12, 8:00 AM' },
          { text: '[Heritage Hall] Fire drill this Friday Oct 20 at 10AM. All residents must evacuate via the nearest stairwell. No lift access during drill.', time: 'Oct 10, 3:00 PM' },
        ].map((msg, i) => (
          <div key={i} className="flex justify-start">
            <div className="max-w-[80%] bg-muted rounded-2xl rounded-tl-none p-4 text-sm">
              <p>{msg.text}</p>
              <p className="text-[9px] text-muted-foreground mt-2">{msg.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="p-4 border-t">
      <div className="flex gap-2">
        <Input placeholder="Reply to SMS..." className="flex-1 h-11 rounded-xl bg-muted/50 border-none" />
        <Button size="icon" className="rounded-xl">
          <Send size={18} />
        </Button>
      </div>
    </div>
  </div>
);

// ─── New Chat ─────────────────────────────────────────────────────────────────

export const NewChatScreen = ({
  onBack,
  onStartChat
}: {
  onBack: () => void;
  onStartChat: (name: string, isGroup: boolean) => void;
}) => {
  const [tab, setTab] = useState<'direct' | 'group'>('direct');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [groupName, setGroupName] = useState('');

  const residents = [
    { name: 'Sarah Chen', room: 'Room 301', seed: 'sarah' },
    { name: 'John Doe', room: 'Room 303', seed: 'john' },
    { name: 'Priya Patel', room: 'Room 205', seed: 'priya' },
    { name: 'Marcus Lee', room: 'Room 104', seed: 'marcuslee' },
    { name: 'Elena Gomez', room: 'Concierge', seed: 'elena' },
    { name: 'Robert Fox', room: 'Maintenance', seed: 'robert' },
  ];

  const filtered = residents.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (name: string) => {
    if (tab === 'direct') {
      setSelected([name]);
    } else {
      setSelected(prev =>
        prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
      );
    }
  };

  const canStart = tab === 'direct'
    ? selected.length === 1
    : selected.length >= 2 && groupName.trim().length > 0;

  const handleStart = () => {
    if (tab === 'direct' && selected[0]) {
      onStartChat(selected[0], false);
    } else if (tab === 'group' && groupName.trim()) {
      onStartChat(groupName.trim(), true);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-4 pt-12 flex items-center gap-3 border-b">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft />
        </Button>
        <h3 className="font-bold text-lg">New Chat</h3>
      </div>

      <div className="px-4 pt-4">
        <Tabs value={tab} onValueChange={v => { setTab(v as 'direct' | 'group'); setSelected([]); }}>
          <TabsList className="w-full rounded-xl">
            <TabsTrigger value="direct" className="flex-1">Direct Message</TabsTrigger>
            <TabsTrigger value="group" className="flex-1">Group Chat</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {tab === 'group' && (
        <div className="px-4 pt-4">
          <Input
            placeholder="Group name..."
            className="h-11 rounded-xl"
            value={groupName}
            onChange={e => setGroupName(e.target.value)}
          />
        </div>
      )}

      <div className="px-4 pt-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search residents..."
            className="pl-10 h-10 rounded-xl bg-muted/50 border-none"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {selected.length > 0 && tab === 'group' && (
        <div className="px-4 pt-3 flex flex-wrap gap-2">
          {selected.map(name => (
            <Badge
              key={name}
              variant="secondary"
              className="flex items-center gap-1 pl-2 pr-1 py-1 rounded-full cursor-pointer"
              onClick={() => toggleSelect(name)}
            >
              {name.split(' ')[0]}
              <X size={12} />
            </Badge>
          ))}
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-4">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
          {tab === 'direct' ? 'Select a person' : `Select members (${selected.length} chosen)`}
        </p>
        <div className="space-y-1">
          {filtered.map(r => {
            const isSelected = selected.includes(r.name);
            return (
              <div
                key={r.name}
                className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-colors ${
                  isSelected ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/50'
                }`}
                onClick={() => toggleSelect(r.name)}
              >
                <div className="w-11 h-11 rounded-full bg-muted overflow-hidden flex-shrink-0">
                  <img
                    src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${r.seed}&mouth=smile&eyes=default&eyebrows=default`}
                    alt=""
                  />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm">{r.name}</p>
                  <p className="text-[10px] text-muted-foreground">{r.room}</p>
                </div>
                {isSelected && <CheckCircle2 size={20} className="text-primary flex-shrink-0" />}
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-4 pb-24 border-t">
        <Button
          className="w-full h-12 rounded-xl font-bold"
          disabled={!canStart}
          onClick={handleStart}
        >
          {tab === 'direct' ? 'Start Conversation' : `Create Group Chat${selected.length >= 2 ? ` (${selected.length})` : ''}`}
        </Button>
      </div>
    </div>
  );
};
