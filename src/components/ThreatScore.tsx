import { cn } from "@/lib/utils";

interface ThreatScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

function getLevel(score: number) {
  if (score <= 20) return { label: "SAFE", color: "text-threat-safe", bg: "bg-threat-safe", ring: "ring-threat-safe" };
  if (score <= 50) return { label: "SUSPICIOUS", color: "text-threat-suspicious", bg: "bg-threat-suspicious", ring: "ring-threat-suspicious" };
  if (score <= 80) return { label: "HIGH RISK", color: "text-threat-high", bg: "bg-threat-high", ring: "ring-threat-high" };
  return { label: "DANGEROUS", color: "text-threat-dangerous", bg: "bg-threat-dangerous", ring: "ring-threat-dangerous" };
}

const sizeMap = {
  sm: { container: "w-16 h-16", text: "text-lg", label: "text-[9px]" },
  md: { container: "w-24 h-24", text: "text-2xl", label: "text-xs" },
  lg: { container: "w-32 h-32", text: "text-4xl", label: "text-sm" },
};

export function ThreatScore({ score, size = "md", showLabel = true }: ThreatScoreProps) {
  const level = getLevel(score);
  const s = sizeMap[size];
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn("relative flex items-center justify-center", s.container)}>
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--border))" strokeWidth="4" />
          <circle
            cx="50" cy="50" r="42" fill="none"
            stroke="currentColor"
            strokeWidth="4" strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={cn(level.color, "transition-all duration-1000 ease-out")}
          />
        </svg>
        <span className={cn("font-mono font-bold", s.text, level.color)}>{score}</span>
      </div>
      {showLabel && (
        <span className={cn("font-mono font-semibold tracking-widest", s.label, level.color)}>
          {level.label}
        </span>
      )}
    </div>
  );
}
