import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <div className="group rounded-2xl bg-card p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
      <div className="mb-4 inline-flex rounded-xl bg-secondary/10 p-3 transition-all duration-300 group-hover:bg-secondary group-hover:scale-110">
        <Icon className="h-6 w-6 text-secondary transition-colors group-hover:text-secondary-foreground" />
      </div>
      <h3 className="mb-2 text-xl font-bold text-card-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};
