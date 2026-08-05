import React, { useState } from "react";

import {
  SplashScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  VerificationScreen,
  JoinCommunityScreen,
  SuccessJoinedScreen,
  OnboardingScreen,
} from "@/components/AuthScreens";

import Dashboard from "@/components/Dashboard";

import {
  PaymentsScreen,
  PaymentDetailScreen,
  EventsScreen,
  EventDetailScreen,
  RsvpConfirmationScreen,
} from "@/components/PaymentsAndEvents";

import {
  TasksScreen,
  ProfileScreen,
} from "@/components/ProfileAndTasks";


type Screen =
  | "splash"
  | "login"
  | "register"
  | "forgot"
  | "verify"
  | "join"
  | "success"
  | "onboarding"
  | "dashboard"
  | "payments"
  | "payment-detail"
  | "events"
  | "event-detail"
  | "rsvp"
  | "tasks"
  | "profile";


export default function App() {

  const [screen, setScreen] = useState<Screen>("splash");

  const [selectedPayment, setSelectedPayment] = useState(1);

  const [selectedEvent, setSelectedEvent] = useState(1);


  const navigate = (next: string) => {
    setScreen(next as Screen);
  };


  switch (screen) {

    case "splash":
      return (
        <SplashScreen
          onNext={() => navigate("login")}
        />
      );


    case "login":
      return (
        <LoginScreen
          onLogin={() => navigate("dashboard")}
          onForgotPassword={() => navigate("forgot")}
          onBack={() => navigate("splash")}
          onRegister={() => navigate("register")}
        />
      );


    case "register":
      return (
        <RegisterScreen
          onRegister={() => navigate("verify")}
          onBack={() => navigate("login")}
        />
      );


    case "forgot":
      return (
        <ForgotPasswordScreen
          onVerify={() => navigate("verify")}
          onBack={() => navigate("login")}
        />
      );


    case "verify":
      return (
        <VerificationScreen
          onNext={() => navigate("join")}
          onBack={() => navigate("register")}
        />
      );


    case "join":
      return (
        <JoinCommunityScreen
          onJoined={() => navigate("success")}
        />
      );


    case "success":
      return (
        <SuccessJoinedScreen
          onNext={() => navigate("onboarding")}
        />
      );


    case "onboarding":
      return (
        <OnboardingScreen
          onComplete={() => navigate("dashboard")}
        />
      );


    case "dashboard":
      return (
        <Dashboard
          onNavigate={navigate}
        />
      );


    case "payments":
      return (
        <PaymentsScreen
          onBack={() => navigate("dashboard")}
          onViewDetail={(id) => {
            setSelectedPayment(id);
            navigate("payment-detail");
          }}
        />
      );


    case "payment-detail":
      return (
        <PaymentDetailScreen
          paymentId={selectedPayment}
          onBack={() => navigate("payments")}
        />
      );


    case "events":
      return (
        <EventsScreen
          onBack={() => navigate("dashboard")}
          onViewEvent={(id) => {
            setSelectedEvent(id);
            navigate("event-detail");
          }}
        />
      );


    case "event-detail":
      return (
        <EventDetailScreen
          eventId={selectedEvent}
          onBack={() => navigate("events")}
          onRsvp={() => navigate("rsvp")}
        />
      );


    case "rsvp":
      return (
        <RsvpConfirmationScreen
          eventId={selectedEvent}
          onDone={() => navigate("events")}
        />
      );


    case "tasks":
      return (
        <TasksScreen
          onBack={() => navigate("dashboard")}
        />
      );


    case "profile":
      return (
        <ProfileScreen
          onBack={() => navigate("dashboard")}
        />
      );


    default:
      return (
        <SplashScreen
          onNext={() => navigate("login")}
        />
      );
  }
}
