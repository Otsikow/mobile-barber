import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, CreditCard, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import haircutImage from "@/assets/haircut-service.jpg";
import beardImage from "@/assets/beard-service.jpg";
import kidsImage from "@/assets/kids-cut.jpg";
import fullGroomingImage from "@/assets/full-grooming.jpg";

const services = [
  {
    title: "Haircut",
    description: "Precision cut and style.",
    price: "From £20",
    image: haircutImage,
    popular: true,
  },
  {
    title: "Hair + Beard",
    description: "Complete grooming package.",
    price: "From £30",
    image: fullGroomingImage,
    popular: true,
  },
  {
    title: "Beard Trim",
    description: "Shape and trim your beard.",
    price: "From £15",
    image: beardImage,
  },
  {
    title: "Kids Cut",
    description: "Stylish cuts for the little ones.",
    price: "From £15",
    image: kidsImage,
  },
  {
    title: "Fade & Style",
    description: "Sharp fade with modern styling.",
    price: "From £22",
    image: haircutImage,
  },
  {
    title: "Barber comes to me",
    description: "Premium service at your location.",
    price: "+£5 travel fee",
    image: fullGroomingImage,
    isTravel: true,
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />

      <main className="container pt-20 pb-8">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Services & Prices
          </h1>
        </div>

        <p className="text-muted-foreground mb-8">
          Mobile-first barbering by Augustine. Choose a service, then pick whether you come to the Redcar base or I travel to you in Middlesbrough & Redcar.
        </p>

        <div className="space-y-4">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border animate-fade-in group hover:border-primary/50 transition-colors"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex-1">
                {service.popular && (
                  <span className="text-xs text-primary font-medium">
                    Most booked
                  </span>
                )}
                <h3 className="font-heading font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
                <Link to="/book">
                  <Button variant="dark" size="sm" className="mt-2">
                    Book this
                  </Button>
                </Link>
              </div>
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Travel Note */}
        <p className="text-sm text-muted-foreground mt-6 p-4 bg-card rounded-lg border border-border">
          <span className="text-primary">Note:</span> £5 travel fee applies when you book a home visit. The base at 54 Blakey Close (TS10 4PB) is for appointments only — no walk-ins.
        </p>

        {/* FAQ Accordion */}
        <div className="mt-8">
          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem value="travel" className="border border-border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Travel Area
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We serve clients within Middlesbrough and Redcar. Contact us for
                areas outside this zone.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cancel" className="border border-border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-primary" />
                  Cancellation Policy
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Cancel at least 24 hours in advance for a full refund. Late
                cancellations may incur a fee.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="payment" className="border border-border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-primary" />
                  Payment Methods
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We accept cash, card, and contactless payments. Online payment
                coming soon!
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Services;
