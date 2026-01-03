import React from 'react';
import { ArrowRight, Zap, Map, Globe, Brain, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="space-y-12 pb-10 px-4 md:px-0 max-w-5xl mx-auto">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-8 md:p-16 text-center md:text-left">
        <div className="relative z-10 max-w-3xl mx-auto md:mx-0">
          <h1 className="text-4xl md:text-6xl font-semibold mb-6 leading-tight text-gray-900 dark:text-white">
            Learn Today for the <br />
            <span className="text-gray-500 dark:text-gray-400">Skills of Tomorrow</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
            A future-ready learning platform that guides you across academics, domains, and long-term relevance. 
            Stop reacting—start predicting your future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to="/assess" className="px-8 py-3.5 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black font-medium rounded-xl transition-all flex items-center justify-center gap-2 group">
              Assess My Knowledge
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/roadmaps" className="px-8 py-3.5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-xl border border-gray-200 dark:border-gray-700 transition-all flex items-center justify-center">
              Explore My Roadmap
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Overview Cards */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Platform Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            icon={Brain}
            title="Knowledge Assessment" 
            desc="Identify your current standing with AI-driven concept analysis."
          />
          <FeatureCard 
            icon={Map}
            title="Personalized Roadmaps" 
            desc="Bridge the gap between academic syllabus and future industry needs."
          />
          <FeatureCard 
            icon={Zap}
            title="Future Skill Discovery" 
            desc="Spot emerging technologies before they become mainstream."
          />
          <FeatureCard 
            icon={Globe}
            title="Multi-Domain Exploration" 
            desc="Explore IT, Core Engineering, Research, and Policy making."
          />
          <FeatureCard 
            icon={TrendingUp}
            title="News & Trend Awareness" 
            desc="Curated updates that explain 'Why this matters' for your future."
          />
        </div>
      </section>

      {/* Who This Platform Is For */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Who This Platform Is For</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AudienceCard title="B.Tech 1st Year Students" />
          <AudienceCard title="Core Engineering Students" />
          <AudienceCard title="Government Exam Aspirants" />
          <AudienceCard title="Career Switchers" />
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="p-6 rounded-2xl bg-white dark:bg-gray-800/30 border border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-500 transition-all hover:-translate-y-1">
    <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white flex items-center justify-center mb-4">
      <Icon size={24} />
    </div>
    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

const AudienceCard = ({ title }) => (
  <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-700 flex items-center justify-center text-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-default">
    <span className="font-medium text-gray-700 dark:text-gray-200">{title}</span>
  </div>
);

export default Home;
