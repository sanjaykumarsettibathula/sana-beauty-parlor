import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");

  const handleSendEnquiry = (e: React.FormEvent) => {
    e.preventDefault();

    const fullName = `${firstName} ${lastName}`.trim();
    const enquiryDetails = [
      "Hello Sana Beauty Parlor, I would like to make an enquiry:",
      fullName ? `Name: ${fullName}` : null,
      mobile.trim() ? `Mobile: ${mobile.trim()}` : null,
      message.trim()
        ? `Message: ${message.trim()}`
        : "Message: Hello, I am interested in your services.",
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappUrl = `https://wa.me/919676642709?text=${encodeURIComponent(enquiryDetails)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-sans font-bold mb-6"
          >
            Get In <span className="italic font-serif text-secondary">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            We invite you to reach out for private consultations, special event bookings, or general inquiries.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold border-b border-border pb-4">Contact Information</h3>
              <div className="flex items-start gap-4">
                <MapPin className="text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white">Our Location</h4>
                  <p className="text-muted-foreground">Main Road, Tatipaka 533249</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white">Phone / WhatsApp</h4>
                  <p className="text-muted-foreground">
                    <a href="tel:9676642709" className="hover:text-primary transition-colors">
                      +91 9676642709
                    </a>
                  </p>
                  <a
                    href="https://wa.me/919676642709"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#25D366] hover:underline mt-1 font-medium"
                  >
                    <WhatsAppIcon size={14} /> Connect on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-bold border-b border-border pb-4">Business Hours</h3>
              <div className="flex items-start gap-4">
                <Clock className="text-secondary shrink-0 mt-1" />
                <div className="w-full">
                  <div className="flex justify-between border-b border-border/50 pb-2 mb-2 text-muted-foreground">
                    <span>Monday - Saturday</span>
                    <span className="text-white">10:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Sunday</span>
                    <span className="text-white">10:00 AM - 7:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card/50 backdrop-blur-sm border border-border p-8 rounded-3xl">
            <h3 className="text-2xl font-bold mb-6">Send an Enquiry</h3>
            <form className="space-y-6" onSubmit={handleSendEnquiry}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors text-white"
                    placeholder="Jane"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors text-white"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Mobile Number</label>
                <input
                  type="tel"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors text-white"
                  placeholder="Enter your mobile number"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Message</label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors text-white resize-none"
                  placeholder="How can we assist you?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-primary/90 transition-all hover:shadow-[0_0_20px_rgba(255,79,139,0.3)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <WhatsAppIcon size={20} />
                <span>Send Enquiry</span>
              </button>
              <p className="text-xs text-center text-muted-foreground">
                Clicking &quot;Send Enquiry&quot; will open WhatsApp with your details pre-filled.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
