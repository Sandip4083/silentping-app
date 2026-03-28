import Link from "next/link";
import { ArrowRight, MessageSquare, Shield, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-50">
      
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto w-full">
        <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
          <MessageSquare className="w-8 h-8 text-blue-600 dark:text-blue-500" />
          Silent<span className="text-blue-600 dark:text-blue-500">Ping</span>
        </div>
        <div className="flex gap-4">
          <Link href="/sign-in" className="px-5 py-2.5 text-sm font-medium hover:text-blue-600 transition-colors">
            Login
          </Link>
          <Link href="/sign-up" className="px-5 py-2.5 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all shadow-sm">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Main Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
        <div className="inline-flex items-center rounded-full border border-blue-200/50 bg-blue-50/50 dark:bg-blue-900/20 dark:border-blue-800/50 px-3 py-1 text-sm font-medium text-blue-700 dark:text-blue-300 mb-8">
          <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
          Anonymous feedback made easy
        </div>
        
        <h1 className="max-w-4xl text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
          Receive messages from anywhere, <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            completely anonymously.
          </span>
        </h1>
        
        <p className="max-w-2xl text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
          SilentPing provides a secure and fast platform to get honest feedback, questions, or messages from your audience without revealing their identity.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/sign-up" className="group flex items-center justify-center gap-2 h-14 px-8 text-base font-medium text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-full hover:scale-105 transition-all shadow-xl shadow-slate-900/20 dark:shadow-white/10">
            Create your unique link
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mt-32 text-left">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">100% Anonymous</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Senders identities are strictly protected. Receive genuine, unfiltered thoughts safely.</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Lightning Fast</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Built on Next.js edge architecture for instantaneous message delivery and viewing.</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Easy Management</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">A clean dashboard to review, delete, or quickly turn off your message acceptance toggle.</p>
          </div>
        </div>
      </main>

    </div>
  );
}
