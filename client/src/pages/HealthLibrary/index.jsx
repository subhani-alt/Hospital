import React, { useState, useEffect } from 'react';
import { getLiveBlogs } from '../../services/data';
import { Search, BookOpen, Clock, User, ArrowRight } from 'lucide-react';

export default function HealthLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [blogsList, setBlogsList] = useState(() => getLiveBlogs());

  useEffect(() => {
    const handleUpdate = () => setBlogsList(getLiveBlogs());
    window.addEventListener('apex_blogs_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('apex_blogs_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const filteredBlogs = blogsList.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full bg-[#F8FCFB] dark:bg-[#0A1917] text-slate-900 dark:text-white py-12 space-y-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#00695C] dark:text-[#80CBC4]">
            Clinical Research & Education
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading tracking-tight">
            Apex Health Insights Library
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Authored by senior clinical directors and research fellows.
          </p>

          <div className="pt-4 max-w-xl mx-auto">
            <div className="bg-white dark:bg-[#122824] p-2 rounded-full border border-slate-200 dark:border-slate-800 shadow-md flex items-center gap-3 px-4">
              <Search className="w-5 h-5 text-[#00695C] dark:text-[#80CBC4]" />
              <input
                type="text"
                placeholder="Search articles by condition or treatment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-sm focus:outline-none text-slate-900 dark:text-white py-2"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <div key={blog.id} className="bg-white dark:bg-[#122824] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                  <span className="absolute top-4 left-4 bg-[#00695C] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                    {blog.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{blog.date}</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold font-heading line-clamp-2">{blog.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3">{blog.summary}</p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <span className="text-xs font-bold text-[#00695C] dark:text-[#80CBC4] hover:underline flex items-center gap-1">
                  Read Full Publication &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>

      </section>
    </div>
  );
}
