interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

export const StepCard = ({ number, title, description }: StepCardProps) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-2xl font-bold text-secondary-foreground shadow-lg">
        {number}
      </div>
      <h3 className="mb-2 text-xl font-bold text-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};
