import { useState, useRef } from 'react';
import { Camera, Play, Link, Download, AlertCircle, Wifi, Radio } from 'lucide-react';
import Loader from '../components/Loader';

const LiveDetectionPage = () => {
  const [loading, setLoading] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string>('');
  const streamInput = useRef<HTMLInputElement>(null);

  const handleStartDetection = async () => {
    const url = streamInput.current?.value.trim();
    if (!url) return alert('Enter RTSP/HTTP stream URL');

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('url', url);

      const res = await fetch('http://localhost:5000/stream/live', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setOutputUrl(`http://localhost:5000/get_video/${data.filename}`);
    } catch (err) {
      alert("Live stream processing failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
            Live Stream Detection
          </h1>
          <p className="text-black/60 dark:text-white/70 text-lg">
            Connect to live camera feeds for real-time debris detection monitoring
          </p>
        </div>

        {/* Stream Input Section */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 mb-8 card-shadow border border-black/20 dark:border-white/20 transition-all duration-200 hover:border-black/40 dark:hover:border-white/40 hover:shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-black/10 dark:bg-white/10 rounded-lg flex items-center justify-center">
              <Camera className="w-6 h-6 text-black dark:text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-black dark:text-white">Stream Configuration</h2>
              <p className="text-black/60 dark:text-white/70">Enter your camera stream URL to begin detection</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Link className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black/60 dark:text-white/70" />
              <input
                ref={streamInput}
                type="text"
                placeholder="Enter RTSP/HTTP Stream URL (e.g., rtsp://camera.example.com:554/stream)"
                className="w-full bg-black/5 dark:bg-white/10 border border-black/20 dark:border-white/20 rounded-xl px-12 py-4 text-black dark:text-white placeholder-black/60 dark:placeholder-white/70 focus:outline-none focus:border-black dark:focus:border-white focus:bg-black/10 dark:focus:bg-white/20 transition-all duration-200"
              />
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleStartDetection}
                disabled={loading}
                className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-all duration-200 hover:bg-black/80 dark:hover:bg-white/80 hover:shadow-lg"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    <span>Start Live Detection</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="glass-effect dark:bg-gray-900 rounded-2xl p-8 text-center card-shadow mb-8 border border-black/20 dark:border-white/20 transition-all duration-200 hover:border-black/40 dark:hover:border-white/40 hover:shadow-lg">
            <Loader />
            <p className="text-black/70 dark:text-white/70 mt-4">
              Connecting to stream and initializing real-time detection...
            </p>
          </div>
        )}

        {/* Stream Output */}
        {outputUrl && (
          <div className="glass-effect dark:bg-gray-900 rounded-2xl p-8 card-shadow mb-8 border border-black/20 dark:border-white/20 transition-all duration-200 hover:border-black/40 dark:hover:border-white/40 hover:shadow-lg">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <h2 className="text-2xl font-bold text-black dark:text-white">Live Stream Active</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-black/30 dark:bg-white/10 rounded-xl p-4">
                <video 
                  src={outputUrl} 
                  controls 
                  className="w-full rounded-lg"
                  style={{ maxHeight: '500px' }}
                />
              </div>
              
              <div className="flex justify-center">
                <a
                  href={outputUrl}
                  download
                  className="btn-secondary bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:bg-black/20 dark:hover:bg-white/20"
                >
                  <Download className="w-5 h-5 dark:text-black" />
                  <span>Download Recording</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center border border-black/20 dark:border-white/20 transition-all duration-200 hover:border-black/40 dark:hover:border-white/40 hover:shadow-lg">
            <div className="w-12 h-12 bg-black/10 dark:bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Radio className="w-6 h-6 text-black dark:text-white" />
            </div>
            <h3 className="font-semibold mb-2 text-black dark:text-white">Real-Time Processing</h3>
            <p className="text-sm text-black dark:text-white/70">
              Live stream analysis with immediate debris detection and alerts
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center border border-black/20 dark:border-white/20 transition-all duration-200 hover:border-black/40 dark:hover:border-white/40 hover:shadow-lg">
            <div className="w-12 h-12 bg-black/10 dark:bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Wifi className="w-6 h-6 text-black dark:text-white" />
            </div>
            <h3 className="font-semibold mb-2 text-black dark:text-white">Multiple Protocols</h3>
            <p className="text-sm text-black dark:text-white/70">
              Supports RTSP, HTTP, and other streaming protocols for camera integration
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center border border-black/20 dark:border-white/20 transition-all duration-200 hover:border-black/40 dark:hover:border-white/40 hover:shadow-lg">
            <div className="w-12 h-12 bg-black/10 dark:bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6 text-black dark:text-white" />
            </div>
            <h3 className="font-semibold mb-2 text-black dark:text-white">Continuous Monitoring</h3>
            <p className="text-sm text-black dark:text-white/70">
              24/7 monitoring capability with automated recording and alerts
            </p>
          </div>
        </div>

        {/* URL Examples */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 mt-8 border border-black/20 dark:border-white/20 transition-all duration-200 hover:border-black/40 dark:hover:border-white/40 hover:shadow-lg">
          <h3 className="font-semibold mb-4 text-black dark:text-white">Stream URL Examples:</h3>
          <div className="space-y-2 text-sm">
            <div className="text-black dark:text-white">
              <span className="text-black dark:text-white">RTSP:</span> rtsp://username:password@192.168.1.100:554/stream
            </div>
            <div className="text-black dark:text-white">
              <span className="text-black dark:text-white">HTTP:</span> http://192.168.1.100:8080/video.mjpg
            </div>
          </div>
      </div>
    </div>
    </div>
  );
};

export default LiveDetectionPage;
