import React, { useState } from 'react';
import { SCHOOL_CREST_LOGO, CAMPUS_QUADRANGLE_IMAGE } from '../data/portalData';

interface LoginViewProps {
  onLogin: (role: string, email: string) => void;
  onShowToast: (msg: string) => void;
}

export function LoginView({ onLogin, onShowToast }: LoginViewProps) {
  const [email, setEmail] = useState('admin.radhakrishnan@peevees.edu.in');
  const [password, setPassword] = useState('PeeveesAdmin#2026');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Super Admin');
  const [session, setSession] = useState('2026-2027');

  const handleRolePreset = (role: string, roleEmail: string) => {
    setSelectedRole(role);
    setEmail(roleEmail);
    onShowToast(`Simulated role switched to ${role} (${roleEmail}).`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(selectedRole, email);
    onShowToast(`Authenticated as ${selectedRole}. Welcome to Peevees Public School Admin Portal.`);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl bg-surface-container-lowest rounded-xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-surface-container">
        {/* Institutional Heritage & Legacy Left Panel (5 cols) */}
        <div className="lg:w-5/12 bg-primary-container text-on-primary p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          {/* Ambient Glow Accents */}
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-secondary/15 blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-tertiary-fixed/10 blur-3xl pointer-events-none"></div>

          {/* Panel Header */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-on-primary/10 rounded-full px-3 py-1 mb-4">
              <span className="w-2 h-2 rounded-full bg-tertiary-fixed animate-pulse"></span>
              <span className="font-label-xs text-tertiary-fixed uppercase tracking-wider">Enterprise Management Node</span>
            </div>
            <p className="font-headline-sm text-surface-container tracking-tight">Executive Governance &amp; Administrative Suite</p>
          </div>

          {/* Campus Visual Canvas */}
          <div className="relative z-10 my-6">
            <div className="relative w-full h-40 rounded-lg overflow-hidden bg-primary shadow-md">
              <img
                className="w-full h-full object-cover opacity-85 hover:opacity-100 transition-opacity duration-500"
                src={CAMPUS_QUADRANGLE_IMAGE}
                alt="Main Campus Quadrangle"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-transparent to-transparent"></div>
              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                <span className="font-label-xs text-surface-dim font-medium tracking-wide">Main Campus Quadrangle</span>
                <span className="font-label-xs bg-primary/80 text-primary-fixed-dim px-2 py-0.5 rounded">Zone 01 • Admin Block</span>
              </div>
            </div>
          </div>

          {/* Panel Footer: Motto & Stats */}
          <div className="relative z-10 space-y-4">
            <div className="bg-on-primary/5 rounded-lg p-4 border border-white/5">
              <p className="font-label-xs uppercase text-tertiary-fixed font-bold tracking-widest mb-1">Institutional Motto</p>
              <p className="font-headline-sm italic text-surface-container font-light leading-snug">
                “Excellence in Character, Leadership &amp; Knowledge since 1994”
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="bg-on-primary/5 rounded-md p-3 border border-white/5">
                <span className="font-label-xs text-on-primary-container block">Active Students</span>
                <span className="font-headline-sm text-surface font-bold">3,842</span>
              </div>
              <div className="bg-on-primary/5 rounded-md p-3 border border-white/5">
                <span className="font-label-xs text-on-primary-container block">System Uptime</span>
                <span className="font-headline-sm text-tertiary-fixed font-bold">99.98%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Login Portal Form Panel (7 cols) */}
        <div className="lg:w-7/12 bg-surface-container-lowest p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          <div>
            {/* Header Badge */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center p-1.5 shadow-sm border border-surface-container">
                  <img
                    alt="Peevees Public School Crest Logo"
                    className="w-full h-full object-contain"
                    src={SCHOOL_CREST_LOGO}
                  />
                </div>
                <div>
                  <h1 className="font-headline-lg text-primary-container tracking-tight leading-none">PEEVEES PUBLIC SCHOOL</h1>
                  <p className="font-body-sm text-on-surface-variant font-medium mt-1">School Administration &amp; Governance Portal</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 bg-surface-container-low text-secondary px-3 py-1 rounded-full shadow-sm">
                <span className="material-symbols-outlined text-[16px]">verified_user</span>
                <span className="font-label-xs uppercase tracking-wide">256-Bit SSL</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 bg-surface-container px-3 py-1 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span className="font-label-xs text-on-surface-variant uppercase font-bold tracking-wider">
                Authorized Administrative Personnel Only
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="font-label-md text-on-surface">Institutional Email or Staff ID</label>
                  <span className="font-label-xs text-on-surface-variant">SSO Integrated</span>
                </div>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-outline text-[18px]">badge</span>
                  <input
                    required
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="id@peevees.edu.in"
                    className="w-full bg-surface-container-low text-on-surface font-body-md pl-10 pr-4 py-2.5 rounded-lg focus:outline-none focus:bg-surface-container transition shadow-sm border border-surface-container/60"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="font-label-md text-on-surface">Administrative Passkey</label>
                  <span className="font-label-xs text-secondary font-semibold cursor-pointer hover:underline">
                    Hardware Token Enforced
                  </span>
                </div>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-outline text-[18px]">lock</span>
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter authorized password"
                    className="w-full bg-surface-container-low text-on-surface font-body-md pl-10 pr-10 py-2.5 rounded-lg focus:outline-none focus:bg-surface-container transition shadow-sm border border-surface-container/60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-outline hover:text-on-surface p-1"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-label-md text-on-surface">Target Academic Session Ledger</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-outline text-[18px]">calendar_month</span>
                  <select
                    value={session}
                    onChange={e => setSession(e.target.value)}
                    className="w-full bg-surface-container-low text-on-surface font-body-md pl-10 pr-8 py-2.5 rounded-lg appearance-none focus:outline-none focus:bg-surface-container transition shadow-sm cursor-pointer border border-surface-container/60"
                  >
                    <option value="2026-2027">Academic Year 2026–2027 (Active Term I)</option>
                    <option value="2025-2026">Academic Year 2025–2026 (Archived Vault)</option>
                    <option value="2024-2025">Academic Year 2024–2025 (Historical Audits)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 text-outline pointer-events-none text-base">expand_more</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-secondary accent-secondary" />
                  <span className="font-body-sm text-on-surface-variant font-medium">Remember this workstation</span>
                </label>
                <button
                  type="button"
                  onClick={() => onShowToast('Passkey recovery instructions sent to registered recovery phone.')}
                  className="font-body-sm text-secondary font-semibold hover:underline"
                >
                  Forgot passkey?
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-primary-container text-on-primary py-2.5 px-6 rounded-lg font-title-md hover:bg-primary transition shadow-md flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Authenticate &amp; Access Portal</span>
                  <span className="material-symbols-outlined text-[18px] text-tertiary-fixed group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
              </div>
            </form>

            {/* Quick Demo Role Switcher Bar */}
            <div className="mt-6 pt-3 bg-surface-container-low rounded-lg p-3 border border-surface-container">
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-xs uppercase tracking-wider text-on-surface-variant font-bold">Quick Demo Role Presets:</span>
                <span className="font-label-xs text-outline">Simulate Permissions</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { name: 'Super Admin', email: 'admin.radhakrishnan@peevees.edu.in' },
                  { name: 'Academic Principal', email: 'principal.mehta@peevees.edu.in' },
                  { name: 'Department Head', email: 'hod.mathematics@peevees.edu.in' },
                  { name: 'Front Desk Staff', email: 'admissions.desk@peevees.edu.in' },
                ].map(r => (
                  <button
                    key={r.name}
                    type="button"
                    onClick={() => handleRolePreset(r.name, r.email)}
                    className={`font-label-xs px-2.5 py-1 rounded transition ${
                      selectedRole === r.name
                        ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                        : 'bg-surface text-on-surface-variant hover:bg-surface-container'
                    }`}
                  >
                    {r.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Accreditation */}
          <div className="mt-6 pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between text-on-surface-variant gap-2 font-body-sm border-t border-surface-container/60">
            <p className="font-label-xs text-label-xs tracking-wide">
              Central Board of Secondary Education (CBSE) Affiliated No. 930128
            </p>
            <div className="flex items-center gap-1 font-label-xs text-label-xs">
              <span className="material-symbols-outlined text-xs">support_agent</span>
              <span>IT Support:</span>
              <a className="text-secondary font-semibold hover:underline" href="mailto:itdesk@peevees.edu.in">
                itdesk@peevees.edu.in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
