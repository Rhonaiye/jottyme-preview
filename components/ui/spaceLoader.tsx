"use client";

const WorkspaceLoader = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white overflow-hidden">
      {/* Background Glows */}
      <div className="absolute -left-32 top-10 w-60 h-60 md:w-96 md:h-96 bg-purple-400/8 rounded-full blur-[70px]"></div>
      <div className="absolute -right-32 top-20 w-60 h-60 md:w-96 md:h-96 bg-pink-400/8 rounded-full blur-[70px]"></div>
      <div className="absolute -left-20 bottom-10 w-52 h-52 md:w-80 md:h-80 bg-blue-400/8 rounded-full blur-[70px]"></div>
      <div className="absolute -right-20 bottom-20 w-52 h-52 md:w-80 md:h-80 bg-purple-400/8 rounded-full blur-[70px]"></div>

      {/* NEW: Extra Top-Left Glow */}
      <div className="absolute -left-28 top-32 w-52 h-52 md:w-80 md:h-80 bg-pink-400/8 rounded-full blur-[70px]"></div>

      {/* Brand */}
      <h1 className="text-3xl md:text-4xl font-bold text-black mb-3 z-10">
        Jotty<span className="text-purple-600">me</span>
      </h1>

      {/* Subtitle */}
      <p className="text-sm md:text-base text-gray-700 text-center z-10">
        Your workspace dey cook... small patience, aroma go soon reach you!
      </p>
    </div>
  );
};

export default WorkspaceLoader;
