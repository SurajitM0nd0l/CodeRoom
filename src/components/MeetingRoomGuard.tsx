"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const MeetingRoomGuard = ({ children }: { children: React.ReactNode }) => {
  const [isTabActive, setIsTabActive] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsTabActive(false);
        toast.error("Unknown activity detected! Please stay on the meeting tab.");
      } else {
        setIsTabActive(true);
      }
    };

    const handleBlur = () => {
      setIsTabActive(false);
      toast.error("Unknown activity detected! Please stay on the meeting tab.");
    };

    const handleFocus = () => {
      setIsTabActive(true);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return <>{children}</>;
};

export default MeetingRoomGuard;
