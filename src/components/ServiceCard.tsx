import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  image: string;
  popular?: boolean;
  onClick?: () => void;
}

const ServiceCard = ({
  title,
  description,
  price,
  image,
  popular = false,
  onClick,
}: ServiceCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-4 p-4 rounded-xl bg-card border border-border transition-all duration-300 cursor-pointer",
        "hover:border-primary/50 hover:shadow-gold",
        popular && "ring-1 ring-primary"
      )}
    >
      {popular && (
        <span className="absolute -top-3 left-4 px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
          Most booked
        </span>
      )}
      <div className="flex-1">
        <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
        <span className="text-primary font-semibold">{price}</span>
      </div>
      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
    </div>
  );
};

export default ServiceCard;
