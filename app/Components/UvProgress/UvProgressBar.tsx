"use client";

import { FC } from "react";

// Shadcn Component Imports
import { Progress } from "@/components/ui/progress";

interface UvProgressProps {
  value: number;
  max: number;
  className: string;
}

const UvProgressBar: FC<UvProgressProps> = ({ value, max, className }) => {
  return (
    <>
      <Progress value={value} max={max} className={className} />
    </>
  );
};

export default UvProgressBar;
