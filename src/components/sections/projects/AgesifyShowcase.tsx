'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldAlert, ShieldCheck, Play, RefreshCw, Cpu, Server, Activity, AlertTriangle, CheckCircle2, Lock } from 'lucide-react';

interface AttackScenario {
  id: string;
  name: string;
  type: string;
  payload: string;
  rawSample: string;
  cnnFeature: string;
  lstmCadence: string;
  transformerScore: number;
  mitigationAction: string;
}

const ATTACK_SCENARIOS: AttackScenario[] = [
  {
    id: 'sqli',
    name: 'SQL Injection Attempt',
    type: 'Web Application Exploit',
    payload: "UNION SELECT username, password_hash FROM admin_users WHERE '1'='1'--",
    rawSample: 'GET /api/v1/users?id=1%27%20UNION%20SELECT%20username%2Cpassword_hash... HTTP/1.1',
    cnnFeature: 'Identified SQL syntax token pattern in query string parameter',
    lstmCadence: 'Single burst query matching automated exploitation tool signature',
    transformerScore: 97.4,
    mitigationAction: 'AWS WAF Rule: Add source IP to Blocked-SQLi-IPSET (Immediate Drop)',
  },
  {
    id: 'ddos',
    name: 'DDoS SYN Flood',
    type: 'Volumetric / Network Layer',
    payload: 'High-frequency spoofed TCP SYN packets on port 443 (18,400 pkt/s)',
    rawSample: 'TCP [SYN] Seq=0 Win=1024 Len=0 Flags=[S] SourceIP=Spool(185.220.*.*)',
    cnnFeature: 'Packet header entropy indicates randomized source port spoofing',
    lstmCadence: 'Cadence exceeds baseline by 820% over 250ms sliding window',
    transformerScore: 98.2,
    mitigationAction: 'AWS WAF Rate-Based Rule: Trigger 2000 req/5min throttle & drop',
  },
  {
    id: 'portscan',
    name: 'Nmap Stealth Port Scan',
    type: 'Reconnaissance / Probe',
    payload: 'Half-open SYN scan probing ports 21, 22, 80, 443, 3306, 5432, 8080',
    rawSample: 'TCP [SYN] Dport=3306 ... TCP [SYN] Dport=5432 ... Seq scan interval 12ms',
    cnnFeature: 'Linear incremental destination port traversal sequence detected',
    lstmCadence: 'Periodic 12ms inter-arrival packet cadence signature',
    transformerScore: 96.8,
    mitigationAction: 'AWS GuardDuty Finding: Recon:EC2/Portscan -> Auto Quarantine Lambda',
  },
  {
    id: 'bruteforce',
    name: 'Credential Stuffing Attack',
    type: 'Authentication Abuse',
    payload: 'POST /auth/login with rotating dictionary payloads (120 req/min)',
    rawSample: 'POST /auth/login HTTP/1.1 Content-Type: application/json {"user":"admin"...}',
    cnnFeature: 'Repetitive payload structural fingerprint with varied credential hashes',
    lstmCadence: 'Strict programmatic cadence indicative of headless browser botnet',
    transformerScore: 97.1,
    mitigationAction: 'AWS WAF Bot Control: Challenge triggered; persistent IP blacklisted',
  },
];

