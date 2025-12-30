import { Link } from "react-router-dom";
import { ArrowLeft, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

const BARBER_ADDRESS = "54 Blakey Close, Redcar TS10 4PB, United Kingdom";

const Contact = () => {
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
            Contact
          </h1>
        </div>

        <p className="text-muted-foreground mb-8">
          Get in touch with SwiftFade. We're here to help!
        </p>

        {/* Contact Cards */}
        <div className="space-y-4 mb-8">
          <a
            href="tel:07700900000"
            className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Phone</h3>
              <p className="text-muted-foreground">07700 900000</p>
            </div>
          </a>

          <a
            href="https://wa.me/447700900000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">WhatsApp</h3>
              <p className="text-muted-foreground">Quick responses</p>
            </div>
          </a>

          <a
            href="mailto:contact@swiftfade.co.uk"
            className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Email</h3>
              <p className="text-muted-foreground">contact@swiftfade.co.uk</p>
            </div>
          </a>
        </div>

        {/* Location */}
        <div className="mb-8">
          <h2 className="text-xl font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Our Location
          </h2>

          <div className="p-4 rounded-xl bg-card border border-border mb-4">
            <p className="text-foreground">{BARBER_ADDRESS}</p>
            <p className="text-sm text-muted-foreground mt-1">
              Come to us, or we come to you!
            </p>
          </div>

          <div className="aspect-video rounded-xl overflow-hidden bg-muted mb-4">
            <iframe
              title="SwiftFade Location"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(BARBER_ADDRESS)}`}
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
                `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(BARBER_ADDRESS)}`,
                "_blank"
              )
            }
          >
            Get Directions
          </Button>
        </div>

        {/* Service Area */}
        <div className="p-4 rounded-xl bg-card border border-border">
          <h3 className="font-semibold text-foreground mb-2">Service Area</h3>
          <p className="text-sm text-muted-foreground">
            We serve clients in <span className="text-primary">Middlesbrough</span> and{" "}
            <span className="text-primary">Redcar</span>. Travel fees may apply for mobile appointments.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8">
          <Link to="/book">
            <Button size="lg" className="w-full">
              Book Appointment
            </Button>
          </Link>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Contact;
