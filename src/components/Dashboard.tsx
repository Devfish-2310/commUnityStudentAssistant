import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Bell,
  Calendar,
  CreditCard,
  Plus,
  Search,
  ChevronRight
} from 'lucide-react';

const MOCK_DATA = {
  tasks: [
    { id: 1, title: 'Clean Kitchen Counter', due: 'Today', urgency: 'today', assignee: 'alex' },
    { id: 2, title: 'Take out Trash', due: '6:00 PM', urgency: 'today', assignee: 'john' },
    { id: 3, title: 'Vacuum Lounge', due: 'Tomorrow', urgency: 'tomorrow', assignee: 'sarah' },
  ],
  events: [
    { id: 1, title: 'House BBQ Party', date: 'Tomorrow, 5 PM', location: 'Backyard' }
  ],
  reminders: [
    { id: 1, title: 'Rent', due: '4 August', amount: '$450', payTo: 'Alex', overdue: true }
  ],
  notifications: [
    { id: 1, text: 'Maintenance request updated', icon: '🔧', time: '5m ago' },
    { id: 2, text: 'Package waiting at reception', icon: '📦', time: '1h ago' },
  ]
};

const priorityConfig: Record<string, { dot: string; label: string; color: string }> = {
  overdue: { dot: '🔴', label: 'Overdue', color: 'text-destructive bg-destructive/10' },
  today:   { dot: '🟠', label: 'Due Today', color: 'text-chart-1 bg-chart-1/10' },
  tomorrow:{ dot: '🟢', label: 'Due Tomorrow', color: 'text-chart-2 bg-chart-2/10' },
};

