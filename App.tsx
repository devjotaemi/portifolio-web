import React from 'react';
import Navbar from './src/components/Navbar';
import Hero from './src/components/Hero';
import Projects from './src/components/Projects';
import About from './src/components/About';
import Contact from './src/components/Contact';
import CustomCursor from './src/components/CustomCursor';

function App() {
  return (
    <div className="bg-black text-white selection:bg-white selection:text-black">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
    </div>
  );
}

export default App;