import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ChevronLeft,
  LogOut,
  Bell,
  Mail,
  User,
  CheckCircle2,
  Clock,
  Plus,
  ChevronRight,
  Phone,
  Edit,
  Info,
  Moon,
  Type,
  Accessibility,
  Contrast,
  MoonStar,
} from 'lucide-react';

// ─── Settings ────────────────────────────────────────────────────────────────

export const SettingsScreen = ({
  onBack,
  onEditDetails,
  onLogout,
  onAccessibility,
}: {
  onBack: () => void;
  onEditDetails?: () => void;
  onLogout?: () => void;
  onAccessibility?: () => void;
}) => {
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [dnd, setDnd] = useState(false);
  const [pushNotif, setPushNotif] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [maintenanceNotif, setMaintenanceNotif] = useState(true);
  const [paymentNotif, setPaymentNotif] = useState(true);
  const [eventsNotif, setEventsNotif] = useState(true);
  const [chatNotif, setChatNotif] = useState(false);

  // Personal details
  const [name, setName] = useState('Alex Johnson');
  const [email, setEmail] = useState('alex.johnson@student.edu.au');
  const [phone, setPhone] = useState('+61 400 123 456');
  const [room, setRoom] = useState('Room 302');
  const [editingDetails, setEditingDetails] = useState(false);

  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-sm border-b border-border px-6 py-4 pt-12">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ChevronLeft />
          </Button>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Profile Summary */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10">
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0">
            <img
              src={`https://api.dicebear.com/9.x/avataaars/svg?seed=Alex&mouth=smile&eyes=default&eyebrows=default`}
              alt=""
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-base">{name}</p>
            <p className="text-xs text-muted-foreground truncate">{email}</p>
            <Badge variant="secondary" className="mt-1 text-[10px]">Heritage Hall · {room}</Badge>
          </div>
          <Button size="sm" variant="outline" className="rounded-xl flex-shrink-0" onClick={() => setEditingDetails(v => !v)}>
            <Edit size={14} />
          </Button>
        </div>

        {/* Personal Details */}
        {editingDetails && (
          <section>
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Personal Details</h3>
            <Card className="rounded-2xl border-none shadow-sm bg-muted/30">
              <CardContent className="p-4 space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground">Full Name</label>
                  <Input value={name} onChange={e => setName(e.target.value)} className="h-10 rounded-xl text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground">Email Address</label>
                  <Input value={email} onChange={e => setEmail(e.target.value)} className="h-10 rounded-xl text-sm" type="email" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground">Phone Number</label>
                  <Input value={phone} onChange={e => setPhone(e.target.value)} className="h-10 rounded-xl text-sm" type="tel" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground">Room Number</label>
                  <Input value={room} onChange={e => setRoom(e.target.value)} className="h-10 rounded-xl text-sm" />
                </div>
                <Button className="w-full h-10 rounded-xl font-bold" onClick={() => setEditingDetails(false)}>
                  Save Details ✓
                </Button>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Notifications master */}
        <section>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Notifications</h3>
          <Card className="rounded-2xl border-none shadow-sm bg-muted/30">
            <CardContent className="p-4 space-y-4">
              {/* Master toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${notifEnabled ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                    <Bell size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">All Notifications</p>
                    <p className="text-[10px] text-muted-foreground">Master on/off switch</p>
                  </div>
                </div>
                <Switch checked={notifEnabled} onCheckedChange={setNotifEnabled} />
              </div>

              {/* Do Not Disturb */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${dnd ? 'bg-chart-4/10 text-chart-4' : 'bg-muted text-muted-foreground'}`}>
                    <MoonStar size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Do Not Disturb</p>
                    <p className="text-[10px] text-muted-foreground">Silence all alerts</p>
                  </div>
                </div>
                <Switch checked={dnd} onCheckedChange={setDnd} />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Channels */}
        {notifEnabled && !dnd && (
          <section>
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Alert Channels</h3>
            <Card className="rounded-2xl border-none shadow-sm bg-muted/30">
              <CardContent className="p-4 space-y-4">
                {([
                  { key: 'push', icon: Bell, label: 'Push Notifications', desc: 'In-app alerts', val: pushNotif, set: setPushNotif },
                  { key: 'email', icon: Mail, label: 'Email Reports', desc: 'Weekly summaries', val: emailNotif, set: setEmailNotif },
                  { key: 'sms', icon: Phone, label: 'SMS Alerts', desc: 'Text message alerts', val: smsNotif, set: setSmsNotif },
                ] as const).map(item => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <item.icon size={16} className="text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{item.label}</p>
                        <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                    <Switch checked={item.val} onCheckedChange={item.set} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        )}

        {/* Categories */}
        {notifEnabled && !dnd && (
          <section>
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Notify Me About</h3>
            <Card className="rounded-2xl border-none shadow-sm bg-muted/30">
              <CardContent className="p-4 space-y-4">
                {([
                  { label: 'Maintenance Updates', val: maintenanceNotif, set: setMaintenanceNotif },
                  { label: 'Payment Reminders', val: paymentNotif, set: setPaymentNotif },
                  { label: 'Upcoming Events', val: eventsNotif, set: setEventsNotif },
                  { label: 'New Chat Messages', val: chatNotif, set: setChatNotif },
                ] as const).map(item => (
                  <div key={item.label} className="flex items-center justify-between">
                    <p className="text-sm font-medium">{item.label}</p>
                    <Switch checked={item.val} onCheckedChange={item.set} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        )}

        {/* Accessibility shortcut */}
        <button
          className="w-full flex items-center gap-4 p-4 rounded-2xl bg-muted/30 cursor-pointer text-left"
          onClick={onAccessibility}
        >
          <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            <Accessibility size={18} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold">Accessibility</p>
            <p className="text-[10px] text-muted-foreground">Font, contrast, text size & voice</p>
          </div>
          <ChevronRight size={16} className="text-muted-foreground" />
        </button>

        <Button
          variant="destructive"
          className="w-full h-12 rounded-xl flex gap-2 font-bold"
          onClick={onLogout}
        >
          <LogOut size={20} /> Log Out
        </Button>
      </div>
    </div>
  );
};

// ─── Profile ──────────────────────────────────────────────────────────────────

export const ProfileScreen = ({
  onLogout,
  onBack,
  onEditNickname,
  onNotifPrefs,
  onCommunityInfo,
  onLogoutConfirm,
  onAccessibility
}: {
  onLogout: () => void;
  onBack: () => void;
  onEditNickname?: () => void;
  onNotifPrefs?: () => void;
  onCommunityInfo?: () => void;
  onLogoutConfirm?: () => void;
  onAccessibility?: () => void;
}) => {
  const [nickname] = useState('Alex');

  const menuItems = [
    { label: 'Edit Display Name', icon: Edit, action: onEditNickname },
    { label: 'Notification Preferences', icon: Bell, action: onNotifPrefs },
    { label: 'Community Information', icon: Info, action: onCommunityInfo },
    { label: 'Accessibility', icon: Accessibility, action: onAccessibility },
  ];

  return (
    <div className="flex flex-col h-full bg-background pb-20">
      <div className="p-6 pt-12">
        <div className="flex items-center gap-3 mb-8">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ChevronLeft />
          </Button>
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>

        {/* Avatar & Name */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full border-4 border-background shadow-xl overflow-hidden bg-muted">
              <img
                src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${nickname}&mouth=smile&eyes=default&eyebrows=default`}
                alt=""
              />
            </div>
            <button
              className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center border-2 border-background"
              onClick={onEditNickname}
            >
              <Edit size={14} />
            </button>
          </div>
          <h2 className="text-xl font-bold">{nickname}</h2>
          <p className="text-xs text-muted-foreground">Heritage Hall • Room 302</p>
          <Badge variant="secondary" className="mt-2">Resident since Sep 2024</Badge>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: 'Tasks Done', value: '12' },
            { label: 'Events RSVP', value: '5' },
            { label: 'Requests', value: '3' },
          ].map(s => (
            <Card key={s.label} className="rounded-2xl border-none bg-muted/30 shadow-sm">
              <CardContent className="p-3 text-center">
                <p className="text-2xl font-bold text-primary">{s.value}</p>
                <p className="text-[10px] text-muted-foreground font-medium">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Menu */}
        <div className="space-y-2 mb-6">
          {menuItems.map(item => (
            <button
              key={item.label}
              className="w-full flex items-center gap-4 p-4 rounded-2xl bg-muted/30 cursor-pointer text-left"
              onClick={item.action}
            >
              <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <item.icon size={18} />
              </div>
              <span className="flex-1 font-medium text-sm">{item.label}</span>
              <ChevronRight size={16} className="text-muted-foreground" />
            </button>
          ))}
        </div>

        <Button
          variant="destructive"
          className="w-full h-12 rounded-xl flex gap-2 font-bold"
          onClick={onLogoutConfirm || onLogout}
        >
          <LogOut size={20} /> Log Out
        </Button>
      </div>
    </div>
  );
};

