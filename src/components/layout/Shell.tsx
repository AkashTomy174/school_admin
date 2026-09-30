import React, { useState } from 'react';
import { SCHOOL_CREST_LOGO } from '../../data/portalData';

export type NavPath = 
  | 'dashboard' 
  | 'students' 
  | 'staff' 
  | 'staff-profile'
  | 'academics' 
  | 'attendance' 
  | 'exams-results' 
  | 'assignments' 
  | 'communications' 
  | 'analytics' 
  | 'reports' 
  | 'settings' 
  | 'login';

interface ShellProps {
  currentPath: NavPath;
  onNavigate: (path: NavPath) => void;
  children: React.ReactNode;
  userRole?: string;
  onLogout: () => void;
}

export function Shell({ currentPath, onNavigate, children, userRole = 'Super Admin', onLogout }: ShellProps) {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Keyboard shortcut for Cmd+K / Ctrl+K
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearchModal(prev => !prev);
      }
      if (e.key === 'Escape') {
        setShowSearchModal(false);
        setShowNotifications(false);
        setShowHelp(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    { label: 'Dashboard', icon: 'grid_view', path: 'dashboard' as NavPath, section: 'academic' },
    { label: 'Students', icon: 'school', path: 'students' as NavPath, section: 'academic' },
    { label: 'Staff', icon: 'badge', path: 'staff' as NavPath, section: 'academic' },
    { label: 'Academics', icon: 'menu_book', path: 'academics' as NavPath, section: 'academic' },
    { label: 'Attendance', icon: 'co_present', path: 'attendance' as NavPath, section: 'academic' },
    { label: 'Exams & Results', icon: 'fact_check', path: 'exams-results' as NavPath, section: 'academic' },
    { label: 'Assignments', icon: 'assignment', path: 'assignments' as NavPath, section: 'academic' },
    { label: 'Communications', icon: 'forum', path: 'communications' as NavPath, section: 'academic' },

    { label: 'Analytics', icon: 'analytics', path: 'analytics' as NavPath, section: 'governance' },
    { label: 'Reports', icon: 'summarize', path: 'reports' as NavPath, section: 'governance' },
    { label: 'Settings', icon: 'settings', path: 'settings' as NavPath, section: 'governance' },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30]">
      {/* Fixed Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-primary-container z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col h-full overflow-hidden">
          {/* Logo & Institute Header */}
          <div className="h-16 px-5 flex items-center gap-3 border-b border-white/10 shrink-0 cursor-pointer" onClick={() => onNavigate('dashboard')}>
            <img
              alt="Peevees Public School Crest Logo"
              className="h-8 w-auto object-contain"
              src={SCHOOL_CREST_LOGO}
            />
            <div className="flex flex-col min-w-0">
              <span className="font-title-md text-white font-bold tracking-tight truncate">Peevees Public</span>
              <span className="font-label-xs uppercase tracking-widest text-on-primary-container font-semibold">Admin Portal</span>
            </div>
          </div>

          {/* Navigation Links Scroll Container */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
            <div>
              <div className="px-3 pb-1">
                <span className="font-label-xs uppercase tracking-wider text-on-primary-container font-bold">Academic Operations</span>
              </div>
              <nav className="space-y-0.5">
                {navItems.filter(i => i.section === 'academic').map(item => {
                  const isActive = currentPath === item.path || (item.path === 'staff' && currentPath === 'staff-profile');
                  return (
                    <button
                      key={item.path}
                      onClick={() => onNavigate(item.path)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group text-left ${
                        isActive
                          ? 'bg-secondary text-on-secondary font-semibold shadow-sm'
                          : 'text-primary-fixed hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                      <span className="font-body-sm">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div>
              <div className="px-3 pt-2 pb-1">
                <span className="font-label-xs uppercase tracking-wider text-on-primary-container font-bold">Governance & Setup</span>
              </div>
              <nav className="space-y-0.5">
                {navItems.filter(i => i.section === 'governance').map(item => {
                  const isActive = currentPath === item.path;
                  return (
                    <button
                      key={item.path}
                      onClick={() => onNavigate(item.path)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group text-left ${
                        isActive
                          ? 'bg-secondary text-on-secondary font-semibold shadow-sm'
                          : 'text-primary-fixed hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                      <span className="font-body-sm">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Bottom Administrator User Card */}
          <div className="p-3 border-t border-white/10 shrink-0">
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
              <div className="flex items-center gap-2 min-w-0">
                <div className="relative shrink-0">
                  <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-headline-sm">
                    <span className="material-symbols-outlined text-[16px]">person</span>
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-primary-container"></span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-md text-white truncate">Dr. K. Radhakrishnan</span>
                  <span className="font-label-xs text-on-primary-container truncate">Principal &amp; {userRole}</span>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="p-1.5 rounded-lg text-on-primary-container hover:text-white hover:bg-white/10 transition-colors"
                title="Sign Out"
              >
                <span className="material-symbols-outlined text-[20px]">logout</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="pl-64">
        {/* Fixed Header */}
        <header className="fixed top-0 left-64 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl z-40 shadow-[0_1px_8px_rgba(0,0,0,0.04)] px-6 flex items-center justify-between border-b border-surface-container/40">
          {/* Quick Search */}
          <div className="flex items-center gap-3 w-full max-w-md">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
              <input
                type="text"
                placeholder="Search students, staff, roll no, classes... (Cmd+K)"
                onClick={() => setShowSearchModal(true)}
                readOnly
                className="w-full h-10 pl-9 pr-12 rounded-lg bg-surface-container-low text-on-surface font-body-sm placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary/20 border-0 transition-all cursor-pointer"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 font-label-xs px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant">⌘K</kbd>
            </div>
          </div>

          {/* Right Header Icons & Active Session */}
          <div className="flex items-center gap-3">
            {/* Session Selector */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface">
              <span className="material-symbols-outlined text-secondary text-[18px]">calendar_today</span>
              <span className="font-label-md">AY 2026–27 (Current Term)</span>
              <span className="material-symbols-outlined text-outline text-[16px]">expand_more</span>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-9 h-9 rounded-lg bg-surface-container-low text-on-surface flex items-center justify-center hover:bg-surface-container transition-colors relative"
              >
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                <span className="absolute 0 top-0.5 right-0.5 w-4 h-4 rounded-full bg-error text-on-error font-label-xs text-[10px] flex items-center justify-center font-bold">
                  3
                </span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest rounded-xl shadow-xl border border-surface-container p-3 z-50">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-surface-container">
                    <span className="font-title-md font-bold text-on-surface">Notifications</span>
                    <span className="font-label-xs text-secondary font-semibold cursor-pointer">Mark all read</span>
                  </div>
                  <div className="space-y-2 text-body-sm">
                    <div className="p-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
                      <div className="font-semibold text-on-surface text-[12px]">Grade 10-A Maths UT-2 Results Pending</div>
                      <div className="text-on-surface-variant text-[11px] mt-0.5">Submitted by Anjali Menon • Awaiting Principal Approval</div>
                    </div>
                    <div className="p-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
                      <div className="font-semibold text-amber-800 text-[12px]">School Bus Route 4 & 7 Delayed</div>
                      <div className="text-on-surface-variant text-[11px] mt-0.5">15 mins delay due to roadworks on Nilambur road.</div>
                    </div>
                    <div className="p-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
                      <div className="font-semibold text-on-surface text-[12px]">CBSE LOC Verification Notice</div>
                      <div className="text-on-surface-variant text-[11px] mt-0.5">138 of 142 Grade 10 candidate fees verified.</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Help Button */}
            <button
              type="button"
              onClick={() => setShowHelp(!showHelp)}
              className="w-9 h-9 rounded-lg bg-surface-container-low text-on-surface flex items-center justify-center hover:bg-surface-container transition-colors"
              title="Help Center"
            >
              <span className="material-symbols-outlined text-[20px]">help_outline</span>
            </button>

            {/* Admin Header Identity */}
            <div className="flex items-center gap-2 pl-1">
              <div className="flex flex-col text-right">
                <span className="font-label-md text-on-surface leading-tight">Dr. Radhakrishnan</span>
                <span className="font-label-xs text-emerald-600 font-semibold">Active Administrator</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
              </div>
            </div>
          </div>
        </header>

        {/* Global Search Modal */}
        {showSearchModal && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-primary-container/40 backdrop-blur-sm p-4">
            <div className="bg-surface-container-lowest w-full max-w-xl rounded-xl shadow-2xl border border-surface-container overflow-hidden">
              <div className="p-3 border-b border-surface-container flex items-center gap-2">
                <span className="material-symbols-outlined text-outline">search</span>
                <input
                  autoFocus
                  type="text"
                  placeholder="Type student name, staff ID, roll no, or page..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full h-9 bg-transparent border-0 focus:outline-none text-on-surface text-body-md"
                />
                <button onClick={() => setShowSearchModal(false)} className="text-outline hover:text-on-surface">
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              <div className="p-3 max-h-80 overflow-y-auto space-y-2">
                <span className="font-label-xs uppercase tracking-wider text-on-surface-variant font-bold px-2 block">Quick Navigation</span>
                <button
                  onClick={() => { onNavigate('students'); setShowSearchModal(false); }}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low transition-colors text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[18px]">school</span>
                    <span className="text-body-sm font-semibold">Students Directory & Records</span>
                  </div>
                  <span className="text-[11px] text-on-surface-variant">1,248 Records</span>
                </button>
                <button
                  onClick={() => { onNavigate('staff'); setShowSearchModal(false); }}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low transition-colors text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[18px]">badge</span>
                    <span className="text-body-sm font-semibold">Staff & Faculty Directory</span>
                  </div>
                  <span className="text-[11px] text-on-surface-variant">86 Members</span>
                </button>
                <button
                  onClick={() => { onNavigate('analytics'); setShowSearchModal(false); }}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low transition-colors text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[18px]">analytics</span>
                    <span className="text-body-sm font-semibold">Executive Analytics Cockpit</span>
                  </div>
                  <span className="text-[11px] text-on-surface-variant">Live Insights</span>
                </button>
                <button
                  onClick={() => { onNavigate('settings'); setShowSearchModal(false); }}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low transition-colors text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[18px]">settings</span>
                    <span className="text-body-sm font-semibold">RBAC & Access Governance</span>
                  </div>
                  <span className="text-[11px] text-on-surface-variant">ISO 27001</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Viewport Content */}
        <main className="relative pt-16 bg-surface min-h-screen">
          <div className="w-full p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
