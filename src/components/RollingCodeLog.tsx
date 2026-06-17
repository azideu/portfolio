"use client";

import { useEffect, useState } from "react";

export default function RollingCodeLog() {
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    // Avoid synchronous state updates during initial mount
    const timeoutId = setTimeout(() => {
      setTimestamp(new Date().toISOString().slice(11, 19));
    }, 0);

    const timer = setInterval(() => {
      setTimestamp(new Date().toISOString().slice(11, 19));
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(timer);
    };
  }, []);

  const logs = [
    `git commit - azideu: init portfolio`,
    `npm run dev - localhost:3000`,
    `compiling router / ... [ready]`,
    `stack: react 19.0`,
    `stack: next.js 16.2.7`,
    `stack: node.js & express`,
    `stack: php (oop & pdo)`,
    `stack: mysql (pooling)`,
    `stack: tailwind css v4`,
    `stack: framer motion`,
    `stack: lucide icons`,
    `stack: docker container`,
    `stack: jwt & bcrypt Auth`,
    `stack: digitalocean spaces`,
    `stack: google oauth 2.0`,
    `system check: 0 errors`,
    `system check: 1 warning`,
    `warnings resolved successfully`,
    `bundle size: 84.2 kb`,
    `loading layout modules...`,
    `fetching repositories...`,
    `connection: active [ssl]`,
    `local dev: xampp / macOS`,
    `cloud hosting: digitalocean`,
    `client time: ${timestamp || "00:00:00"}`,
    `indexing bento items...`,
    `tesseract projection: init`,
    `webgl capability: verified`,
    `interactive hover nodes: active`,
    `monochrome theme: activated`,
    `resume.pdf size: 124 kb`,
    `terminal shell: zsh`,
  ];

  // Double the logs array to make scroll loop seamless
  const scrollLogs = [...logs, ...logs];

  // Dynamically format log elements to add console highlights and improve readability
  const formatLog = (logText: string) => {
    const parts = logText.split(/(\[.*?\]|stack:|git commit -|system check:)/i);
    return parts.map((part, i) => {
      if (part.startsWith("[") && part.endsWith("]")) {
        return (
          <span key={i} className="text-white font-bold bg-white/10 px-1 rounded-sm select-none">
            {part}
          </span>
        );
      }
      if (/^(stack:|git commit -|system check:)$/i.test(part)) {
        return (
          <span key={i} className="text-white font-bold tracking-wide">
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="w-full h-full min-h-[360px] overflow-hidden relative flex flex-col justify-center items-center py-4 select-none opacity-60 hover:opacity-100 transition-opacity duration-500">
      {/* Top & Bottom fade masks */}
      <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />


      {/* Scrolling Text Tape */}
      <div className="rolling-log-container flex flex-col gap-8 w-full text-center">
        {scrollLogs.map((log, index) => (
          <div 
            key={index}
            className="font-mono text-[9px] lg:text-[10px] text-slate-400 uppercase tracking-[0.12em] whitespace-nowrap px-2 flex items-center justify-center gap-2"
          >
            <span className="text-white/20 select-none">{"//"}</span>
            <span className="inline-flex items-center gap-1">{formatLog(log)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
