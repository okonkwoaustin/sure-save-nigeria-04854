import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HeroCarousel } from "@/components/HeroCarousel";
import { FeatureCard } from "@/components/FeatureCard";
import { StepCard } from "@/components/StepCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { UserGuideDialog } from "@/components/UserGuideDialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import {
  Wallet,
  TrendingUp,
  Share2,
  BarChart3,
  GraduationCap,
  Languages,
  Download,
  CheckCircle2,
  Heart,
  LogOut,
} from "lucide-react";
import suresaveLogo from "@/assets/suresave-logo.jpg";
import testimonialAdesewa from "@/assets/testimonial-adesewa.jpg";
import testimonialIbrahim from "@/assets/testimonial-ibrahim.jpg";

const Index = () => {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    }
  };
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={suresaveLogo} alt="SureSave Logo" className="h-12 w-auto rounded-lg" />
              <span className="text-2xl font-bold text-foreground">SureSave</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-foreground hover:text-primary transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">
                How It Works
              </a>
              <a href="#testimonials" className="text-foreground hover:text-primary transition-colors">
                Stories
              </a>
              <Button variant="hero" size="lg" onClick={() => setIsGuideOpen(true)}>
                Get Started
              </Button>
              {user ? (
                <Button variant="outline" size="lg" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </Button>
              ) : (
                <Button variant="outline" size="lg" onClick={() => navigate("/auth")}>
                  Log In
                </Button>
              )}
            </div>
            <div className="md:hidden">
              <Button variant="hero" size="sm" onClick={() => setIsGuideOpen(true)}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-up">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                Save Smart.
                <span className="block text-primary">Grow Bold.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                SureSave helps artisans, fashion designers, and small business owners save effortlessly, track profits, and share success.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="text-base sm:text-lg px-6 sm:px-8"
                  onClick={() => setIsGuideOpen(true)}
                >
                  Get Started
                </Button>
                <Button 
                  variant="heroOutline" 
                  size="lg" 
                  className="text-base sm:text-lg px-6 sm:px-8"
                  onClick={() => navigate("/auth")}
                >
                  {user ? "Dashboard" : "Log In"}
                </Button>
              </div>
            </div>
            <div className="h-[500px] animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <HeroCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why Choose SureSave?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your craft and grow your savings
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Wallet}
              title="Quick Save & Auto-Save"
              description="Save instantly from every job or set up automatic savings to reach your goals faster"
            />
            <FeatureCard
              icon={Languages}
              title="Multi-Language Support"
              description="Use SureSave in Yoruba, Igbo, Hausa, or English - speak your language, grow your business"
            />
            <FeatureCard
              icon={Share2}
              title="Share Your Success"
              description="Post your completed work directly to social media and attract more clients"
            />
            <FeatureCard
              icon={BarChart3}
              title="Analytics & Reports"
              description="Track your earnings, monitor savings progress, and understand your business better"
            />
            <FeatureCard
              icon={GraduationCap}
              title="Learning Hub"
              description="Access financial literacy courses designed specifically for artisans and small business owners"
            />
            <FeatureCard
              icon={TrendingUp}
              title="Job Tracker"
              description="Keep track of all your projects, clients, and payments in one organized place"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start saving and growing in just four simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StepCard
              number="1"
              title="Download & Sign Up"
              description="Get the SureSave app and create your free account in minutes"
            />
            <StepCard
              number="2"
              title="Track Your Jobs"
              description="Log each project you complete and the money you earn"
            />
            <StepCard
              number="3"
              title="Save As You Earn"
              description="Set aside savings automatically or manually from every job"
            />
            <StepCard
              number="4"
              title="Share Your Success"
              description="Show off your work on social media and grow your client base"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real artisans, real results, real growth
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <TestimonialCard
              image={testimonialAdesewa}
              name="Adesewa"
              role="Fashion Designer & Tailor"
              quote="SureSave helps me save from every outfit I make! Now I'm planning to open my second shop."
            />
            <TestimonialCard
              image={testimonialIbrahim}
              name="Ibrahim"
              role="Cobbler"
              quote="Finally, I understand my money and my craft. The financial literacy courses changed everything for me."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 hero-gradient">
        <div className="container mx-auto text-center">
          <Heart className="h-16 w-16 text-primary-foreground mx-auto mb-6 animate-float" />
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Join thousands of artisans saving smarter today
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Start your journey to financial freedom and business growth
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              className="text-base sm:text-lg px-6 sm:px-8 bg-background text-primary hover:bg-background/90"
              onClick={() => setIsGuideOpen(true)}
            >
              <Download className="mr-2 h-5 w-5" />
              Start Saving
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base sm:text-lg px-6 sm:px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              onClick={() => setIsGuideOpen(true)}
            >
              <GraduationCap className="mr-2 h-5 w-5" />
              Learn Financial Skills
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-card border-t border-border">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={suresaveLogo} alt="SureSave Logo" className="h-10 w-auto rounded-lg" />
                <span className="text-xl font-bold text-foreground">SureSave</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Empowering Nigerian artisans to save smart and grow bold.
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://instagram.com/suresaveapp" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="https://facebook.com/suresaveapp" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="https://x.com/suresaveapp" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="X (Twitter)"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a 
                  href="https://linkedin.com/company/suresave" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-muted-foreground hover:text-primary transition-colors">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Download App</h4>
              <div className="space-y-3">
                <a 
                  href="#" 
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.523 15.341c-.057-.041-1.364-.706-2.398-1.384-.23-.15-.423-.305-.423-.305s-1.062 1.06-1.348 1.348c-.081.081-.185.143-.302.143-.077 0-.154-.019-.231-.057l-.077-.038c-.346-.173-2.137-.974-3.741-2.578-1.604-1.604-2.405-3.395-2.578-3.741l-.038-.077c-.038-.077-.057-.154-.057-.231 0-.116.062-.221.143-.302.287-.287 1.348-1.348 1.348-1.348s-.154-.193-.305-.423c-.678-1.034-1.343-2.341-1.384-2.398-.077-.116-.193-.173-.328-.173-.077 0-.154.019-.231.057-.308.154-2.887 1.425-2.887 3.472 0 .347.115.913.769 1.876.769 1.14 1.925 2.413 3.472 3.959 1.547 1.547 2.819 2.703 3.959 3.472.963.654 1.529.769 1.876.769 2.047 0 3.318-2.579 3.472-2.887.038-.077.057-.154.057-.231 0-.135-.057-.251-.173-.328zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"/>
                  </svg>
                  <span>Play Store</span>
                </a>
                <a 
                  href="#" 
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <span>App Store</span>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Language</h4>
              <ul className="space-y-2">
                <li className="text-muted-foreground">🇬🇧 English</li>
                <li className="text-muted-foreground">🇳🇬 Yoruba</li>
                <li className="text-muted-foreground">🇳🇬 Igbo</li>
                <li className="text-muted-foreground">🇳🇬 Hausa</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} SureSave. More than savings. Empowering your craft.</p>
          </div>
        </div>
      </footer>

      <UserGuideDialog open={isGuideOpen} onOpenChange={setIsGuideOpen} />
    </div>
  );
};

export default Index;
