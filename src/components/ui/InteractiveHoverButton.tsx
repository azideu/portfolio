"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface InteractiveHoverButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  icon?: React.ReactNode;
  arrowIcon?: React.ReactNode;
  shuffle?: boolean;
}

export function InteractiveHoverButton({
  children,
  className = "",
  onClick,
  href,
  target,
  rel,
  icon,
  arrowIcon = <ArrowRight className="w-3.5 h-3.5" />,
  shuffle = true,
  ...props
}: InteractiveHoverButtonProps) {
  const isLink = !!href;
  
  const content = (
    <>
      <div className="flex items-center justify-center gap-2 relative z-10">
        <div className="bg-white h-2 w-2 rounded-full transition-all duration-300 group-hover:scale-[100.8]"></div>
        {icon && <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">{icon}</span>}
        <span className={`inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 ${shuffle ? "shuffle-text" : ""}`}>
          {children}
        </span>
      </div>
      <div className="text-black absolute inset-0 z-20 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        {icon && <span>{icon}</span>}
        <span className={shuffle ? "shuffle-text" : ""}>{children}</span>
        {arrowIcon}
      </div>
    </>
  );

  const baseClassName = `group bg-black relative w-auto cursor-pointer overflow-hidden rounded-lg border border-white/40 p-2.5 px-6 text-center font-semibold text-white font-mono text-xs tracking-wider uppercase flex items-center justify-center transition-colors duration-300 hover:border-white ${className}`;

  if (isLink) {
    return (
      <a
        href={href}
        className={baseClassName}
        target={target}
        rel={rel}
        onClick={onClick}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={baseClassName}
      onClick={onClick}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
