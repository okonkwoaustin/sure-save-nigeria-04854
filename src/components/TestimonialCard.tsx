interface TestimonialCardProps {
  image: string;
  name: string;
  role: string;
  quote: string;
}

export const TestimonialCard = ({ image, name, role, quote }: TestimonialCardProps) => {
  return (
    <div className="rounded-2xl bg-card p-6 shadow-md transition-all duration-300 hover:shadow-xl">
      <div className="mb-4 flex items-center gap-4">
        <img
          src={image}
          alt={name}
          className="h-16 w-16 rounded-full object-cover ring-4 ring-secondary/20"
        />
        <div>
          <h4 className="font-bold text-card-foreground">{name}</h4>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
      <p className="italic text-muted-foreground">"{quote}"</p>
    </div>
  );
};
