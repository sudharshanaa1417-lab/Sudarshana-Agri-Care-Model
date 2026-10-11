import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Upload,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Volume2,
  VolumeX,
  Printer,
  Sparkles,
  ShieldCheck,
  FlaskConical,
  Clock,
  Droplets,
  Layers,
  ChevronRight,
  ExternalLink,
  Info
} from 'lucide-react';
import AgriLogo from '../common/AgriLogo';
import SampleLeafVisual from './SampleLeafVisual';
import { CROP_DISEASES } from '../../data/cropDiseases';
import { TRANSLATIONS } from '../../data/translations';
import { diagnoseCropImage } from '../../services/imageDiagnosis';

export default function CropDetector({ language, onSavePrescription }) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Camera state
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState('environment'); // 'user' or 'environment'
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  // Diagnosis state
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [activeCropFilter, setActiveCropFilter] = useState('all');

  // Speech synthesis state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechUtteranceRef = useRef(null);

  // Camera stream handler
  useEffect(() => {
    let stream = null;

    if (isCameraActive) {
      navigator.mediaDevices
        ?.getUserMedia({
          video: { facingMode: { ideal: facingMode }, width: { ideal: 1280 }, height: { ideal: 720 } }
        })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
            videoRef.current.play();
          }
        })
        .catch((err) => {
          console.error('Camera access error:', err);
          alert('Unable to access device camera. Please grant camera permission or use the file upload option.');
          setIsCameraActive(false);
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isCameraActive, facingMode]);

  // Clean speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Handle capture from camera
  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

    // Stop camera
    setIsCameraActive(false);
    handleNewImage(dataUrl, null);
  };

  // Switch between front/back cameras
  const toggleCameraFacing = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  // Handle file input upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      handleNewImage(event.target.result, null);
    };
    reader.readAsDataURL(file);
  };

  // Handle sample click
  const handleSampleClick = (sample) => {
    handleNewImage(null, sample.id);
  };

  // Run Diagnosis workflow with scanning animation
  const handleNewImage = async (imageSrc, sampleId) => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    setSelectedImage(imageSrc);
    setIsAnalyzing(true);
    setAnalysisProgress(15);
    setDiagnosisResult(null);

    // Step animation for realistic scanning
    const p1 = setTimeout(() => setAnalysisProgress(45), 300);
    const p2 = setTimeout(() => setAnalysisProgress(80), 700);

    try {
      const result = await diagnoseCropImage(imageSrc, sampleId);
      setTimeout(() => {
        setAnalysisProgress(100);
        setIsAnalyzing(false);
        setDiagnosisResult(result);
        if (onSavePrescription) {
          onSavePrescription(result);
        }
      }, 1000);
    } catch (err) {
      console.error('Diagnosis failed:', err);
      setIsAnalyzing(false);
    }

    return () => {
      clearTimeout(p1);
      clearTimeout(p2);
    };
  };

  // Audio Text-to-Speech Advisory
  const toggleSpeech = () => {
    if (!window.speechSynthesis) {
      alert('Speech Synthesis not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if (!diagnosisResult) return;

    let textToSpeak = '';
    if (language === 'hi') {
      if (diagnosisResult.status === 'healthy') {
        textToSpeak = `फसल ${diagnosisResult.cropName} पूर्ण रूप से स्वस्थ है। स्वास्थ्य स्कोर अट्ठानवे प्रतिशत है। कोई कीट या रोग नहीं है। नियमित ड्रिप सिंचाई और पंद्रह दिन में एक बार नीम का तेल छिड़काव करें।`;
      } else {
        textToSpeak = `चेतावनी! फसल ${diagnosisResult.cropName} में ${diagnosisResult.diseaseName} का प्रकोप पाया गया है। घरेलू उपचार में खट्टी छाछ और हींग का घोल या बेकिंग सोडा का छिड़काव करें। दवा के रूप में मैंकोज़ेब या कॉपर ऑक्सीक्लोराइड ढाई ग्राम प्रति लीटर पानी में सुबह के समय छिड़कें। दिन में केवल एक बार छिड़काव करें।`;
      }
    } else {
      textToSpeak = diagnosisResult.voiceText || `${diagnosisResult.cropName}: ${diagnosisResult.status}. Follow recommended dosage.`;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Pick voice if language matches
    const voices = window.speechSynthesis.getVoices();
    const langCode = language === 'hi' ? 'hi-IN' : language === 'ta' ? 'ta-IN' : language === 'te' ? 'te-IN' : 'en-US';
    const matchedVoice = voices.find((v) => v.lang.includes(langCode));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // Print Prescription
  const handlePrint = () => {
    window.print();
  };

  // Filtered samples for quick demo
  const sampleCrops = ['all', 'Tomato', 'Rice / Paddy', 'Potato', 'Wheat', 'Cotton', 'Corn / Maize', 'Chilli / Pepper', 'Apple'];
  const filteredSamples =
    activeCropFilter === 'all'
      ? CROP_DISEASES
      : CROP_DISEASES.filter((s) => s.cropName.toLowerCase().includes(activeCropFilter.toLowerCase()));

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Branding Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white p-6 sm:p-10 shadow-xl border border-emerald-700/50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen Agricultural AI & IoT Ecosystem (2026)</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Agri<span className="text-emerald-400">Care</span> Crop Diagnostic Hub
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-normal">
              Empowering rural farmers with instant crop disease detection, zero-cost homemade remedies, calibrated
              fertilizer dosage schedules, and real-time ESP32 field sensor monitoring.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex flex-col items-center text-center w-full md:w-auto shadow-inner">
            <AgriLogo size="lg" showText={false} />
            <span className="mt-2 text-xs font-bold text-emerald-200">Sudarshana Model</span>
            <span className="text-[10px] text-emerald-300/80">Offline-Ready & Vernacular</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Capture & Upload Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center justify-center gap-2">
            <Camera className="w-6 h-6 text-emerald-600" />
            <span>Select Leaf Image for Diagnosis</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Capture a live photo using your phone or laptop camera, or browse and upload a leaf image from your device folders.
          </p>
        </div>

        {/* Dual Primary Action Buttons: Camera & Upload */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {/* Option 1: Live Camera Button */}
          <button
            onClick={() => {
              setSelectedImage(null);
              setIsCameraActive((prev) => !prev);
            }}
            className={`flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-bold text-base transition-all shadow-md active:scale-98 ${
              isCameraActive
                ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200 hover:shadow-lg'
            }`}
          >
            <Camera className="w-5 h-5" />
            <span>{isCameraActive ? t.stopCamera : t.cameraOption}</span>
          </button>

          {/* Option 2: Upload from Folders Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-bold text-base bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-md shadow-slate-300 hover:shadow-lg active:scale-98"
          >
            <Upload className="w-5 h-5" />
            <span>{t.uploadOption}</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {/* Live Camera Viewfinder Modal / Viewport */}
        {isCameraActive && (
          <div className="mt-8 max-w-xl mx-auto bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border-2 border-emerald-500/50 p-3 animate-fadeIn">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black flex items-center justify-center">
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />

              {/* Leaf Target Alignment Box */}
              <div className="absolute inset-8 border-2 border-dashed border-emerald-400/80 rounded-2xl pointer-events-none flex items-center justify-center">
                <span className="bg-emerald-950/80 text-emerald-300 text-xs px-3 py-1 rounded-full font-medium backdrop-blur">
                  Align leaf within this frame
                </span>
              </div>
            </div>

            {/* Viewfinder Controls */}
            <div className="flex items-center justify-between gap-4 mt-4 px-2">
              <button
                onClick={toggleCameraFacing}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{t.switchCamera}</span>
              </button>

              <button
                onClick={capturePhoto}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/30 transition-all"
              >
                <Camera className="w-4 h-4" />
                <span>{t.capturePhoto}</span>
              </button>

              <button
                onClick={() => setIsCameraActive(false)}
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-rose-500/20 text-rose-300 hover:bg-rose-500/30"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Drag & Drop Visual Box */}
        {!isCameraActive && !selectedImage && (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="mt-6 max-w-2xl mx-auto border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/40 rounded-2xl p-6 text-center cursor-pointer transition-all duration-200"
          >
            <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-xs sm:text-sm font-semibold text-slate-700">{t.dragDropText}</p>
            <p className="text-[11px] text-slate-400 mt-1">Supports JPG, PNG, WEBP from mobile gallery or PC</p>
          </div>
        )}

        {/* Scanning & Analyzing Animation Banner */}
        {isAnalyzing && (
          <div className="mt-8 max-w-2xl mx-auto bg-emerald-950 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
            {/* Visual laser scan bar */}
            <div
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#34d399] animate-pulse"
              style={{ top: `${analysisProgress}%`, transition: 'top 0.4s ease-out' }}
            ></div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-800/80 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-emerald-400 animate-spin" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-200">
                  <span>{t.analyzingText}</span>
                  <span>{analysisProgress}%</span>
                </div>
                <div className="w-full bg-emerald-900 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${analysisProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick 1-Click Sample Leaves Gallery */}
        <div className="mt-10 pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>{t.testSamples}</span>
              </h3>
              <p className="text-xs text-slate-500">
                Click any realistic leaf below for instant evaluation of healthy and affected states:
              </p>
            </div>

            {/* Filter by Crop Pills */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full">
              {sampleCrops.slice(0, 5).map((crop) => (
                <button
                  key={crop}
                  onClick={() => setActiveCropFilter(crop)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all ${
                    activeCropFilter === crop
                      ? 'bg-emerald-700 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {crop === 'all' ? 'All Crops' : crop.split('/')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filteredSamples.map((sample) => (
              <div
                key={sample.id}
                onClick={() => handleSampleClick(sample)}
                className={`group cursor-pointer rounded-2xl p-2.5 border transition-all duration-200 text-left hover:-translate-y-1 hover:shadow-md ${
                  diagnosisResult?.id === sample.id
                    ? 'border-emerald-500 bg-emerald-50/70 ring-2 ring-emerald-500/30'
                    : 'border-slate-200 bg-white hover:border-emerald-300'
                }`}
              >
                <SampleLeafVisual type={sample.imageType} className="w-full h-24 mb-2" />
                <div className="space-y-0.5">
                  <div className="text-[11px] font-bold text-slate-800 group-hover:text-emerald-700 truncate">
                    {sample.cropName}
                  </div>
                  <div
                    className={`text-[10px] font-semibold truncate ${
                      sample.status === 'healthy' ? 'text-emerald-600' : 'text-amber-600'
                    }`}
                  >
                    {sample.status === 'healthy' ? 'Healthy Crop' : sample.diseaseName}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comprehensive Diagnosis Results Display */}
      {diagnosisResult && (
        <div
          id="agri-prescription-card"
          className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-200 space-y-8 animate-fadeIn"
        >
          {/* Header Card: Crop Name, Disease Status Badge & Audio Button */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Diagnosis Result
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  Confidence: {diagnosisResult.confidence}%
                </span>
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                {diagnosisResult.cropName}
                <span className="ml-2 text-base font-normal text-slate-500 italic">
                  ({diagnosisResult.scientificName})
                </span>
              </h2>
              <p className="text-xs font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md inline-block">
                {diagnosisResult.cropLocal}
              </p>
            </div>

            {/* Status Badge & Action Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Healthy vs Affected Badge */}
              {diagnosisResult.status === 'healthy' ? (
                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-100 text-emerald-800 border-2 border-emerald-400 font-black text-sm sm:text-base shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>{t.healthyBadge}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-rose-100 text-rose-900 border-2 border-rose-400 font-black text-sm sm:text-base shadow-sm">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                  <span>{t.affectedBadge}</span>
                </div>
              )}

              {/* Digital Audio Voice Advisory Button */}
              <button
                onClick={toggleSpeech}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
                  isSpeaking
                    ? 'bg-amber-500 hover:bg-amber-600 text-white animate-pulse'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
                title="Hear prescription read aloud in selected language"
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{isSpeaking ? t.stopVoice : t.listenVoice}</span>
              </button>

              {/* Print Prescription Button */}
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-3 py-2 rounded-2xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300"
                title="Print digital advisory for local fertilizer shop"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">{t.printPrescription}</span>
              </button>
            </div>
          </div>

          {/* Condition Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Leaf Preview Card */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Diagnosed Leaf Specimen
                </span>
                {diagnosisResult.customImageSrc ? (
                  <img
                    src={diagnosisResult.customImageSrc}
                    alt="Captured Leaf"
                    className="w-full h-48 object-cover rounded-xl border border-slate-300 shadow-sm"
                  />
                ) : (
                  <SampleLeafVisual type={diagnosisResult.imageType} className="w-full h-48" />
                )}
              </div>

              {/* Pixel Health Breakdown */}
              <div className="mt-4 pt-4 border-t border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Chlorophyll Index:</span>
                  <span className="font-bold text-emerald-600">
                    {diagnosisResult.leafMetrics?.greenChlorophyllRatio || 85}%
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Lesion Tissue Area:</span>
                  <span className="font-bold text-rose-600">
                    {diagnosisResult.leafMetrics?.necrosisLesionRatio || (diagnosisResult.status === 'healthy' ? 0 : 42)}%
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Health Metric Score:</span>
                  <span className="font-bold text-slate-900">{diagnosisResult.healthScore} / 100</span>
                </div>
              </div>
            </div>

            {/* Right: Disease Info or Healthy Maintenance Guide */}
            <div className="lg:col-span-2 space-y-4">
              {diagnosisResult.status === 'healthy' ? (
                /* Healthy Crop Display */
                <div className="space-y-4">
                  <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200">
                    <h3 className="text-lg font-bold text-emerald-900 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                      <span>{t.healthyCareGuide}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-800 mt-2 leading-relaxed">
                      {diagnosisResult.overview}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <h4 className="text-xs font-bold text-slate-800 uppercase flex items-center gap-1.5 mb-1">
                        <Droplets className="w-4 h-4 text-blue-500" />
                        <span>Irrigation Scheduling</span>
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {diagnosisResult.healthyMaintenance?.irrigation}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <h4 className="text-xs font-bold text-slate-800 uppercase flex items-center gap-1.5 mb-1">
                        <Sparkles className="w-4 h-4 text-emerald-500" />
                        <span>Preventive Bio-Spray</span>
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {diagnosisResult.healthyMaintenance?.preventiveBioSpray}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <h4 className="text-xs font-bold text-slate-800 uppercase flex items-center gap-1.5 mb-1">
                        <FlaskConical className="w-4 h-4 text-purple-500" />
                        <span>Nutrient Top-Dressing</span>
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {diagnosisResult.healthyMaintenance?.nutrientPlan}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <h4 className="text-xs font-bold text-slate-800 uppercase flex items-center gap-1.5 mb-1">
                        <ShieldCheck className="w-4 h-4 text-amber-500" />
                        <span>Soil & Mulch Plan</span>
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {diagnosisResult.healthyMaintenance?.soilCare}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Affected Crop Display */
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-300">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-xl font-bold text-amber-950">
                        {diagnosisResult.diseaseName}
                      </h3>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 border border-amber-400">
                        {diagnosisResult.severity}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-amber-800 mt-0.5">
                      {diagnosisResult.diseaseLocal}
                    </p>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="font-bold text-slate-700">Pathogen:</span>{' '}
                        <span className="text-slate-600">{diagnosisResult.pathogen}</span>
                      </div>
                      <div>
                        <span className="font-bold text-slate-700">Weather Trigger:</span>{' '}
                        <span className="text-slate-600">{diagnosisResult.environmentalCause}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-700 mt-2 leading-relaxed bg-white/70 p-3 rounded-xl border border-amber-200">
                      <strong>Symptoms:</strong> {diagnosisResult.symptoms}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section: Homemade Remedies (Organic, Zero/Low Cost) */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{t.homemadeRemediesTitle}</h3>
                <p className="text-xs text-slate-500">
                  Organic natural recipes made from common rural household and farm ingredients
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {diagnosisResult.homemadeRemedies?.map((remedy, idx) => (
                <div
                  key={idx}
                  className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-200/80 hover:border-emerald-400 transition-all space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h4 className="text-xs font-bold text-emerald-950 leading-snug">{remedy.name}</h4>
                  </div>
                  <div className="text-[11px] text-slate-700 space-y-1">
                    <p>
                      <strong>Ingredients:</strong> {remedy.ingredients}
                    </p>
                    <p>
                      <strong>Preparation:</strong> {remedy.preparation}
                    </p>
                    <p className="text-emerald-800 font-medium">
                      <strong>Benefit:</strong> {remedy.benefits}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Recommended Fertilizers & Chemical/Bio Medicines */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700">
                <FlaskConical className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{t.fertilizersTitle}</h3>
                <p className="text-xs text-slate-500">
                  Available at local Krishi Seva Kendras, IFFCO centers, and agro-input stores
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {diagnosisResult.fertilizersMedicines?.map((fert, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 rounded-2xl p-4 border border-slate-200 hover:border-blue-400 transition-all space-y-1.5"
                >
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 uppercase">
                    {fert.type}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">{fert.name}</h4>
                  <p className="text-xs text-slate-600">
                    <strong>Local Brands:</strong> {fert.brands}
                  </p>
                  <p className="text-xs text-slate-500">
                    <strong>Mechanism:</strong> {fert.targetRole}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Application Frequency, Times Per Day & Schedule */}
          {diagnosisResult.dosageSchedule && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200 space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-700" />
                <h3 className="text-sm sm:text-base font-bold text-amber-950">{t.dosageTitle}</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="bg-white/80 p-3 rounded-xl border border-amber-200/80">
                  <span className="font-bold text-amber-900 block mb-0.5">{t.timesPerDay}:</span>
                  <span className="text-slate-700">{diagnosisResult.dosageSchedule.sprayTimesPerDay}</span>
                </div>
                <div className="bg-white/80 p-3 rounded-xl border border-amber-200/80">
                  <span className="font-bold text-amber-900 block mb-0.5">Application Frequency:</span>
                  <span className="text-slate-700">{diagnosisResult.dosageSchedule.frequency}</span>
                </div>
                <div className="bg-white/80 p-3 rounded-xl border border-amber-200/80">
                  <span className="font-bold text-amber-900 block mb-0.5">{t.waterRatioLabel}:</span>
                  <span className="text-slate-700">{diagnosisResult.dosageSchedule.waterRatio}</span>
                </div>
                <div className="bg-white/80 p-3 rounded-xl border border-amber-200/80">
                  <span className="font-bold text-amber-900 block mb-0.5">Optimal Time Window:</span>
                  <span className="text-slate-700">{diagnosisResult.dosageSchedule.timing}</span>
                </div>
              </div>

              <p className="text-xs text-amber-900 font-medium bg-amber-100/60 p-2.5 rounded-xl border border-amber-200">
                <strong>{t.precautionsLabel}:</strong> {diagnosisResult.dosageSchedule.precautions}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
