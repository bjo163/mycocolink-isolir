"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  Search,
  WifiOff,
  Clock,
  CreditCard,
  Shield,
  Zap,
  Activity,
  Radar,
  Terminal,
  Database,
  Cpu,
  Eye,
} from "lucide-react"
import axios from "axios"

// Mapping for subscription_state to label
const subscriptionStateMap: Record<string, string> = {
  "1_draft": "Quotation",
  "2_renewal": "Renewal Quotation",
  "3_progress": "In Progress",
  "4_paused": "Paused",
  "5_renewed": "Renewed",
  "6_churn": "Churned",
  "7_upsell": "Upsell",
};

export default function Component() {
  const [customerId, setCustomerId] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [customerData, setCustomerData] = useState<any>(null)
  const [scanProgress, setScanProgress] = useState(0)
  const [systemTime, setSystemTime] = useState(new Date())
  const [glitchActive, setGlitchActive] = useState(false)
  const [isProcessingFix, setIsProcessingFix] = useState(false)
  const [fixType, setFixType] = useState<string | null>(null)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingStage, setLoadingStage] = useState("INITIALIZING")

  useEffect(() => {
    // Initial loading sequence
    const loadingStages = [
      { stage: "INITIALIZING_NEURAL_NETWORK", duration: 800 },
      { stage: "CONNECTING_QUANTUM_SERVERS", duration: 1000 },
      { stage: "LOADING_SECURITY_PROTOCOLS", duration: 700 },
      { stage: "ESTABLISHING_HUD_INTERFACE", duration: 900 },
      { stage: "SYSTEM_READY", duration: 500 },
    ]

    let currentStageIndex = 0
    let currentProgress = 0

    const loadingInterval = setInterval(() => {
      currentProgress += Math.random() * 8 + 2

      if (currentProgress >= 100 && currentStageIndex < loadingStages.length - 1) {
        currentStageIndex++
        currentProgress = 0
        setLoadingStage(loadingStages[currentStageIndex].stage)
      }

      setLoadingProgress(Math.min(currentProgress, 100))

      if (currentStageIndex === loadingStages.length - 1 && currentProgress >= 100) {
        clearInterval(loadingInterval)
        setTimeout(() => {
          setIsInitialLoading(false)
        }, 500)
      }
    }, 100)

    // System time and glitch timers
    const timer = setInterval(() => {
      setSystemTime(new Date())
    }, 1000)

    const glitchTimer = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 8000)

    return () => {
      clearInterval(loadingInterval)
      clearInterval(timer)
      clearInterval(glitchTimer)
    }
  }, [])

  const handleCheck = async () => {
    if (!customerId.trim()) return

    setIsChecking(true)
    setScanProgress(0)
    setCustomerData(null)

    // Enhanced scanning animation
    const scanningStages = [
      "INITIATING_BIOMETRIC_SCAN",
      "ACCESSING_NEURAL_DATABASE",
      "DECRYPTING_CUSTOMER_DATA",
      "ANALYZING_THREAT_LEVEL",
      "COMPILING_SECURITY_REPORT",
      "SCAN_COMPLETE",
    ]

    let stageIndex = 0
    let progress = 0

    const progressInterval = setInterval(() => {
      progress += Math.random() * 12 + 3

      if (progress >= 100 && stageIndex < scanningStages.length - 1) {
        stageIndex++
        progress = 0
      }

      setScanProgress(Math.min(progress, 100))

      if (stageIndex === scanningStages.length - 1 && progress >= 100) {
        clearInterval(progressInterval)
      }
    }, 200)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_SERVER_BACKEND_URL ?? "https://backend-api.apps.mycocolink.com";
      const response = await axios.get(`${apiUrl}/api/v1/subscriptions`, {
        params: { cid: customerId }
      });
      const result = response.data?.data?.[0] ?? null;
      setCustomerData(result)
    } catch (error: any) {
      setCustomerData({ error: error?.response?.data?.message ?? "Terjadi kesalahan saat mengambil data." })
    } finally {
      setIsChecking(false)
      setScanProgress(0)
    }
  }

  // Initial Loading Screen
  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        {/* Complex Loading Background */}
        <div className="absolute inset-0">
          {/* Animated Grid */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "30px 30px",
              animation: "gridMove 20s linear infinite",
            }}
          />

          {/* Hexagonal Loading Pattern */}
          <div className="absolute inset-0 opacity-15">
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                <pattern id="loadingHex" x="0" y="0" width="120" height="104" patternUnits="userSpaceOnUse">
                  <polygon
                    points="60,2 110,28 110,80 60,106 10,80 10,28"
                    fill="none"
                    stroke="cyan"
                    strokeWidth="2"
                    opacity="0.5"
                  />
                  <circle cx="60" cy="54" r="8" fill="cyan" opacity="0.3">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                  </circle>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#loadingHex)" />
            </svg>
          </div>

          {/* Scanning Lines */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-400 to-transparent animate-pulse delay-1000"></div>
            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-pulse delay-500"></div>
            <div className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse delay-1500"></div>
          </div>
        </div>

        {/* Loading Content */}
        <div className="relative z-10 text-center max-w-md mx-auto px-4">
          {/* Logo Section */}
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg blur opacity-30 animate-pulse"></div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 tracking-wider font-mono mb-2">
              MYCOCOLINK
            </h1>
            <p className="text-sm text-cyan-400 uppercase tracking-widest font-mono">PT LENTERA ABADI SOLUSINET</p>
          </div>

          {/* Loading Animation */}
          <div className="mb-8">
            <div className="relative w-32 h-32 mx-auto mb-6">
              {/* Outer Ring */}
              <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full"></div>
              {/* Middle Ring */}
              <div className="absolute inset-4 border-2 border-blue-500/40 rounded-full animate-spin"></div>
              {/* Inner Ring */}
              <div
                className="absolute inset-8 border-2 border-purple-500/50 rounded-full animate-spin"
                style={{ animationDirection: "reverse" }}
              ></div>
              {/* Center Dot */}
              <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-cyan-500 rounded-full transform -translate-x-2 -translate-y-2 animate-pulse"></div>
              {/* Scanning Line */}
              <div className="absolute top-1/2 left-1/2 w-16 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent origin-left transform -translate-y-0.5 -translate-x-0 animate-spin"></div>
            </div>

            {/* Loading Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-cyan-400 mb-2 font-mono">
                <span>{loadingStage}</span>
                <span>{Math.round(loadingProgress)}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 relative"
                  style={{ width: `${loadingProgress}%` }}
                >
                  <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Loading Status */}
            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-center gap-2 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>NEURAL_NETWORK_ONLINE</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-cyan-400">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-300"></div>
                <span>QUANTUM_ENCRYPTION_ACTIVE</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-purple-400">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-600"></div>
                <span>SECURITY_PROTOCOLS_LOADED</span>
              </div>
            </div>
          </div>

          {/* System Info */}
          <div className="text-xs text-gray-500 font-mono">
            <p>SYSTEM_VERSION: 2.1.337</p>
            <p>BUILD: QUANTUM_STABLE</p>
            <p>INITIALIZING_HUD_INTERFACE...</p>
          </div>
        </div>

        <style jsx>{`
          @keyframes gridMove {
            0% { transform: translate(0, 0); }
            100% { transform: translate(30px, 30px); }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Complex Animated Background */}
      <div className="absolute inset-0">
        {/* Primary Grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px),
              linear-gradient(rgba(255, 0, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 0, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px, 20px 20px, 100px 100px, 100px 100px",
          }}
        />

        {/* Hexagonal Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="hexagons" x="0" y="0" width="100" height="87" patternUnits="userSpaceOnUse">
                <polygon points="50,1 95,25 95,75 50,99 5,75 5,25" fill="none" stroke="cyan" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons)" />
          </svg>
        </div>

        {/* Circuit Board Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="circuit" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <path d="M20,20 L180,20 L180,180 L20,180 Z" fill="none" stroke="rgba(0,255,255,0.3)" strokeWidth="2" />
                <circle cx="20" cy="20" r="3" fill="cyan" />
                <circle cx="180" cy="20" r="3" fill="cyan" />
                <circle cx="180" cy="180" r="3" fill="cyan" />
                <circle cx="20" cy="180" r="3" fill="cyan" />
                <path d="M100,20 L100,180" stroke="rgba(255,0,255,0.2)" strokeWidth="1" />
                <path d="M20,100 L180,100" stroke="rgba(255,0,255,0.2)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)" />
          </svg>
        </div>
      </div>

      {/* Radar Sweep Animation - Hidden on mobile */}
      <div className="absolute top-4 md:top-10 right-4 md:right-10 w-20 h-20 md:w-32 md:h-32">
        <div className="relative w-full h-full border-2 border-cyan-500/30 rounded-full">
          <div className="absolute inset-2 border border-cyan-500/20 rounded-full"></div>
          <div className="absolute inset-4 border border-cyan-500/10 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 w-8 md:w-16 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent origin-left transform -translate-y-0.5 -translate-x-0 animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-cyan-500 rounded-full transform -translate-x-1 -translate-y-1"></div>
        </div>
      </div>

      {/* Data Stream Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
        <div className="absolute top-40 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-400 to-transparent animate-pulse delay-500"></div>
        <div className="absolute top-60 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse delay-1000"></div>
      </div>

      {/* Glitch Effect */}
      {glitchActive && (
        <div className="absolute inset-0 bg-red-500/10 animate-pulse pointer-events-none z-50">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent transform skew-x-12"></div>
        </div>
      )}

      {/* Scanning Overlay */}
      {isChecking && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 flex items-center justify-center">
          <div className="text-center max-w-sm mx-auto px-4">
            {/* Scanning Animation */}
            <div className="relative w-40 h-40 mx-auto mb-8">
              {/* Outer Scanning Ring */}
              <div className="absolute inset-0 border-4 border-cyan-500/50 rounded-full animate-ping"></div>
              {/* Middle Ring */}
              <div className="absolute inset-8 border-2 border-blue-500/60 rounded-full animate-spin"></div>
              {/* Inner Ring */}
              <div
                className="absolute inset-16 border-2 border-purple-500/70 rounded-full animate-spin"
                style={{ animationDirection: "reverse" }}
              ></div>
              {/* Center Scanner */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Eye className="w-8 h-8 text-cyan-400 animate-pulse" />
              </div>
              {/* Scanning Beam */}
              <div className="absolute top-1/2 left-1/2 w-20 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent origin-left transform -translate-y-0.5 -translate-x-0 animate-spin"></div>
            </div>

            {/* Scanning Status */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-cyan-400 mb-2 font-mono">SCANNING_IN_PROGRESS</h3>
              <p className="text-gray-300 font-mono text-sm">ANALYZING_CUSTOMER_DATA...</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-cyan-400 mb-2 font-mono">
                <span>NEURAL_DATABASE_ACCESS</span>
                <span>{Math.round(scanProgress)}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-all duration-300 relative"
                  style={{ width: `${scanProgress}%` }}
                >
                  <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Scanning Details */}
            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-center gap-2 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>BIOMETRIC_VERIFICATION_ACTIVE</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-cyan-400">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-300"></div>
                <span>QUANTUM_ENCRYPTION_PROCESSING</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-purple-400">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-600"></div>
                <span>THREAT_ASSESSMENT_RUNNING</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-4 md:py-8">
        {/* Advanced HUD Header */}
        <div className="relative mb-8 md:mb-12">
          {/* System Status Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 text-xs font-mono gap-2 md:gap-4">
            <div className="flex flex-wrap items-center gap-2 md:gap-4">
              <span className="text-cyan-400">SYS_STATUS: ONLINE</span>
              <span className="text-green-400">NET_CONN: STABLE</span>
              <span className="text-yellow-400">SEC_LEVEL: HIGH</span>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <span className="text-cyan-400">{systemTime.toLocaleTimeString("en-US", { hour12: false })}</span>
              <span className="text-purple-400">UTC+07:00</span>
            </div>
          </div>

          {/* Main Header */}
          <div className="relative border-2 border-cyan-500/50 bg-black/80 backdrop-blur-sm">
            {/* Corner Decorations */}
            <div className="absolute -top-2 -left-2 w-4 h-4 md:w-6 md:h-6 border-l-2 border-t-2 border-cyan-500"></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 md:w-6 md:h-6 border-r-2 border-t-2 border-cyan-500"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 md:w-6 md:h-6 border-l-2 border-b-2 border-cyan-500"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 md:w-6 md:h-6 border-r-2 border-b-2 border-cyan-500"></div>

            <div className="p-4 md:p-8 text-center">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4 md:mb-6">
                <div className="relative">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg blur opacity-30 animate-pulse"></div>
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 tracking-wider font-mono">
                    MYCOCOLINK
                  </h1>
                  <p className="text-xs md:text-sm text-cyan-400 uppercase tracking-widest font-mono">
                    PT LENTERA ABADI SOLUSINET
                  </p>
                  <p className="text-xs text-gray-500 font-mono">NEURAL_NETWORK_INTERFACE_v2.1</p>
                </div>
              </div>

              {/* Critical Alert Panel */}
              <div className="relative border-2 border-red-500/70 bg-gradient-to-r from-red-900/20 to-red-800/20 backdrop-blur-sm">
                <div className="absolute inset-0 bg-red-500/5 animate-pulse"></div>

                {/* Alert Header */}
                <div className="bg-red-500/20 border-b border-red-500/50 p-2">
                  <div className="flex items-center justify-center gap-2 md:gap-3">
                    <WifiOff className="w-4 h-4 md:w-6 md:h-6 text-red-400 animate-pulse" />
                    <span className="text-red-400 font-mono text-xs md:text-sm tracking-wider">
                      CRITICAL_SYSTEM_ALERT
                    </span>
                    <AlertTriangle className="w-4 h-4 md:w-6 md:h-6 text-yellow-400 animate-bounce" />
                  </div>
                </div>

                <div className="p-4 md:p-6">
                  <h2 className="text-2xl md:text-4xl font-bold text-red-400 mb-2 md:mb-3 tracking-wider font-mono glitch-text">
                    SERVICE_ISOLATED
                  </h2>
                  <p className="text-gray-300 text-sm md:text-lg font-mono mb-3 md:mb-4">
                    {">"} CONNECTION_TERMINATED_BY_SYSTEM
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
                    <Badge className="bg-red-500/30 text-red-300 border-red-500/70 font-mono text-xs">
                      BILLING_VIOLATION
                    </Badge>
                    <Badge className="bg-yellow-500/30 text-yellow-300 border-yellow-500/70 font-mono text-xs">
                      ADMIN_OVERRIDE
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Scanner Interface */}
        <Card className="max-w-4xl mx-auto bg-black/90 border-2 border-cyan-500/50 backdrop-blur-sm relative overflow-hidden">
          {/* Scanning Animation */}
          {isChecking && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent animate-pulse z-10"></div>
          )}

          <CardHeader className="border-b-2 border-cyan-500/30 bg-gradient-to-r from-cyan-900/20 to-blue-900/20">
            <CardTitle className="text-cyan-400 flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3 font-mono text-lg md:text-xl">
              <div className="flex items-center gap-2 md:gap-3">
                <Terminal className="w-5 h-5 md:w-6 md:h-6" />
                <span className="text-sm md:text-xl">BIOMETRIC_SCANNER_INTERFACE</span>
              </div>
              <div className="flex items-center gap-2 md:ml-auto">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400">ACTIVE</span>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-4 md:p-8">
            <div className="space-y-4 md:space-y-6">
              {/* Scanner Input */}
              <div className="relative">
                <label className="block text-sm font-medium text-cyan-400 mb-3 uppercase tracking-wide font-mono">
                  {">"} CUSTOMER_ID_VERIFICATION_PROTOCOL
                </label>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded blur"></div>
                  <div className="relative flex flex-col md:flex-row gap-3 md:gap-4">
                    <div className="flex-1 relative">
                      <Input
                        type="text"
                        placeholder="ENTER_CUSTOMER_ID"
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value.toUpperCase())}
                        className="bg-black/80 border-2 border-cyan-500/50 text-cyan-300 placeholder:text-gray-600 focus:border-cyan-400 focus:ring-cyan-400/30 font-mono text-base md:text-lg h-12 md:h-14"
                      />
                      {customerId && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </div>
                    <Button
                      onClick={handleCheck}
                      disabled={isChecking || !customerId.trim()}
                      className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-6 md:px-8 h-12 md:h-14 font-mono text-sm md:text-lg border-2 border-cyan-500/50"
                    >
                      {isChecking ? (
                        <div className="flex items-center gap-2 md:gap-3">
                          <Radar className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                          <span className="hidden md:inline">SCANNING...</span>
                          <span className="md:hidden">SCAN...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 md:gap-3">
                          <Search className="w-4 h-4 md:w-5 md:h-5" />
                          <span className="hidden md:inline">INITIATE_SCAN</span>
                          <span className="md:hidden">SCAN</span>
                        </div>
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Customer Data Display */}
              {customerData && !customerData.error && (
                <>
                  <div className="relative border-2 border-cyan-500/50 bg-gradient-to-r from-cyan-900/10 to-blue-800/10 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-cyan-500/5 animate-pulse"></div>
                    <div className="bg-cyan-500/20 border-b border-cyan-500/50 p-3 md:p-4">
                      <h3 className="text-cyan-400 font-semibold flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3 font-mono text-base md:text-lg">
                        <div className="flex items-center gap-2 md:gap-3">
                          <Database className="w-4 h-4 md:w-5 md:h-5" />
                          <span>SUBSCRIPTION_STATUS</span>
                        </div>
                        <Badge className="bg-cyan-500/30 text-cyan-300 border-cyan-500/70 md:ml-auto text-xs">
                          {subscriptionStateMap[customerData.subscription_state] || customerData.subscription_state || "-"}
                        </Badge>
                      </h3>
                    </div>
                    <div className="p-4 md:p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 text-sm font-mono">
                        <div className="space-y-2">
                          <span className="text-gray-400 block">CID:</span>
                          <span className="text-cyan-300 font-bold text-base md:text-lg">{customerData.cid}</span>
                        </div>
                        <div className="space-y-2">
                          <span className="text-gray-400 block">NAMA:</span>
                          <span className="text-white font-bold">{customerData.partner_id?.[1]}</span>
                        </div>
                        <div className="space-y-2">
                          <span className="text-gray-400 block">PAKET:</span>
                          <span className="text-cyan-300">{customerData.sale_order_template_id?.[1]}</span>
                        </div>
                        <div className="space-y-2">
                          <span className="text-gray-400 block">STATUS INVOICE:</span>
                          <Badge className="bg-yellow-500/30 text-yellow-300 border-yellow-500/70 text-xs">
                            {customerData.invoice_status}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <span className="text-gray-400 block">TAGIHAN:</span>
                          <span className="text-red-400 font-bold text-base md:text-lg">
                            {customerData.amount_total?.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <span className="text-gray-400 block">TELEPON:</span>
                          <span className="text-cyan-200">{customerData.phone}</span>
                        </div>
                        <div className="space-y-2">
                          <span className="text-gray-400 block">ALAMAT:</span>
                          <span className="text-cyan-200">{customerData.street}, {customerData.city}, {customerData.state_id?.[1]}, {customerData.country_id?.[1]}</span>
                        </div>
                        <div className="space-y-2">
                          <span className="text-gray-400 block">TGL MULAI:</span>
                          <span className="text-cyan-200">{customerData.start_date}</span>
                        </div>
                        <div className="space-y-2">
                          <span className="text-gray-400 block">TGL TAGIHAN BERIKUTNYA:</span>
                          <span className="text-cyan-200">{customerData.next_invoice_date}</span>
                        </div>
                        <div className="space-y-2 md:col-span-2 lg:col-span-3">
                          <span className="text-gray-400 block">CATATAN:</span>
                          <span className="text-cyan-100" dangerouslySetInnerHTML={{ __html: customerData.note || "-" }} />
                        </div>
                      </div>
                    </div>
                    {/* Data Layanan Internet */}
                    {customerData.zms_services && customerData.zms_services.length > 0 && (
                      <div className="border-t border-cyan-500/30 p-4 md:p-6">
                        <h4 className="text-cyan-400 font-bold mb-4 font-mono text-base md:text-lg flex items-center gap-2">
                          <Cpu className="w-4 h-4 md:w-5 md:h-5" />
                          LAYANAN INTERNET
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 text-sm font-mono">
                          <div className="space-y-2">
                            <span className="text-gray-400 block">STATUS KONEKSI:</span>
                            <Badge className={"text-xs " + (customerData.zms_services[0].state === "online" ? "bg-green-500/30 text-green-300 border-green-500/70" : "bg-red-500/30 text-red-300 border-red-500/70")}>{customerData.zms_services[0].state}</Badge>
                          </div>
                          <div className="space-y-2">
                            <span className="text-gray-400 block">USERNAME:</span>
                            <span className="text-cyan-200">{customerData.zms_services[0].username}</span>
                          </div>
                          <div className="space-y-2">
                            <span className="text-gray-400 block">IP ADDRESS:</span>
                            <span className="text-cyan-200">{customerData.zms_services[0].online_framed_ipaddr}</span>
                          </div>
                          <div className="space-y-2">
                            <span className="text-gray-400 block">MAC ADDRESS:</span>
                            <span className="text-cyan-200">{customerData.zms_services[0].online_mac_addr}</span>
                          </div>
                          <div className="space-y-2">
                            <span className="text-gray-400 block">LAMA KONEKSI:</span>
                            <span className="text-cyan-200">{customerData.zms_services[0].online_acct_session_time_str}</span>
                          </div>
                          <div className="space-y-2">
                            <span className="text-gray-400 block">DOWNLOAD:</span>
                            <span className="text-cyan-200">{customerData.zms_services[0].online_acct_input_total_str}</span>
                          </div>
                          <div className="space-y-2">
                            <span className="text-gray-400 block">UPLOAD:</span>
                            <span className="text-cyan-200">{customerData.zms_services[0].online_acct_output_total_str}</span>
                          </div>
                          <div className="space-y-2">
                            <span className="text-gray-400 block">SISA MASA AKTIF:</span>
                            <span className="text-cyan-200">{customerData.zms_services[0].expired_time_str}</span>
                          </div>
                          <div className="space-y-2">
                            <span className="text-gray-400 block">PAKET INTERNET:</span>
                            <span className="text-cyan-200">{customerData.zms_services[0].profile_details?.name}</span>
                          </div>
                          <div className="space-y-2">
                            <span className="text-gray-400 block">BANDWIDTH:</span>
                            <span className="text-cyan-200">{customerData.zms_services[0].profile_details?.bandwidth_up_mbps} / {customerData.zms_services[0].profile_details?.bandwidth_down_mbps} Mbps</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Fix Action Panel */}
                  <div className="mt-6 md:mt-8 relative border-2 border-green-500/50 bg-gradient-to-r from-green-900/10 to-emerald-800/10 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-green-500/5 animate-pulse"></div>
                    <div className="bg-green-500/20 border-b border-green-500/50 p-3 md:p-4">
                      <div className="flex items-center justify-center gap-2 md:gap-3">
                        <Zap className="w-5 h-5 md:w-6 md:h-6 text-green-400 animate-pulse" />
                        <span className="text-green-400 font-mono text-sm md:text-lg tracking-wider">
                          RESOLUTION_PROTOCOLS_AVAILABLE
                        </span>
                        <Activity className="w-5 h-5 md:w-6 md:h-6 text-green-400 animate-pulse" />
                      </div>
                    </div>
                    <div className="p-4 md:p-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {/* Fix Payment Button */}
                        <div className="relative group">
                          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                          <Button
                            onClick={() => {
                              setIsProcessingFix(true)
                              setFixType("PAYMENT")
                              setTimeout(() => {
                                setIsProcessingFix(false)
                                setFixType(null)
                                alert("Payment portal initiated! Redirecting to secure payment gateway...")
                              }, 3000)
                            }}
                            disabled={isProcessingFix}
                            className="relative w-full h-16 md:h-20 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white border-2 border-cyan-500/50 font-mono text-sm md:text-lg group-hover:scale-105 transition-all duration-300"
                          >
                            <div className="flex flex-col items-center gap-1 md:gap-2">
                              {isProcessingFix && fixType === "PAYMENT" ? (
                                <>
                                  <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                  <span className="text-xs md:text-base">INITIALIZING...</span>
                                </>
                              ) : (
                                <>
                                  <CreditCard className="w-6 h-6 md:w-8 md:h-8" />
                                  <span className="text-xs md:text-base">FIX_PAYMENT_ISSUE</span>
                                  <span className="text-xs opacity-80 hidden md:block">SECURE_GATEWAY_ACCESS</span>
                                </>
                              )}
                            </div>
                          </Button>
                        </div>
                        {/* Fix Administration Button */}
                        <div className="relative group">
                          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                          <Button
                            onClick={() => {
                              setIsProcessingFix(true)
                              setFixType("ADMIN")
                              setTimeout(() => {
                                setIsProcessingFix(false)
                                setFixType(null)
                                alert("Administration request submitted! Support team will contact you within 15 minutes.")
                              }, 3000)
                            }}
                            disabled={isProcessingFix}
                            className="relative w-full h-16 md:h-20 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white border-2 border-purple-500/50 font-mono text-sm md:text-lg group-hover:scale-105 transition-all duration-300"
                          >
                            <div className="flex flex-col items-center gap-1 md:gap-2">
                              {isProcessingFix && fixType === "ADMIN" ? (
                                <>
                                  <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                  <span className="text-xs md:text-base">CONTACTING...</span>
                                </>
                              ) : (
                                <>
                                  <Shield className="w-6 h-6 md:w-8 md:h-8" />
                                  <span className="text-xs md:text-base">FIX_ADMINISTRATION</span>
                                  <span className="text-xs opacity-80 hidden md:block">SUPPORT_TEAM_ACCESS</span>
                                </>
                              )}
                            </div>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {/* Error Display */}
              {customerData && customerData.error && (
                <div className="p-4 bg-red-900/40 border border-red-500 text-red-300 rounded font-mono text-center">
                  {customerData.error}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Advanced Information Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12 max-w-6xl mx-auto">
          <Card className="bg-black/90 border-2 border-yellow-500/50 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5"></div>
            <CardContent className="p-4 md:p-6 text-center relative z-10">
              <div className="relative mb-3 md:mb-4">
                <CreditCard className="w-8 h-8 md:w-12 md:h-12 text-yellow-400 mx-auto" />
                <div className="absolute -inset-2 bg-yellow-500/20 rounded-full blur animate-pulse"></div>
              </div>
              <h3 className="text-yellow-400 font-semibold mb-2 md:mb-3 font-mono text-sm md:text-base">
                PAYMENT_PROTOCOL
              </h3>
              <p className="text-gray-300 text-xs md:text-sm font-mono leading-relaxed">
                {">"} IMMEDIATE_SETTLEMENT_REQUIRED
                <br />
                {">"} AUTO_RESTORE_ENABLED
                <br />
                {">"} REAL_TIME_PROCESSING
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/90 border-2 border-blue-500/50 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5"></div>
            <CardContent className="p-4 md:p-6 text-center relative z-10">
              <div className="relative mb-3 md:mb-4">
                <Activity className="w-8 h-8 md:w-12 md:h-12 text-blue-400 mx-auto animate-pulse" />
                <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur animate-pulse"></div>
              </div>
              <h3 className="text-blue-400 font-semibold mb-2 md:mb-3 font-mono text-sm md:text-base">
                24/7_NEURAL_SUPPORT
              </h3>
              <p className="text-gray-300 text-xs md:text-sm font-mono leading-relaxed">
                {">"} QUANTUM_COMMUNICATION
                <br />
                {">"} INSTANT_RESPONSE_SYSTEM
                <br />
                {">"} AI_ASSISTED_RESOLUTION
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/90 border-2 border-green-500/50 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5"></div>
            <CardContent className="p-4 md:p-6 text-center relative z-10">
              <div className="relative mb-3 md:mb-4">
                <Zap className="w-8 h-8 md:w-12 md:h-12 text-green-400 mx-auto" />
                <div className="absolute -inset-2 bg-green-500/20 rounded-full blur animate-pulse"></div>
              </div>
              <h3 className="text-green-400 font-semibold mb-2 md:mb-3 font-mono text-sm md:text-base">
                AUTO_RESTORATION
              </h3>
              <p className="text-gray-300 text-xs md:text-sm font-mono leading-relaxed">
                {">"} INSTANT_REACTIVATION
                <br />
                {">"} ZERO_DOWNTIME_PROTOCOL
                <br />
                {">"} QUANTUM_VERIFICATION
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Contact Matrix */}
        <Card className="max-w-4xl mx-auto mt-8 md:mt-12 bg-black/90 border-2 border-cyan-500/50 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"></div>
          <CardContent className="p-4 md:p-8 relative z-10">
            <h3 className="text-cyan-400 font-semibold mb-4 md:mb-6 text-center font-mono text-lg md:text-xl">
              EMERGENCY_COMMUNICATION_MATRIX
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 text-xs md:text-sm font-mono">
              <div className="text-center border border-cyan-500/30 p-3 md:p-4 bg-black/50">
                <Cpu className="w-6 h-6 md:w-8 md:h-8 text-cyan-400 mx-auto mb-2" />
                <p className="text-gray-400 mb-1 text-xs">VOICE_CHANNEL</p>
                <p className="text-cyan-300 font-bold text-xs md:text-sm">0800-1234-5678</p>
              </div>
              <div className="text-center border border-green-500/30 p-3 md:p-4 bg-black/50">
                <Terminal className="w-6 h-6 md:w-8 md:h-8 text-green-400 mx-auto mb-2" />
                <p className="text-gray-400 mb-1 text-xs">WHATSAPP_PROTOCOL</p>
                <p className="text-green-300 font-bold text-xs md:text-sm">+62 812-3456-7890</p>
              </div>
              <div className="text-center border border-purple-500/30 p-3 md:p-4 bg-black/50">
                <Database className="w-6 h-6 md:w-8 md:h-8 text-purple-400 mx-auto mb-2" />
                <p className="text-gray-400 mb-1 text-xs">EMAIL_GATEWAY</p>
                <p className="text-purple-300 font-bold text-xs md:text-sm">support@mycocolink.com</p>
              </div>
              <div className="text-center border border-yellow-500/30 p-3 md:p-4 bg-black/50">
                <Clock className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-gray-400 mb-1 text-xs">OPERATION_CYCLE</p>
                <p className="text-yellow-300 font-bold text-xs md:text-sm">24/7 ACTIVE</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Footer */}
        <div className="text-center mt-8 md:mt-16 text-gray-500 text-xs md:text-sm font-mono space-y-2">
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-4">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs md:text-sm">SYSTEM_OPERATIONAL</span>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-500"></div>
            <span className="text-xs md:text-sm">NEURAL_LINK_STABLE</span>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
          </div>
          <p className="text-xs md:text-sm">© 2024 PT LENTERA ABADI SOLUSINET - MYCOCOLINK_NEURAL_NETWORK</p>
          <p className="text-xs md:text-sm">AUTHORIZED_QUANTUM_INTERNET_SERVICE_PROVIDER</p>
          <p className="text-xs text-gray-600">SYSTEM_VERSION: 2.1.337 | BUILD: QUANTUM_STABLE</p>
        </div>
      </div>

      {/* Advanced Scanning Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-400 to-transparent animate-pulse opacity-50 delay-1000"></div>
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-pulse opacity-30 delay-500"></div>
        <div className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse opacity-30 delay-1500"></div>
      </div>
    </div>
  )
}
