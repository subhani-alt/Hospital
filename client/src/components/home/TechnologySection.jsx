import React from 'react';
import { Cpu, ShieldCheck, Zap, Activity } from 'lucide-react';

export default function TechnologySection() {
  const TECH_LIST = [
    {
      name: 'Da Vinci Xi Robotic Surgery',
      category: 'Surgical Robotics',
      desc: 'High-definition 3D magnification with wrist-articulated instruments for sub-millimeter surgical precision in oncology and urology.',
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800'
    },
    {
      name: 'TrueBeam STx Radiotherapy',
      category: 'Radiation Oncology',
      desc: 'Sub-millimeter beam targeting delivering targeted radiation doses to tumors in real-time while sparing healthy surrounding tissues.',
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800'
    },
    {
      name: 'Mako Robotic Arm System',
      category: 'Orthopedics',
      desc: '3D CT-based virtual modeling allowing customized implant placement for total knee and hip replacements.',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <section className="py-20 bg-[#051224] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#80CBC4]">
            Technological Leadership
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-heading tracking-tight">
            Pioneering Medical Innovation
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Investing in next-generation surgical, diagnostic, and therapeutic technologies to drive global recovery records.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TECH_LIST.map((tech, idx) => (
            <div
              key={idx}
              className="bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-[#00897B] transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={tech.image}
                    alt={tech.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#051224] via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 bg-[#00695C] text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                    {tech.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold font-heading text-white group-hover:text-[#80CBC4] transition">
                    {tech.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {tech.desc}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="flex items-center gap-2 text-xs text-[#80CBC4] font-semibold">
                  <Cpu className="w-4 h-4" />
                  <span>FDA Approved Technology</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
