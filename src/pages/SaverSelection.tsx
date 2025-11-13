import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SaverCard } from "@/components/SaverCard";
import { ArrowLeft, Home, HelpCircle, Info, Clock, Grid3x3 } from "lucide-react";
import suresaveLogo from "@/assets/suresave-logo.jpg";

const SaverSelection = () => {
  const navigate = useNavigate();
  const [showBalances, setShowBalances] = useState({
    pension: false,
    mandatory: false,
    voluntary: false,
  });

  const toggleBalance = (type: keyof typeof showBalances) => {
    setShowBalances((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-primary px-4 py-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <img src={suresaveLogo} alt="Logo" className="h-10 w-10 rounded-lg" />
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>
      </div>

      {/* Cards Section */}
      <div className="space-y-6 px-4 py-8">
        <SaverCard
          type="pension"
          title="TOTAL PENSION VALUE"
          userName="ABUBAKRI ADEKUNLE SALAMI"
          accountNumber="PEN110134210592"
          balance="250000"
          showBalance={showBalances.pension}
          onToggleBalance={() => toggleBalance("pension")}
        />

        <SaverCard
          type="mandatory"
          title="MANDATORY CONTRIBUTION"
          balance="150000"
          showBalance={showBalances.mandatory}
          onToggleBalance={() => toggleBalance("mandatory")}
        />

        <SaverCard
          type="voluntary"
          title="VOLUNTARY CONTRIBUTION"
          balance="100000"
          showBalance={showBalances.voluntary}
          onToggleBalance={() => toggleBalance("voluntary")}
        />
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
        <div className="flex items-center justify-around px-4 py-3">
          <Button variant="ghost" className="flex-col h-auto py-2" onClick={() => navigate("/")}>
            <Home className="h-5 w-5 text-primary" />
            <span className="mt-1 text-xs font-medium text-primary">Home</span>
          </Button>
          <Button variant="ghost" className="flex-col h-auto py-2">
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
            <span className="mt-1 text-xs text-muted-foreground">Enquiry</span>
          </Button>
          <Button variant="ghost" className="flex-col h-auto py-2">
            <Info className="h-5 w-5 text-muted-foreground" />
            <span className="mt-1 text-xs text-muted-foreground">Request</span>
          </Button>
          <Button variant="ghost" className="flex-col h-auto py-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <span className="mt-1 text-xs text-muted-foreground">Statement</span>
          </Button>
          <Button variant="ghost" className="flex-col h-auto py-2">
            <Grid3x3 className="h-5 w-5 text-muted-foreground" />
            <span className="mt-1 text-xs text-muted-foreground">More</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default SaverSelection;
