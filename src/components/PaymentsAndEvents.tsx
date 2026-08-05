import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ChevronLeft,
  CreditCard,
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  DollarSign,
  Users,
  CheckCircle2,
  ChevronRight,
  CalendarPlus
} from 'lucide-react';

// ─── Payments ─────────────────────────────────────────────────────────────────

export const PaymentsScreen = ({
  onBack,
  onViewDetail
}: {
  onBack: () => void;
  onViewDetail?: (id: number) => void;
}) => {
  const reminders = [
    { id: 1, title: 'October Rent', amount: '$450.00', due: 'Aug 4, 2024', status: 'Upcoming', payTo: 'Alex Johnson' },
    { id: 2, title: 'Electricity Utility', amount: '$42.15', due: 'Oct 20, 2024', status: 'Upcoming', payTo: 'Heritage Hall' },
    { id: 3, title: 'Internet Bill', amount: '$15.00', due: 'Oct 05, 2024', status: 'Paid', payTo: 'Heritage Hall' },
  ];

  return (
    <div className="flex flex-col h-full bg-background p-6 pt-12 overflow-y-auto pb-24">
      <div className="flex items-center gap-3 mb-8">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft />
        </Button>
        <h1 className="text-2xl font-bold">Payments</h1>
      </div>

      <Card className="rounded-3xl border-none shadow-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground mb-8">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <CreditCard size={24} />
            </div>
            <Badge className="bg-white/20 hover:bg-white/30 text-white border-none">Active Balance</Badge>
          </div>
          <p className="text-sm opacity-80 mb-1">Total Outstanding</p>
          <h2 className="text-4xl font-bold mb-6">$492.15</h2>
          <div className="flex justify-between items-center text-xs opacity-80 pt-4 border-t border-white/10">
            <span>Next Due: Aug 4</span>
            <Button size="sm" className="bg-white text-primary font-bold rounded-lg px-4 h-8">
              Settle Now
            </Button>
          </div>
        </CardContent>
      </Card>

      <section>
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Payment Schedule</h3>
        <div className="space-y-3">
          {reminders.map(item => (
            <Card
              key={item.id}
              className="rounded-2xl border-none shadow-sm bg-muted/30 cursor-pointer"
              onClick={() => onViewDetail?.(item.id)}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.status === 'Paid' ? 'bg-chart-2/10 text-chart-2' : 'bg-chart-1/10 text-chart-1'}`}>
                    <DollarSign size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{item.title}</p>
                    <p className="text-[10px] text-muted-foreground">Due {item.due}</p>
                    <p className="text-[10px] text-muted-foreground">Pay to <span className="font-semibold">{item.payTo}</span></p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-2">
                  <div>
                    <p className="font-bold text-sm">{item.amount}</p>
                    <p className={`text-[10px] font-bold ${item.status === 'Paid' ? 'text-chart-2' : 'text-primary'}`}>
                      {item.status}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export const PaymentDetailScreen = ({ paymentId, onBack }: { paymentId: number; onBack: () => void }) => {
  const [paid, setPaid] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const payments: Record<number, { title: string; amount: string; due: string; status: string; ref: string; desc: string; payTo: string }> = {
    1: { title: 'October Rent', amount: '$450.00', due: 'Aug 4, 2024', status: 'Upcoming', ref: 'INV-2024-10-302', desc: 'Monthly rent for Heritage Hall Room 302 – October 2024.', payTo: 'Alex Johnson' },
    2: { title: 'Electricity Utility', amount: '$42.15', due: 'Oct 20, 2024', status: 'Upcoming', ref: 'INV-2024-ELEC-10', desc: 'Shared electricity usage split across 4 residents for Oct 1–31.', payTo: 'Heritage Hall' },
    3: { title: 'Internet Bill', amount: '$15.00', due: 'Oct 05, 2024', status: 'Paid', ref: 'INV-2024-NET-10', desc: 'Monthly NBN broadband plan split across residents.', payTo: 'Heritage Hall' },
  };
  const p = payments[paymentId] || payments[1];
  const isPaid = p.status === 'Paid' || paid;

  const handlePay = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setPaid(true);
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-background p-6 pb-24">
        <div className="w-28 h-28 rounded-full bg-chart-2/15 flex items-center justify-center mb-6 animate-in zoom-in duration-500">
          <CheckCircle2 size={64} className="text-chart-2" />
        </div>
        <h1 className="text-3xl font-bold mb-2 text-chart-2">Payment Successful</h1>
        <p className="text-muted-foreground text-sm text-center mb-6">{p.amount} paid to <strong>{p.payTo}</strong></p>
        <div className="flex items-center gap-2 text-chart-2 bg-chart-2/10 px-6 py-3 rounded-2xl">
          <CheckCircle2 size={18} />
          <span className="font-bold">Receipt Saved</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background p-6 pt-12 overflow-y-auto pb-24">
      <div className="flex items-center gap-3 mb-8">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft />
        </Button>
        <h1 className="text-2xl font-bold">Payment Details</h1>
      </div>

      <Card className={`rounded-3xl border-none shadow-lg mb-6 ${isPaid ? 'bg-chart-2' : 'bg-primary'} text-white`}>
        <CardContent className="p-6 text-center">
          <p className="text-sm opacity-80 mb-1">{p.title}</p>
          <h2 className="text-5xl font-bold mb-2">{p.amount}</h2>
          <Badge className="bg-white/20 border-none text-white mb-3">
            {isPaid ? '✓ Paid' : `Due ${p.due}`}
          </Badge>
          {!isPaid && (
            <div className="mt-3 pt-3 border-t border-white/20">
              <p className="text-xs opacity-80">Pay to</p>
              <p className="font-bold">{p.payTo}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-3 mb-6">
        {[
          { label: 'Reference', value: p.ref },
          { label: 'Due Date', value: p.due },
          { label: 'Pay To', value: p.payTo },
          { label: 'Status', value: isPaid ? 'Paid' : 'Outstanding' },
          { label: 'Property', value: 'Heritage Hall, Room 302' },
        ].map(d => (
          <div key={d.label} className="flex justify-between items-center p-4 rounded-2xl bg-muted/30">
            <span className="text-xs font-bold text-muted-foreground uppercase">{d.label}</span>
            <span className={`text-sm font-semibold ${d.label === 'Status' && isPaid ? 'text-chart-2' : d.label === 'Status' && !isPaid ? 'text-destructive' : ''}`}>{d.value}</span>
          </div>
        ))}
        <div className="p-4 rounded-2xl bg-muted/30">
          <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Description</p>
          <p className="text-sm">{p.desc}</p>
        </div>
      </div>

      {!isPaid ? (
        <div className="space-y-3">
          <Button className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/20" onClick={handlePay}>
            Pay {p.amount} Now
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-chart-2/10 text-chart-2">
            <CheckCircle2 size={20} />
            <span className="font-bold">Payment Confirmed</span>
          </div>
          <Button variant="outline" className="w-full h-12 rounded-xl font-bold">
            View Receipt
          </Button>
        </div>
      )}
    </div>
  );
};

// ─── Events ───────────────────────────────────────────────────────────────────

const EVENT_DATA = [
  {
    id: 1,
    title: 'Monthly House BBQ',
    date: 'Sat, Oct 14',
    time: '5:00 PM',
    location: 'Heritage Backyard',
    host: 'Community Manager',
    hostSeed: 'manager',
    rsvps: 18,
    description: 'Join your fellow residents for the monthly Heritage Hall BBQ! Bring a dish to share and enjoy a relaxed evening with your community.',
    tags: ['Food', 'Social', 'All Welcome'],
  },
  {
    id: 2,
    title: 'Study Night: Finals Prep',
    date: 'Tue, Oct 17',
    time: '7:00 PM',
    location: 'Level 2 Common Room',
    host: 'Sarah Chen',
    hostSeed: 'sarah',
    rsvps: 12,
    description: 'Collaborative study session ahead of finals. Bring your notes and laptop. Quiet study mode — headphones recommended.',
    tags: ['Study', 'Academic'],
  },
  {
    id: 3,
    title: 'Ping Pong Tournament',
    date: 'Fri, Oct 20',
    time: '6:30 PM',
    location: 'Games Lounge',
    host: 'John Doe',
    hostSeed: 'john',
    rsvps: 8,
    description: 'Show off your table tennis skills! Bracket-style tournament with prizes for top 3.',
    tags: ['Sport', 'Competition', 'Fun'],
  },
];

export const EventsScreen = ({
  onBack,
  onViewEvent
}: {
  onBack: () => void;
  onViewEvent?: (id: number) => void;
}) => {
  const [registered, setRegistered] = useState<Set<number>>(new Set([1]));

  const toggleRegistered = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setRegistered(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="flex flex-col h-full bg-background pb-20">
      <div className="p-6 pt-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">What's On</h1>
          <Button variant="outline" size="sm" onClick={onBack}>Close</Button>
        </div>

        <div className="space-y-6">
          {EVENT_DATA.map(event => {
            const isRegistered = registered.has(event.id);
            return (
              <Card
                key={event.id}
                className="rounded-3xl border-none shadow-sm bg-muted/30 overflow-hidden cursor-pointer"
                onClick={() => onViewEvent?.(event.id)}
              >
                <div className="h-28 bg-primary/10 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                    <Users size={80} />
                  </div>
                  <div className="absolute top-4 left-4">
                    {isRegistered ? (
                      <Badge className="bg-chart-2 text-white hover:bg-chart-2">Registered ✓</Badge>
                    ) : (
                      <Badge className="bg-white/80 text-primary hover:bg-white backdrop-blur-sm border-none">Upcoming</Badge>
                    )}
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-base leading-tight mb-1">{event.title}</h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        Hosted by <span className="font-bold text-primary ml-1">{event.host}</span>
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex flex-col items-center justify-center text-primary font-bold text-[10px]">
                      <span>{event.date.split(' ')[0]}</span>
                      <span className="text-base font-black">{event.date.split(' ')[2]}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock size={13} className="text-primary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin size={13} className="text-primary" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Users size={13} className="text-primary" />
                      <span>{event.rsvps} Residents attending</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className={`flex-1 rounded-xl font-bold ${isRegistered ? 'bg-chart-2 hover:bg-chart-2/90' : ''}`}
                      onClick={e => toggleRegistered(event.id, e)}
                    >
                      {isRegistered ? 'Registered ✓' : 'Register'}
                    </Button>
                    {isRegistered && (
                      <Button
                        variant="outline"
                        className="rounded-xl font-bold px-3"
                        onClick={e => { e.stopPropagation(); toggleRegistered(event.id, e); }}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const EventDetailScreen = ({
  eventId,
  onBack,
  onRsvp
}: {
  eventId: number;
  onBack: () => void;
  onRsvp?: () => void;
}) => {
  const [isGoing, setIsGoing] = useState(false);
  const event = EVENT_DATA.find(e => e.id === eventId) || EVENT_DATA[0];

  return (
    <div className="flex flex-col h-full bg-background pb-20">
      {/* Hero */}
      <div className="relative h-44 bg-primary/10 overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <Users size={120} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-12 left-4 bg-background/80 rounded-full"
          onClick={onBack}
        >
          <ChevronLeft />
        </Button>
        <div className="absolute bottom-4 left-6 right-6">
          <Badge className={`mb-1 ${isGoing ? 'bg-chart-2 text-white' : 'bg-primary/80 text-white'} border-none`}>
            {isGoing ? 'Registered ✓' : 'Upcoming Event'}
          </Badge>
          <h1 className="text-xl font-bold">{event.title}</h1>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-5 pb-6">
        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: CalendarIcon, label: 'Date', value: event.date },
            { icon: Clock, label: 'Time', value: event.time },
            { icon: MapPin, label: 'Location', value: event.location },
            { icon: Users, label: 'Attending', value: `${event.rsvps + (isGoing ? 1 : 0)} Residents` },
          ].map(d => (
            <div key={d.label} className="p-3 rounded-2xl bg-muted/30 flex items-start gap-2">
              <d.icon size={15} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[9px] text-muted-foreground uppercase font-bold">{d.label}</p>
                <p className="text-xs font-semibold">{d.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Host */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30">
          <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
            <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${event.hostSeed}&mouth=smile&eyes=default&eyebrows=default`} alt="" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-bold uppercase">Hosted by</p>
            <p className="font-bold text-sm">{event.host}</p>
          </div>
        </div>

        {/* Description */}
        <div className="p-4 rounded-2xl bg-muted/30">
          <p className="text-xs text-muted-foreground uppercase font-bold mb-2">About</p>
          <p className="text-sm leading-relaxed">{event.description}</p>
        </div>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap">
          {event.tags.map(t => (
            <Badge key={t} variant="secondary" className="rounded-lg">{t}</Badge>
          ))}
        </div>

        {/* Attendees */}
        <div>
          <p className="text-xs text-muted-foreground uppercase font-bold mb-3">
            Going ({event.rsvps + (isGoing ? 1 : 0)})
          </p>
          <div className="flex -space-x-2">
            {['sarah', 'john', 'priya', 'marcus', 'alex'].map(s => (
              <div key={s} className="w-8 h-8 rounded-full border-2 border-background bg-muted overflow-hidden">
                <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${s}&mouth=smile&eyes=default&eyebrows=default`} alt="" />
              </div>
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[9px] font-bold text-muted-foreground">
              +{event.rsvps - 5 + (isGoing ? 1 : 0)}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 p-4 bg-background border-t flex gap-3">
        <Button
          className={`flex-1 h-12 rounded-xl font-bold ${isGoing ? 'bg-chart-2 hover:bg-chart-2/90' : ''}`}
          onClick={() => { setIsGoing(!isGoing); if (!isGoing) onRsvp?.(); }}
        >
          {isGoing ? 'Registered ✓' : 'Register'}
        </Button>
        <Button
          variant="outline"
          className="h-12 rounded-xl font-bold px-4 flex gap-2 items-center"
          onClick={() => {}}
        >
          <CalendarPlus size={16} />
          <span className="text-xs">Add to Calendar</span>
        </Button>
        {isGoing && (
          <Button
            variant="ghost"
            className="h-12 rounded-xl font-bold text-muted-foreground px-3 text-xs"
            onClick={() => setIsGoing(false)}
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};

export const RsvpConfirmationScreen = ({
  eventId,
  onDone
}: {
  eventId: number;
  onDone: () => void;
}) => {
  const event = EVENT_DATA.find(e => e.id === eventId) || EVENT_DATA[0];

  return (
    <div className="flex flex-col items-center justify-center h-full bg-background p-6 pb-24">
      <div className="w-24 h-24 rounded-full bg-chart-2/15 flex items-center justify-center mb-6 animate-in zoom-in duration-500">
        <CheckCircle2 size={48} className="text-chart-2" />
      </div>
      <h1 className="text-2xl font-bold mb-2 text-center">You're In! 🎉</h1>
      <p className="text-muted-foreground text-sm text-center mb-8">
        You've registered for <strong>{event.title}</strong>. See you there!
      </p>

      <Card className="w-full rounded-3xl border-none shadow-sm bg-muted/30 mb-6">
        <CardContent className="p-5 space-y-3">
          {[
            { label: 'Event', value: event.title },
            { label: 'Date', value: event.date },
            { label: 'Time', value: event.time },
            { label: 'Location', value: event.location },
          ].map(d => (
            <div key={d.label} className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">{d.label}</span>
              <span className="text-sm font-bold">{d.value}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="w-full space-y-3">
        <Button variant="outline" className="w-full h-12 rounded-xl font-bold flex gap-2">
          <CalendarPlus size={18} /> Add to Calendar
        </Button>
        <Button className="w-full h-12 rounded-xl font-bold" onClick={onDone}>
          Back to Events
        </Button>
      </div>
    </div>
  );
};
