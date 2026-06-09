import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { useState } from "react";
import { Briefcase, MapPin, Clock, Users, GraduationCap, Upload, Send, ExternalLink, BookOpen } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { jobs, LINKEDIN_JOBS_URL } from "@/lib/jobs";
import type { Job } from "@/lib/jobs";

export default function Careers() {
  const [, setLocation] = useLocation();
  const createApplication = trpc.jobApplications.create.useMutation();
  const [applicationData, setApplicationData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    experience: "",
    position: "",
    resumeFile: null as File | null,
    coverLetter: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setApplicationData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ];
      if (allowedTypes.includes(file.type)) {
        setApplicationData(prev => ({ ...prev, resumeFile: file }));
      } else {
        toast.error("Please upload PDF, DOC, or DOCX file only");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicationData.resumeFile) {
      toast.error("Please upload your resume");
      return;
    }

    try {
      await createApplication.mutateAsync({
        fullName: applicationData.fullName,
        email: applicationData.email,
        phone: applicationData.phone || undefined,
        city: applicationData.city || undefined,
        experience: applicationData.experience || undefined,
        position: applicationData.position,
        resumeFile: applicationData.resumeFile?.name,
        coverLetter: applicationData.coverLetter || undefined
      });

      setSubmitted(true);
      setApplicationData({
        fullName: "",
        email: "",
        phone: "",
        city: "",
        experience: "",
        position: "",
        resumeFile: null,
        coverLetter: ""
      });
      const fileInput = document.getElementById("resume-upload") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (error) {
      toast.error("Failed to submit application", {
        description: "Please try again or contact us directly.",
      });
    }
  };

  const experienceOptions = ["0-1 years", "1-3 years", "3-5 years", "5+ years"];

  return (
    <div className="min-h-screen bg-[#f7f9ff]">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-[#091f54] via-[#163886] to-[#1b47a8]">
        <div className="container">
          <div className="flex items-center gap-4 mb-6">
            <Briefcase className="w-12 h-12 text-white" />
            <h1 className="text-5xl font-bold text-white">Careers at Nawins</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-2xl">
            Join our team of education experts and help shape the futures of aspiring students
          </p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#07173d] mb-4">Why Work With Us?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center border border-blue-100/70 bg-white hover:shadow-lg transition-all">
              <Users className="w-12 h-12 text-[#17337d] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#07173d] mb-3">Growing Organization</h3>
              <p className="text-[#48608f]">Expanding across Tamil Nadu with multiple office locations</p>
            </Card>

            <Card className="p-8 text-center border border-blue-100/70 bg-white hover:shadow-lg transition-all">
              <GraduationCap className="w-12 h-12 text-[#17337d] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#07173d] mb-3">Meaningful Impact</h3>
              <p className="text-[#48608f]">Help students achieve their dreams of international education</p>
            </Card>

            <Card className="p-8 text-center border border-blue-100/70 bg-white hover:shadow-lg transition-all">
              <BookOpen className="w-12 h-12 text-[#17337d] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#07173d] mb-3">Professional Growth</h3>
              <p className="text-[#48608f]">Training opportunities and career advancement paths</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-20 bg-[#f7f9ff]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#07173d] mb-4">Current Openings</h2>
            <p className="text-[#48608f] mb-6">
              Our live job listings are posted on LinkedIn. Browse openings below or apply directly.
            </p>
            <a
              href={LINKEDIN_JOBS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#0077B5] px-6 py-3 text-sm font-semibold text-white hover:bg-[#005f8e] transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              View All Jobs on LinkedIn
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {jobs.map((job: Job) => (
              <Card key={job.id} className="p-8 border border-blue-100/70 bg-white hover:shadow-lg transition-all flex flex-col h-full">
                <h3 className="text-2xl font-bold text-[#07173d] mb-3">{job.title}</h3>
                
                <div className="flex flex-col gap-2 mb-4 text-sm text-[#48608f]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{job.type}</span>
                  </div>
                </div>

                <p className="text-[#48608f] mb-4 flex-1">{job.description}</p>

                <Button
                  className="w-full bg-gradient-to-r from-[#17337d] to-[#213a5b]"
                  onClick={() => {
                    setApplicationData(prev => ({ ...prev, position: job.title }));
                    document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Apply Now
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-20 bg-white">
        <div className="container max-w-3xl">
          <Card className="p-8 md:p-12 border border-blue-100/70 bg-white shadow-xl">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-[#07173d] mb-4">Thank You for Applying!</h2>
                <p className="text-[#48608f] mb-6 max-w-xl mx-auto">
                  Our recruitment team will review your application and contact you if your profile matches our requirements.
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  className="bg-gradient-to-r from-[#17337d] to-[#213a5b]"
                >
                  Apply for Another Position
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-[#07173d] mb-4">Application Form</h2>
                  <p className="text-[#48608f]">Fill in your details to apply for a position</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-semibold text-[#07173d] mb-2">Full Name *</label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={applicationData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="border-blue-100"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-[#07173d] mb-2">Email Address *</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={applicationData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="border-blue-100"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-[#07173d] mb-2">Phone Number</label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={applicationData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone"
                      className="border-blue-100"
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-semibold text-[#07173d] mb-2">City</label>
                    <Input
                      id="city"
                      name="city"
                      value={applicationData.city}
                      onChange={handleChange}
                      placeholder="Your current city"
                      className="border-blue-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="experience" className="block text-sm font-semibold text-[#07173d] mb-2">Years of Experience</label>
                    <select
                      id="experience"
                      name="experience"
                      value={applicationData.experience}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select experience</option>
                      {experienceOptions.map(exp => (
                        <option key={exp} value={exp}>{exp}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="position" className="block text-sm font-semibold text-[#07173d] mb-2">Position Applying For *</label>
                    <select
                      id="position"
                      name="position"
                      value={applicationData.position}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select position</option>
                      {jobs.map(job => (
                        <option key={job.id} value={job.title}>{job.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="resume-upload" className="block text-sm font-semibold text-[#07173d] mb-2">Upload Resume (PDF/DOC/DOCX) *</label>
                  <div className="relative">
                    <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#48608f]" />
                    <Input
                      id="resume-upload"
                      name="resumeFile"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="pl-10 border-blue-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      required
                    />
                  </div>
                  {applicationData.resumeFile && (
                    <p className="mt-2 text-sm text-green-600">✓ {applicationData.resumeFile.name} uploaded</p>
                  )}
                </div>

                <div>
                  <label htmlFor="coverLetter" className="block text-sm font-semibold text-[#07173d] mb-2">Cover Letter</label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    value={applicationData.coverLetter}
                    onChange={handleChange}
                    placeholder="Tell us why you're interested in this position..."
                    rows={4}
                    className="w-full px-4 py-2 border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={createApplication.isPending}
                    className="w-full md:w-auto px-8 py-6 bg-gradient-to-r from-[#17337d] to-[#213a5b]"
                  >
                    {createApplication.isPending ? "Submitting..." : "Submit Application"}
                    <Send className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-[#f7f9ff]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#07173d] mb-4">Application Process</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#17337d] to-[#213a5b] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-[#07173d] mb-2">Apply Online</h3>
              <p className="text-[#48608f]">Submit your application with resume and cover letter</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#C59D50] to-[#B78D42] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#040F23]">2</span>
              </div>
              <h3 className="text-xl font-bold text-[#07173d] mb-2">Review</h3>
              <p className="text-[#48608f]">Our HR team reviews your application</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#040F23]">3</span>
              </div>
              <h3 className="text-xl font-bold text-[#07173d] mb-2">Interview</h3>
              <p className="text-[#48608f]">We contact you for interview if selected</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-[#091f54] to-[#163886]">
        <div className="container text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Have Questions?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact our HR team for any career-related inquiries
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#C59D50] to-[#B78D42] text-[#040F23] font-semibold"
            onClick={() => setLocation("/contact")}
          >
            Contact HR
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}