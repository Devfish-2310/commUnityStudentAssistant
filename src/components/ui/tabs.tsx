import * as React from "react";

import { cn } from "@/lib/utils";

const Tabs = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("w-full", className)}>
      {children}
    </div>
  );
};


const TabsList = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex gap-2 border-b">
      {children}
    </div>
  );
};


const TabsTrigger = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <button className="px-4 py-2 text-sm">
      {children}
    </button>
  );
};


export {
  Tabs,
  TabsList,
  TabsTrigger,
};
