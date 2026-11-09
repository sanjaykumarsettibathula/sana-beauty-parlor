import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { servicesData } from "@/data/services";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ChevronRight, ArrowLeft, Check, Calendar as CalendarIcon, Clock, User, Phone, Sparkles, AlertCircle } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function Booking() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [customTime, setCustomTime] = useState("");
  const [timeWarning, setTimeWarning] = useState<string | null>(null);

  const timeSlots = ["10:00 AM", "11:30 AM", "01:00 PM", "02:30 PM", "04:00 PM", "05:30 PM"];

  // Read service from query params if available
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get("service");
    if (serviceParam && servicesData.some((s) => s.id === serviceParam)) {
      setSelectedService(serviceParam);
    }
  }, []);

  const handleNext = () => setStep((s) => Math.min(s + 1, 4));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const effectiveTime = customTime.trim() || selectedTime;

  // Validation rules: All fields in Step 2 are strictly required
  const isStep2Valid =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    mobile.trim().replace(/\D/g, "").length >= 10;

  const isStepValid = () => {
    if (step === 1) return !!selectedService;
    if (step === 2) return isStep2Valid;
    if (step === 3) return !!selectedDate;
    if (step === 4) return !!effectiveTime && isStep2Valid;
    return true;
  };

  const currentService = servicesData.find((s) => s.id === selectedService);

  const handleConfirmClick = () => {
    if (!effectiveTime) {
      setTimeWarning("Please select an available time slot or enter your preferred custom timing!");
      return;
    }

    if (!isStep2Valid) {
      setTimeWarning("Please provide your full name and 10-digit mobile number in Step 2!");
      return;
    }

    setTimeWarning(null);

    const fullName = `${firstName} ${lastName}`.trim();
    const timing = effectiveTime;

    const bookingLines = [
      "Hello Sana Beauty Parlor, I would like to book an appointment:",
      currentService ? `📋 *Service:* ${currentService.name} (₹${currentService.price.toLocaleString("en-IN")})` : null,
      selectedDate ? `📅 *Date:* ${format(selectedDate, "EEEE, MMMM d, yyyy")}` : null,
      `⏰ *Time:* ${timing}`,
      fullName ? `👤 *Name:* ${fullName}` : null,
      mobile.trim() ? `📱 *Mobile:* ${mobile.trim()}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappUrl = `https://wa.me/919676642709?text=${encodeURIComponent(bookingLines)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="pt-28 pb-20 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold mb-3">
            Book an <span className="italic font-serif text-primary">Appointment</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto text-xs sm:text-sm">
            Reserve your session with Sana Beauty Parlor. Fast confirmation directly via WhatsApp.
          </p>
        </div>

        {/* 4-Step Progress Bar */}
        <div className="mb-10 max-w-2xl mx-auto">
          <div className="grid grid-cols-4 gap-2 mb-2">
            {[
              { num: 1, label: "Service" },
              { num: 2, label: "Your Info" },
              { num: 3, label: "Date" },
              { num: 4, label: "Timing" },
            ].map((s) => (
              <div
                key={s.num}
                className={`text-xs sm:text-sm font-medium text-center transition-colors ${
                  s.num <= step ? "text-primary font-bold" : "text-muted-foreground"
                }`}
              >
                <span className="hidden sm:inline">Step </span>{s.num}: {s.label}
              </div>
            ))}
          </div>
          <div className="h-2 bg-card rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-card/50 backdrop-blur-xl border border-border rounded-3xl p-5 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {/* STEP 1: Select a Service */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center md:text-left mb-6">
                  <h2 className="text-2xl font-bold mb-1">Select a Service</h2>
                  <p className="text-muted-foreground text-sm">Choose the treatment you wish to reserve.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {servicesData.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 ${
                        selectedService === service.id
                          ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(255,79,139,0.25)] ring-2 ring-primary/40"
                          : "border-border hover:border-primary/50 bg-background/50 hover:bg-background/80"
                      }`}
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-border/50">
                        <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white truncate">{service.name}</h4>
                        <p className="text-sm text-primary font-semibold mt-0.5">
                          ₹{service.price.toLocaleString("en-IN")}{" "}
                          <span className="text-muted-foreground font-normal">• {service.duration} min</span>
                        </p>
                      </div>
                      {selectedService === service.id && (
                        <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                          <Check size={14} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2: Contact Details (All fields strictly required) */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 max-w-xl mx-auto"
              >
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-1">Your Contact Details</h2>
                  <p className="text-muted-foreground text-sm">
                    Please provide your contact information to proceed. All fields are required.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <User size={14} className="text-primary" /> First Name
                        </span>
                        <span className="text-xs text-primary font-semibold">* Required</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="e.g. Priya"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm sm:text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white flex items-center justify-between">
                        <span>Last Name</span>
                        <span className="text-xs text-primary font-semibold">* Required</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="e.g. Sharma"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Phone size={14} className="text-primary" /> Mobile Number
                      </span>
                      <span className="text-xs text-primary font-semibold">* 10 Digits Required</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={mobile}
                      maxLength={15}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm sm:text-base"
                    />
                    <p className="text-xs text-muted-foreground">
                      We will use this phone number to send your WhatsApp booking confirmation.
                    </p>
                  </div>

                  {!isStep2Valid && (
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-xs text-primary/90 flex items-center gap-2 mt-4">
                      <AlertCircle size={16} className="shrink-0" />
                      <span>Please enter your First Name, Last Name, and 10-digit Mobile Number to continue.</span>
                    </div>
                  )}

                  {currentService && (
                    <div className="p-4 rounded-2xl bg-background/50 border border-border flex items-center justify-between mt-4">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Selected Service</p>
                        <p className="font-bold text-white text-sm sm:text-base">{currentService.name}</p>
                      </div>
                      <p className="text-base sm:text-lg font-bold text-primary">
                        ₹{currentService.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* STEP 3: Select Date (Spacious, well-proportioned calendar) */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-1">Select an Appointment Date</h2>
                  <p className="text-muted-foreground text-sm">
                    Pick your preferred day for your visit to Sana Beauty Parlor.
                  </p>
                </div>

                {/* Calendar container with fixed width and ample space */}
                <div className="w-full max-w-lg mx-auto bg-background/80 border border-border rounded-3xl p-4 sm:p-6 shadow-2xl">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date < today;
                    }}
                  />
                </div>

                {selectedDate && (
                  <div className="text-center">
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/15 border border-primary/40 text-primary font-semibold text-sm shadow-sm">
                      <CalendarIcon size={16} /> Selected Date: {format(selectedDate, "EEEE, MMMM d, yyyy")}
                    </span>
                  </div>
                )}
              </motion.div>
            )}

            {/* STEP 4: Select Timing & Confirm (Single Confirm Button + Friendly Popup) */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 max-w-xl mx-auto"
              >
                <div className="text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-1">Select Your Preferred Timing</h2>
                  <p className="text-muted-foreground text-sm">
                    Choose an available time slot or enter your custom timing preference below.
                  </p>
                </div>

                {/* Preset Time Slots */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-white flex items-center gap-2">
                    <Clock size={16} className="text-primary" /> Available Time Slots
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {timeSlots.map((time) => {
                      const isSelected = selectedTime === time && !customTime;
                      return (
                        <button
                          type="button"
                          key={time}
                          onClick={() => {
                            setSelectedTime(time);
                            setCustomTime("");
                            setTimeWarning(null);
                          }}
                          className={`p-3.5 text-center rounded-xl border font-semibold text-sm transition-all cursor-pointer ${
                            isSelected
                              ? "border-primary bg-primary text-white shadow-[0_0_15px_rgba(255,79,139,0.4)] scale-102"
                              : "border-border bg-background/60 hover:border-primary/50 text-muted-foreground hover:text-white"
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Timing Input Field */}
                <div className="space-y-2 pt-1">
                  <label className="text-sm font-semibold text-white flex items-center gap-2">
                    <Sparkles size={16} className="text-secondary" /> Or Enter Custom Timing Preference
                  </label>
                  <input
                    type="text"
                    value={customTime}
                    onChange={(e) => {
                      setCustomTime(e.target.value);
                      setSelectedTime(e.target.value);
                      setTimeWarning(null);
                    }}
                    placeholder="e.g. 11:15 AM, 4:00 PM, or Evening"
                    className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-white placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-colors text-sm sm:text-base"
                  />
                  <p className="text-xs text-muted-foreground">
                    Parlor timing is 10:00 AM to 7:00 PM. Feel free to specify any convenient time.
                  </p>
                </div>

                {/* Booking Summary Box */}
                <div className="bg-background/80 border border-border rounded-2xl p-5 space-y-2.5 shadow-md">
                  <h3 className="font-bold text-base border-b border-border pb-2.5 text-white">Booking Details</h3>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Service</span>
                    <span className="font-semibold text-white">{currentService?.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-semibold text-white">
                      {selectedDate ? format(selectedDate, "EEE, MMM d, yyyy") : "Not selected"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Timing</span>
                    <span className={`font-semibold ${effectiveTime ? "text-primary" : "text-amber-400"}`}>
                      {effectiveTime || "Please select timing"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Client</span>
                    <span className="font-semibold text-white">
                      {firstName} {lastName} ({mobile})
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2.5 mt-1 text-base">
                    <span className="text-muted-foreground font-medium">Estimated Price</span>
                    <span className="font-bold text-primary text-xl">
                      ₹{currentService?.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Friendly Pop-up / Warning Alert when user clicks without picking time */}
                <AnimatePresence>
                  {timeWarning && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="p-3.5 rounded-2xl bg-primary/15 border-2 border-primary/50 text-white text-sm text-center font-medium flex items-center justify-center gap-2 shadow-xl"
                    >
                      <AlertCircle size={18} className="text-primary shrink-0" />
                      <span>{timeWarning}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Single, Primary Confirm Booking Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleConfirmClick}
                    className={`w-full py-4 px-6 rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-3 transition-all cursor-pointer ${
                      effectiveTime
                        ? "bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-[0_0_25px_rgba(37,211,102,0.45)] hover:scale-[1.02]"
                        : "bg-[#25D366]/60 hover:bg-[#25D366]/80 text-white shadow-md"
                    }`}
                  >
                    <WhatsAppIcon size={22} />
                    <span>Confirm Booking via WhatsApp</span>
                  </button>
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    Clicking Confirm Booking will open WhatsApp with your appointment details pre-filled.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Bar at Bottom: ONLY Back & Next for Steps 1-3. Step 4 has NO duplicate button! */}
          <div className="flex justify-between items-center mt-10 pt-6 border-t border-border">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-2 text-muted-foreground hover:text-white px-4 py-2 transition-colors cursor-pointer font-medium text-sm sm:text-base"
              >
                <ArrowLeft size={18} /> Back
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!isStepValid()}
                className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all cursor-pointer text-sm sm:text-base ${
                  isStepValid()
                    ? "bg-primary text-white hover:scale-105 shadow-[0_0_20px_rgba(255,79,139,0.3)]"
                    : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                }`}
              >
                Next <ChevronRight size={18} />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
