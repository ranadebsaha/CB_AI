import { Brain, Zap } from 'lucide-react';

const Loader = () => (
  <div className="flex flex-col items-center justify-center py-8 bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
    <div className="relative">
      {/* Outer ring */}
      <div className="w-16 h-16 border-4 border-black/20 dark:border-white/20 rounded-full animate-spin border-t-black dark:border-t-white"></div>
      
      {/* Inner ring */}
      <div className="absolute inset-2 w-12 h-12 border-4 border-black/10 dark:border-white/10 rounded-full animate-spin border-t-black dark:border-t-white animate-reverse"></div>
      
      {/* Center icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Brain className="w-6 h-6 text-black dark:text-white animate-pulse" />
      </div>
    </div>
    
    <div className="mt-4 text-center flex flex-col items-center">
      <div className="flex items-center space-x-2 text-black dark:text-white">
        <Zap className="w-4 h-4 text-black dark:text-white" />
        <span className="text-sm font-medium">AI Processing</span>
      </div>
      <div className="flex space-x-1 mt-2">
        <div className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  </div>
);

export default Loader;