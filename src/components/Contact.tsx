import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';

const Contact: React.FC = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate sending
        alert("Transmission sent into the void (and my inbox).");
        setFormState({ name: '', email: '', message: '' });
    };

    const socialLinks = [
        { name: "Twitter", url: "https://twitter.com/jotaemidev" },
        { name: "LinkedIn", url: "https://linkedin.com/in/jotaemidev" },
        { name: "Github", url: "https://github.com/jotaemidev" }
    ];

  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-black min-h-screen flex flex-col justify-between">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-6xl md:text-8xl font-display font-bold mb-8"
            >
                LET'S<br/>TALK
            </motion.h2>
            <p className="text-xl text-gray-400 max-w-md mb-12">
                Have a crazy idea? I love crazy ideas. Let's build something that breaks the internet.
            </p>

            <div className="space-y-6">
                <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors cursor-pointer group">
                    <div className="p-3 border border-gray-800 rounded-full group-hover:bg-white group-hover:text-black transition-colors">
                        <Mail className="w-5 h-5" />
                    </div>
                    <span className="text-lg">hello@jotaemi.dev</span>
                </div>
                 <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors cursor-pointer group">
                    <div className="p-3 border border-gray-800 rounded-full group-hover:bg-white group-hover:text-black transition-colors">
                        <Phone className="w-5 h-5" />
                    </div>
                    <span className="text-lg">+1 (555) 000-0000</span>
                </div>
                 <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors cursor-pointer group">
                    <div className="p-3 border border-gray-800 rounded-full group-hover:bg-white group-hover:text-black transition-colors">
                        <MapPin className="w-5 h-5" />
                    </div>
                    <span className="text-lg">San Francisco, CA</span>
                </div>
            </div>
        </div>

        <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-neutral-900/30 p-8 md:p-12 rounded-2xl border border-gray-800"
        >
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500">Identity</label>
                    <input 
                        type="text" 
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                        className="w-full bg-transparent border-b border-gray-700 py-4 text-xl focus:outline-none focus:border-white transition-colors placeholder-gray-800"
                        placeholder="Your Name"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500">Signal</label>
                    <input 
                        type="email" 
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                        className="w-full bg-transparent border-b border-gray-700 py-4 text-xl focus:outline-none focus:border-white transition-colors placeholder-gray-800"
                        placeholder="Your Email"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500">Transmission</label>
                    <textarea 
                        rows={4}
                        value={formState.message}
                        onChange={(e) => setFormState({...formState, message: e.target.value})}
                        className="w-full bg-transparent border-b border-gray-700 py-4 text-xl focus:outline-none focus:border-white transition-colors placeholder-gray-800 resize-none"
                        placeholder="Project Details..."
                        required
                    />
                </div>

                <button 
                    type="submit"
                    className="group w-full py-4 bg-white text-black font-bold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                >
                    Send Message
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </button>
            </form>
        </motion.div>
      </div>

      <footer className="border-t border-gray-900 pt-8 mt-24 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 uppercase tracking-widest">
        <p>&copy; 2024 JOTAEMI.DEV. All rights reserved.</p>
        <div className="flex gap-8 mt-4 md:mt-0">
            {socialLinks.map((link) => (
                <a 
                    key={link.name}
                    href={link.url}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="relative group text-gray-500 hover:text-white transition-colors duration-300"
                >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </a>
            ))}
        </div>
      </footer>
    </section>
  );
};

export default Contact;