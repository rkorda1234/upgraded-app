/**
 * Types and interfaces for Upgraded Real Estate website.
 */

export interface Message {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: Date;
}

export interface Program {
  id: string;
  title: string;
  hours?: string;
  status?: "active" | "coming_soon" | "new";
  description: string;
  highlights: string[];
}

export interface ProgramCategory {
  id: string;
  title: string;
  description: string;
  ctaText: string;
  programs: Program[];
}

export type UpgradeOption = 
  | "programs" 
  | "ai_help" 
  | "leadership" 
  | "jump_start" 
  | "renew_license";

export interface UpgradeOptionDetail {
  id: UpgradeOption;
  label: string;
  title: string;
  description: string;
  badge: string;
}
