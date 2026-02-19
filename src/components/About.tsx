import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';

const skillsData = {
  nodes: [
    { id: "Me", group: 1 },
    { id: "React", group: 2 },
    { id: "TypeScript", group: 2 },
    { id: "Next.js", group: 2 },
    { id: "Node.js", group: 3 },
    { id: "Python", group: 3 },
    { id: "Gemini", group: 4 },
    { id: "Three.js", group: 4 },
    { id: "Design", group: 5 },
    { id: "Figma", group: 5 },
    { id: "Tailwind", group: 2 },
    { id: "WebGL", group: 4 },
  ],
  links: [
    { source: "Me", target: "React", value: 1 },
    { source: "Me", target: "Node.js", value: 1 },
    { source: "Me", target: "Design", value: 1 },
    { source: "React", target: "TypeScript", value: 2 },
    { source: "React", target: "Next.js", value: 2 },
    { source: "React", target: "Tailwind", value: 2 },
    { source: "Node.js", target: "Python", value: 2 },
    { source: "Python", target: "Gemini", value: 3 },
    { source: "Design", target: "Figma", value: 2 },
    { source: "Design", target: "Three.js", value: 2 },
    { source: "Three.js", target: "WebGL", value: 3 },
  ]
};

const SkillsGraph: React.FC = () => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const width = 600;
        const height = 400;

        // Clear previous
        d3.select(svgRef.current).selectAll("*").remove();

        const svg = d3.select(svgRef.current)
            .attr("viewBox", [0, 0, width, height])
            .attr("style", "max-width: 100%; height: auto;");

        const simulation = d3.forceSimulation(skillsData.nodes as any)
            .force("link", d3.forceLink(skillsData.links).id((d: any) => d.id).distance(80))
            .force("charge", d3.forceManyBody().strength(-300))
            .force("center", d3.forceCenter(width / 2, height / 2));

        const link = svg.append("g")
            .attr("stroke", "#333")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(skillsData.links)
            .join("line")
            .attr("stroke-width", (d) => Math.sqrt(d.value));

        const node = svg.append("g")
            .selectAll("g")
            .data(skillsData.nodes)
            .join("g")
            .call(d3.drag<any, any>()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended) as any);

        node.append("circle")
            .attr("r", (d) => d.id === "Me" ? 10 : 5)
            .attr("fill", (d) => d.id === "Me" ? "#fff" : "#666")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5);

        node.append("text")
            .attr("x", 12)
            .attr("y", "0.31em")
            .text((d) => d.id)
            .clone(true).lower()
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 3);

        node.selectAll("text")
             .attr("fill", "white")
             .attr("font-family", "sans-serif")
             .attr("font-size", "10px")
             .attr("font-weight", "bold");


        simulation.on("tick", () => {
            link
                .attr("x1", (d: any) => d.source.x)
                .attr("y1", (d: any) => d.source.y)
                .attr("x2", (d: any) => d.target.x)
                .attr("y2", (d: any) => d.target.y);

            node
                .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
        });

        function dragstarted(event: any) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        function dragged(event: any) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        function dragended(event: any) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }

    }, []);

    return (
        <svg ref={svgRef} className="w-full h-full" />
    );
};

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-12 min-h-screen flex flex-col md:flex-row items-center gap-16 bg-black">
      <div className="w-full md:w-1/2 space-y-8">
        <motion.h2 
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-display font-bold leading-tight"
        >
          BEYOND<br/>
          THE<br/>
          CODE
        </motion.h2>
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-gray-400 text-lg leading-relaxed max-w-lg"
        >
          <p className="mb-6">
            I am a multidisciplinary developer obsessed with the intersection of design and technology. 
            I build digital experiences that are not just functional, but emotional.
          </p>
          <p>
            From low-level graphics programming to high-level AI integrations, I traverse the full stack 
            to deliver products that stand out in a saturated digital landscape.
          </p>
        </motion.div>
        
        <div className="flex gap-4 pt-8">
            <div className="text-center">
                <h3 className="text-3xl font-bold text-white">5+</h3>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Years Exp</p>
            </div>
             <div className="w-[1px] h-12 bg-gray-800"></div>
            <div className="text-center">
                <h3 className="text-3xl font-bold text-white">40+</h3>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Projects</p>
            </div>
             <div className="w-[1px] h-12 bg-gray-800"></div>
            <div className="text-center">
                <h3 className="text-3xl font-bold text-white">100%</h3>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Commitment</p>
            </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 h-[400px] md:h-[600px] border border-gray-800 rounded-lg overflow-hidden relative bg-neutral-900/20 backdrop-blur-sm">
        <div className="absolute top-4 left-4 text-xs font-mono text-gray-500">INTERACTIVE_SKILL_MATRIX_V1.0</div>
        <SkillsGraph />
      </div>
    </section>
  );
};

export default About;