import React, { useState } from 'react';
import { CAMPUS_ASSEMBLY_IMAGE } from '../data/portalData';

interface DashboardViewProps {
  onOpenAddStudent: () => void;
  onOpenAddStaff: () => void;
  onOpenCircular: () => void;
  onOpenAttendance: () => void;
  onOpenUt2: () => void;
  onOpenFleetMap: () => void;
  onShowToast: (msg: string) => void;
}

export function DashboardView({
  onOpenAddStudent,
  onOpenAddStaff,
  onOpenCircular,
  onOpenAttendance,
  onOpenUt2,
  onOpenFleetMap,
  onShowToast
}: DashboardViewProps) {
  const [selectedWeek, setSelectedWeek] = useState('Week 8 (Current)');
  const [nudgedTeachers, setNudgedTeachers] = useState<string[]>([]);

  const handleNudge = (teacher: string) => {
    setNudgedTeachers(prev => [...prev, teacher]);
    onShowToast(`High-priority assessment submission reminder dispatched to ${teacher}.`);
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Header Area */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-xs bg-surface-container-high text-secondary font-bold tracking-wider">
              ACADEMIC SESSION 2026–27
            </span>
            <span className="text-outline text-body-sm">•</span>
            <span className="font-label-md text-on-surface-variant">Thursday, October 15, 2026 • Term 1 Week 8</span>
          </div>
          <h1 className="font-headline-xl text-on-surface tracking-tight">Good Morning, Dr. Radhakrishnan</h1>
          <p className="font-body-md text-on-surface-variant mt-1">
            Here is the institution's real-time operational posture, attendance metrics, and pending authorizations.
          </p>
        </div>

        {/* Quick Action Toolbelt */}
        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={onOpenAddStudent}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-lowest text-on-surface font-label-md shadow-sm hover:bg-surface-container transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">person_add</span>
            <span>+ Add New Student</span>
          </button>
          <button
            onClick={onOpenAddStaff}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-lowest text-on-surface font-label-md shadow-sm hover:bg-surface-container transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">badge</span>
            <span>+ Add Staff Member</span>
          </button>
          <button
            onClick={onOpenCircular}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-lowest text-on-surface font-label-md shadow-sm hover:bg-surface-container transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-on-tertiary-container">campaign</span>
            <span>Publish Circular</span>
          </button>
          <button
            onClick={onOpenAttendance}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary-container text-on-primary font-label-md shadow-md hover:bg-primary transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary-fixed">assignment_turned_in</span>
            <span>Record Daily Attendance</span>
          </button>
        </div>
      </div>

      {/* Priority Attention / Action Strip */}
      <div className="relative overflow-hidden rounded-xl bg-tertiary-container text-on-tertiary p-4 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="shrink-0 w-10 h-10 rounded-lg bg-on-tertiary-container/20 flex items-center justify-center text-on-tertiary-container">
            <span className="material-symbols-outlined text-[24px]">crisis_alert</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded font-label-xs bg-error text-on-error uppercase font-bold tracking-wider">Action Required</span>
              <span className="font-title-md font-semibold text-white">Immediate Operational Authorizations</span>
            </div>
            <p className="font-body-sm text-tertiary-fixed mt-0.5">
              Grade 10-A Mathematics UT-2 results awaiting Principal approval <span className="text-white/40 px-1">|</span> 3 Transport bus routes delayed by 15 mins (Route 4, 7, 11 due to roadworks).
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenFleetMap}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-label-md transition-colors"
          >
            View Fleet Map
          </button>
          <button
            onClick={onOpenUt2}
            className="px-3 py-1.5 rounded-lg bg-secondary text-on-secondary font-label-md shadow-sm hover:bg-secondary-container transition-colors"
          >
            Review &amp; Approve UT-2
          </button>
        </div>
      </div>

      {/* 4-Column KPI Deck */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Students */}
        <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="font-label-md uppercase tracking-wider text-on-surface-variant">Total Students</span>
            <span className="p-1.5 rounded-lg bg-surface-container-low text-secondary">
              <span className="material-symbols-outlined text-[20px]">school</span>
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-headline-xl text-on-surface font-bold">1,248</span>
            <span className="inline-flex items-center font-label-xs text-emerald-600 font-bold">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>+4.2% YoY
            </span>
          </div>
          <div className="mt-4 pt-2 bg-surface-container-low/50 -mx-5 -mb-5 px-5 pb-2.5 flex items-center justify-between text-on-surface-variant font-label-xs">
            <span>642 Boys / 606 Girls</span>
            <span className="font-semibold text-on-surface">48 Sections</span>
          </div>
        </div>

        {/* Card 2: Staff */}
        <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="font-label-md uppercase tracking-wider text-on-surface-variant">Staff Strength</span>
            <span className="p-1.5 rounded-lg bg-surface-container-low text-secondary">
              <span className="material-symbols-outlined text-[20px]">badge</span>
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-headline-xl text-on-surface font-bold">86</span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-label-xs font-semibold">
              100% Verified
            </span>
          </div>
          <div className="mt-4 pt-2 bg-surface-container-low/50 -mx-5 -mb-5 px-5 pb-2.5 flex items-center justify-between text-on-surface-variant font-label-xs">
            <span>74 Academic Faculty</span>
            <span className="font-semibold text-on-surface">12 Admin &amp; Support</span>
          </div>
        </div>

        {/* Card 3: Attendance */}
        <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="font-label-md uppercase tracking-wider text-on-surface-variant">Today's Attendance</span>
            <span className="p-1.5 rounded-lg bg-surface-container-low text-secondary">
              <span className="material-symbols-outlined text-[20px]">fact_check</span>
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-headline-xl text-on-surface font-bold">94.2%</span>
            <span className="inline-flex items-center font-label-xs text-emerald-600 font-bold">
              <span className="material-symbols-outlined text-[14px]">arrow_drop_up</span>0.8% vs Y'day
            </span>
          </div>
          <div className="mt-4 pt-2 bg-surface-container-low/50 -mx-5 -mb-5 px-5 pb-2.5 flex items-center justify-between text-on-surface-variant font-label-xs">
            <span className="text-emerald-700 font-semibold">1,176 Present</span>
            <span>58 Absent (14 Sick)</span>
          </div>
        </div>

        {/* Card 4: Pending UT-2 Marks */}
        <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="font-label-md uppercase tracking-wider text-on-surface-variant">Pending Marks Entries</span>
            <span className="p-1.5 rounded-lg bg-error-container text-error">
              <span className="material-symbols-outlined text-[20px]">pending_actions</span>
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-headline-xl text-on-surface font-bold text-error">37</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded font-label-xs bg-error/10 text-error font-bold tracking-tight">
              Due in 48 hrs
            </span>
          </div>
          <div className="mt-4 pt-2 bg-surface-container-low/50 -mx-5 -mb-5 px-5 pb-2.5 flex items-center justify-between text-on-surface-variant font-label-xs">
            <span>Term 1 Unit Test 2</span>
            <span className="font-semibold text-error">3 Depts Pending</span>
          </div>
        </div>
      </div>

      {/* Middle Section: Attendance Trend & Class Breakdown vs Academic Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Columns */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Attendance Weekly Trend Card */}
          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 gap-2 border-b border-surface-container/60">
              <div>
                <h2 className="font-title-md text-on-surface font-bold">Weekly Student Attendance Trend</h2>
                <p className="font-body-sm text-on-surface-variant">Overall school vs. CBSE State Regulatory Benchmark (92.0%)</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 font-label-xs text-on-surface-variant">
                  <span className="w-3 h-3 rounded-sm bg-secondary"></span> Actual
                </span>
                <span className="inline-flex items-center gap-1.5 font-label-xs text-on-surface-variant">
                  <span className="w-3 h-1 bg-amber-500"></span> Benchmark
                </span>
                <select
                  value={selectedWeek}
                  onChange={e => setSelectedWeek(e.target.value)}
                  className="font-label-xs bg-surface-container-low text-on-surface rounded px-2 py-1 outline-none border border-surface-container"
                >
                  <option>Week 8 (Current)</option>
                  <option>Week 7</option>
                  <option>Week 6</option>
                </select>
              </div>
            </div>

            {/* Inline SVG Visualization */}
            <div className="relative w-full h-60 mt-3">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 600 220">
                <defs>
                  <linearGradient id="attendanceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0051d5" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#0051d5" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                <line stroke="#f1f5f9" strokeWidth="1" x1="40" x2="580" y1="20" y2="20" />
                <text fill="#94a3b8" fontSize="10" textAnchor="end" x="32" y="24">100%</text>
                <line stroke="#f1f5f9" strokeWidth="1" x1="40" x2="580" y1="65" y2="65" />
                <text fill="#94a3b8" fontSize="10" textAnchor="end" x="32" y="69">96%</text>

                {/* Benchmark 92% line */}
                <line stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 4" x1="40" x2="580" y1="110" y2="110" />
                <text fill="#b45309" fontSize="9" fontWeight="600" x="585" y="114">Benchmark 92%</text>
                <text fill="#94a3b8" fontSize="10" textAnchor="end" x="32" y="114">92%</text>

                <line stroke="#f1f5f9" strokeWidth="1" x1="40" x2="580" y1="155" y2="155" />
                <text fill="#94a3b8" fontSize="10" textAnchor="end" x="32" y="159">88%</text>

                {/* Area Fill */}
                <polygon points="70,89 180,72 290,56 400,68 510,48 510,190 70,190" fill="url(#attendanceGrad)" />

                {/* Polyline */}
                <polyline
                  points="70,89 180,72 290,56 400,68 510,48"
                  fill="none"
                  stroke="#0051d5"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Data Points */}
                <g className="cursor-pointer">
                  <circle cx="70" cy="89" r="4.5" fill="#0051d5" stroke="#ffffff" strokeWidth="2" />
                  <text x="70" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0b1c30">93.8%</text>
                  <text x="70" y="205" textAnchor="middle" fontSize="11" fill="#64748b">Mon Oct 12</text>
                </g>
                <g className="cursor-pointer">
                  <circle cx="180" cy="72" r="4.5" fill="#0051d5" stroke="#ffffff" strokeWidth="2" />
                  <text x="180" y="58" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0b1c30">94.6%</text>
                  <text x="180" y="205" textAnchor="middle" fontSize="11" fill="#64748b">Tue Oct 13</text>
                </g>
                <g className="cursor-pointer">
                  <circle cx="290" cy="56" r="4.5" fill="#0051d5" stroke="#ffffff" strokeWidth="2" />
                  <text x="290" y="42" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0b1c30">95.6%</text>
                  <text x="290" y="205" textAnchor="middle" fontSize="11" fill="#64748b">Wed Oct 14</text>
                </g>
                <g className="cursor-pointer">
                  <circle cx="400" cy="68" r="6" fill="#316bf3" stroke="#ffffff" strokeWidth="2" />
                  <text x="400" y="52" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0051d5">94.2%</text>
                  <text x="400" y="205" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0b1c30">Today</text>
                </g>
                <g className="opacity-50">
                  <circle cx="510" cy="48" r="4" fill="#94a3b8" stroke="#ffffff" strokeWidth="2" />
                  <text x="510" y="34" textAnchor="middle" fontSize="10" fill="#64748b">Est. 95.8%</text>
                  <text x="510" y="205" textAnchor="middle" fontSize="11" fill="#94a3b8">Fri Oct 16</text>
                </g>
              </svg>
            </div>

            <div className="mt-3 p-3 rounded-lg bg-surface-container-low flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                <span className="font-body-sm text-on-surface">Weekly Attendance Average: <strong className="text-on-surface">94.5%</strong> (+1.4% vs last week)</span>
              </div>
              <button
                onClick={() => onShowToast('Biometric sync vector downloaded to secure audit repository.')}
                className="font-label-md text-secondary hover:underline"
              >
                Download Biometric Sync Log
              </button>
            </div>
          </div>

          {/* Cohort Class Attendance Breakdown */}
          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between pb-2">
              <div>
                <h3 className="font-title-md text-on-surface font-bold">Senior &amp; Secondary Class Attendance Breakdown</h3>
                <p className="font-body-sm text-on-surface-variant">Real-time morning session reporting across Grades 8 through 12</p>
              </div>
              <span className="px-2.5 py-1 text-label-xs rounded bg-surface-container text-on-surface font-semibold">
                All 12 Grades
              </span>
            </div>

            <div className="space-y-3 mt-3">
              <div className="flex items-center gap-4">
                <span className="w-20 font-label-md text-on-surface font-bold">Grade 12</span>
                <div className="flex-1 bg-surface-container rounded-full h-3 overflow-hidden">
                  <div className="bg-secondary h-3 rounded-full" style={{ width: '98.2%' }}></div>
                </div>
                <span className="w-14 text-right font-numerical-data font-bold text-on-surface">98.2%</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700">Optimal</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="w-20 font-label-md text-on-surface font-bold">Grade 10</span>
                <div className="flex-1 bg-surface-container rounded-full h-3 overflow-hidden">
                  <div className="bg-secondary h-3 rounded-full" style={{ width: '97.8%' }}></div>
                </div>
                <span className="w-14 text-right font-numerical-data font-bold text-on-surface">97.8%</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700">Optimal</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="w-20 font-label-md text-on-surface font-bold">Grade 8</span>
                <div className="flex-1 bg-surface-container rounded-full h-3 overflow-hidden">
                  <div className="bg-secondary h-3 rounded-full" style={{ width: '96.4%' }}></div>
                </div>
                <span className="w-14 text-right font-numerical-data font-bold text-on-surface">96.4%</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700">Good</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="w-20 font-label-md text-on-surface font-bold">Grade 9</span>
                <div className="flex-1 bg-surface-container rounded-full h-3 overflow-hidden">
                  <div className="bg-amber-500 h-3 rounded-full" style={{ width: '92.1%' }}></div>
                </div>
                <span className="w-14 text-right font-numerical-data font-bold text-amber-700">92.1%</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800">Review Flag</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="w-20 font-label-md text-on-surface font-bold">Grade 11</span>
                <div className="flex-1 bg-surface-container rounded-full h-3 overflow-hidden">
                  <div className="bg-error h-3 rounded-full" style={{ width: '91.5%' }}></div>
                </div>
                <span className="w-14 text-right font-numerical-data font-bold text-error">91.5%</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-error-container text-error">Below Thresh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Columns */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Academic Performance Snapshot */}
          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container/60">
              <div>
                <h3 className="font-title-md text-on-surface font-bold">Academic Performance (Term 1)</h3>
                <span className="font-label-xs text-on-surface-variant">CBSE Affiliation Standard Monitoring</span>
              </div>
              <span className="p-1 rounded-md bg-secondary-fixed text-on-secondary-fixed">
                <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 my-3">
              <div className="bg-surface-container-low p-3 rounded-lg">
                <span className="font-label-xs uppercase text-on-surface-variant font-semibold">Pass Percentage</span>
                <div className="font-headline-lg font-bold text-on-surface mt-1">92.8%</div>
                <span className="font-label-xs text-emerald-600 font-bold">↑ +1.6% vs Pre-Mid</span>
              </div>
              <div className="bg-surface-container-low p-3 rounded-lg">
                <span className="font-label-xs uppercase text-on-surface-variant font-semibold">Mean Institution CGPA</span>
                <div className="font-headline-lg font-bold text-on-surface mt-1">8.4<span className="text-sm font-normal text-on-surface-variant"> / 10</span></div>
                <span className="font-label-xs text-secondary font-semibold">Top Quintile: 9.6</span>
              </div>
            </div>

            {/* Grade Distribution Bar */}
            <div>
              <div className="flex justify-between font-label-xs text-on-surface-variant mb-1">
                <span>Grade Distribution Profile</span>
                <span>1,248 Candidates</span>
              </div>
              <div className="flex h-3 w-full rounded-full overflow-hidden bg-surface-container">
                <div className="bg-secondary" style={{ width: '38%' }} title="A1 & A2 (38%)"></div>
                <div className="bg-secondary-container" style={{ width: '34%' }} title="B1 & B2 (34%)"></div>
                <div className="bg-surface-tint" style={{ width: '18%' }} title="C1 & C2 (18%)"></div>
                <div className="bg-tertiary-fixed-dim" style={{ width: '8%' }} title="D (8%)"></div>
                <div className="bg-error" style={{ width: '2%' }} title="E/Needs Remedial (2%)"></div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-on-surface-variant mt-2 font-numerical-data">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-secondary"></span>A: 38%</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-secondary-container"></span>B: 34%</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-surface-tint"></span>C: 18%</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></span>D: 8%</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-error"></span>E: 2%</span>
              </div>
            </div>

            {/* Department Topper Spot */}
            <div className="mt-4 p-3 rounded-lg bg-surface-container-high/40 flex items-center gap-3">
              <img
                className="w-10 h-10 rounded-full object-cover shadow-sm"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoKkdF9GVQoCMJ4-ZOynmqcW4Xqw9EFSLLum2Eo9kX6pDY6MCdwFn3Bb2RtJwNSMHDshw6KOW_WNFNHhMPokyfwImEsV38DKNylvLE6BmYeqB4E05WYIasXPRrcl1FrBwhMgdvMX0H5LMFENF5hWWTK2h1eOdAJLq8WMnYsp1keHPb7vk4gBlF4NbN0QJOt5qTz7jESgNLgmDt_GUI_0Csjf6iCoIikC0-61_bOqngeMnufXUM96Jb"
                alt="Ananya S. Pillai"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-on-surface font-bold truncate">Ananya S. Pillai</span>
                  <span className="font-numerical-data text-label-xs font-bold text-secondary">99.4% Aggregate</span>
                </div>
                <span className="font-body-sm text-on-surface-variant truncate block">Grade 12-Science • Term 1 Unit Test Topper</span>
              </div>
            </div>
          </div>

          {/* Pending Marks Submission Queue */}
          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container/60">
              <div>
                <h3 className="font-title-md text-on-surface font-bold">Marks Submission Queue</h3>
                <p className="font-body-sm text-on-surface-variant">Faculty pending UT-2 grade sheets</p>
              </div>
              <span className="font-label-xs px-2 py-0.5 rounded bg-error-container text-error font-bold">
                3 Critical
              </span>
            </div>

            <div className="space-y-2 mt-3">
              {/* Submission Row 1 */}
              <div className="p-3 rounded-lg bg-surface-container-low flex items-center justify-between hover:bg-surface-container transition-colors">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-on-surface font-label-md">
                    VN
                  </div>
                  <div className="min-w-0">
                    <span className="font-label-md text-on-surface font-bold block truncate">Vikram Nair</span>
                    <span className="font-body-sm text-on-surface-variant truncate block">Gr 11 Physics (Core) • 42 Entries</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="inline-flex items-center font-label-xs text-error font-bold">14 hrs left</span>
                  <button
                    onClick={() => handleNudge('Vikram Nair (Gr 11 Physics)')}
                    disabled={nudgedTeachers.includes('Vikram Nair (Gr 11 Physics)')}
                    className="block font-label-xs text-secondary hover:underline mt-0.5 disabled:text-outline"
                  >
                    {nudgedTeachers.includes('Vikram Nair (Gr 11 Physics)') ? 'Nudged ✓' : 'Send Nudge'}
                  </button>
                </div>
              </div>

              {/* Submission Row 2 */}
              <div className="p-3 rounded-lg bg-surface-container-low flex items-center justify-between hover:bg-surface-container transition-colors">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-on-surface font-label-md">
                    SL
                  </div>
                  <div className="min-w-0">
                    <span className="font-label-md text-on-surface font-bold block truncate">Sujatha Lakshmi</span>
                    <span className="font-body-sm text-on-surface-variant truncate block">Gr 9 Social Science • 38 Entries</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="inline-flex items-center font-label-xs text-amber-700 font-bold">26 hrs left</span>
                  <button
                    onClick={() => handleNudge('Sujatha Lakshmi (Gr 9 Social Science)')}
                    disabled={nudgedTeachers.includes('Sujatha Lakshmi (Gr 9 Social Science)')}
                    className="block font-label-xs text-secondary hover:underline mt-0.5 disabled:text-outline"
                  >
                    {nudgedTeachers.includes('Sujatha Lakshmi (Gr 9 Social Science)') ? 'Nudged ✓' : 'Send Nudge'}
                  </button>
                </div>
              </div>

              {/* Submission Row 3 */}
              <div className="p-3 rounded-lg bg-surface-container-low flex items-center justify-between hover:bg-surface-container transition-colors">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-on-surface font-label-md">
                    AB
                  </div>
                  <div className="min-w-0">
                    <span className="font-label-md text-on-surface font-bold block truncate">Arun Balakrishnan</span>
                    <span className="font-body-sm text-on-surface-variant truncate block">Gr 12 Comp Science • 31 Entries</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="inline-flex items-center font-label-xs text-amber-700 font-bold">36 hrs left</span>
                  <button
                    onClick={() => handleNudge('Arun Balakrishnan (Gr 12 CS)')}
                    disabled={nudgedTeachers.includes('Arun Balakrishnan (Gr 12 CS)')}
                    className="block font-label-xs text-secondary hover:underline mt-0.5 disabled:text-outline"
                  >
                    {nudgedTeachers.includes('Arun Balakrishnan (Gr 12 CS)') ? 'Nudged ✓' : 'Send Nudge'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Activity Stream & Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Activity Stream */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-surface-container/60">
            <div>
              <h3 className="font-title-md text-on-surface font-bold">Recent Administrative Activity Stream</h3>
              <p className="font-body-sm text-on-surface-variant">Live audit ledger of operations, fee reconciliations, and academic log updates</p>
            </div>
            <button
              onClick={() => onShowToast('Full administrative audit history ledger loaded.')}
              className="px-2.5 py-1 text-label-xs rounded bg-surface-container text-on-surface font-semibold hover:bg-surface-container-high transition-colors"
            >
              View Audit Log
            </button>
          </div>

          <div className="space-y-4 mt-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">grading</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-on-surface font-bold truncate">Meera Joseph submitted Grade 9 English Unit Test marks</span>
                  <span className="font-numerical-data text-label-xs text-on-surface-variant">14 mins ago</span>
                </div>
                <p className="font-body-sm text-on-surface-variant mt-0.5">
                  Successfully reconciled 41 student evaluation sheets with 0 moderation flags. Transferred to Registrar repository.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">receipt_long</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-on-surface font-bold truncate">Term 2 Fee Clearance Notice Dispatched</span>
                  <span className="font-numerical-data text-label-xs text-on-surface-variant">1 hr ago</span>
                </div>
                <p className="font-body-sm text-on-surface-variant mt-0.5">
                  Accounts Department broadcast automated SMS and portal billing vouchers to 342 parents across Grades 1-12.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-surface-container text-on-surface flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">event_seat</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-on-surface font-bold truncate">Science Exhibition Preparation Confirmed</span>
                  <span className="font-numerical-data text-label-xs text-on-surface-variant">3 hrs ago</span>
                </div>
                <p className="font-body-sm text-on-surface-variant mt-0.5">
                  HOD Science (Rahul Thomas) booked the Ramanujan Hall for exhibition stall setup and external judge protocol.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">security</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-on-surface font-bold truncate">Campus CCTV Perimeter Health Audit Completed</span>
                  <span className="font-numerical-data text-label-xs text-on-surface-variant">5 hrs ago</span>
                </div>
                <p className="font-body-sm text-on-surface-variant mt-0.5">
                  46 of 48 security cameras operational. Gate 2 South camera scheduled for optic alignment tomorrow at 07:00 AM.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Milestones Calendar */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-surface-container/60">
            <div>
              <h3 className="font-title-md text-on-surface font-bold">Upcoming Institutional Milestones</h3>
              <p className="font-body-sm text-on-surface-variant">Key dates requiring administrative presence</p>
            </div>
            <span className="p-1 rounded-md bg-surface-container-low text-secondary">
              <span className="material-symbols-outlined text-[20px]">calendar_month</span>
            </span>
          </div>

          {/* Campus Picture */}
          <div className="relative rounded-lg overflow-hidden h-28 my-3">
            <img
              src={CAMPUS_ASSEMBLY_IMAGE}
              alt="Campus Central Assembly"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-container/85 to-transparent flex items-end p-3">
              <span className="text-white font-label-md font-semibold">Campus Term 1 Central Assembly Phase</span>
            </div>
          </div>

          <div className="space-y-3">
            {/* Event 1 */}
            <div className="p-3 rounded-lg bg-error-container/20 flex items-start gap-3 border border-error/15">
              <div className="text-center bg-surface-container-lowest px-2.5 py-1.5 rounded shadow-sm shrink-0">
                <span className="block font-label-xs uppercase font-bold text-error">OCT</span>
                <span className="block font-headline-sm font-bold text-on-surface">24</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-on-surface font-bold truncate">CBSE Affiliation Inspection</span>
                  <span className="font-label-xs px-2 py-0.5 rounded bg-error text-on-error font-bold">High Priority</span>
                </div>
                <p className="font-body-sm text-on-surface-variant mt-0.5">
                  Regional Inspection Committee visit for Senior Secondary accreditation renewal. Infrastructure and lab verification.
                </p>
              </div>
            </div>

            {/* Event 2 */}
            <div className="p-3 rounded-lg bg-surface-container-low flex items-start gap-3">
              <div className="text-center bg-surface-container-lowest px-2.5 py-1.5 rounded shadow-sm shrink-0">
                <span className="block font-label-xs uppercase font-bold text-secondary">OCT</span>
                <span className="block font-headline-sm font-bold text-on-surface">28</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-on-surface font-bold truncate">Term 1 Parent-Teacher Conclave</span>
                  <span className="font-label-xs text-on-surface-variant font-semibold">09:00 - 15:30</span>
                </div>
                <p className="font-body-sm text-on-surface-variant mt-0.5">
                  Grade 9 through 12 individual grade discussions and remedial schedule counseling.
                </p>
              </div>
            </div>

            {/* Event 3 */}
            <div className="p-3 rounded-lg bg-surface-container-low flex items-start gap-3">
              <div className="text-center bg-surface-container-lowest px-2.5 py-1.5 rounded shadow-sm shrink-0">
                <span className="block font-label-xs uppercase font-bold text-secondary">NOV</span>
                <span className="block font-headline-sm font-bold text-on-surface">04</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-on-surface font-bold truncate">Annual Inter-House Athletics Meet</span>
                  <span className="font-label-xs text-on-surface-variant font-semibold">Stadium</span>
                </div>
                <p className="font-body-sm text-on-surface-variant mt-0.5">
                  Opening march past rehearsal scheduled for 2nd Nov at 08:30 AM.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