export function AgesifyShowcase() {
  const [selectedScenario, setSelectedScenario] = useState<AttackScenario>(ATTACK_SCENARIOS[0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(true);
  const [activePipelineStage, setActivePipelineStage] = useState<number>(3); // 0: Idle, 1: CNN, 2: BiLSTM, 3: Transformer + AWS

  const runSimulation = (scenario: AttackScenario) => {
    setSelectedScenario(scenario);
    setIsSimulating(true);
    setSimulationComplete(false);
    setActivePipelineStage(1);

    setTimeout(() => {
      setActivePipelineStage(2);
      setTimeout(() => {
        setActivePipelineStage(3);
        setIsSimulating(false);
        setSimulationComplete(true);
      }, 500);
    }, 500);
  };

  return (
    <div className="w-full bg-white text-slate-900 rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-6 shadow-sm font-sans">
      
      {/* Simulation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-900" />
            <span className="text-[11px] font-mono font-bold tracking-widest text-slate-500 uppercase">
              INTERACTIVE ARCHITECTURE SIMULATION
            </span>
          </div>
          <h4 className="font-display font-bold text-lg text-slate-900">
            AGESIFY — Hybrid Deep Learning NIDS & AWS Cloud Defense
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-slate-500">Model Testbed Accuracy:</span>
          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-900 border border-slate-300 text-xs font-mono font-bold">
            97.1% VERIFIED
          </span>
        </div>
      </div>

      {/* Scenario Selection Grid */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider block">
          Select Simulated Attack Vector to Test Pipeline:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {ATTACK_SCENARIOS.map((scenario) => {
            const isSelected = selectedScenario.id === scenario.id;
            return (
              <button
                key={scenario.id}
                onClick={() => runSimulation(scenario)}
                disabled={isSimulating}
                className={`p-3 rounded-xl border text-left transition-all font-mono text-xs flex flex-col justify-between space-y-1 ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-400 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold truncate">{scenario.name}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <span className={`text-[10px] truncate ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>{scenario.type}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Simulated Live Neural Inference Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2">
        
        {/* Left Column: Raw Traffic Ingestion */}
        <div className="lg:col-span-5 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-slate-600">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-900">INGESTED PACKET SAMPLE</span>
            <Activity className="w-3.5 h-3.5 text-slate-600" />
          </div>

          <div className="space-y-1.5">
            <div className="text-[11px] text-slate-500">PAYLOAD INSPECTION:</div>
            <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 font-mono text-[11px] break-all leading-tight">
              {selectedScenario.payload}
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="text-[11px] text-slate-500">RAW TELEMETRY:</div>
            <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 font-mono text-[10px] break-all">
              {selectedScenario.rawSample}
            </div>
          </div>
        </div>

        {/* Right Column: 3-Stage Deep Learning & AWS Defense */}
        <div className="lg:col-span-7 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 font-mono text-xs text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-900">HYBRID DEEP MODEL INFERENCE</span>
            <span className="text-slate-900 font-semibold">
              {isSimulating ? 'INFERRING...' : 'MITIGATION ACTIVE'}
            </span>
          </div>

          {/* Pipeline Step 1: 1D CNN */}
          <div className={`p-3 rounded-lg border transition-all text-xs space-y-1 ${
            activePipelineStage >= 1 ? 'bg-white border-slate-300 text-slate-900 shadow-sm' : 'bg-slate-100/60 border-slate-200 text-slate-400'
          }`}>
            <div className="flex items-center justify-between font-mono font-semibold">
              <span className="text-slate-900">01. SPATIAL EXTRACTION (1D CNN)</span>
              <span className="text-[10px] text-slate-500">Packet Header Features</span>
            </div>
            <p className="text-[11px] font-sans text-slate-600">
              {selectedScenario.cnnFeature}
            </p>
          </div>

          {/* Pipeline Step 2: BiLSTM */}
          <div className={`p-3 rounded-lg border transition-all text-xs space-y-1 ${
            activePipelineStage >= 2 ? 'bg-white border-slate-300 text-slate-900 shadow-sm' : 'bg-slate-100/60 border-slate-200 text-slate-400'
          }`}>
            <div className="flex items-center justify-between font-mono font-semibold">
              <span className="text-slate-900">02. TEMPORAL CADENCE (BiLSTM)</span>
              <span className="text-[10px] text-slate-500">Inter-arrival Timing</span>
            </div>
            <p className="text-[11px] font-sans text-slate-600">
              {selectedScenario.lstmCadence}
            </p>
          </div>

          {/* Pipeline Step 3: Transformer Attention & AWS Action */}
          <div className={`p-3 rounded-lg border transition-all text-xs space-y-2 ${
            activePipelineStage >= 3 ? 'bg-white border-slate-400 text-slate-900 shadow-sm' : 'bg-slate-100/60 border-slate-200 text-slate-400'
          }`}>
            <div className="flex items-center justify-between font-mono font-semibold">
              <span className="text-slate-900">03. MULTI-HEAD ATTENTION & AWS MITIGATION</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 text-white font-bold text-[10px]">
                {selectedScenario.transformerScore}% Confidence
              </span>
            </div>
            <div className="p-2 rounded bg-slate-100 border border-slate-300 font-mono text-[11px] text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-slate-900" />
              <span>{selectedScenario.mitigationAction}</span>
            </div>
          </div>

        </div>

      </div>

      {/* Verification Notice */}
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-500">
        <span>IC3SE 2025 Conference Presentation</span>
        <span>23+ Attack Classes Evaluated</span>
      </div>

    </div>
  );
}

export default AgesifyShowcase;