export const EditNicknameScreen = ({ onBack, onSave }: { onBack: () => void; onSave?: () => void }) => {
  const [value, setValue] = useState('Alex');

  return (
    <div className="flex flex-col h-full bg-background p-6 pt-12 overflow-y-auto pb-24">
      <div className="flex items-center gap-3 mb-8">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft />
        </Button>
        <h1 className="text-2xl font-bold">Edit Display Name</h1>
      </div>

      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 rounded-full bg-muted overflow-hidden mb-4 border-4 border-background shadow-lg">
          <img
            src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${value || 'user'}&mouth=smile&eyes=default&eyebrows=default`}
            alt=""
          />
        </div>
        <p className="text-lg font-bold">{value || 'Your Name'}</p>
        <p className="text-xs text-muted-foreground">Preview</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold">Nickname / Display Name</label>
          <Input
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Enter your nickname..."
            className="h-12 rounded-xl text-base"
          />
          <p className="text-xs text-muted-foreground">
            This is how other residents will see you in chats and task assignments.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold">Full Name</label>
          <Input defaultValue="Alex Johnson" className="h-12 rounded-xl" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold">Email</label>
          <Input defaultValue="alex.johnson@student.edu.au" className="h-12 rounded-xl" />
        </div>

        <Button className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/20" onClick={onSave || onBack}>
          Save Changes ✓
        </Button>
      </div>
    </div>
  );
};

export const NotificationPreferencesScreen = ({ onBack }: { onBack: () => void }) => {
  const [prefs, setPrefs] = useState({
    push: true,
    sms: false,
    email: true,
    maintenance: true,
    payments: true,
    events: true,
    chat: false,
  });

  const toggle = (key: keyof typeof prefs) => setPrefs(p => ({ ...p, [key]: !p[key] }));

  return (
    <div className="flex flex-col h-full bg-background p-6 pt-12 overflow-y-auto pb-24">
      <div className="flex items-center gap-3 mb-8">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft />
        </Button>
        <h1 className="text-2xl font-bold">Notifications</h1>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Alert Channels</h3>
          <Card className="rounded-2xl border-none shadow-sm bg-muted/30">
            <CardContent className="p-4 space-y-4">
              {([
                { key: 'push' as const, icon: Bell, label: 'Push Notifications', desc: 'In-app alerts' },
                { key: 'sms' as const, icon: Phone, label: 'SMS Alerts', desc: 'Text message alerts' },
                { key: 'email' as const, icon: Mail, label: 'Email Reports', desc: 'Weekly summary emails' },
              ] as const).map(item => (
                <div key={item.key} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className="text-muted-foreground" />
                    <div>
                      <span className="text-sm font-medium">{item.label}</span>
                      <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                  <Switch checked={prefs[item.key]} onCheckedChange={() => toggle(item.key)} />
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Notify Me About</h3>
          <Card className="rounded-2xl border-none shadow-sm bg-muted/30">
            <CardContent className="p-4 space-y-4">
              {([
                { key: 'maintenance' as const, label: 'Maintenance Updates' },
                { key: 'payments' as const, label: 'Payment Reminders' },
                { key: 'events' as const, label: 'Upcoming Events' },
                { key: 'chat' as const, label: 'New Chat Messages' },
              ] as const).map(item => (
                <div key={item.key} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.label}</span>
                  <Switch checked={prefs[item.key]} onCheckedChange={() => toggle(item.key)} />
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <Button className="w-full h-12 rounded-xl font-bold" onClick={onBack}>
          Save Preferences ✓
        </Button>
      </div>
    </div>
  );
};

// ─── Accessibility ───────────────────────────────────────────────────────────

// ─── Language support ────────────────────────────────────────────────────────

const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'zh', label: 'Mandarin', native: '中文', flag: '🇨🇳' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ar', label: 'Arabic', native: 'العربية', flag: '🇸🇦' },
  { code: 'es', label: 'Spanish', native: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'French', native: 'Français', flag: '🇫🇷' },
  { code: 'ja', label: 'Japanese', native: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: 'Korean', native: '한국어', flag: '🇰🇷' },
];

type LangCode = 'en' | 'zh' | 'hi' | 'ar' | 'es' | 'fr' | 'ja' | 'ko';

const TRANSLATIONS: Record<LangCode, Record<string, string>> = {
  en: {
    settings: 'Settings', dashboard: 'Home', tasks: 'Tasks', payments: 'Payments',
    messages: 'Messages', more: 'More', accessibility: 'Accessibility',
    notifications: 'Notifications', profile: 'Profile', welcome: 'Welcome back, Alex!',
  },
  zh: {
    settings: '设置', dashboard: '主页', tasks: '任务', payments: '付款',
    messages: '消息', more: '更多', accessibility: '无障碍',
    notifications: '通知', profile: '个人资料', welcome: '欢迎回来，Alex！',
  },
  hi: {
    settings: 'सेटिंग्स', dashboard: 'होम', tasks: 'कार्य', payments: 'भुगतान',
    messages: 'संदेश', more: 'अधिक', accessibility: 'पहुँच',
    notifications: 'सूचनाएं', profile: 'प्रोफ़ाइल', welcome: 'वापस स्वागत है, Alex!',
  },
  ar: {
    settings: 'الإعدادات', dashboard: 'الرئيسية', tasks: 'المهام', payments: 'المدفوعات',
    messages: 'الرسائل', more: 'المزيد', accessibility: 'إمكانية الوصول',
    notifications: 'الإشعارات', profile: 'الملف الشخصي', welcome: '!مرحباً بعودتك، Alex',
  },
  es: {
    settings: 'Ajustes', dashboard: 'Inicio', tasks: 'Tareas', payments: 'Pagos',
    messages: 'Mensajes', more: 'Más', accessibility: 'Accesibilidad',
    notifications: 'Notificaciones', profile: 'Perfil', welcome: '¡Bienvenido de nuevo, Alex!',
  },
  fr: {
    settings: 'Paramètres', dashboard: 'Accueil', tasks: 'Tâches', payments: 'Paiements',
    messages: 'Messages', more: 'Plus', accessibility: 'Accessibilité',
    notifications: 'Notifications', profile: 'Profil', welcome: 'Bon retour, Alex !',
  },
  ja: {
    settings: '設定', dashboard: 'ホーム', tasks: 'タスク', payments: '支払い',
    messages: 'メッセージ', more: 'その他', accessibility: 'アクセシビリティ',
    notifications: '通知', profile: 'プロフィール', welcome: 'おかえり、Alex！',
  },
  ko: {
    settings: '설정', dashboard: '홈', tasks: '할 일', payments: '결제',
    messages: '메시지', more: '더보기', accessibility: '접근성',
    notifications: '알림', profile: '프로필', welcome: '돌아오신 것을 환영해요, Alex!',
  },
};

let _currentLang: LangCode = (document.documentElement.getAttribute('data-lang') as LangCode) || 'en';

export function getCurrentLang(): LangCode {
  return _currentLang;
}

export function t(key: string): string {
  return TRANSLATIONS[_currentLang]?.[key] ?? TRANSLATIONS.en[key] ?? key;
}

const HIGH_CONTRAST_VARS: Record<string, string> = {
  '--background': 'oklch(0.05 0 0)',
  '--foreground': 'oklch(1 0 0)',
  '--card': 'oklch(0.1 0 0)',
  '--card-foreground': 'oklch(1 0 0)',
  '--muted': 'oklch(0.15 0 0)',
  '--muted-foreground': 'oklch(0.85 0 0)',
  '--primary': 'oklch(0.9 0.2 90)',
  '--primary-foreground': 'oklch(0.05 0 0)',
  '--border': 'oklch(0.7 0 0)',
  '--input': 'oklch(0.7 0 0)',
};

export const AccessibilityScreen = ({ onBack }: { onBack: () => void }) => {
  const [darkMode, setDarkMode] = useState(
    () => document.documentElement.classList.contains('dark')
  );
  const [highContrast, setHighContrast] = useState(
    () => document.documentElement.hasAttribute('data-high-contrast')
  );
  const [dyslexiaFont, setDyslexiaFont] = useState(
    () => !!document.getElementById('opendyslexic-font')
  );
  const [textReading, setTextReading] = useState(false);
  const [textScale, setTextScale] = useState<'normal' | 'large' | 'larger'>(() => {
    const stored = document.documentElement.getAttribute('data-text-scale');
    return (stored as 'normal' | 'large' | 'larger') || 'normal';
  });
  const [showHelp, setShowHelp] = useState(false);
  const [lang, setLang] = useState<LangCode>(_currentLang);

  const applyLang = (code: LangCode) => {
    _currentLang = code;
    document.documentElement.setAttribute('data-lang', code);
    document.documentElement.setAttribute('dir', code === 'ar' ? 'rtl' : 'ltr');
    setLang(code);
  };

  // Dark mode
  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    if (next) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  // High contrast (colour only)
  const toggleHighContrast = () => {
    const next = !highContrast;
    setHighContrast(next);
    if (next) {
      document.documentElement.setAttribute('data-high-contrast', '1');
      Object.entries(HIGH_CONTRAST_VARS).forEach(([k, v]) =>
        document.documentElement.style.setProperty(k, v)
      );
    } else {
      document.documentElement.removeAttribute('data-high-contrast');
      Object.keys(HIGH_CONTRAST_VARS).forEach(k =>
        document.documentElement.style.removeProperty(k)
      );
    }
  };

  // OpenDyslexic font
  const toggleDyslexiaFont = () => {
    const next = !dyslexiaFont;
    setDyslexiaFont(next);
    if (next) {
      if (!document.getElementById('opendyslexic-font')) {
        const link = document.createElement('link');
        link.id = 'opendyslexic-font';
        link.rel = 'stylesheet';
        link.href = 'https://fonts.cdnfonts.com/css/opendyslexic';
        document.head.appendChild(link);
      }
      document.documentElement.style.setProperty('--font-sans', '"OpenDyslexic", sans-serif');
    } else {
      document.getElementById('opendyslexic-font')?.remove();
      document.documentElement.style.removeProperty('--font-sans');
    }
  };

  // Text voice reading
  const toggleTextReading = () => {
    const next = !textReading;
    setTextReading(next);
    if (next && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        'Text voice reading is now enabled. ShareHouse Assistant will read important content aloud for you.'
      );
      utterance.rate = 0.9;
      utterance.onend = () => {};
      window.speechSynthesis.speak(utterance);
    } else {
      window.speechSynthesis?.cancel();
    }
  };

  // Text scaling
  const applyTextScale = (scale: 'normal' | 'large' | 'larger') => {
    setTextScale(scale);
    document.documentElement.setAttribute('data-text-scale', scale);
    const sizes: Record<string, string> = { normal: '16px', large: '18px', larger: '20px' };
    document.documentElement.style.fontSize = sizes[scale];
  };

  const features = [
    {
      id: 'dyslexia',
      icon: '𝐀',
      label: 'Open Dyslexic',
      desc: 'Dyslexia-friendly font',
      active: dyslexiaFont,
      onToggle: toggleDyslexiaFont,
    },
    {
      id: 'contrast',
      icon: '◑',
      label: 'High Contrast',
      desc: 'Colour contrast only',
      active: highContrast,
      onToggle: toggleHighContrast,
    },
    {
      id: 'dark',
      icon: '🌙',
      label: 'Dark Mode',
      desc: 'Dark colour scheme',
      active: darkMode,
      onToggle: toggleDarkMode,
    },
    {
      id: 'voice',
      icon: '🔊',
      label: 'Voice Reading',
      desc: 'Read content aloud',
      active: textReading,
      onToggle: toggleTextReading,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-sm border-b border-border px-6 py-4 pt-12">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ChevronLeft />
          </Button>
          <h1 className="text-2xl font-bold">Accessibility</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Feature toggle buttons */}
        <section>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Display & Reading</h3>
          <div className="grid grid-cols-2 gap-3">
            {features.map(f => (
              <button
                key={f.id}
                onClick={f.onToggle}
                className={`flex flex-col items-start gap-2 p-4 rounded-2xl border-2 cursor-pointer transition-all text-left ${
                  f.active
                    ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
                    : 'bg-muted/30 border-transparent text-foreground'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xl">{f.icon}</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                    f.active ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {f.active ? 'ON' : 'OFF'}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold leading-tight">{f.label}</p>
                  <p className={`text-[10px] leading-tight mt-0.5 ${
                    f.active ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}>{f.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Text Resize */}
        <section>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Text Size</h3>
          <Card className="rounded-2xl border-none shadow-sm bg-muted/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Type size={16} className="text-primary" />
                <span className="text-sm font-bold">Text Resizing</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['normal', 'large', 'larger'] as const).map(size => (
                  <button
                    key={size}
                    onClick={() => applyTextScale(size)}
                    className={`py-3 rounded-xl text-center border-2 cursor-pointer transition-all ${
                      textScale === size
                        ? 'bg-primary text-primary-foreground border-primary font-bold'
                        : 'bg-background border-border text-foreground'
                    }`}
                  >
                    <span className={`block font-bold ${
                      size === 'normal' ? 'text-sm' : size === 'large' ? 'text-base' : 'text-lg'
                    }`}>A</span>
                    <span className="text-[10px] mt-0.5 block capitalize">{size}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Language */}
        <section>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Language</h3>
          <div className="grid grid-cols-2 gap-2">
            {LANGUAGES.map(l => (
              <button
                key={l.code}
                onClick={() => applyLang(l.code as LangCode)}
                className={`flex items-center gap-2.5 p-3 rounded-2xl border-2 cursor-pointer transition-all text-left ${
                  lang === l.code
                    ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20'
                    : 'bg-muted/30 border-transparent text-foreground'
                }`}
              >
                <span className="text-lg leading-none">{l.flag}</span>
                <div className="min-w-0">
                  <p className="text-xs font-bold leading-tight truncate">{l.native}</p>
                  <p className={`text-[10px] leading-tight truncate ${
                    lang === l.code ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}>{l.label}</p>
                </div>
                {lang === l.code && (
                  <span className="ml-auto text-[10px] font-black">✓</span>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Help button */}
        <section>
          <Button
            variant="outline"
            className="w-full h-14 rounded-2xl font-bold flex gap-3 border-2 border-primary/20 text-primary"
            onClick={() => setShowHelp(true)}
          >
            <span className="text-xl">❓</span>
            Help & Accessibility Guide
          </Button>
        </section>

        {/* Reset */}
        <Button
          variant="ghost"
          className="w-full h-10 rounded-xl text-muted-foreground text-sm"
          onClick={() => {
            if (darkMode) toggleDarkMode();
            if (highContrast) toggleHighContrast();
            if (dyslexiaFont) toggleDyslexiaFont();
            if (textReading) toggleTextReading();
            applyTextScale('normal');
            applyLang('en');
          }}
        >
          Reset all to default
        </Button>
      </div>

      {/* Help Modal */}
      {showHelp && (
        <div className="absolute inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col p-6 pt-12 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Accessibility Help</h2>
            <Button variant="ghost" size="icon" onClick={() => setShowHelp(false)}>
              <ChevronLeft />
            </Button>
          </div>
          <div className="space-y-4">
            {[
              { title: '𝐀 Open Dyslexic', body: 'Switches the app font to OpenDyslexic — a typeface designed to improve readability for people with dyslexia by using heavier bottoms on letters.' },
              { title: '◑ High Contrast', body: 'Changes only the app colours to a high-contrast black and yellow palette, making text and buttons easier to distinguish.' },
              { title: '🌙 Dark Mode', body: 'Switches the colour scheme to a dark background, reducing eye strain in low-light environments.' },
              { title: '🔊 Voice Reading', body: "Uses your device's built-in text-to-speech to read content aloud. Tap the toggle to hear the app speak." },
              { title: 'A Text Resizing', body: 'Adjusts the base text size across the app. Choose Normal, Large, or Larger to suit your reading preference.' },
              { title: '🌐 Language', body: 'Switch the app language to English, Mandarin, Hindi, Arabic, Spanish, French, Japanese, or Korean. Arabic also enables right-to-left text layout.' },
            ].map(item => (
              <Card key={item.title} className="rounded-2xl border-none bg-muted/30">
                <CardContent className="p-4">
                  <p className="font-bold text-sm mb-1">{item.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.body}</p>
                </CardContent>
              </Card>
            ))}
            <Card className="rounded-2xl border-none bg-primary/5 border border-primary/10">
              <CardContent className="p-4">
                <p className="font-bold text-sm text-primary mb-1">Need more help?</p>
                <p className="text-xs text-muted-foreground leading-relaxed">Contact the Heritage Hall community manager on 1800 HALL (4255) for additional accessibility support.</p>
              </CardContent>
            </Card>
          </div>
          <Button className="mt-6 w-full h-12 rounded-xl font-bold" onClick={() => setShowHelp(false)}>
            Close Help
          </Button>
        </div>
      )}
    </div>
  );
};

export const CommunityInfoScreen = ({ onBack }: { onBack: () => void }) => (
  <div className="flex flex-col h-full bg-background p-6 pt-12 overflow-y-auto pb-24">
    <div className="flex items-center gap-3 mb-8">
      <Button variant="ghost" size="icon" onClick={onBack}>
        <ChevronLeft />
      </Button>
      <h1 className="text-2xl font-bold">Community Info</h1>
    </div>

    <Card className="rounded-3xl border-none shadow-lg bg-primary text-primary-foreground mb-6 overflow-hidden">
      <CardContent className="p-6 relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10" />
        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4 text-2xl">🏠</div>
        <h2 className="text-2xl font-bold mb-1">Heritage Hall</h2>
        <p className="text-sm opacity-80">University Student Accommodation</p>
      </CardContent>
    </Card>

    <div className="space-y-4">
      {[
        { label: 'Address', value: '42 Campus Drive, University District NSW 2000' },
        { label: 'Total Residents', value: '48 Students' },
        { label: 'Your Room', value: 'Room 302, Level 3' },
        { label: 'Lease Start', value: '1 September 2024' },
        { label: 'Lease End', value: '31 December 2024' },
        { label: 'Community Manager', value: 'Marcus Sterling' },
        { label: 'Emergency Line', value: '1800 HALL (4255)' },
      ].map(item => (
        <div key={item.label} className="flex justify-between items-start p-4 rounded-2xl bg-muted/30">
          <span className="text-xs font-bold text-muted-foreground uppercase">{item.label}</span>
          <span className="text-sm font-semibold text-right max-w-[55%]">{item.value}</span>
        </div>
      ))}
    </div>

    <div className="mt-6 p-4 rounded-2xl bg-primary/5 border border-primary/10">
      <p className="text-xs font-bold text-primary uppercase mb-2">Community Notice</p>
      <p className="text-sm leading-relaxed">Our community is built on mutual respect and shared responsibility. Enjoy your time at Heritage Hall and don't hesitate to reach out to management for support.</p>
    </div>
  </div>
);

export const LogoutConfirmationScreen = ({
  onConfirm,
  onCancel
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) => (
  <div className="flex flex-col items-center justify-center h-full bg-background p-6 pb-24">
    <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
      <LogOut size={36} className="text-destructive" />
    </div>
    <h1 className="text-2xl font-bold mb-2">Log Out?</h1>
    <p className="text-muted-foreground text-sm text-center mb-10 max-w-xs">
      You'll need to sign in again to access your ShareHouse community. Any unsaved changes will be lost.
    </p>
    <div className="w-full space-y-3">
      <Button variant="destructive" className="w-full h-12 rounded-xl font-bold" onClick={onConfirm}>
        Yes, Log Out
      </Button>
      <Button variant="outline" className="w-full h-12 rounded-xl font-bold" onClick={onCancel}>
        Cancel
      </Button>
    </div>
  </div>
);

// ─── Tasks ────────────────────────────────────────────────────────────────────

type TaskUrgency = 'overdue' | 'today' | 'tomorrow' | 'upcoming';

interface Task {
  id: number;
  title: string;
  category: string;
  status: 'pending' | 'completed';
  date: string;
  urgency: TaskUrgency;
  assignee: string;
  assigneeSeed: string;
}

const urgencyBadge: Record<TaskUrgency, { label: string; color: string; dot: string }> = {
  overdue:  { label: 'Overdue',       color: 'bg-destructive/10 text-destructive',  dot: '🔴' },
  today:    { label: 'Due Today',     color: 'bg-chart-1/10 text-chart-1',          dot: '🟠' },
  tomorrow: { label: 'Due Tomorrow',  color: 'bg-chart-2/10 text-chart-2',          dot: '🟢' },
  upcoming: { label: 'Upcoming',      color: 'bg-muted text-muted-foreground',      dot: '⚪' },
};

export const TasksScreen = ({
  onBack,
  onViewTask,
  onCreateTask
}: {
  onBack: () => void;
  onViewTask?: (id: number) => void;
  onCreateTask?: () => void;
}) => {
  const tasks: Task[] = [
    { id: 1, title: 'Vacuum Lounge', category: 'Cleaning', status: 'pending', date: 'Today', urgency: 'today', assignee: 'Alex', assigneeSeed: 'alex' },
    { id: 2, title: 'Clean Kitchen Counter', category: 'Kitchen', status: 'pending', date: 'Today', urgency: 'today', assignee: 'Alex', assigneeSeed: 'alex' },
    { id: 3, title: 'Take out Garbage', category: 'Outdoors', status: 'pending', date: 'Tomorrow', urgency: 'tomorrow', assignee: 'John', assigneeSeed: 'john' },
    { id: 4, title: 'Grocery Run', category: 'Shopping', status: 'completed', date: 'Yesterday', urgency: 'upcoming', assignee: 'Alex', assigneeSeed: 'alex' },
    { id: 5, title: 'Replace towels', category: 'Cleaning', status: 'completed', date: 'Oct 10', urgency: 'upcoming', assignee: 'Sarah', assigneeSeed: 'sarah' },
  ];

  const pending = tasks.filter(t => t.status === 'pending');
  const completed = tasks.filter(t => t.status === 'completed');

  const overdueCount = pending.filter(t => t.urgency === 'overdue').length;
  const todayCount = pending.filter(t => t.urgency === 'today').length;
  const tomorrowCount = pending.filter(t => t.urgency === 'tomorrow').length;

  return (
    <div className="flex flex-col h-full bg-background p-6 pt-12 overflow-y-auto pb-24">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft />
        </Button>
        <h1 className="text-2xl font-bold">House Tasks</h1>
      </div>

      {/* Summary Chips */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1 -mx-6 px-6 pr-8">
        {overdueCount > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-destructive/10 text-destructive flex-shrink-0">
            <span className="font-black text-base">{overdueCount}</span>
            <span className="text-xs font-bold">🔴 Overdue</span>
          </div>
        )}
        {todayCount > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-chart-1/10 text-chart-1 flex-shrink-0">
            <span className="font-black text-base">{todayCount}</span>
            <span className="text-xs font-bold">🟠 Due Today</span>
          </div>
        )}
        {tomorrowCount > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-chart-2/10 text-chart-2 flex-shrink-0">
            <span className="font-black text-base">{tomorrowCount}</span>
            <span className="text-xs font-bold">🟢 Due Tomorrow</span>
          </div>
        )}
        <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted/50 text-muted-foreground flex-shrink-0">
          <span className="font-black text-base">{completed.length}</span>
          <span className="text-xs font-bold">✅ Completed</span>
        </div>
      </div>

      <Tabs defaultValue="my" className="w-full mb-6">
        <TabsList className="grid w-full grid-cols-2 rounded-xl bg-muted/50 p-1">
          <TabsTrigger value="my" className="rounded-lg data-[state=active]:bg-background">My Tasks</TabsTrigger>
          <TabsTrigger value="community" className="rounded-lg data-[state=active]:bg-background">Community</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-6 overflow-y-auto pb-20">
        {pending.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <div className="w-16 h-16 bg-chart-2/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 size={28} className="text-chart-2" />
            </div>
            <h3 className="font-bold mb-1">All caught up!</h3>
            <p className="text-sm text-muted-foreground mb-4">No pending tasks right now.</p>
            <Button className="rounded-xl" onClick={onCreateTask}>Add a Task</Button>
          </div>
        ) : (
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold">Priority Tasks</h3>
              <Button
                size="sm"
                variant="outline"
                className="h-8 rounded-lg gap-1 border-primary/20 text-primary"
                onClick={onCreateTask}
              >
                <Plus size={14} /> New
              </Button>
            </div>
            <div className="space-y-3">
              {pending.map(task => {
                const ub = urgencyBadge[task.urgency];
                return (
                  <div
                    key={task.id}
                    className="group flex gap-3 p-4 rounded-2xl bg-muted/30 border-l-4 border-primary/40 cursor-pointer"
                    onClick={() => onViewTask?.(task.id)}
                  >
                    <div className="w-8 h-8 rounded-full bg-muted overflow-hidden flex-shrink-0 mt-0.5">
                      <img
                        src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${task.assigneeSeed}&mouth=smile&eyes=default&eyebrows=default`}
                        alt={task.assignee}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-sm">{task.title}</h4>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ml-2 ${ub.color}`}>
                          {ub.dot} {ub.label}
                        </span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Badge variant="outline" className="text-[9px] font-bold text-muted-foreground h-4 rounded-sm">
                          {task.category}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground">
                          {task.assignee} · <Clock size={9} className="inline" /> {task.date}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {completed.length > 0 && (
          <section>
            <h3 className="text-sm font-bold text-muted-foreground mb-4">Completed</h3>
            <div className="space-y-3 opacity-60">
              {completed.map(task => (
                <div key={task.id} className="flex gap-3 p-4 rounded-2xl bg-muted/30">
                  <div className="w-6 h-6 rounded-full bg-chart-2 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 size={14} className="text-white" />
                  </div>
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-7 h-7 rounded-full bg-muted overflow-hidden flex-shrink-0">
                      <img
                        src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${task.assigneeSeed}&mouth=smile&eyes=default&eyebrows=default`}
                        alt={task.assignee}
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm line-through text-muted-foreground">{task.title}</h4>
                      <p className="text-[10px] text-muted-foreground">
                        Completed {task.date} · {task.assignee}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
