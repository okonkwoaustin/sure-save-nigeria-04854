import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, HelpCircle, Info, Clock, Grid3x3 } from "lucide-react";
import suresaveLogo from "@/assets/suresave-logo.jpg";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [loading, setLoading] = useState(true);

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
        const { data: profile, error } = await supabase
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
      <div className="px-4 py-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">
            Welcome, {firstName}!
          </h1>
          <p className="text-white/80 text-lg">
            Start your savings journey today
          </p>
        </div>

        {/* Quick Stats - Placeholder for future features */}
        <div className="mt-12 space-y-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-2">
              Total Savings
            </h3>
            <p className="text-3xl font-bold">₦0.00</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-2">
              Active Goals
            </h3>
            <p className="text-3xl font-bold">0</p>
          </div>
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
