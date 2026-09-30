import React, { useState } from 'react';
import { COHORT_HEALTH_DATA } from '../data/portalData';

interface AnalyticsViewProps {
  onShowToast: (msg: string) => void;
}

export function AnalyticsView({ onShowToast }: AnalyticsViewProps) {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [cohortFilter, setCohortFilter] = useState('');
  const [showInterventionModal, setShowInterventionModal] = useState(false);

  const filteredCohorts = COHORT_HEALTH_DATA.filter(c =>
    c.classDivision.toLowerCase().includes(cohortFilter.toLowerCase()) ||
    c.classTeacher.toLowerCase().includes(cohortFilter.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Sub-Header Workspace Banner with Context & Global Filters */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-on-surface-variant font-label-xs uppercase tracking-wider">
              <span>Institutional Intelligence</span>
              <span className="text-outline">/</span>
              <span className="text-secondary font-bold">Executive Analytics Cockpit</span>
            </div>
            <h1 className="font-headline-lg text-on-surface tracking-tight mt-0.5">
              Academic Performance &amp; Operational Health
            </h1>
          </div>

          {/* Action Bar */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onShowToast('SIS real-time data feeds synchronized with central state repository.')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">cached</span>
              <span>Sync SIS Feeds</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-container text-white font-label-md hover:bg-primary transition-colors shadow-md"
              >
                <span className="material-symbols-outlined text-[18px]">ios_share</span>
                <span>Download Executive Report</span>
                <span className="material-symbols-outlined text-[16px] text-primary-fixed">arrow_drop_down</span>
              </button>

              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-surface-container-lowest shadow-xl border border-surface-container z-50 py-1.5">
                  <button
                    onClick={() => {
                      onShowToast('Preparing Board Pack PDF (Full Color Digest). Download started.');
                      setShowExportMenu(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-body-sm text-on-surface hover:bg-surface-container-low transition-colors text-left"
                  >
                    <span className="material-symbols-outlined text-error text-[18px]">picture_as_pdf</span>
                    <span className="font-medium">Board Pack PDF (Color)</span>
                  </button>
                  <button
                    onClick={() => {
                      onShowToast('Exporting Raw Aggregate Academic Data (.xlsx).');
                      setShowExportMenu(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-body-sm text-on-surface hover:bg-surface-container-low transition-colors text-left"
                  >
                    <span className="material-symbols-outlined text-secondary text-[18px]">table_view</span>
                    <span className="font-medium">Raw Aggregate Data (.xlsx)</span>
                  </button>
                  <button
                    onClick={() => {
                      onShowToast('CBSE Compliance Digest compiled & ready.');
                      setShowExportMenu(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-body-sm text-on-surface hover:bg-surface-container-low transition-colors text-left"
                  >
                    <span className="material-symbols-outlined text-outline text-[18px]">analytics</span>
                    <span className="font-medium">CBSE Compliance Digest</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-wrap items-center justify-between gap-4 border border-surface-container/60">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="font-label-xs text-on-surface-variant uppercase mb-1 block">Academic Session</label>
              <div className="relative">
                <select className="appearance-none h-9 pl-3 pr-8 rounded-lg bg-surface-container-low text-on-surface font-label-md focus:outline-none cursor-pointer">
                  <option>AY 2026–27 (Current Term)</option>
                  <option>AY 2025–26 (Archived)</option>
                  <option>AY 2024–25 (Historical)</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-outline text-[18px] pointer-events-none">unfold_more</span>
              </div>
            </div>

            <div>
              <label className="font-label-xs text-on-surface-variant uppercase mb-1 block">Observational Window</label>
              <div className="flex items-center gap-2 h-9 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm">
                <span className="material-symbols-outlined text-secondary text-[16px]">calendar_month</span>
                <span className="font-label-md text-on-surface">Term 1: Aug 01, 2026 – Oct 15, 2026</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-secondary-fixed text-on-secondary-fixed font-bold tracking-tight">76 School Days</span>
              </div>
            </div>

            <div>
              <label className="font-label-xs text-on-surface-variant uppercase mb-1 block">Cohort Scope</label>
              <div className="relative">
                <select className="appearance-none h-9 pl-3 pr-8 rounded-lg bg-surface-container-low text-on-surface font-label-md focus:outline-none cursor-pointer">
                  <option>All Divisions (Grades 1 to 12)</option>
                  <option defaultValue="selected">Secondary &amp; Senior Secondary (Grades 8 to 12)</option>
                  <option>Primary Wing (Grades 1 to 5)</option>
                  <option>Middle School (Grades 6 to 7)</option>
                  <option>Board Exam Batches (Grades 10 &amp; 12)</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-outline text-[18px] pointer-events-none">unfold_more</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-right pl-4">
            <div className="flex flex-col">
              <span className="font-label-xs text-on-surface-variant uppercase">Tracked Students</span>
              <span className="font-numerical-data font-bold text-on-surface text-[15px]">
                1,280 <span className="text-on-surface-variant text-[11px] font-normal">in cohort</span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-xs text-on-surface-variant uppercase">Faculty Staffed</span>
              <span className="font-numerical-data font-bold text-on-surface text-[15px]">
                84 <span className="text-on-surface-variant text-[11px] font-normal">Educators</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 1: 4 Executive KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-surface-container/60">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-md text-on-surface-variant">Aggregate Attendance</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-label-xs font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Healthy
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-headline-xl text-on-surface tracking-tight">94.6%</span>
              <span className="inline-flex items-center text-label-xs font-bold text-emerald-600">
                <span className="material-symbols-outlined text-[14px]">arrow_upward</span> 1.2%
              </span>
            </div>
            <p className="font-body-sm text-on-surface-variant mt-1">Institutional baseline target: 92.0%</p>
          </div>
          <div className="w-full bg-surface-container rounded-full h-1.5 mt-4 overflow-hidden">
            <div className="bg-secondary h-1.5 rounded-full" style={{ width: '94.6%' }}></div>
          </div>
          <div className="flex justify-between items-center mt-2 font-label-xs text-on-surface-variant">
            <span>Min Required: 85%</span>
            <span className="text-secondary font-semibold">+2.6% over benchmark</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-surface-container/60">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-md text-on-surface-variant">Overall Academic Mean</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-label-xs font-bold">
              CBSE Grade A2
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-headline-xl text-on-surface tracking-tight">84.2%</span>
              <span className="font-title-md text-on-surface-variant font-medium">/ 8.4 CGPA</span>
            </div>
            <p className="font-body-sm text-on-surface-variant mt-1">Board expectation: &gt;80.0% standard</p>
          </div>
          <div className="w-full bg-surface-container rounded-full h-1.5 mt-4 overflow-hidden">
            <div className="bg-secondary-container h-1.5 rounded-full" style={{ width: '84.2%' }}></div>
          </div>
          <div className="flex justify-between items-center mt-2 font-label-xs text-on-surface-variant">
            <span>Top Quintile: 9.6 CGPA</span>
            <span className="text-secondary-container font-semibold">184 Scholars (A1)</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-surface-container/60">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-md text-on-surface-variant">Submission Velocity</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-label-xs font-bold">
              On Track
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-headline-xl text-on-surface tracking-tight">91.8%</span>
              <span className="inline-flex items-center text-label-xs font-bold text-emerald-600">
                <span className="material-symbols-outlined text-[14px]">arrow_upward</span> 3.4%
              </span>
            </div>
            <p className="font-body-sm text-on-surface-variant mt-1">14,290 of 15,560 tasks logged on time</p>
          </div>
          <div className="w-full bg-surface-container rounded-full h-1.5 mt-4 overflow-hidden">
            <div className="bg-primary-container h-1.5 rounded-full" style={{ width: '91.8%' }}></div>
          </div>
          <div className="flex justify-between items-center mt-2 font-label-xs text-on-surface-variant">
            <span>Late Submissions: 5.4%</span>
            <span className="text-on-surface font-semibold">1,270 Pending Review</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-surface-container/60">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-md text-on-surface-variant">Students at Academic Risk</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 text-error text-label-xs font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-error"></span> Action Req.
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-headline-xl text-error tracking-tight">28</span>
              <span className="font-body-sm text-on-surface-variant font-medium">(2.2% of cohort)</span>
            </div>
            <p className="font-body-sm text-on-surface-variant mt-1">Attendance &lt;75% OR Exam Score &lt;45%</p>
          </div>
          <div className="w-full bg-surface-container rounded-full h-1.5 mt-4 overflow-hidden">
            <div className="bg-error h-1.5 rounded-full" style={{ width: '14%' }}></div>
          </div>
          <div className="flex justify-between items-center mt-2 font-label-xs text-on-surface-variant">
            <span className="text-error font-semibold">19 Remedial Assigned</span>
            <span className="text-on-surface-variant">9 Counseling Open</span>
          </div>
        </div>
      </div>

      {/* Row 2 & 3: 4 Deep Analytical Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Longitudinal Attendance Trajectory */}
        <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-surface-container/60">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">show_chart</span>
                <h2 className="font-headline-sm text-on-surface">Longitudinal Student Attendance Trajectory</h2>
              </div>
              <span className="font-label-xs px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-semibold">
                Monthly Aggregates
              </span>
            </div>
            <p className="font-body-sm text-on-surface-variant mb-4">
              Comparative analysis against previous school term &amp; state regulatory floor.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-2 text-label-xs font-label-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-secondary"></span>
                <span className="text-on-surface font-semibold">2026–27 (Current Term)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-outline-variant"></span>
                <span className="text-on-surface-variant">2025–26 (Prior AY)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-error"></span>
                <span className="text-error font-semibold">92.0% CBSE Threshold</span>
              </div>
            </div>

            {/* SVG Chart */}
            <div className="w-full relative mt-2">
              <svg className="w-full h-auto overflow-visible" preserveAspectRatio="none" viewBox="0 0 540 220">
                <line stroke="#e5eeff" strokeWidth="1" x1="40" x2="520" y1="20" y2="20" />
                <text fill="#75777e" fontSize="10" textAnchor="end" x="32" y="24">98%</text>
                <line stroke="#e5eeff" strokeWidth="1" x1="40" x2="520" y1="65" y2="65" />
                <text fill="#75777e" fontSize="10" textAnchor="end" x="32" y="69">95%</text>

                {/* Threshold line 92% */}
                <line stroke="#ba1a1a" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.75" x1="40" x2="520" y1="110" y2="110" />
                <text fill="#ba1a1a" fontSize="10" fontWeight="bold" textAnchor="end" x="32" y="114">92%</text>

                <line stroke="#e5eeff" strokeWidth="1" x1="40" x2="520" y1="155" y2="155" />
                <text fill="#75777e" fontSize="10" textAnchor="end" x="32" y="159">89%</text>

                <line stroke="#cbdbf5" strokeWidth="1.5" x1="40" x2="520" y1="195" y2="195" />

                <text fill="#44474d" fontSize="11" fontWeight="bold" textAnchor="middle" x="80" y="212">Jun</text>
                <text fill="#44474d" fontSize="11" fontWeight="bold" textAnchor="middle" x="180" y="212">Jul</text>
                <text fill="#44474d" fontSize="11" fontWeight="bold" textAnchor="middle" x="280" y="212">Aug</text>
                <text fill="#44474d" fontSize="11" fontWeight="bold" textAnchor="middle" x="380" y="212">Sep</text>
                <text fill="#44474d" fontSize="11" fontWeight="bold" textAnchor="middle" x="480" y="212">Oct</text>

                <defs>
                  <linearGradient id="curGrad2" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#0051d5" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#0051d5" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                <polygon fill="url(#curGrad2)" points="80,95 180,72 280,50 380,38 480,52 480,195 80,195" />

                {/* Prior Year Path */}
                <path d="M 80,125 L 180,95 L 280,102 L 380,80 L 480,92" fill="none" opacity="0.6" stroke="#75777e" strokeDasharray="3 3" strokeWidth="2" />
                <circle cx="80" cy="125" r="3" fill="#75777e" />
                <circle cx="180" cy="95" r="3" fill="#75777e" />
                <circle cx="280" cy="102" r="3" fill="#75777e" />
                <circle cx="380" cy="80" r="3" fill="#75777e" />
                <circle cx="480" cy="92" r="3" fill="#75777e" />

                {/* Current Year Path */}
                <path d="M 80,95 L 180,72 L 280,50 L 380,38 L 480,52" fill="none" stroke="#0051d5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                <circle cx="80" cy="95" r="4.5" fill="#0051d5" stroke="#ffffff" strokeWidth="2" />
                <circle cx="180" cy="72" r="4.5" fill="#0051d5" stroke="#ffffff" strokeWidth="2" />
                <circle cx="280" cy="50" r="4.5" fill="#0051d5" stroke="#ffffff" strokeWidth="2" />
                <circle cx="480" cy="52" r="4.5" fill="#0051d5" stroke="#ffffff" strokeWidth="2" />

                {/* Peak Callout September */}
                <circle cx="380" cy="38" r="6" fill="#316bf3" stroke="#ffffff" strokeWidth="2.5" />
                <g transform="translate(380, 22)">
                  <rect fill="#0f1e36" height="26" rx="4" width="130" x="-65" y="-34" />
                  <polygon fill="#0f1e36" points="-5,-8 0,-2 5,-8" />
                  <text fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle" x="0" y="-17">September Peak: 95.8%</text>
                </g>
              </svg>
            </div>
          </div>

          <div className="mt-4 pt-2 border-t border-surface-container flex items-center justify-between text-on-surface-variant font-label-xs">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-emerald-600">verified</span>
              Zero non-compliance warning intervals recorded
            </span>
            <button onClick={() => onShowToast('Longitudinal attendance vector exported.')} className="font-semibold text-secondary hover:underline">
              Export Trajectory Vector
            </button>
          </div>
        </div>

        {/* Chart 2: Cohort Attendance Breakdown */}
        <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-surface-container/60">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">bar_chart</span>
                <h2 className="font-headline-sm text-on-surface">Cohort Attendance Breakdown (Grades 6–12)</h2>
              </div>
              <span className="font-label-xs px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-semibold">
                7 Batches
              </span>
            </div>
            <p className="font-body-sm text-on-surface-variant mb-4">
              Identification of high-performing cohorts vs groups requiring attendance intervention.
            </p>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center text-body-sm mb-1">
                  <span className="font-bold text-on-surface flex items-center gap-1.5">
                    Grade 12 (Senior Batch)
                    <span className="material-symbols-outlined text-[16px] text-amber-500">stars</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-numerical-data font-bold text-emerald-600">97.4%</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-50 text-emerald-700 font-bold">Top Rank</span>
                  </div>
                </div>
                <div className="w-full bg-surface-container rounded-full h-2.5 overflow-hidden flex">
                  <div className="bg-secondary h-2.5 rounded-full" style={{ width: '97.4%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-body-sm mb-1">
                  <span className="font-medium text-on-surface">Grade 11 (Commerce &amp; Science)</span>
                  <span className="font-numerical-data font-semibold text-on-surface">93.9%</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-2.5 overflow-hidden flex">
                  <div className="bg-secondary/80 h-2.5 rounded-full" style={{ width: '93.9%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-body-sm mb-1">
                  <span className="font-bold text-on-surface flex items-center gap-1.5">Grade 10 (Board Exam Batch)</span>
                  <div className="flex items-center gap-2">
                    <span className="font-numerical-data font-bold text-emerald-600">96.1%</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-50 text-emerald-700 font-bold">Optimal</span>
                  </div>
                </div>
                <div className="w-full bg-surface-container rounded-full h-2.5 overflow-hidden flex">
                  <div className="bg-secondary h-2.5 rounded-full" style={{ width: '96.1%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-body-sm mb-1">
                  <span className="font-semibold text-on-surface flex items-center gap-1.5">Grade 9 (All Sections A-C)</span>
                  <div className="flex items-center gap-2">
                    <span className="font-numerical-data font-bold text-error">90.8%</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] bg-rose-50 text-error font-bold">Needs Monitoring</span>
                  </div>
                </div>
                <div className="w-full bg-surface-container rounded-full h-2.5 overflow-hidden flex">
                  <div className="bg-error h-2.5 rounded-full" style={{ width: '90.8%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-body-sm mb-1">
                  <span className="font-medium text-on-surface">Grade 8</span>
                  <span className="font-numerical-data font-semibold text-on-surface">94.2%</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-2.5 overflow-hidden flex">
                  <div className="bg-secondary/70 h-2.5 rounded-full" style={{ width: '94.2%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-body-sm mb-1">
                  <span className="font-medium text-on-surface">Grade 7</span>
                  <span className="font-numerical-data font-semibold text-on-surface">95.0%</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-2.5 overflow-hidden flex">
                  <div className="bg-secondary/70 h-2.5 rounded-full" style={{ width: '95.0%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-body-sm mb-1">
                  <span className="font-medium text-on-surface">Grade 6</span>
                  <span className="font-numerical-data font-semibold text-on-surface">94.8%</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-2.5 overflow-hidden flex">
                  <div className="bg-secondary/70 h-2.5 rounded-full" style={{ width: '94.8%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-2 border-t border-surface-container flex items-center justify-between text-on-surface-variant font-label-xs">
            <span className="text-error font-medium">Flag: Grade 9 Section B has 9 individual unexcused truancies</span>
            <button
              onClick={() => onShowToast('Section Audit for Grade 9 Section B displayed.')}
              className="text-secondary font-bold hover:underline"
            >
              View Section Audit
            </button>
          </div>
        </div>

        {/* Chart 3: Subject-Wise Performance & Distinction Density */}
        <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-surface-container/60">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">equalizer</span>
                <h2 className="font-headline-sm text-on-surface">Subject-Wise Performance &amp; Distinction Density</h2>
              </div>
              <span className="font-label-xs px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-semibold">
                Unit 1 &amp; Midterms
              </span>
            </div>
            <p className="font-body-sm text-on-surface-variant mb-4">
              Evaluated across five major academic disciplines with distinction cut-off (&gt;85%).
            </p>

            <div className="space-y-3">
              {/* Math */}
              <div className="p-2.5 rounded-lg bg-surface-container-low flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                    <span className="font-title-md text-on-surface font-bold">Mathematics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-numerical-data text-body-sm text-on-surface font-semibold">Mean: <strong>81.4%</strong></span>
                    <span className="px-2 py-0.5 rounded text-[11px] bg-secondary-fixed text-on-secondary-fixed font-bold">42% Distinction</span>
                  </div>
                </div>
                <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden flex">
                  <div className="bg-secondary h-2" style={{ width: '42%' }}></div>
                  <div className="bg-secondary-container h-2" style={{ width: '44%' }}></div>
                  <div className="bg-amber-400 h-2" style={{ width: '14%' }}></div>
                </div>
              </div>

              {/* Sciences */}
              <div className="p-2.5 rounded-lg bg-surface-container-low flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-600"></span>
                    <span className="font-title-md text-on-surface font-bold">Sciences (Physics, Chem, Bio)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-numerical-data text-body-sm text-on-surface font-semibold">Mean: <strong>85.6%</strong></span>
                    <span className="px-2 py-0.5 rounded text-[11px] bg-emerald-50 text-emerald-800 font-bold">48% Distinction</span>
                  </div>
                </div>
                <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden flex">
                  <div className="bg-emerald-600 h-2" style={{ width: '48%' }}></div>
                  <div className="bg-emerald-400 h-2" style={{ width: '44%' }}></div>
                  <div className="bg-amber-400 h-2" style={{ width: '8%' }}></div>
                </div>
              </div>

              {/* Languages */}
              <div className="p-2.5 rounded-lg bg-surface-container-low flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                    <span className="font-title-md text-on-surface font-bold">Languages &amp; Literature (English / Second Lang)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-numerical-data text-body-sm text-on-surface font-semibold">Mean: <strong>88.2%</strong></span>
                    <span className="px-2 py-0.5 rounded text-[11px] bg-indigo-50 text-indigo-700 font-bold">56% Distinction</span>
                  </div>
                </div>
                <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden flex">
                  <div className="bg-indigo-600 h-2" style={{ width: '56%' }}></div>
                  <div className="bg-indigo-300 h-2" style={{ width: '40%' }}></div>
                  <div className="bg-amber-400 h-2" style={{ width: '4%' }}></div>
                </div>
              </div>

              {/* Social Studies */}
              <div className="p-2.5 rounded-lg bg-surface-container-low flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-600"></span>
                    <span className="font-title-md text-on-surface font-bold">Social Studies &amp; Humanities</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-numerical-data text-body-sm text-on-surface font-semibold">Mean: <strong>82.0%</strong></span>
                    <span className="px-2 py-0.5 rounded text-[11px] bg-orange-50 text-orange-800 font-bold">39% Distinction</span>
                  </div>
                </div>
                <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden flex">
                  <div className="bg-orange-500 h-2" style={{ width: '39%' }}></div>
                  <div className="bg-orange-300 h-2" style={{ width: '45%' }}></div>
                  <div className="bg-amber-400 h-2" style={{ width: '16%' }}></div>
                </div>
              </div>

              {/* CS */}
              <div className="p-2.5 rounded-lg bg-surface-container-low flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                    <span className="font-title-md text-on-surface font-bold">Computer Science &amp; Informatics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-numerical-data text-body-sm text-on-surface font-semibold">Mean: <strong>91.5%</strong></span>
                    <span className="px-2 py-0.5 rounded text-[11px] bg-secondary-fixed text-on-secondary-fixed font-bold">68% Distinction</span>
                  </div>
                </div>
                <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden flex">
                  <div className="bg-secondary h-2" style={{ width: '68%' }}></div>
                  <div className="bg-secondary-container h-2" style={{ width: '28%' }}></div>
                  <div className="bg-amber-400 h-2" style={{ width: '4%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-2 border-t border-surface-container flex items-center justify-between text-on-surface-variant font-label-xs">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-secondary"></span> Distinction &gt;85%</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-surface-container-highest"></span> Standard Pass</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-amber-400"></span> Remedial Zone &lt;60%</span>
            </div>
            <button
              onClick={() => onShowToast('HOD Academic Notes & Moderation records opened.')}
              className="text-secondary font-bold hover:underline"
            >
              HOD Notes
            </button>
          </div>
        </div>

        {/* Chart 4: Unit Exam Progression & Submission Velocity */}
        <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-surface-container/60">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">troubleshoot</span>
                <h2 className="font-headline-sm text-on-surface">Unit Exam Progression &amp; Submission Velocity</h2>
              </div>
              <span className="font-label-xs px-2 py-0.5 rounded bg-surface-container text-on-surface font-semibold">
                UT1 vs UT2 Correlation
              </span>
            </div>
            <p className="font-body-sm text-on-surface-variant mb-4">
              Exam score improvement paired with on-time continuous assessment velocity.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-2 text-label-xs font-label-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-primary-container"></span>
                <span className="text-on-surface font-semibold">Unit Test 1 Mean</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-secondary"></span>
                <span className="text-on-surface font-semibold">Unit Test 2 Mean</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-emerald-600"></span>
                <span className="text-emerald-700 font-semibold">HW Turnaround Velocity (%)</span>
              </div>
            </div>

            {/* SVG Dual Axis Graphic */}
            <div className="w-full relative mt-2">
              <svg className="w-full h-auto overflow-visible" preserveAspectRatio="none" viewBox="0 0 540 220">
                <line stroke="#e5eeff" strokeWidth="1" x1="40" x2="500" y1="20" y2="20" />
                <line stroke="#e5eeff" strokeWidth="1" x1="40" x2="500" y1="65" y2="65" />
                <line stroke="#e5eeff" strokeWidth="1" x1="40" x2="500" y1="110" y2="110" />
                <line stroke="#e5eeff" strokeWidth="1" x1="40" x2="500" y1="155" y2="155" />
                <line stroke="#cbdbf5" strokeWidth="1.5" x1="40" x2="500" y1="190" y2="190" />

                <text fill="#75777e" fontSize="10" textAnchor="end" x="32" y="24">100%</text>
                <text fill="#75777e" fontSize="10" textAnchor="end" x="32" y="69">85%</text>
                <text fill="#75777e" fontSize="10" textAnchor="end" x="32" y="114">70%</text>
                <text fill="#75777e" fontSize="10" textAnchor="end" x="32" y="159">55%</text>

                {/* Grade 8 */}
                <rect fill="#0f1e36" height="112" rx="2" width="18" x="68" y="78" />
                <rect fill="#0051d5" height="128" rx="2" width="18" x="88" y="62" />
                <text fill="#44474d" fontSize="11" fontWeight="bold" textAnchor="middle" x="87" y="206">Gr 8</text>

                {/* Grade 9 */}
                <rect fill="#0f1e36" height="98" rx="2" width="18" x="158" y="92" />
                <rect fill="#0051d5" height="105" rx="2" width="18" x="178" y="85" />
                <text fill="#44474d" fontSize="11" fontWeight="bold" textAnchor="middle" x="177" y="206">Gr 9</text>

                {/* Grade 10 */}
                <rect fill="#0f1e36" height="125" rx="2" width="18" x="248" y="65" />
                <rect fill="#0051d5" height="145" rx="2" width="18" x="268" y="45" />
                <text fill="#44474d" fontSize="11" fontWeight="bold" textAnchor="middle" x="267" y="206">Gr 10</text>

                {/* Grade 11 */}
                <rect fill="#0f1e36" height="108" rx="2" width="18" x="338" y="82" />
                <rect fill="#0051d5" height="122" rx="2" width="18" x="358" y="68" />
                <text fill="#44474d" fontSize="11" fontWeight="bold" textAnchor="middle" x="357" y="206">Gr 11</text>

                {/* Grade 12 */}
                <rect fill="#0f1e36" height="138" rx="2" width="18" x="428" y="52" />
                <rect fill="#0051d5" height="158" rx="2" width="18" x="448" y="32" />
                <text fill="#44474d" fontSize="11" fontWeight="bold" textAnchor="middle" x="447" y="206">Gr 12</text>

                {/* HW Line */}
                <path d="M 87,60 L 177,80 L 267,40 L 357,57 L 447,30" fill="none" stroke="#059669" strokeLinecap="round" strokeWidth="2.5" />
                <circle cx="87" cy="60" r="4" fill="#059669" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx="177" cy="80" r="4" fill="#059669" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx="267" cy="40" r="4" fill="#059669" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx="357" cy="57" r="4" fill="#059669" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx="447" cy="30" r="4" fill="#059669" stroke="#ffffff" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          <div className="mt-4 pt-2 border-t border-surface-container flex items-center justify-between text-on-surface-variant font-label-xs">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <span className="material-symbols-outlined text-[15px]">trending_up</span>
              Positive delta across 4 of 5 cohorts (+4.3% aggregate)
            </span>
            <button onClick={() => onShowToast('Statistical regression model detail loaded.')} className="text-secondary font-bold hover:underline">
              Regression Detail
            </button>
          </div>
        </div>
      </div>

      {/* Row 4: Cohort Operational Health Index Table */}
      <div className="rounded-xl bg-surface-container-lowest shadow-sm overflow-hidden flex flex-col border border-surface-container/60">
        <div className="p-5 flex flex-wrap items-center justify-between gap-4 border-b border-surface-container/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[22px]">health_metrics</span>
              <h2 className="font-headline-sm text-on-surface">Class &amp; Cohort Operational Health Index</h2>
            </div>
            <p className="font-body-sm text-on-surface-variant mt-0.5">
              Comprehensive audit index combining attendance compliance, average grade, and active risk escalations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-outline text-[16px]">filter_list</span>
              <input
                type="text"
                placeholder="Filter class, teacher..."
                value={cohortFilter}
                onChange={e => setCohortFilter(e.target.value)}
                className="h-8 pl-8 pr-3 rounded bg-surface-container-low text-on-surface font-body-sm placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-secondary/30"
              />
            </div>
            <button
              onClick={() => onShowToast('Cohort health index exported to CSV format.')}
              className="h-8 px-3 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>CSV Export</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant font-label-md uppercase tracking-wider">
                <th className="py-3 px-5">Class / Division</th>
                <th className="py-3 px-4 text-right">Enrolled</th>
                <th className="py-3 px-4">Class Teacher</th>
                <th className="py-3 px-4 text-right">Attendance %</th>
                <th className="py-3 px-4 text-right">Avg Exam Score</th>
                <th className="py-3 px-4 text-center">At-Risk Count</th>
                <th className="py-3 px-4 text-center">Health Status</th>
                <th className="py-3 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container/60 text-on-surface font-body-sm">
              {filteredCohorts.map((row, i) => (
                <tr
                  key={i}
                  className={`hover:bg-surface-container-low/60 transition-colors ${
                    row.healthStatus === 'Needs Attention' ? 'bg-rose-50/30' : ''
                  }`}
                >
                  <td className="py-3.5 px-5 font-bold text-on-surface flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      row.healthStatus === 'Optimal' ? 'bg-secondary' : row.healthStatus === 'Needs Attention' ? 'bg-error' : 'bg-secondary-container'
                    }`}></span>
                    {row.classDivision}
                  </td>
                  <td className="py-3.5 px-4 text-right font-numerical-data font-semibold">{row.enrolled}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${
                        row.healthStatus === 'Needs Attention' ? 'bg-rose-100 text-error' : 'bg-surface-container-high text-on-surface'
                      }`}>
                        {row.teacherInitials}
                      </div>
                      <span>{row.classTeacher}</span>
                    </div>
                  </td>
                  <td className={`py-3.5 px-4 text-right font-numerical-data font-bold ${
                    row.attendancePct > 95 ? 'text-emerald-700' : 'text-error'
                  }`}>
                    {row.attendancePct}%
                  </td>
                  <td className="py-3.5 px-4 text-right font-numerical-data font-bold text-on-surface">{row.avgExamScore}%</td>
                  <td className="py-3.5 px-4 text-center font-numerical-data">
                    <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                      row.atRiskCount > 5 ? 'bg-rose-100 text-error font-bold' : 'bg-surface-container text-on-surface-variant'
                    }`}>
                      {row.atRiskCount}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {row.healthStatus === 'Optimal' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-label-xs font-bold bg-emerald-50 text-emerald-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Optimal
                      </span>
                    )}
                    {row.healthStatus === 'Stable' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-label-xs font-bold bg-blue-50 text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Stable
                      </span>
                    )}
                    {row.healthStatus === 'Needs Attention' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-label-xs font-bold bg-rose-50 text-error">
                        <span className="w-1.5 h-1.5 rounded-full bg-error"></span> Needs Attention
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    {row.healthStatus === 'Needs Attention' ? (
                      <button
                        onClick={() => setShowInterventionModal(true)}
                        className="px-2.5 py-1 rounded bg-error-container text-on-error-container hover:bg-rose-200 transition-colors font-label-xs font-bold"
                      >
                        Intervention Plan
                      </button>
                    ) : (
                      <button
                        onClick={() => onShowToast(`Cohort Dossier generated for ${row.classDivision}.`)}
                        className="p-1 rounded text-outline hover:text-secondary hover:bg-surface-container transition-colors"
                        title="Cohort Dossier"
                      >
                        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-5 py-3 bg-surface-container-lowest flex flex-wrap items-center justify-between text-on-surface-variant font-label-md border-t border-surface-container/60">
          <span>Showing 5 of 18 active class cohorts</span>
          <div className="flex items-center gap-1">
            <button className="px-2 py-1 rounded hover:bg-surface-container text-outline opacity-40 cursor-not-allowed" disabled>
              Previous
            </button>
            <span className="px-2.5 py-1 rounded bg-secondary text-on-secondary font-bold text-xs">1</span>
            <button className="px-2.5 py-1 rounded hover:bg-surface-container transition-colors text-xs">2</button>
            <button className="px-2.5 py-1 rounded hover:bg-surface-container transition-colors text-xs">3</button>
            <button className="px-2 py-1 rounded hover:bg-surface-container text-on-surface transition-colors text-xs">Next</button>
          </div>
        </div>
      </div>

      {/* Institutional Compliance Lock Note */}
      <div className="p-4 rounded-xl bg-surface-container-low flex items-center justify-between text-on-surface-variant font-body-sm border border-surface-container">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[20px]">verified_user</span>
          <span>CBSE Accreditation &amp; Academic Data verified by Office of the Registrar. Next compliance lock: November 15, 2026.</span>
        </div>
        <span className="font-numerical-data text-label-xs text-outline font-semibold">
          Generated at 09:42 IST • Peevees Cloud Analytics v4.12
        </span>
      </div>

      {/* Intervention Plan Modal */}
      {showInterventionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-container/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-xl shadow-2xl overflow-hidden border border-outline-variant/30">
            <div className="p-5 bg-surface-container-low flex items-center justify-between border-b border-surface-container">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-error text-[22px]">emergency</span>
                <h3 className="font-headline-sm text-on-surface font-bold">Academic Intervention Protocol</h3>
              </div>
              <button onClick={() => setShowInterventionModal(false)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-5 space-y-4 text-body-sm">
              <div className="p-3 bg-rose-50 text-error rounded-lg">
                <span className="font-bold block mb-1">Target Cohort: Grade 9 - Section B</span>
                <span>11 students flagged with attendance &lt;75% or Unit 1 Examination scores &lt;45%. Class teacher: Mr. V. Narayanan.</span>
              </div>

              <div className="space-y-2">
                <span className="font-label-xs uppercase font-bold text-on-surface-variant block">Action Checklist</span>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="accent-secondary" />
                  <span>Mandate 3x/week after-school Remedial Math & Science tutoring</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="accent-secondary" />
                  <span>Parent-Counselor liaison meeting scheduled for Friday 03:00 PM</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="accent-secondary" />
                  <span>Biometric daily attendance push notification sent to guardians</span>
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-surface-container">
                <button
                  type="button"
                  onClick={() => setShowInterventionModal(false)}
                  className="px-4 h-9 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onShowToast('Intervention plan dispatched to Class Teacher V. Narayanan & Academic Dean.');
                    setShowInterventionModal(false);
                  }}
                  className="px-5 h-9 rounded-lg bg-error hover:bg-rose-700 text-white font-label-md shadow-sm"
                >
                  Authorize Intervention
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
