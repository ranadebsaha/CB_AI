import React, { useState, useRef } from 'react';
import { Upload, Video, Image, Download, AlertCircle, CheckCircle, Play } from 'lucide-react';
import Loader from '../components/Loader';

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string>('');
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    setProcessedUrl('');
    setDownloadUrl('');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type.startsWith('image') || droppedFile.type.startsWith('video'))) {
      setFile(droppedFile);
      setProcessedUrl('');
      setDownloadUrl('');
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file.");
    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);

    const endpoint = file.type.startsWith('image')
      ? 'http://localhost:5000/upload/image'
      : 'http://localhost:5000/upload/video';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (file.type.startsWith('image')) {
        const filename = data.image_url.split('/').pop();
        setProcessedUrl(`http://localhost:5000${data.image_url}`);
        setDownloadUrl(`http://localhost:5000/download_image/${filename}`);
      } else {
        const filename = data.video_url.split('/').pop();
        setProcessedUrl(`http://localhost:5000${data.video_url}`);
        setDownloadUrl(`http://localhost:5000/download_video/${filename}`);
      }
    } catch (err) {
      alert("Upload failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
            AI-Powered Debris Detection
          </h1>
          <p className="text-black/60 dark:text-white/70 text-lg">
            Upload your images or videos to detect debris and objects with advanced AI technology
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 mb-8 card-shadow border border-black/20 dark:border-white/20 transition-all duration-200 hover:border-black/40 dark:hover:border-white/40 hover:shadow-lg">
          <div
            className={`upload-area rounded-xl p-8 text-center transition-all duration-300 bg-[#f5f5f5] dark:bg-gray-800 border border-black/20 dark:border-white/20 cursor-pointer ${
              dragOver ? 'dragover' : ''
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-black/10 dark:bg-white/10 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-black dark:text-white" />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                  Drop your files here or click to browse
                </h3>
                <p className="text-black/60 dark:text-white/70">
                  Supports JPG, PNG, and MP4 files up to 100MB
                </p>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.mp4"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* File Info */}
        {file && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 mb-6 card-shadow border border-black/20 dark:border-white/20 transition-all duration-200 hover:border-black/40 dark:hover:border-white/40 hover:shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-black/10 dark:bg-white/10 rounded-lg flex items-center justify-center">
                {file.type.startsWith('image') ? (
                  <Image className="w-6 h-6 text-black dark:text-white" />
                ) : (
                  <Video className="w-6 h-6 text-black dark:text-white" />
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="text-black dark:text-white font-semibold">{file.name}</h3>
                <p className="text-black/60 dark:text-white/70 text-sm">
                  {formatFileSize(file.size)} • {file.type.startsWith('image') ? 'Image' : 'Video'}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-black dark:text-white" />
                <span className="text-black dark:text-white text-sm">Ready</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-all duration-200 hover:bg-black/80 dark:hover:bg-white/80 hover:shadow-lg"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                <span>Analyze & Detect</span>
              </>
            )}
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center card-shadow border border-black/20 dark:border-white/20 transition-all duration-200 hover:border-black/40 dark:hover:border-white/40 hover:shadow-lg">
            <Loader />
            <p className="text-black/70 dark:text-white/70 mt-4">
              AI is analyzing your file for debris detection...
            </p>
          </div>
        )}

        {/* Results */}
        {processedUrl && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 card-shadow border border-black/20 dark:border-white/20 transition-all duration-200 hover:border-black/40 dark:hover:border-white/40 hover:shadow-lg">
            <div className="flex items-center space-x-2 mb-6">
              <CheckCircle className="w-6 h-6 text-black dark:text-white" />
              <h2 className="text-2xl font-bold text-black dark:text-white">Detection Complete</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-black/5 dark:bg-white/10 rounded-xl p-4">
                <h3 className="text-black dark:text-white font-semibold mb-2">Processed Result</h3>
                <p className="text-black/60 dark:text-white/70 text-sm mb-4">
                  Your file has been processed with AI-powered debris detection
                </p>
                
                {/* Uncomment to show processed media */}
                {/* {file?.type.startsWith('image') ? (
                  <img src={processedUrl} alt="Processed" className="w-full rounded-lg" />
                ) : (
                  <video src={processedUrl} controls className="w-full rounded-lg" />
                )} */}
              </div>
              
              <div className="flex justify-center">
                <a
                  href={downloadUrl}
                  download
                  className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:bg-black/20 dark:hover:bg-white/20"
                >
                  <Download className="w-5 h-5 dark:text-black" />
                  <span>Download Result</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center border border-black/20 dark:border-white/20 transition-all duration-200 hover:border-black/40 dark:hover:border-white/40 hover:shadow-lg">
            <div className="w-12 h-12 bg-black/10 dark:bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6 text-black dark:text-white" />
            </div>
            <h3 className="text-black dark:text-white font-semibold mb-2">High Accuracy</h3>
            <p className="text-black/60 dark:text-white/70 text-sm">
              Our AI model provides highly accurate debris detection with advanced computer vision
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center border border-black/20 dark:border-white/20 transition-all duration-200 hover:border-black/40 dark:hover:border-white/40 hover:shadow-lg">
            <div className="w-12 h-12 bg-black/10 dark:bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Upload className="w-6 h-6 text-black dark:text-white" />
            </div>
            <h3 className="text-black dark:text-white font-semibold mb-2">Easy Upload</h3>
            <p className="text-black/60 dark:text-white/70 text-sm">
              Simply drag and drop your files or click to upload. Supports multiple formats
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center border border-black/20 dark:border-white/20 transition-all duration-200 hover:border-black/40 dark:hover:border-white/40 hover:shadow-lg">
            <div className="w-12 h-12 bg-black/10 dark:bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Download className="w-6 h-6 text-black dark:text-white" />
            </div>
            <h3 className="text-black dark:text-white font-semibold mb-2">Quick Results</h3>
            <p className="text-black/60 dark:text-white/70 text-sm">
              Get processed results quickly and download them in your preferred format
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
