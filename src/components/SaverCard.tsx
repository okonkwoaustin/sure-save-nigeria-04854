import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface SaverCardProps {
  type: "pension" | "mandatory" | "voluntary";
  title: string;
  userName?: string;
  accountNumber?: string;
  balance: string;
  showBalance: boolean;
  onToggleBalance: () => void;
  onClick?: () => void;
}

export const SaverCard = ({
  type,
  title,
  userName,
  accountNumber,
  balance,
  showBalance,
  onToggleBalance,
  onClick,
}: SaverCardProps) => {
  const bgColors = {
    pension: "bg-pension",
    mandatory: "bg-mandatory",
    voluntary: "bg-voluntary",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl p-6 text-white shadow-lg transition-transform hover:scale-[1.02] cursor-pointer",
        bgColors[type]
      )}
      onClick={onClick}
    >
      {/* Decorative Pattern */}
      <div className="absolute right-4 top-4 opacity-10">
        <div className="grid grid-cols-2 gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-12 w-12 rotate-45 border-2 border-white" />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider">{title}</h3>
        
        {userName && (
          <p className="text-xl font-bold uppercase">{userName}</p>
        )}
        
        {accountNumber && (
          <p className="text-base font-medium tracking-wide">{accountNumber}</p>
        )}
        
        <div className="flex items-center justify-between pt-4">
          <div className="space-y-1">
            <p className="text-3xl font-bold">
              ₦ {showBalance ? balance : "XXXXXX"}.00
            </p>
          </div>
          
          {type === "voluntary" ? (
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full bg-white/20 hover:bg-white/30"
              onClick={(e) => {
                e.stopPropagation();
                onToggleBalance();
              }}
            >
              <Eye className="h-6 w-6" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="bg-white/20 text-white hover:bg-white/30 hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                onToggleBalance();
              }}
            >
              {showBalance ? "HIDE BALANCE" : "SHOW BALANCE"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
