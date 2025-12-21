"use client";

import { useState } from "react";
import { LogOut, User, Settings } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function AdminProfile() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full border px-2 py-1 hover:bg-muted"
      >
        <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
          A
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute right-0 mt-2 w-48 rounded-xl border bg-card shadow-lg z-50"
          >
            <button className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-muted">
              <User className="h-4 w-4" />
              Profile
            </button>
            <button className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-muted">
              <Settings className="h-4 w-4" />
              Settings
            </button>
            <div className="border-t my-1" />
            <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-muted">
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
