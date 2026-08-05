import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, Mail, Lock, User, Home, Key, CheckCircle2, GraduationCap, Phone, HelpCircle, Link2 } from 'lucide-react';

export const SplashScreen = ({ onNext }: { onNext: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full bg-primary text-primary-foreground p-6 text-center" onClick={onNext}>
    <div className="w-28 h-28 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-xl animate-bounce p-3">
      <img
        src="https://unsw-australia.aha.io/attachments/7669377668439886121/token/59da7646a1d771caf97e510fa123f92f2790508cef81d2592a9bd594839b005e.png?size=original"
        alt="commUnity logo"
        className="w-full h-full object-contain"
      />
    </div>
    <h1 className="text-4xl font-bold mb-1 tracking-tight">
      comm<span className="uppercase">U</span>nity
    </h1>
    <p className="opacity-90 font-medium tracking-wide text-sm">Smart Living Assistant</p>
    <p className="mt-8 text-sm opacity-75">Click anywhere to start</p>
  </div>
);

export const LoginScreen = ({ onLogin, onForgotPassword, onBack, onRegister }: { onLogin: () => void, onForgotPassword: () => void, onBack: () => void, onRegister?: () => void }) => (
  <div className="flex flex-col h-full bg-background p-6">
    <Button variant="ghost" size="icon" className="mb-8 -ml-2" onClick={onBack}>
      <ChevronLeft />
    </Button>
    <div className="mb-10">
      <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
      <p className="text-muted-foreground">Sign in to manage your share-house life.</p>
    </div>
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">University Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input id="email" placeholder="alex@university.edu" className="pl-10 h-12 rounded-xl" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Password</Label>
          <Button variant="link" size="sm" className="px-0 text-primary" onClick={onForgotPassword}>Forgot?</Button>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input id="password" type="password" placeholder="••••••••" className="pl-10 h-12 rounded-xl" />
        </div>
      </div>
      <Button className="w-full h-12 rounded-xl text-lg font-semibold mt-4 shadow-lg shadow-primary/20" onClick={onLogin}>
        Sign In
      </Button>
      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          Don't have an account? <span className="text-primary font-bold cursor-pointer" onClick={onRegister}>Register</span>
        </p>
      </div>
    </div>
  </div>
);

// Progress steps indicator for registration flow
const RegistrationProgress = ({ step, total }: { step: number; total: number }) => (
  <div className="flex items-center gap-2 mb-6 pt-1">
    {Array.from({ length: total }).map((_, i) => (
      <React.Fragment key={i}>
        <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-colors ${
          i + 1 < step ? 'bg-primary text-primary-foreground' :
          i + 1 === step ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' :
          'bg-muted text-muted-foreground'
        }`}>
          {i + 1 < step ? '✓' : i + 1}
        </div>
        {i < total - 1 && (
          <div className={`flex-1 h-0.5 rounded-full transition-colors ${i + 1 < step ? 'bg-primary' : 'bg-muted'}`} />
        )}
      </React.Fragment>
    ))}
  </div>
);

const STEP_LABELS = ['Create Account', 'Verify Email', 'Join Community'];

export const RegisterScreen = ({ onRegister, onBack }: { onRegister: () => void, onBack: () => void }) => {
  const [step, setStep] = useState(1);

  if (step === 2) {
    return (
      <div className="flex flex-col h-full bg-background p-6">
        <Button variant="ghost" size="icon" className="mb-4 -ml-2" onClick={() => setStep(1)}>
          <ChevronLeft />
        </Button>
        <RegistrationProgress step={2} total={3} />
        <div className="flex gap-2 items-center mb-1">
          <p className="text-xs text-primary font-semibold">Step 2 of 3</p>
          <span className="text-xs text-muted-foreground">– {STEP_LABELS[1]}</span>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Secure your account</h2>
          <p className="text-muted-foreground">Create a strong password to protect your data.</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reg-password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="reg-password" type="password" placeholder="At least 8 characters" className="pl-10 h-12 rounded-xl" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reg-confirm">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="reg-confirm" type="password" placeholder="Re-enter your password" className="pl-10 h-12 rounded-xl" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reg-phone">Phone Number <span className="text-muted-foreground text-xs">(optional)</span></Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="reg-phone" type="tel" placeholder="+61 400 000 000" className="pl-10 h-12 rounded-xl" />
            </div>
          </div>
          <div className="flex items-start gap-3 mt-2">
            <input type="checkbox" id="terms" className="mt-1 accent-primary cursor-pointer" />
            <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
              I agree to the <span className="text-primary font-semibold">Terms of Service</span> and <span className="text-primary font-semibold">Privacy Policy</span>
            </label>
          </div>
          <Button className="w-full h-12 rounded-xl text-lg font-semibold mt-4 shadow-lg shadow-primary/20" onClick={onRegister}>
            Continue to Email Verification
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background p-6">
      <Button variant="ghost" size="icon" className="mb-4 -ml-2" onClick={onBack}>
        <ChevronLeft />
      </Button>
      <RegistrationProgress step={1} total={3} />
      <div className="flex gap-2 items-center mb-1">
        <p className="text-xs text-primary font-semibold">Step 1 of 3</p>
        <span className="text-xs text-muted-foreground">– {STEP_LABELS[0]}</span>
      </div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Create an account</h2>
        <p className="text-muted-foreground">Join your student community today.</p>
      </div>
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="flex-1 space-y-2">
            <Label htmlFor="reg-first">First Name</Label>
            <Input id="reg-first" placeholder="Alex" className="h-12 rounded-xl" />
          </div>
          <div className="flex-1 space-y-2">
            <Label htmlFor="reg-last">Last Name</Label>
            <Input id="reg-last" placeholder="Smith" className="h-12 rounded-xl" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="reg-email">University Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input id="reg-email" type="email" placeholder="alex@university.edu" className="pl-10 h-12 rounded-xl" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="reg-student">Student ID</Label>
          <div className="relative">
            <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input id="reg-student" placeholder="e.g. s1234567" className="pl-10 h-12 rounded-xl" />
          </div>
        </div>
        <Button className="w-full h-12 rounded-xl text-lg font-semibold mt-4 shadow-lg shadow-primary/20" onClick={() => setStep(2)}>
          Continue
        </Button>
        <div className="text-center mt-4">
          <p className="text-sm text-muted-foreground">
            Already have an account? <span className="text-primary font-bold cursor-pointer" onClick={onBack}>Sign In</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export const ForgotPasswordScreen = ({ onVerify, onBack }: { onVerify: () => void, onBack: () => void }) => (
  <div className="flex flex-col h-full bg-background p-6">
    <Button variant="ghost" size="icon" className="mb-8 -ml-2" onClick={onBack}>
      <ChevronLeft />
    </Button>
    <div className="mb-8 text-center flex flex-col items-center">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
        <Key className="text-primary" size={32} />
      </div>
      <h2 className="text-2xl font-bold mb-2">Reset Password</h2>
      <p className="text-muted-foreground">Enter your email and we'll send you a recovery link.</p>
    </div>
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="reset-email">Email Address</Label>
        <Input id="reset-email" placeholder="alex@university.edu" className="h-12 rounded-xl" />
      </div>
      <Button className="w-full h-12 rounded-xl font-semibold mt-4" onClick={onVerify}>
        Send Reset Link
      </Button>
    </div>
  </div>
);

export const VerificationScreen = ({ onNext, onBack }: { onNext: () => void, onBack: () => void }) => (
  <div className="flex flex-col h-full bg-background p-6 items-center">
    <div className="w-full text-left mb-4">
      <Button variant="ghost" size="icon" className="-ml-2" onClick={onBack}>
        <ChevronLeft />
      </Button>
    </div>
    <RegistrationProgress step={2} total={3} />
    <div className="flex gap-2 items-center mb-6 self-start">
      <p className="text-xs text-primary font-semibold">Step 2 of 3</p>
      <span className="text-xs text-muted-foreground">– Verify Email</span>
    </div>
    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-8">
      <Mail className="text-primary" size={40} />
    </div>
    <h2 className="text-2xl font-bold mb-2">Check your inbox</h2>
    <p className="text-center text-muted-foreground mb-8">
      We've sent a 4-digit code to your university email. Enter it below to continue.
    </p>
    <div className="flex gap-4 mb-8">
      {[1, 2, 3, 4].map((i) => (
        <Input key={i} className="w-14 h-16 text-center text-2xl font-bold rounded-xl border-2 focus:border-primary" maxLength={1} />
      ))}
    </div>
    <Button className="w-full h-12 rounded-xl font-semibold" onClick={onNext}>
      Verify & Continue
    </Button>
    <Button variant="ghost" className="mt-4 text-muted-foreground">Resend code</Button>
  </div>
);

export const JoinCommunityScreen = ({ onJoined }: { onJoined: () => void }) => {
  const [method, setMethod] = useState<'link' | 'code' | null>(null);
  const [showHelp, setShowHelp] = useState(false);

  if (method === 'code') {
    return (
      <div className="flex flex-col h-full bg-background p-6">
        <Button variant="ghost" size="icon" className="mb-4 -ml-2" onClick={() => setMethod(null)}>
          <ChevronLeft />
        </Button>
        <RegistrationProgress step={3} total={3} />
        <div className="flex gap-2 items-center mb-1">
          <p className="text-xs text-primary font-semibold">Step 3 of 3</p>
          <span className="text-xs text-muted-foreground">– Join Community</span>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Join Your Home</h2>
          <p className="text-muted-foreground text-sm">
            Enter the code provided by your residential college or house manager.
          </p>
        </div>
        <Input
          placeholder="e.g. HERITAGE-1234"
          className="h-14 text-center text-xl font-mono tracking-widest uppercase mb-3 rounded-xl border-2"
        />
        <Button
          variant="link"
          className="text-muted-foreground text-sm flex items-center gap-1 mb-6 justify-start px-1"
          onClick={() => setShowHelp(!showHelp)}
        >
          <HelpCircle size={14} /> Need help finding it?
        </Button>
        {showHelp && (
          <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 mb-6 text-sm text-muted-foreground leading-relaxed">
            Your community code is provided by your building manager when you move in. Check your welcome email or contact reception.
          </div>
        )}
        <Button className="w-full h-12 rounded-xl font-semibold" onClick={onJoined}>Join House</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background p-6">
      <div className="mb-4">
        <RegistrationProgress step={3} total={3} />
        <div className="flex gap-2 items-center mb-1">
          <p className="text-xs text-primary font-semibold">Step 3 of 3</p>
          <span className="text-xs text-muted-foreground">– Join Community</span>
        </div>
      </div>
      <div className="mt-4 mb-10">
        <h2 className="text-3xl font-bold mb-2">Join Your Home</h2>
        <p className="text-muted-foreground">Connect with your residential community to get started.</p>
      </div>
      <div className="space-y-4">
        {/* Join with Code — full prominence */}
        <Card
          className="cursor-pointer border-2 border-primary/30 hover:border-primary transition-colors rounded-2xl overflow-hidden bg-primary/5"
          onClick={() => setMethod('code')}
        >
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Key size={24} />
            </div>
            <div className="flex-1">
              <p className="font-bold">Join with Code</p>
              <p className="text-xs text-muted-foreground mt-0.5">Enter the code provided by your manager</p>
            </div>
          </CardContent>
        </Card>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground font-medium">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Join with Invitation Link — equally prominent */}
        <Card
          className="cursor-pointer border-2 border-primary/30 hover:border-primary transition-colors rounded-2xl overflow-hidden bg-primary/5"
          onClick={onJoined}
        >
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Link2 size={24} />
            </div>
            <div className="flex-1">
              <p className="font-bold">Join using Invitation Link</p>
              <p className="text-xs text-muted-foreground mt-0.5">Check your email for an invite link</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const SuccessJoinedScreen = ({ onNext }: { onNext: () => void }) => (
  <div className="flex flex-col items-center justify-center h-full bg-background p-6 text-center">
    <div className="w-24 h-24 bg-chart-2/10 text-chart-2 rounded-full flex items-center justify-center mb-8 animate-in zoom-in duration-500">
      <CheckCircle2 size={64} />
    </div>
    <h2 className="text-3xl font-bold mb-4">Welcome to Heritage Hall!</h2>
    <p className="text-muted-foreground mb-12 max-w-xs">
      You've successfully joined the Heritage Hall University Community. Let's set up your profile.
    </p>
    <Button className="w-full h-12 rounded-xl text-lg font-semibold" onClick={onNext}>
      Continue to Setup
    </Button>
  </div>
);

export const OnboardingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(1);
  const [nickname, setNickname] = useState('');

  if (step === 1) {
    return (
      <div className="flex flex-col h-full bg-background p-6">
        <div className="mt-12 mb-10">
          <h2 className="text-3xl font-bold mb-2">What should we call you?</h2>
          <p className="text-muted-foreground">Your housemates will see this nickname.</p>
        </div>
        <div className="space-y-6">
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full bg-muted border-4 border-dashed border-muted-foreground/30 flex items-center justify-center relative overflow-hidden">
               {nickname ? (
                  <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${nickname}&mouth=smile&eyes=default&eyebrows=default`} alt="Avatar" className="w-full h-full" />
               ) : (
                  <User size={48} className="text-muted-foreground/40" />
               )}
               <div className="absolute bottom-0 inset-x-0 bg-black/40 text-white text-[10px] py-1 text-center font-bold">CHANGE</div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Nickname</Label>
            <Input
              placeholder="e.g. Alex"
              className="h-12 rounded-xl text-lg"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <Button className="w-full h-12 rounded-xl font-semibold" onClick={() => setStep(2)}>Next Step</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background p-6">
      <div className="mt-12 mb-10">
        <h2 className="text-3xl font-bold mb-2">Community Life</h2>
        <p className="text-muted-foreground">Here's how we help you manage Heritage Hall.</p>
      </div>
      <div className="space-y-6 mb-12">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary font-bold">1</div>
          <div>
            <h3 className="font-bold">House Tasks</h3>
            <p className="text-sm text-muted-foreground">Assign and track chores with roommates effortlessly.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary font-bold">2</div>
          <div>
            <h3 className="font-bold">Direct Support</h3>
            <p className="text-sm text-muted-foreground">Report maintenance issues and track their progress in real-time.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary font-bold">3</div>
          <div>
            <h3 className="font-bold">Community Chat</h3>
            <p className="text-sm text-muted-foreground">Stay connected with organized channels and direct messages.</p>
          </div>
        </div>
      </div>
      <Button className="w-full h-12 rounded-xl font-semibold mt-auto" onClick={onComplete}>Enter Dashboard</Button>
    </div>
  );
};