const Dashboard = ({ onNavigate }: { onNavigate: (screen: string) => void }) => {
  return (
    <div className="flex flex-col h-full bg-background pb-24">
      {/* Top Header */}
      <div className="p-6 pt-12 flex justify-between items-center">
        <div>
          <h2 className="text-sm font-medium text-muted-foreground">Good morning,</h2>
          <h1 className="text-2xl font-bold">Alex 👋</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => onNavigate('search')}>
            <Search size={20} />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full relative" onClick={() => onNavigate('notifications')}>
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-background" />
          </Button>
          <div className="w-12 h-12 rounded-full overflow-hidden border">
  <img
    src="https://api.dicebear.com/9.x/avataaars/svg?seed=Alex&mouth=smile&eyes=default&eyebrows=default"
    alt="Avatar"
    className="w-full h-full object-cover"
  />
</div>
          

      <div className="px-6 space-y-6 overflow-y-auto">
        {/* Notifications Card — moved to top */}
        <Card className="rounded-2xl border-none shadow-sm bg-primary/5 border border-primary/20 cursor-pointer" onClick={() => onNavigate('notifications')}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Bell size={16} className="text-primary" />
                <span className="font-bold text-sm">Notifications</span>
              </div>
              <Badge className="bg-primary text-primary-foreground text-[10px]">2 new</Badge>
            </div>
            <div className="space-y-1.5">
              {MOCK_DATA.notifications.map(n => (
                <div key={n.id} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{n.icon}</span>
                  <span className="flex-1">{n.text}</span>
                  <span className="text-[10px]">{n.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Summary */}
        <Card className="rounded-2xl border-none shadow-sm bg-muted/30">
          <CardContent className="p-4">
            <h3 className="font-bold text-sm mb-3">Today's Summary</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: '✅', label: '3 Tasks', sub: 'pending today', color: 'text-chart-1' },
                { icon: '💳', label: '1 Payment Due', sub: 'Aug 4', color: 'text-destructive' },
                { icon: '💬', label: '2 New Messages', sub: 'unread', color: 'text-primary' },
                { icon: '🔧', label: 'Maintenance', sub: 'status updated', color: 'text-chart-4' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2 p-2 rounded-xl bg-background/60">
                  <span className="text-base">{item.icon}</span>
                  <div>
                    <p className={`text-xs font-bold ${item.color}`}>{item.label}</p>
                    <p className="text-[10px] text-muted-foreground">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Tasks */}
        <section>
          <div className="flex justify-between items-end mb-3">
            <h3 className="font-bold text-lg">Today's Tasks</h3>
            <Button variant="link" className="p-0 h-auto text-primary text-xs font-bold" onClick={() => onNavigate('tasks')}>View all</Button>
          </div>
          {/* Legend */}
          <div className="flex items-center gap-3 mb-3 px-1">
            {[
              { dot: 'bg-chart-1', label: 'Due Today' },
              { dot: 'bg-chart-2', label: 'Due Tomorrow' },
              { dot: 'bg-chart-4', label: 'Completed' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${item.dot}`} />
                <span className="text-[10px] text-muted-foreground font-medium">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {MOCK_DATA.tasks.map(task => {
              const p = priorityConfig[task.urgency];
              return (
                <Card key={task.id} className="rounded-2xl border-none shadow-sm bg-muted/30">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted overflow-hidden flex-shrink-0">
                      <img
                        src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${task.assignee}&mouth=smile&eyes=default&eyebrows=default`}
                        alt="" className="w-full h-full object-cover"

                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{task.title}</p>
                      <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <span>{task.assignee.charAt(0).toUpperCase() + task.assignee.slice(1)}</span>
                        <span>·</span>
                        <span>{task.due}</span>
                      </p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.color}`}>
                      {p.dot} {p.label}
                    </span>
                  </CardContent>
                </Card>
              );
            })}
            <Button variant="outline" className="w-full h-12 rounded-xl border-dashed border-2 text-muted-foreground flex gap-2" onClick={() => onNavigate('tasks')}>
              <Plus size={16} /> Add Task
            </Button>
          </div>
        </section>

        {/* Upcoming Events */}
        <section>
          <div className="flex justify-between items-end mb-3">
            <h3 className="font-bold text-lg">Upcoming Events</h3>
            <Button variant="link" className="p-0 h-auto text-primary text-xs font-bold" onClick={() => onNavigate('events')}>Calendar</Button>
          </div>
          <Card className="rounded-2xl border-none shadow-lg bg-primary text-primary-foreground overflow-hidden">
            <CardContent className="p-0 relative">
              <div className="p-5 relative z-10">
                <Badge className="bg-white/20 hover:bg-white/20 text-white mb-2 border-none">Community</Badge>
                <h4 className="text-xl font-bold mb-1">{MOCK_DATA.events[0].title}</h4>
                <div className="flex items-center gap-2 text-sm opacity-90">
                  <Calendar size={14} />
                  <span>{MOCK_DATA.events[0].date}</span>
                </div>
                <Button className="mt-4 bg-white text-primary hover:bg-white/90 font-bold rounded-xl" onClick={() => onNavigate('events')}>
                  RSVP Now
                </Button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10" />
            </CardContent>
          </Card>
        </section>

        {/* Payments Due */}
        <section>
          <div className="flex justify-between items-end mb-3">
            <h3 className="font-bold text-lg">Payments Due</h3>
            <Button variant="link" className="p-0 h-auto text-primary text-xs font-bold" onClick={() => onNavigate('payments')}>View all</Button>
          </div>
          {MOCK_DATA.reminders.map(r => (
            <Card key={r.id} className="rounded-2xl border-none shadow-sm bg-destructive/5 border-l-4 border-destructive cursor-pointer" onClick={() => onNavigate('payments')}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard size={20} className="text-destructive" />
                  <div>
                    <p className="text-sm font-bold">Rent</p>
                    <p className="text-xs text-muted-foreground">Due {r.due} · Pay to <span className="font-semibold">{r.payTo}</span></p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="font-bold text-lg text-destructive">{r.amount}</p>
                    <p className="text-[10px] font-bold text-destructive">Outstanding</p>
                  </div>
                  <ChevronRight size={14} className="text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </section>


      </div>
    </div>
  );
};

export default Dashboard;
