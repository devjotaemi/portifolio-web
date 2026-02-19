import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Project } from '../types';
import { ExternalLink, Github } from 'lucide-react';

const projects: Project[] = [
  {
    id: 1,
    title: "Neon Nexus",
    category: "Web",
    image: "https://picsum.photos/800/600?grayscale&random=1",
    description: "A cyberpunk-inspired dashboard for crypto analytics.",
    technologies: ["React", "D3.js", "Tailwind"]
  },
  {
    id: 2,
    title: "Aura Mobile",
    category: "Mobile",
    image: "https://picsum.photos/800/600?grayscale&random=2",
    description: "Meditation app focusing on sonic landscapes.",
    technologies: ["React Native", "Expo", "Reanimated"]
  },
  {
    id: 3,
    title: "Synthetix AI",
    category: "AI",
    image: "https://picsum.photos/800/600?grayscale&random=3",
    description: "Generative AI interface for creating textures.",
    technologies: ["Next.js", "Gemini API", "Python"]
  },
  {
    id: 4,
    title: "Mono Brand",
    category: "Design",
    image: "https://picsum.photos/800/600?grayscale&random=4",
    description: "Minimalist branding package for a fashion house.",
    technologies: ["Figma", "Illustrator", "Blender"]
  },
   {
    id: 5,
    title: "Void Commerce",
    category: "Web",
    image: "https://picsum.photos/800/600?grayscale&random=5",
    description: "Headless e-commerce solution with 3D product previews.",
    technologies: ["Three.js", "Shopify", "R3F"]
  },
  {
    id: 6,
    title: "Echo Chat",
    category: "AI",
    image: "https://picsum.photos/800/600?grayscale&random=6",
    description: "Real-time translation chat using LLMs.",
    technologies: ["WebSockets", "Node.js", "Redis"]
  }
];

const categories = ['All', 'Web', 'Mobile', 'Design', 'AI'];

// Creative Text Animation Component
const AnimatedTitle = ({ text }: { text: string }) => {
  const letters = text.split("");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 100,
      rotateX: -90,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.h2 
      className="text-5xl md:text-7xl font-display font-bold mb-8 overflow-hidden flex flex-wrap"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index} className="inline-block origin-bottom-left">
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h2>
  );
};


const Projects: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="work" className="py-24 px-6 md:px-12 bg-black min-h-screen">
      <div className="mb-16">
        <AnimatedTitle text="Selected Works" />
        
        <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "100%" }}
            transition={{ delay: 1, duration: 1, ease: "circOut" }}
            className="flex flex-wrap gap-4 md:gap-8 border-b border-gray-800 pb-4 overflow-hidden"
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-sm md:text-base uppercase tracking-widest transition-colors ${
                filter === cat ? 'text-white' : 'text-gray-600 hover:text-gray-400'
              }`}
            >
              {cat}
              {filter === cat && (
                <motion.div 
                  layoutId="activeTab"
                  className="w-full h-0.5 bg-white mt-2"
                />
              )}
            </button>
          ))}
        </motion.div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9, rotateX: -15 }}
              whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateX: 15 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative h-[400px] bg-neutral-900 overflow-hidden cursor-none"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ perspective: 1000 }}
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-40"
              />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ 
                    y: hoveredId === project.id ? 0 : 20, 
                    opacity: hoveredId === project.id ? 1 : 0 
                  }}
                  className="space-y-4"
                >
                    <div className="flex justify-between items-center">
                        <span className="px-3 py-1 text-xs border border-white/30 rounded-full">{project.category}</span>
                        <div className="flex gap-2">
                             <Github className="w-5 h-5 cursor-pointer hover:text-gray-300" />
                             <ExternalLink className="w-5 h-5 cursor-pointer hover:text-gray-300" />
                        </div>
                    </div>
                  <h3 className="text-3xl font-bold font-display">{project.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500 uppercase tracking-wider">
                    {project.technologies.map(t => <span key={t}>#{t}</span>)}
                  </div>
                </motion.div>
                
                {/* Default visible title when not hovered */}
                <motion.h3 
                    animate={{ opacity: hoveredId === project.id ? 0 : 1 }}
                    className="absolute bottom-8 left-8 text-2xl font-bold font-display"
                >
                    {project.title}
                </motion.h3>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Projects;