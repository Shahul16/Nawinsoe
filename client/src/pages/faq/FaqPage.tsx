import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { useState } from "react";

const faqCategories = [
  {
    category: "General Questions",
    items: [
      {
        question: "What services does Nawins Education provide?",
        answer: "Nawins Education provides comprehensive study abroad consulting services including university selection, application assistance, visa guidance, test preparation, scholarship assistance, and pre-departure orientation. Our team of experienced counselors helps students navigate the entire process of studying abroad."
      },
      {
        question: "Which countries does Nawins Education help students study in?",
        answer: "We specialize in helping students gain admission to universities in the UK, Canada, Australia, Ireland, and select European countries. Each destination has dedicated counselors with expertise in that region's education system and immigration requirements."
      },
      {
        question: "Is there a fee for your consultation services?",
        answer: "Our initial consultation is completely free. We charge service fees for comprehensive application support packages, which are clearly outlined before you commit. Many universities we partner with also pay us a commission, so our services can be free for students in certain cases."
      },
      {
        question: "How long has Nawins Education been operating?",
        answer: "Nawins Edutech Private Limited was incorporated in September 2023 and has been actively helping students since. We have guided 200+ students to leading UK universities and maintained a 95% visa success rate through our dedicated counseling team."
      }
    ]
  },
  {
    category: "Admission Process",
    items: [
      {
        question: "When should I start the application process?",
        answer: "We recommend starting at least 12-18 months before your intended start date. This gives you time to prepare for language tests, gather documents, and meet application deadlines. For UK universities, applications typically open a year in advance."
      },
      {
        question: "What documents do I need for university applications?",
        answer: "Typically you'll need: academic transcripts, letters of recommendation, statement of purpose, CV/resume, passport copy, language test scores (IELTS/TOEFL), and any portfolio or work experience documents. Specific requirements vary by university and program."
      },
      {
        question: "Can I apply to multiple universities?",
        answer: "Yes, we encourage students to apply to 3-5 universities to maximize their chances of acceptance. We help you create a balanced list including reach, target, and safety schools based on your profile and preferences."
      },
      {
        question: "What if I don't meet the entry requirements?",
        answer: "Don't worry! We can suggest pathway programs, foundation courses, or universities with more flexible entry requirements. Sometimes gaining work experience or taking additional courses can strengthen your application."
      }
    ]
  },
  {
    category: "Visa & Immigration",
    items: [
      {
        question: "How long does the visa process take?",
        answer: "Visa processing times vary by country: UK (3-8 weeks), Canada (8-12 weeks), Australia (4-8 weeks), Ireland (4-6 weeks). We start the visa process as soon as you receive your admission letter to ensure timely processing."
      },
      {
        question: "What are the chances of visa rejection?",
        answer: "With proper documentation and guidance, our visa success rate is 95%. Common reasons for rejection include insufficient funds, unclear study intentions, or incomplete documentation. We help you avoid these pitfalls."
      },
      {
        question: "Can I work while studying?",
        answer: "Most student visas allow part-time work: UK (20 hours/week during term), Canada (20 hours/week), Australia (48 hours/fortnight), Ireland (20 hours/week). Post-study work visas are also available in most countries."
      },
      {
        question: "Do I need to show proof of funds?",
        answer: "Yes, all student visas require proof of sufficient funds to cover tuition and living expenses. The amount varies by country and must be held in your account for a specified period (usually 28 days). We guide you through the financial documentation process."
      }
    ]
  },
  {
    category: "Costs & Scholarships",
    items: [
      {
        question: "How much does it cost to study abroad?",
        answer: "Costs vary significantly by country and institution. UK: £10,000-£38,000/year tuition, Canada: CAD 15,000-35,000/year, Australia: AUD 20,000-45,000/year. Living expenses range from £12,000-£18,000/year depending on location."
      },
      {
        question: "Are scholarships available for international students?",
        answer: "Yes! Many universities offer merit-based and need-based scholarships for international students. We help identify scholarship opportunities and assist with scholarship applications. Some countries also offer government scholarships."
      },
      {
        question: "Can I get an education loan?",
        answer: "Yes, most banks offer education loans for studying abroad. We can connect you with loan providers who offer competitive rates and flexible repayment terms. Loans typically cover tuition, living expenses, and sometimes travel costs."
      }
    ]
  }
];

export default function Faq() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (categoryIndex: number, itemIndex: number) => {
    const key = `${categoryIndex}-${itemIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-[#f7f9ff]">
      <Navigation />

      <section className="py-20 bg-gradient-to-r from-[#091f54] via-[#163886] to-[#1b47a8]">
        <div className="container">
          <div className="flex items-center gap-4 mb-6">
            <HelpCircle className="w-12 h-12 text-white" />
            <h1 className="text-5xl font-bold text-white">Frequently Asked Questions</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-2xl">
            Find answers to common questions about studying abroad with Nawins Edutech Private Limited.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#f7f9ff]">
        <div className="container max-w-4xl">
          {faqCategories.map((category, catIdx) => (
            <div key={catIdx} className="mb-12">
              <h2 className="text-3xl font-bold text-[#07173d] mb-8">{category.category}</h2>
              <div className="space-y-4">
                {category.items.map((item, itemIdx) => {
                  const key = `${catIdx}-${itemIdx}`;
                  const isOpen = openItems[key];
                  return (
                    <Card key={itemIdx} className="border-0 shadow-md">
                      <button
                        onClick={() => toggleItem(catIdx, itemIdx)}
                        className="w-full p-6 text-left flex items-start justify-between gap-4"
                        aria-expanded={isOpen}
                      >
                        <h3 className="text-lg font-semibold text-[#07173d] flex-1">
                          {item.question}
                        </h3>
                        <span className="text-[#17337d] flex-shrink-0 mt-1">
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6">
                          <p className="text-[#48608f]">{item.answer}</p>
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}

          <Card className="p-8 mt-12 border-0 shadow-md bg-gradient-to-r from-[#091f54] to-[#163886]">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Still have questions?
              </h2>
              <p className="text-blue-100 mb-6">
                Our counselors are here to help you with any queries about studying abroad.
              </p>
              <Button
                onClick={() => window.location.href = '/contact'}
                className="bg-white text-[#091f54] hover:bg-blue-50 rounded-full px-8"
              >
                Contact Us
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}