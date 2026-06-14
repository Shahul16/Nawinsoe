import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useState } from "react";
import { Gift, Users, CheckCircle, Share2 } from "lucide-react";

export default function ReferAFriend() {
  const createInquiry = trpc.inquiries.create.useMutation();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    yourName: "", yourPhone: "", friendName: "", friendPhone: "", friendDestination: "",
  });
  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createInquiry.mutateAsync({
        name: form.yourName,
        phone: form.yourPhone,
        email: `${form.yourPhone}@referral.nawins`,
        subject: `Referral — Friend: ${form.friendName}`,
        message: `Referrer: ${form.yourName} (${form.yourPhone})\nFriend: ${form.friendName} (${form.friendPhone})\nDestination: ${form.friendDestination}`,
        lead_source: "Refer a Friend",
      });
      setSubmitted(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9ff]">
      <Navigation />

      <section className="py-20 bg-gradient-to-br from-[#030f2d] via-[#06226b] to-[#081b4e]">
        <div className="container text-center max-w-2xl mx-auto">
          <span className="inline-block rounded-full bg-[#C59D50]/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#C59D50] mb-5">Referral Programme</span>
          <h1 className="text-5xl font-bold text-white mb-4">Refer a Friend</h1>
          <p className="text-blue-100/85 text-lg">Know someone who wants to study abroad? Refer them to Nawins Education and help them achieve their dreams.</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 bg-white">
        <div className="container max-w-3xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Share2, title: "Share the Opportunity", desc: "Tell your friend about Nawins Education's free counseling and UK university guidance." },
              { icon: Users, title: "We Take Care of Them", desc: "Your friend gets a dedicated counselor, university shortlist, and full application support." },
              { icon: Gift, title: "You Both Benefit", desc: "Your friend gets expert guidance. You get our heartfelt thanks and referral recognition." },
            ].map(b => (
              <div key={b.title} className="text-center p-6 rounded-2xl bg-[#f7f9ff] border border-blue-100">
                <div className="w-12 h-12 rounded-full bg-[#040F23] flex items-center justify-center mx-auto mb-4">
                  <b.icon className="w-6 h-6 text-[#C59D50]" />
                </div>
                <h3 className="font-bold text-[#07173d] mb-2">{b.title}</h3>
                <p className="text-sm text-[#48608f]">{b.desc}</p>
              </div>
            ))}
          </div>

          {submitted ? (
            <div className="text-center py-10 rounded-2xl bg-green-50 border border-green-200">
              <CheckCircle className="w-14 h-14 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-[#07173d] mb-2">Referral Submitted!</h2>
              <p className="text-[#48608f]">Our team will reach out to <strong>{form.friendName}</strong> within 24 hours. Thank you, {form.yourName}!</p>
            </div>
          ) : (
            <div className="rounded-2xl bg-white border border-blue-100 p-8 shadow-sm">
              <h2 className="text-xl font-bold text-[#07173d] mb-6">Submit a Referral</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <p className="text-xs font-bold text-[#C59D50] uppercase tracking-widest mb-3">Your Details</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-[#07173d] mb-1.5 block">Your Name *</label>
                      <Input value={form.yourName} onChange={e => set("yourName", e.target.value)} placeholder="Your name" required className="rounded-xl h-11" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#07173d] mb-1.5 block">Your Phone *</label>
                      <Input type="tel" value={form.yourPhone} onChange={e => set("yourPhone", e.target.value)} placeholder="+91 XXXXXXXXXX" required className="rounded-xl h-11" />
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#C59D50] uppercase tracking-widest mb-3">Friend's Details</p>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-[#07173d] mb-1.5 block">Friend's Name *</label>
                        <Input value={form.friendName} onChange={e => set("friendName", e.target.value)} placeholder="Friend's name" required className="rounded-xl h-11" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[#07173d] mb-1.5 block">Friend's Phone *</label>
                        <Input type="tel" value={form.friendPhone} onChange={e => set("friendPhone", e.target.value)} placeholder="+91 XXXXXXXXXX" required className="rounded-xl h-11" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#07173d] mb-1.5 block">Preferred Study Destination</label>
                      <Input value={form.friendDestination} onChange={e => set("friendDestination", e.target.value)} placeholder="e.g. United Kingdom" className="rounded-xl h-11" />
                    </div>
                  </div>
                </div>
                <Button type="submit" disabled={createInquiry.isPending}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-[#C59D50] to-[#B78D42] text-[#040F23] font-bold text-sm">
                  {createInquiry.isPending ? "Submitting..." : "Submit Referral"}
                </Button>
                <p className="text-xs text-center text-[#94a3b8]">Your friend's details will be treated with complete privacy and used only to contact them about Nawins Education services.</p>
              </form>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
