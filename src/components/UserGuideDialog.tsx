import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2, Wallet, Languages, BarChart3, GraduationCap, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UserGuideDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const features = [
  {
    icon: Share2,
    title: "Save & Share Job on Social Media",
    description: "Showcase your completed work directly on social platforms and attract more clients effortlessly.",
  },
  {
    icon: Wallet,
    title: "Save Cash Directly to Savings Wallet",
    description: "Instantly transfer earnings from every job straight into your secure savings wallet.",
  },
  {
    icon: Languages,
    title: "Multilingual Support",
    description: "Use SureSave in Yoruba, Igbo, Hausa, or English - speak your language, grow your business.",
  },
  {
    icon: BarChart3,
    title: "Job Tracker (Earnings Log)",
    description: "Keep detailed records of all your projects, payments, and earnings in one organized place.",
  },
  {
    icon: GraduationCap,
    title: "Learning Hub",
    description: "Access financial literacy courses specifically designed for artisans and small business owners.",
  },
  {
    icon: Mic,
    title: "Voice Feedback",
    description: "Use voice commands and get audio feedback to interact with the app hands-free while you work.",
  },
];

export const UserGuideDialog = ({ open, onOpenChange }: UserGuideDialogProps) => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    onOpenChange(false);
    navigate("/auth");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader className="relative">
          <div className="absolute -top-2 right-0">
            <Button 
              onClick={handleSignUpClick}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 shadow-lg"
            >
              Sign Up
            </Button>
          </div>
          <DialogTitle className="text-3xl font-bold text-center mb-2 pr-24">
            Welcome to SureSave!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Discover the powerful features that will help you save smart and grow bold
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex gap-4 p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};
