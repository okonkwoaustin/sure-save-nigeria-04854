import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, HelpCircle, Info, Clock, Grid3x3, ChevronDown } from "lucide-react";
import suresaveLogo from "@/assets/suresave-logo.jpg";
import { toast } from "@/hooks/use-toast";
import { SaverCard } from "@/components/SaverCard";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const Dashboard = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [showBalances, setShowBalances] = useState({
    pension: false,
    mandatory: false,
    voluntary: false,
  });

  const toggleBalance = (type: keyof typeof showBalances) => {
    setShowBalances((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  useEffect(() => {
    const checkAuthAndFetchProfile = async () => {
      try {
        // Check if user is authenticated
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate("/auth");
          return;
        }

        // Fetch user profile
        const { data: profile, error } = await (supabase as any)
          .from("profiles")
          .select("first_name")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          toast({
            title: "Error",
            description: "Failed to load your profile.",
            variant: "destructive",
          });
          return;
        }

        if (profile) {
          setFirstName(profile.first_name);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchProfile();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to log out.",
        variant: "destructive",
      });
    } else {
      navigate("/auth");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

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
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="px-4 py-8">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold text-white">
            Welcome, {firstName}!
          </h1>
          <p className="text-white/80">
            Manage your savings wallets
          </p>
        </div>

        {/* Saver Cards */}
        <div className="space-y-4 pb-24">
          {/* Casual Saver */}
          <Collapsible
            open={expandedCard === "pension"}
            onOpenChange={() => setExpandedCard(expandedCard === "pension" ? null : "pension")}
          >
            <div className="space-y-2">
              <SaverCard
                type="pension"
                title="The Casual Saver"
                userName={firstName.toUpperCase()}
                accountNumber="1234567890"
                balance="250000"
                showBalance={showBalances.pension}
                onToggleBalance={() => toggleBalance("pension")}
              />
              <CollapsibleContent className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 space-y-3 animate-accordion-down">
                <div className="text-white space-y-2">
                  <p className="text-sm opacity-90">
                    <span className="font-semibold">Description:</span> Save randomly without a specific goal
                  </p>
                  <p className="text-sm opacity-90">
                    <span className="font-semibold">Last Transaction:</span> ₦5,000 - 2 days ago
                  </p>
                  <p className="text-sm opacity-90">
                    <span className="font-semibold">Total Deposits:</span> 12 transactions
                  </p>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1 bg-white/20 hover:bg-white/30 text-white border-white/20">
                    View Details
                  </Button>
                  <Button className="flex-1 bg-white/20 hover:bg-white/30 text-white border-white/20">
                    Switch Wallet
                  </Button>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Goal Getter */}
          <Collapsible
            open={expandedCard === "mandatory"}
            onOpenChange={() => setExpandedCard(expandedCard === "mandatory" ? null : "mandatory")}
          >
            <div className="space-y-2">
              <SaverCard
                type="mandatory"
                title="The Goal Getter"
                userName={firstName.toUpperCase()}
                accountNumber="0987654321"
                balance="150000"
                showBalance={showBalances.mandatory}
                onToggleBalance={() => toggleBalance("mandatory")}
              />
              <CollapsibleContent className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 space-y-3 animate-accordion-down">
                <div className="text-white space-y-2">
                  <p className="text-sm opacity-90">
                    <span className="font-semibold">Description:</span> Save toward specific financial goals
                  </p>
                  <p className="text-sm opacity-90">
                    <span className="font-semibold">Active Goal:</span> New Laptop - 75% complete
                  </p>
                  <p className="text-sm opacity-90">
                    <span className="font-semibold">Target Amount:</span> ₦200,000
                  </p>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1 bg-white/20 hover:bg-white/30 text-white border-white/20">
                    View Details
                  </Button>
                  <Button className="flex-1 bg-white/20 hover:bg-white/30 text-white border-white/20">
                    Switch Wallet
                  </Button>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Showcase Saver */}
          <Collapsible
            open={expandedCard === "voluntary"}
            onOpenChange={() => setExpandedCard(expandedCard === "voluntary" ? null : "voluntary")}
          >
            <div className="space-y-2">
              <SaverCard
                type="voluntary"
                title="The Showcase Saver"
                userName={firstName.toUpperCase()}
                accountNumber="5555666677"
                balance="100000"
                showBalance={showBalances.voluntary}
                onToggleBalance={() => toggleBalance("voluntary")}
              />
              <CollapsibleContent className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 space-y-3 animate-accordion-down">
                <div className="text-white space-y-2">
                  <p className="text-sm opacity-90">
                    <span className="font-semibold">Description:</span> Save while showcasing your craft or business
                  </p>
                  <p className="text-sm opacity-90">
                    <span className="font-semibold">Business:</span> Artisan Crafts
                  </p>
                  <p className="text-sm opacity-90">
                    <span className="font-semibold">Showcase Link:</span> suresave.com/showcase
                  </p>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1 bg-white/20 hover:bg-white/30 text-white border-white/20">
                    View Details
                  </Button>
                  <Button className="flex-1 bg-white/20 hover:bg-white/30 text-white border-white/20">
                    Switch Wallet
                  </Button>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
        <div className="flex items-center justify-around px-4 py-3">
          <Button variant="ghost" className="flex-col h-auto py-2" onClick={() => navigate("/dashboard")}>
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

export default Dashboard;
