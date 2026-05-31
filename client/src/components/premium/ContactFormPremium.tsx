import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function ContactFormPremium(){
  const [data,setData] = useState({name:'',email:'',phone:'',destination:'',course:'',message:''});
  const handleChange = (e:any)=> setData(prev=>({...prev,[e.target.name]:e.target.value}));
  const handleSubmit = (e:any)=>{e.preventDefault(); toast.success('Inquiry sent.'); setData({name:'',email:'',phone:'',destination:'',course:'',message:''})}

  return (
    <section className="py-20 bg-[linear-gradient(90deg,#fff,#f8fafc)]">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[var(--primary)]">Contact Nawins</h2>
            <p className="text-sm text-[var(--light-gray)] mt-2">Book a premium consultation with our senior advisors</p>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-8 rounded-3xl shadow-xl">
            <Input name="name" value={data.name} onChange={handleChange} placeholder="Full Name" required />
            <Input name="email" value={data.email} onChange={handleChange} placeholder="Email" required />
            <Input name="phone" value={data.phone} onChange={handleChange} placeholder="Phone" />
            <Input name="destination" value={data.destination} onChange={handleChange} placeholder="Destination (UK, Canada...)" />
            <Input name="course" value={data.course} onChange={handleChange} placeholder="Preferred Course" />
            <textarea name="message" value={data.message} onChange={handleChange} placeholder="Message" className="col-span-1 md:col-span-2 rounded-lg p-3 border border-[rgba(4,15,35,0.06)]" />
            <div className="col-span-1 md:col-span-2 text-right">
              <Button type="submit" className="rounded-full bg-[var(--accent)] text-[var(--accent-foreground)] px-6 py-3">Request Consultation</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
