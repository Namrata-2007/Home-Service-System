import React, { useState } from 'react';
import { 
  X, 
  Database, 
  Code2, 
  Copy, 
  Check, 
  Download, 
  FileCode, 
  Server, 
  ShieldAlert,
  Layers,
  Table
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MYSQL_SCHEMA_SQL, PHP_SCRIPTS } from '../data/projectPhpSql';

export const ProjectArchitectureModal: React.FC = () => {
  const { isPhpSqlModalOpen, setIsPhpSqlModalOpen, addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'sql' | 'php' | 'architecture'>('sql');
  const [activePhpFile, setActivePhpFile] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!isPhpSqlModalOpen) return null;

  const currentPhpScript = PHP_SCRIPTS[activePhpFile];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    addToast('Code copied to clipboard!', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    addToast(`Downloaded ${filename}`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 text-slate-100 rounded-2xl shadow-2xl max-w-4xl w-full my-auto overflow-hidden border border-slate-700 flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-800/90 px-6 py-4 border-b border-slate-700 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">
                  Academic Project Deliverables Hub
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-700">
                  PHP + MySQL Stack
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Official backend architecture, database schema, and source files for college evaluation
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsPhpSqlModalOpen(false)}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-700 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Bar */}
        <div className="flex border-b border-slate-700 bg-slate-800/40 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('sql')}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 transition cursor-pointer ${
              activeTab === 'sql'
                ? 'border-blue-500 text-blue-400 bg-slate-800'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Table className="w-4 h-4 text-cyan-400" />
            <span>MySQL Schema (schema.sql)</span>
          </button>

          <button
            onClick={() => setActiveTab('php')}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 transition cursor-pointer ${
              activeTab === 'php'
                ? 'border-blue-500 text-blue-400 bg-slate-800'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-4 h-4 text-emerald-400" />
            <span>PHP Backend Scripts ({PHP_SCRIPTS.length} files)</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 transition cursor-pointer ${
              activeTab === 'architecture'
                ? 'border-blue-500 text-blue-400 bg-slate-800'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span>Architecture & ER Diagram</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* TAB 1: MySQL Schema */}
          {activeTab === 'sql' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-800 p-3 rounded-xl border border-slate-700">
                <div>
                  <p className="text-sm font-semibold text-white">schema.sql (Database: home_service_db)</p>
                  <p className="text-xs text-slate-400">
                    Defines tables for users, services, bookings, administrators, technicians, and inquiries.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(MYSQL_SCHEMA_SQL)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-medium transition cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy SQL'}</span>
                  </button>
                  <button
                    onClick={() => handleDownload('home_service_schema.sql', MYSQL_SCHEMA_SQL)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .sql</span>
                  </button>
                </div>
              </div>

              {/* Code display */}
              <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto max-h-[500px] leading-relaxed">
                  {MYSQL_SCHEMA_SQL}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 2: PHP Scripts */}
          {activeTab === 'php' && (
            <div className="space-y-4">
              {/* File selector pill bar */}
              <div className="flex flex-wrap gap-2">
                {PHP_SCRIPTS.map((script, idx) => (
                  <button
                    key={script.fileName}
                    onClick={() => setActivePhpFile(idx)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer border ${
                      activePhpFile === idx
                        ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{script.fileName}</span>
                  </button>
                ))}
              </div>

              {/* Current script details */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-800 p-3 rounded-xl border border-slate-700">
                <div>
                  <p className="text-sm font-semibold text-white">{currentPhpScript.title} ({currentPhpScript.fileName})</p>
                  <p className="text-xs text-slate-400">{currentPhpScript.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(currentPhpScript.code)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-medium transition cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                  <button
                    onClick={() => handleDownload(currentPhpScript.fileName, currentPhpScript.code)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .php</span>
                  </button>
                </div>
              </div>

              {/* Code display */}
              <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto max-h-[500px] leading-relaxed">
                  {currentPhpScript.code}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: Architecture & ER Diagram */}
          {activeTab === 'architecture' && (
            <div className="space-y-6 text-xs text-slate-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <Server className="w-4 h-4 text-blue-400" />
                    System Architecture Workflow
                  </h4>
                  <ol className="list-decimal list-inside space-y-2 text-slate-300">
                    <li><strong className="text-white">Customer Tier:</strong> Responsive UI created with HTML5, CSS3, JavaScript / React for cross-device compatibility.</li>
                    <li><strong className="text-white">API Gateway / PHP Controller:</strong> Receives REST POST/GET payloads, performs input sanitization, and session checks.</li>
                    <li><strong className="text-white">Security & Hashing:</strong> Utilizes PHP's <code>password_hash(PASSWORD_BCRYPT)</code> and PDO Prepared Statements to prevent SQL injection.</li>
                    <li><strong className="text-white">MySQL Storage:</strong> Relational tables with Foreign Key constraints (CASCADE / RESTRICT) maintaining referential integrity.</li>
                    <li><strong className="text-white">Admin Privileges:</strong> Protected portal allowing supervisors to manage bookings, assign technicians, and calibrate prices.</li>
                  </ol>
                </div>

                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <Table className="w-4 h-4 text-emerald-400" />
                    Database Relational Entities (ER Summary)
                  </h4>
                  <ul className="space-y-2 text-slate-300">
                    <li><strong className="text-cyan-400">users</strong> (1) ───&lt; (N) <strong className="text-amber-400">bookings</strong>: Each registered customer can place multiple bookings over time.</li>
                    <li><strong className="text-cyan-400">services</strong> (1) ───&lt; (N) <strong className="text-amber-400">bookings</strong>: Each service category can be booked by various customers.</li>
                    <li><strong className="text-cyan-400">technicians</strong> (1) ───&lt; (N) <strong className="text-amber-400">bookings</strong>: Supervisors assign available certified technicians to specific booking slots.</li>
                    <li><strong className="text-cyan-400">administrators</strong>: Independent credential table storing supervisor access levels.</li>
                  </ul>
                </div>
              </div>

              {/* Security & Academic evaluation checklist */}
              <div className="bg-slate-800/60 p-4 rounded-xl border border-blue-900/60">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-cyan-400" />
                  Academic Viva / Examination Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-300">
                  <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-700/60">
                    <p className="font-semibold text-white">Input Validation</p>
                    <p className="text-[11px] text-slate-400 mt-1">Both client-side regex checking and server-side PHP filter_var() validate emails and phone formats.</p>
                  </div>
                  <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-700/60">
                    <p className="font-semibold text-white">SQL Injection Prevention</p>
                    <p className="text-[11px] text-slate-400 mt-1">100% parameter binding through PDO prepared statements across all insertion and update queries.</p>
                  </div>
                  <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-700/60">
                    <p className="font-semibold text-white">Scalable Normalized Schema</p>
                    <p className="text-[11px] text-slate-400 mt-1">Third Normal Form (3NF) compliant relational schema with foreign key cascades and timestamp audits.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
