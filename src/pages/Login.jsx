import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const Login = () => {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-[#020617] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      
      <div className="relative z-10">
        <SignIn 
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-slate-900/50 border border-white/10 backdrop-blur-xl shadow-2xl",
              headerTitle: "text-white font-display",
              headerSubtitle: "text-slate-400",
              socialButtonsBlockButton: "bg-white/5 border border-white/10 text-white hover:bg-white/10",
              formFieldLabel: "text-slate-300",
              formFieldInput: "bg-black/20 border-white/10 text-white",
              footerActionLink: "text-cyan-400 hover:text-cyan-300",
              formButtonPrimary: "bg-cyan-500 hover:bg-cyan-400 text-black"
            }
          }}
          signUpUrl="/signup"
        />
      </div>
    </div>
  );
};

export default Login;
