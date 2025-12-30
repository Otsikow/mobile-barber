import { Link } from "react-router-dom";
import { MapPin, Clock, Star, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import ServiceCard from "@/components/ServiceCard";
import FeatureBadge from "@/components/FeatureBadge";
import TestimonialCard from "@/components/TestimonialCard";

import heroImage from "@/assets/hero-barber.jpg";
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
    title: "Beard Trim",
    description: "Shape and trim your beard.",
    price: "From £15",
    image: beardImage,
    popular: false,
  },
  {
    title: "Hair + Beard",
    description: "Complete grooming package.",
    price: "From £30",
    image: fullGroomingImage,
    popular: true,
  },
  {
    title: "Kids Cut",
    description: "Stylish cuts for little ones.",
    price: "From £15",
    image: kidsImage,
    popular: false,
  },
];

const testimonials = [
  {
    name: "Ethan",
    text: "Great service, on time and professional. Best fade I've ever had!",
    rating: 5,
  },
  {
    name: "Liam",
    text: "Always a perfect fade, highly recommend. He came to my house!",
    rating: 5,
  },
  {
    name: "Noah",
    text: "Convenient and top notch work. Will definitely book again.",
    rating: 5,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Augustine Mobile Barber"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        </div>

        <div className="relative z-10 container pt-20 pb-12">
          <div className="max-w-lg mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4 leading-tight">
              Augustine – Mobile Barber for{" "}
              <span className="text-gradient-gold">Redcar & Middlesbrough</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Premium fades and grooming with zero hassle. Visit my base in Redcar or book a home visit.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book">
                <Button size="lg" className="w-full sm:w-auto">
                  Book Appointment
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
                asChild
              >
                <a href="https://wa.me/447990427539" target="_blank" rel="noreferrer">
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Badges */}
      <section className="container py-8">
        <div className="flex flex-wrap gap-3 justify-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <FeatureBadge>
            <Zap className="w-4 h-4 mr-2 text-primary" />
            Fast Booking
          </FeatureBadge>
          <FeatureBadge>
            <MapPin className="w-4 h-4 mr-2 text-primary" />
            Base in Redcar (no walk-ins)
          </FeatureBadge>
          <FeatureBadge>
            <Clock className="w-4 h-4 mr-2 text-primary" />
            Reliable Reminders
          </FeatureBadge>
        </div>
      </section>

      {/* Services Section */}
      <section className="container py-8">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
          Services
        </h2>
        <div className="grid gap-4">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link to="/book">
                <ServiceCard {...service} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container py-8">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
          How it works
        </h2>
        <div className="space-y-6">
          {[
            { step: "1", title: "Choose service", desc: "Pick your preferred cut" },
            { step: "2", title: "Pick time", desc: "Select date and time slot" },
            { step: "3", title: "Get directions / we travel", desc: "Either option works" },
          ].map((item, index) => (
            <div
              key={item.step}
              className="flex items-start gap-4 animate-fade-in"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                {item.step}
              </div>
              <div className="flex-1 pt-1">
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
              {index < 2 && (
                <div className="absolute left-[1.2rem] mt-10 w-0.5 h-8 bg-border" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container py-8">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
          Testimonials
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="animate-slide-up"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>
      </section>

      {/* Rating */}
      <section className="container py-8">
        <div className="flex items-center gap-6 p-6 rounded-xl bg-card border border-border">
          <div>
            <div className="text-4xl font-heading font-bold text-foreground">4.8</div>
            <div className="flex gap-1 my-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i <= 4 ? "text-primary fill-primary" : "text-primary/50 fill-primary/50"}`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">120 reviews</p>
          </div>
          <div className="flex-1 space-y-2">
            {[
              { stars: 5, percent: 70 },
              { stars: 4, percent: 20 },
              { stars: 3, percent: 5 },
              { stars: 2, percent: 3 },
              { stars: 1, percent: 2 },
            ].map((row) => (
              <div key={row.stars} className="flex items-center gap-2 text-sm">
                <span className="w-3 text-muted-foreground">{row.stars}</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${row.percent}%` }}
                  />
                </div>
                <span className="w-8 text-right text-muted-foreground">{row.percent}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Service Area */}
      <section className="container py-8">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
          Contact & Service Area
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
            <div>
              <p className="text-sm text-muted-foreground">Call or WhatsApp</p>
              <p className="text-lg font-semibold text-foreground">07990 427539</p>
            </div>
            <div className="ml-auto flex gap-2">
              <Button size="sm" asChild>
                <a href="https://wa.me/447990427539" target="_blank" rel="noreferrer">
                  Message on WhatsApp
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="tel:+447990427539">Call</a>
              </Button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-card border border-border">
            <p className="text-foreground font-medium">Base location (not a walk-in shop)</p>
            <p className="text-muted-foreground text-sm">54 Blakey Close, Redcar TS10 4PB</p>
          </div>

          <div className="aspect-video rounded-xl overflow-hidden bg-muted">
            <iframe
              title="Augustine Barber Base"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(
                "54 Blakey Close, Redcar TS10 4PB, United Kingdom"
              )}`}
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={() =>
              window.open(
                "https://www.google.com/maps/dir/?api=1&destination=54%20Blakey%20Close%2C%20Redcar%20TS10%204PB",
                "_blank"
              )
            }
          >
            Get Directions
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-8 pb-12">
        <Link to="/book" className="block">
          <Button size="lg" className="w-full group">
            Book Now
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </section>

      <BottomNav />
    </div>
  );
};

export default Index;
