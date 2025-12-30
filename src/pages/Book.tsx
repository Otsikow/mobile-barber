import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, MapPin, Calendar, User, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import haircutImage from "@/assets/haircut-service.jpg";
import beardImage from "@/assets/beard-service.jpg";
import kidsImage from "@/assets/kids-cut.jpg";
import fullGroomingImage from "@/assets/full-grooming.jpg";

const BARBER_ADDRESS = "54 Blakey Close, Redcar TS10 4PB, United Kingdom";
const WHATSAPP_LINK = "https://wa.me/447990427539";
const PHONE_NUMBER = "+447990427539";

const services = [
  { id: "haircut", title: "Haircut", price: 20, image: haircutImage, description: "Precision cut and style." },
  { id: "beard", title: "Beard Trim", price: 15, image: beardImage, description: "Shape and trim your beard." },
  { id: "combo", title: "Hair + Beard", price: 30, image: fullGroomingImage, description: "Complete grooming package." },
  { id: "kids", title: "Kids Cut", price: 15, image: kidsImage, description: "Stylish cuts for little ones." },
];

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
];

const TRAVEL_FEE = 5;

const Book = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [appointmentType, setAppointmentType] = useState<"barber-comes" | "i-go" | null>(null);
  const [clientAddress, setClientAddress] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [clientDetails, setClientDetails] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const totalSteps = 6;
  const service = services.find((s) => s.id === selectedService);

  const getTotalPrice = () => {
    if (!service) return 0;
    return appointmentType === "barber-comes" ? service.price + TRAVEL_FEE : service.price;
  };

  const formatCalendarDate = (date: Date) => date.toISOString().replace(/[-:]|\.\d{3}/g, "");

  const getAppointmentDateTime = () => {
    if (!selectedDate || !selectedTime) return null;

    const [timePart, meridiem] = selectedTime.split(" ");
    const [hoursString, minutesString] = timePart.split(":");

    let hours = parseInt(hoursString, 10);
    const minutes = parseInt(minutesString, 10);

    if (meridiem === "PM" && hours !== 12) hours += 12;
    if (meridiem === "AM" && hours === 12) hours = 0;

    const date = new Date(selectedDate);
    date.setHours(hours, minutes, 0, 0);

    return date;
  };

  const handleAddToGoogleCalendar = () => {
    if (!service || !appointmentType) return;

    const startDate = getAppointmentDateTime();
    if (!startDate) return;

    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
    const location = appointmentType === "i-go" ? BARBER_ADDRESS : clientAddress;

    const description = [
      `Service: ${service.title}`,
      `Price: £${getTotalPrice()}`,
      appointmentType === "i-go" ? "Visit to barber base" : "Mobile visit",
    ].join("\n");

    const calendarUrl = new URL("https://calendar.google.com/calendar/render");
    calendarUrl.searchParams.set("action", "TEMPLATE");
    calendarUrl.searchParams.set("text", `${service.title} haircut appointment`);
    calendarUrl.searchParams.set("dates", `${formatCalendarDate(startDate)}/${formatCalendarDate(endDate)}`);
    calendarUrl.searchParams.set("details", description);
    calendarUrl.searchParams.set("location", location);

    window.open(calendarUrl.toString(), "_blank");
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return !!selectedService;
      case 2:
        return !!appointmentType;
      case 3:
        return appointmentType === "i-go" || clientAddress.trim().length > 5;
      case 4:
        return !!selectedDate && !!selectedTime;
      case 5:
        return clientDetails.name && clientDetails.phone && clientDetails.email;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleConfirm = () => {
    toast.success("Booking confirmed! Check your email for details.");
    setStep(6);
  };

  const openMaps = () => {
    const address = appointmentType === "i-go" ? BARBER_ADDRESS : clientAddress;
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, "_blank");
  };

  // Generate next 14 days for date selection
  const getDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        value: date.toISOString().split("T")[0],
        label: date.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }),
      });
    }
    return dates;
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />

      <main className="container pt-20 pb-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          {step > 1 && step < 6 ? (
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
          ) : step === 1 ? (
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
          ) : null}
          <h1 className="text-2xl font-heading font-bold text-foreground">
            {step === 6 ? "Booking Confirmation" : "Book"}
          </h1>
        </div>

        {/* Progress indicator */}
        {step < 6 && (
          <div className="flex gap-2 mb-8">
            {Array.from({ length: totalSteps - 1 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "flex-1 h-1 rounded-full transition-colors",
                  i < step ? "bg-primary" : "bg-muted"
                )}
              />
            ))}
          </div>
        )}

        {/* Step 1: Select Service */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-heading font-semibold text-foreground mb-6">
              Select Service
            </h2>
            <div className="space-y-4">
              {services.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedService(s.id)}
                  className={cn(
                    "w-full flex items-center gap-4 p-4 rounded-xl bg-card border transition-all text-left",
                    selectedService === s.id
                      ? "border-primary ring-1 ring-primary"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{s.title}</h3>
                    <p className="text-sm text-muted-foreground">{s.description}</p>
                  </div>
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Appointment Type */}
        {step === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-heading font-semibold text-foreground mb-6">
              Where would you like your appointment?
            </h2>
            <div className="space-y-4">
              <button
                onClick={() => setAppointmentType("barber-comes")}
                className={cn(
                  "w-full p-6 rounded-xl bg-card border transition-all text-left",
                  appointmentType === "barber-comes"
                    ? "border-primary ring-1 ring-primary"
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className="flex items-center gap-3">
                  <Navigation className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-semibold text-foreground">Barber comes to me</h3>
                    <p className="text-sm text-muted-foreground">+£{TRAVEL_FEE} travel fee (home visit)</p>
                  </div>
                </div>
              </button>
              <button
                onClick={() => setAppointmentType("i-go")}
                className={cn(
                  "w-full p-6 rounded-xl bg-card border transition-all text-left",
                  appointmentType === "i-go"
                    ? "border-primary ring-1 ring-primary"
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-semibold text-foreground">I go to Augustine's base</h3>
                    <p className="text-sm text-muted-foreground">54 Blakey Close, Redcar (appointment only)</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Location */}
        {step === 3 && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-heading font-semibold text-foreground mb-6">
              <MapPin className="w-5 h-5 inline mr-2 text-primary" />
              Location
            </h2>

            {appointmentType === "i-go" ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-card border border-border">
                  <p className="text-foreground font-medium">{BARBER_ADDRESS}</p>
                  <p className="text-sm text-muted-foreground mt-1">Base location for appointments only (no walk-ins).</p>
                </div>
                <div className="aspect-video rounded-xl overflow-hidden bg-muted">
                  <iframe
                    title="Barber Location"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(BARBER_ADDRESS)}`}
                    className="w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <Button variant="outline" onClick={openMaps} className="w-full">
                  <Navigation className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">Your address</Label>
                  <Input
                    id="address"
                    placeholder="Enter your full address"
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                    className="mt-2"
                  />
                </div>
                {clientAddress.length > 5 && (
                  <div className="aspect-video rounded-xl overflow-hidden bg-muted">
                    <iframe
                      title="Your Location"
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(clientAddress)}`}
                      className="w-full h-full border-0"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Step 4: Date & Time */}
        {step === 4 && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-heading font-semibold text-foreground mb-6">
              <Calendar className="w-5 h-5 inline mr-2 text-primary" />
              Select Date & Time
            </h2>

            <div className="mb-6">
              <Label className="mb-3 block">Select a date</Label>
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
                {getDates().map((date) => (
                  <button
                    key={date.value}
                    onClick={() => setSelectedDate(date.value)}
                    className={cn(
                      "flex-shrink-0 px-4 py-3 rounded-lg border text-sm transition-all",
                      selectedDate === date.value
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card border-border hover:border-primary/50"
                    )}
                  >
                    {date.label}
                  </button>
                ))}
              </div>
            </div>

            {selectedDate && (
              <div>
                <Label className="mb-3 block">Select a time</Label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={cn(
                        "px-3 py-2 rounded-lg border text-sm transition-all",
                        selectedTime === time
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card border-border hover:border-primary/50"
                      )}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 5: Client Details */}
        {step === 5 && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-heading font-semibold text-foreground mb-6">
              <User className="w-5 h-5 inline mr-2 text-primary" />
              Your Details
            </h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={clientDetails.name}
                  onChange={(e) => setClientDetails({ ...clientDetails, name: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="07XXX XXXXXX"
                  value={clientDetails.phone}
                  onChange={(e) => setClientDetails({ ...clientDetails, phone: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={clientDetails.email}
                  onChange={(e) => setClientDetails({ ...clientDetails, email: e.target.value })}
                  className="mt-2"
                />
              </div>

              {/* Price Summary */}
              <div className="mt-8 p-4 rounded-xl bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-3">Price Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{service?.title}</span>
                    <span className="text-foreground">£{service?.price}</span>
                  </div>
                  {appointmentType === "barber-comes" && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Travel fee</span>
                      <span className="text-foreground">£{TRAVEL_FEE}</span>
                    </div>
                  )}
                  <div className="border-t border-border pt-2 mt-2 flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-primary">£{getTotalPrice()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Confirmation */}
        {step === 6 && (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-foreground">
                Appointment confirmed
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-card border border-border mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden">
                  <img src={service?.image} alt={service?.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm text-primary">
                    {appointmentType === "i-go" ? "Barber base" : "Mobile visit"}
                  </p>
                  <h3 className="font-semibold text-foreground">{service?.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedDate).toLocaleDateString("en-GB", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })}{" "}
                    · {selectedTime} · £{getTotalPrice()}
                  </p>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Location
                </h4>
                <p className="text-muted-foreground text-sm mb-4">
                  {appointmentType === "i-go" ? BARBER_ADDRESS : clientAddress}
                </p>

                <div className="aspect-video rounded-xl overflow-hidden bg-muted mb-4">
                  <iframe
                    title="Appointment Location"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(
                      appointmentType === "i-go" ? BARBER_ADDRESS : clientAddress
                    )}`}
                    className="w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={openMaps} className="flex-1">
                    Open in Maps
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={handleAddToGoogleCalendar}>
                    Add to Calendar
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-card border border-border mb-6">
              <h4 className="font-semibold text-foreground mb-2">What happens next</h4>
              <p className="text-sm text-muted-foreground">
                You'll receive WhatsApp or SMS reminders 24 hours before your appointment and an optional same-day nudge.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-card border border-border">
              <h4 className="font-semibold text-foreground mb-2">Need help?</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Message Augustine directly if you need to tweak your booking.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="dark" size="sm" asChild>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
                    WhatsApp
                  </a>
                </Button>
                <Button variant="dark" size="sm" asChild>
                  <a href={`tel:${PHONE_NUMBER}`}>Call</a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=54%20Blakey%20Close%2C%20Redcar%20TS10%204PB"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Directions
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        {step < 6 && (
          <div className="fixed bottom-20 left-0 right-0 p-4 bg-background border-t border-border">
            <div className="container flex gap-4">
              {step > 1 && (
                <Button variant="dark" onClick={handleBack} className="flex-1">
                  Cancel
                </Button>
              )}
              <Button
                onClick={step === 5 ? handleConfirm : handleNext}
                disabled={!canProceed()}
                className="flex-1"
              >
                {step === 5 ? "Confirm Booking" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Book;
