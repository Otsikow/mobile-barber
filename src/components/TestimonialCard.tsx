import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  text: string;
  rating: number;
}

const TestimonialCard = ({ name, text, rating }: TestimonialCardProps) => {
  return (
    <div className="p-5 rounded-xl bg-card border border-border">
      <div className="flex gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-primary fill-primary" : "text-muted"
            }`}
          />
        ))}
      </div>
      <p className="text-sm text-muted-foreground mb-3 line-clamp-3">"{text}"</p>
      <p className="text-sm font-semibold text-foreground">{name}</p>
    </div>
  );
};

export default TestimonialCard;
