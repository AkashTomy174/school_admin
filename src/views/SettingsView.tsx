import React, { useState } from 'react';
import { PERMISSIONS_DATA, PermissionRow } from '../data/portalData';

interface SettingsViewProps {
  onShowToast: (msg: string) => void;
}

export function SettingsView({ onShowToast }: SettingsViewProps) {
  const [activeTab, setActiveTab] = useState('rbac');
  const [activeRoleScope, setActiveRoleScope] = useState('Super Admin');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [ipWhitelisting, setIpWhitelisting] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('15');
  const [expandedNodes, setExpandedNodes] = useState(false);
  const [showPacketTraceModal, setShowPacketTraceModal] = useState(false);
  const [showCreateRoleModal, setShowCreateRoleModal] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleScope, setNewRoleScope] = useState('Academic Operations');

  const [permissions, setPermissions] = useState<PermissionRow[]>(PERMISSIONS_DATA);

  const subNodes = [
    { title: 'Student Aadhaar / Biometric Export API', level: 'Super Admin Only' },
    { title: 'CBSE Moderation Mark Adjustment Override', level: 'Super Admin & Academic Admin' },
    { title: 'Emergency Parent Broadcast SMS Dispatcher', level: 'Principal & Vice Principal' },
    { title: 'Faculty Salary Slip & Gratuity Ledger View', level: 'Bursar & Super Admin' }
  ];

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Top Breadcrumb & Status Ribbon */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-on-surface-variant font-label-xs uppercase tracking-wider">
          <span>Governance &amp; Setup</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span>System Settings</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-secondary font-bold">RBAC &amp; Access Governance</span>
        </div>
        <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 text-label-xs font-semibold shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
          Directory Sync: Active (LDAP / ActiveDirectory v4.2)
        </div>
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="font-headline-xl text-on-surface tracking-tight">System Settings &amp; Access Governance</h1>
            <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-xs font-bold uppercase tracking-wider">
              ISO 27001 Compliant
            </span>
          </div>
          <p className="font-body-md text-on-surface-variant max-w-3xl">
            Configure institutional parameters, user role hierarchies, and role-based access control (RBAC). Changes take effect immediately across all academic nodes.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onShowToast('Unsaved policy adjustments discarded.')}
            className="h-10 px-4 rounded bg-surface-container-lowest text-on-surface font-label-md hover:bg-surface-container transition-colors shadow-sm flex items-center gap-2 border border-surface-container"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
            Discard Unsaved
          </button>
          <button
            type="button"
            onClick={() => onShowToast('RBAC Policy changes committed to ActiveDirectory LDAP sync.')}
            className="h-10 px-5 rounded bg-primary-container text-on-primary font-label-md hover:bg-inverse-surface transition-colors shadow-md flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            Save Policy Changes
          </button>
        </div>
      </div>

      {/* Horizontal Sub-Navigation Tabs */}
      <div className="bg-surface-container-lowest rounded-xl p-1 shadow-sm border border-surface-container/60 flex items-center overflow-x-auto gap-1">
        <button
          type="button"
          onClick={() => setActiveTab('school')}
          className={`px-4 py-2.5 rounded font-label-md whitespace-nowrap flex items-center gap-2 transition-colors ${
            activeTab === 'school' ? 'bg-primary-container text-on-primary font-semibold shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">account_balance</span>
          School Information
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('academic')}
          className={`px-4 py-2.5 rounded font-label-md whitespace-nowrap flex items-center gap-2 transition-colors ${
            activeTab === 'academic' ? 'bg-primary-container text-on-primary font-semibold shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">tune</span>
          Academic Configuration
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('rbac')}
          className={`px-4 py-2.5 rounded font-label-md whitespace-nowrap flex items-center gap-2 transition-colors ${
            activeTab === 'rbac' ? 'bg-primary-container text-on-primary font-semibold shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
          Users, Roles &amp; Permissions
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-2.5 rounded font-label-md whitespace-nowrap flex items-center gap-2 transition-colors ${
            activeTab === 'notifications' ? 'bg-primary-container text-on-primary font-semibold shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">cell_tower</span>
          Notification &amp; SMS Gateways
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2.5 rounded font-label-md whitespace-nowrap flex items-center gap-2 transition-colors ${
            activeTab === 'audit' ? 'bg-primary-container text-on-primary font-semibold shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">verified_user</span>
          Audit Logs &amp; Compliance
        </button>
      </div>

      {/* Role Directory Pill Strip & Create Action */}
      <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-surface-container/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <span className="font-label-xs uppercase tracking-wider text-on-surface-variant pr-2 font-bold shrink-0">Role Scopes:</span>
          {[
            { name: 'Super Admin', count: 1 },
            { name: 'Academic Admin', count: 3 },
            { name: 'Department Head', count: 8 },
            { name: 'Teacher', count: 74 },
            { name: 'Office Staff', count: 12 }
          ].map(r => (
            <button
              key={r.name}
              type="button"
              onClick={() => {
                setActiveRoleScope(r.name);
                onShowToast(`Focusing inspection on role: ${r.name}`);
              }}
              className={`px-3 py-1.5 rounded-full font-label-md flex items-center gap-2 shrink-0 transition-colors ${
                activeRoleScope === r.name
                  ? 'bg-primary-container text-on-primary shadow-sm font-bold'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <span>{r.name}</span>
              <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold ${
                activeRoleScope === r.name ? 'bg-white/20 text-on-primary' : 'bg-surface-container-highest text-on-surface-variant'
              }`}>
                {r.count}
              </span>
            </button>
          ))}
        </div>

        <div className="shrink-0">
          <button
            type="button"
            onClick={() => setShowCreateRoleModal(true)}
            className="h-9 px-3.5 rounded bg-secondary text-on-secondary font-label-md hover:bg-secondary-container transition-colors shadow-sm flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">add_moderator</span>
            Create Custom Role
          </button>
        </div>
      </div>

      {/* Core Permissions Matrix Section */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-surface-container/60">
        {/* Matrix Header Strip */}
        <div className="p-5 bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-container/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[22px]">policy</span>
              <h2 className="font-headline-sm text-on-surface font-bold">Granular Institutional Permissions Matrix</h2>
            </div>
            <p className="font-body-sm text-on-surface-variant mt-0.5">
              Live enforcement level: Strict Hierarchical. Hover over policy cells to view explicit overrides and conditions.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-label-xs text-on-surface-variant">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>Full Control</span>
            </div>
            <div className="flex items-center gap-1.5 text-label-xs text-on-surface-variant">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>Conditional / Scope Restricted</span>
            </div>
            <div className="flex items-center gap-1.5 text-label-xs text-on-surface-variant">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
              <span>Zero Access</span>
            </div>
          </div>
        </div>

        {/* The Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container text-on-surface-variant font-label-md uppercase tracking-wider">
                <th className="py-3.5 px-6 font-bold w-1/4">Module &amp; Resource Scope</th>
                <th className="py-3.5 px-4 font-bold w-1/5 text-center bg-primary-container/5">Super Admin</th>
                <th className="py-3.5 px-4 font-bold w-1/5 text-center">Academic Admin</th>
                <th className="py-3.5 px-4 font-bold w-1/5 text-center">Teacher</th>
                <th className="py-3.5 px-4 font-bold w-1/5 text-center">Office Staff / Clerk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container font-body-sm text-body-sm">
              {permissions.map((p, idx) => (
                <tr key={idx} className="hover:bg-surface-container-low/70 transition-colors">
                  <td className="py-4 px-6 align-middle">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded bg-surface-container text-secondary mt-0.5">
                        <span className="material-symbols-outlined text-[20px]">{p.icon}</span>
                      </div>
                      <div>
                        <span className="font-title-md text-on-surface block font-semibold">{p.module}</span>
                        <span className="font-body-sm text-on-surface-variant">{p.description}</span>
                      </div>
                    </div>
                  </td>

                  {/* Super Admin */}
                  <td className="py-4 px-4 text-center align-middle bg-primary-container/[0.02]">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-50 text-emerald-800 font-label-xs font-semibold">
                      <span className="material-symbols-outlined text-[16px] text-emerald-600">check_circle</span>
                      <span>{p.superAdmin.text}</span>
                    </div>
                  </td>

                  {/* Academic Admin */}
                  <td className="py-4 px-4 text-center align-middle">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded font-label-xs font-semibold ${
                      p.academicAdmin.type === 'full' ? 'bg-emerald-50 text-emerald-800' : 'bg-surface-container text-on-surface-variant'
                    }`}>
                      <span className="material-symbols-outlined text-[16px]">
                        {p.academicAdmin.type === 'full' ? 'check_circle' : 'visibility'}
                      </span>
                      <span>{p.academicAdmin.text}</span>
                    </div>
                  </td>

                  {/* Teacher */}
                  <td className="py-4 px-4 text-center align-middle">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded font-label-xs font-semibold ${
                      p.teacher.type === 'conditional'
                        ? 'bg-amber-50 text-amber-900'
                        : p.teacher.type === 'restricted'
                        ? 'bg-surface-container-high/60 text-outline'
                        : 'bg-surface-container text-on-surface-variant'
                    }`}>
                      <span className="material-symbols-outlined text-[16px]">
                        {p.teacher.type === 'restricted' ? 'lock' : p.teacher.type === 'conditional' ? 'assignment_turned_in' : 'visibility'}
                      </span>
                      <span>{p.teacher.text}</span>
                    </div>
                  </td>

                  {/* Office Staff */}
                  <td className="py-4 px-4 text-center align-middle">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded font-label-xs font-semibold ${
                      p.officeStaff.type === 'conditional'
                        ? 'bg-amber-50 text-amber-900'
                        : p.officeStaff.type === 'restricted'
                        ? 'bg-surface-container-high/60 text-outline'
                        : 'bg-surface-container text-on-surface-variant'
                    }`}>
                      <span className="material-symbols-outlined text-[16px]">
                        {p.officeStaff.type === 'restricted' ? 'lock' : 'edit_note'}
                      </span>
                      <span>{p.officeStaff.text}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Matrix Footnote / Sub-Nodes Accordion */}
        <div className="p-4 bg-surface-container-lowest flex flex-col border-t border-surface-container">
          <div className="flex flex-col sm:flex-row items-center justify-between text-on-surface-variant font-body-sm gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-outline text-[18px]">info</span>
              <span>Showing 5 core high-security modules. Custom sub-resource overrides (18 rules) currently active.</span>
            </div>
            <button
              type="button"
              onClick={() => setExpandedNodes(!expandedNodes)}
              className="text-secondary font-label-md hover:underline flex items-center gap-1"
            >
              <span>{expandedNodes ? 'Collapse Sub-Nodes' : 'Expand Sub-Permission Nodes (32)'}</span>
              <span className="material-symbols-outlined text-[16px]">
                {expandedNodes ? 'unfold_less' : 'unfold_more'}
              </span>
            </button>
          </div>

          {expandedNodes && (
            <div className="mt-3 pt-3 border-t border-surface-container grid grid-cols-1 md:grid-cols-2 gap-2 animate-in fade-in">
              {subNodes.map((node, i) => (
                <div key={i} className="p-2.5 rounded bg-surface-container-low flex items-center justify-between">
                  <span className="font-body-sm font-medium text-on-surface">{node.title}</span>
                  <span className="font-label-xs text-secondary bg-surface-container px-2 py-0.5 rounded font-bold">
                    {node.level}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Security & Audit Policy Configuration Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Card: Institutional Security Controls (7 cols) */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-surface-container/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-surface-container">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[22px]">security</span>
                <h3 className="font-headline-sm text-on-surface font-bold">Institutional Security Controls</h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-label-xs font-semibold">
                Policy Guard Active
              </span>
            </div>

            <div className="space-y-4">
              {/* 2FA Toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
                <div className="space-y-0.5 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="font-title-md text-on-surface font-semibold">Enforce Two-Factor Authentication (2FA)</span>
                    <span className="px-2 py-0.2 rounded bg-primary-container text-on-primary font-label-xs text-[10px]">Mandatory</span>
                  </div>
                  <p className="font-body-sm text-on-surface-variant">Requires TOTP authenticator app or hardware keys for all faculty &amp; administrative logins.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setTwoFactorEnabled(!twoFactorEnabled);
                    onShowToast(`Two-Factor Authentication enforcement set to ${!twoFactorEnabled ? 'Active' : 'Optional'}.`);
                  }}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${
                    twoFactorEnabled ? 'bg-secondary' : 'bg-surface-container-high'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out mt-1 ml-1 ${
                      twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Session Timeout Dropdown */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors gap-3">
                <div className="space-y-0.5">
                  <span className="font-title-md text-on-surface font-semibold block">Session Timeout for Idle Admin Terminals</span>
                  <p className="font-body-sm text-on-surface-variant">Terminates browser session and clears local credential cache upon inactivity.</p>
                </div>
                <div className="relative shrink-0">
                  <select
                    value={sessionTimeout}
                    onChange={e => {
                      setSessionTimeout(e.target.value);
                      onShowToast(`Session idle timeout threshold adjusted to ${e.target.value} minutes.`);
                    }}
                    className="h-9 pl-3 pr-8 rounded bg-surface-container-lowest text-on-surface font-label-md shadow-sm appearance-none focus:outline-none cursor-pointer border border-surface-container"
                  >
                    <option value="15">15 Minutes (Strict)</option>
                    <option value="30">30 Minutes (Recommended)</option>
                    <option value="60">60 Minutes</option>
                    <option value="120">2 Hours (Classroom Only)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-outline text-[18px] pointer-events-none">arrow_drop_down</span>
                </div>
              </div>

              {/* IP Whitelisting Toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
                <div className="space-y-0.5 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="font-title-md text-on-surface font-semibold">IP Whitelisting for Campus Administrative Network</span>
                    <span className="font-numerical-data text-secondary">CIDR 192.168.1.0/24</span>
                  </div>
                  <p className="font-body-sm text-on-surface-variant">Restricts Bursar &amp; Student Data changes strictly to physical on-campus Ethernet &amp; secured administrative Wi-Fi.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIpWhitelisting(!ipWhitelisting);
                    onShowToast(`Administrative IP Whitelisting is now ${!ipWhitelisting ? 'Enforced' : 'Disabled'}.`);
                  }}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${
                    ipWhitelisting ? 'bg-secondary' : 'bg-surface-container-high'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out mt-1 ml-1 ${
                      ipWhitelisting ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Metrics Ribbon */}
          <div className="mt-4 pt-3 border-t border-surface-container flex items-center justify-between text-on-surface-variant font-label-xs">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-emerald-600">lock_clock</span>
              <span>Last Policy Commit: 08:30 IST by Dr. K. Radhakrishnan</span>
            </div>
            <button
              onClick={() => onShowToast('Enterprise SAML / OAuth SSO configuration panel opened.')}
              className="text-secondary hover:underline font-bold"
            >
              Configure SAML SSO →
            </button>
          </div>
        </div>

        {/* Right Card: Recent Security Audit Trail (5 cols) */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-surface-container/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-surface-container">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[22px]">history_edu</span>
                <h3 className="font-headline-sm text-on-surface font-bold">Recent Security Audit Trail</h3>
              </div>
              <button
                type="button"
                onClick={() => onShowToast('Complete administrative security audit trail loaded.')}
                className="text-secondary font-label-xs uppercase tracking-wider font-bold hover:underline"
              >
                View Complete Log
              </button>
            </div>

            <div className="space-y-4 relative">
              <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-surface-container"></div>

              {/* Audit Item 1 */}
              <div className="relative flex items-start gap-3 pl-1">
                <div className="w-7 h-7 rounded-full bg-surface-container-highest text-secondary flex items-center justify-center shrink-0 z-10 shadow-sm mt-0.5">
                  <span className="material-symbols-outlined text-[16px]">edit_attributes</span>
                </div>
                <div className="flex-1 bg-surface-container-low p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-on-surface font-bold">Role Matrix Adjusted</span>
                    <span className="font-label-xs text-on-surface-variant">14 mins ago</span>
                  </div>
                  <p className="font-body-sm text-on-surface-variant mt-1">
                    <span className="font-semibold text-on-surface">Dr. Radhakrishnan</span> modified permissions for role: <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface font-label-xs">Office Staff</span>
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-label-xs text-on-surface-variant font-numerical-data">
                    <span className="material-symbols-outlined text-[13px]">desktop_mac</span>
                    <span>Workstation: PRINCIPAL-TERMINAL-01</span>
                  </div>
                </div>
              </div>

              {/* Audit Item 2 */}
              <div className="relative flex items-start gap-3 pl-1">
                <div className="w-7 h-7 rounded-full bg-error-container text-error flex items-center justify-center shrink-0 z-10 shadow-sm mt-0.5">
                  <span className="material-symbols-outlined text-[16px]">fmd_bad</span>
                </div>
                <div className="flex-1 bg-error-container/20 p-3 rounded-lg border border-error/15">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-error font-bold">Failed Login Incident</span>
                    <span className="font-label-xs text-on-surface-variant">2 hours ago</span>
                  </div>
                  <p className="font-body-sm text-on-surface-variant mt-1">
                    Failed login attempt detected from un-whitelisted IP: <code className="bg-surface-container-lowest px-1 py-0.5 rounded text-error font-numerical-data">192.168.1.104</code>. Account locked temporarily (3 attempts).
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="font-label-xs text-error font-bold uppercase tracking-wider flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-error"></span> Blocked at Gateway
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowPacketTraceModal(true)}
                      className="text-secondary font-label-xs hover:underline"
                    >
                      Investigate Packet Trace
                    </button>
                  </div>
                </div>
              </div>

              {/* Audit Item 3 */}
              <div className="relative flex items-start gap-3 pl-1">
                <div className="w-7 h-7 rounded-full bg-surface-container-highest text-secondary flex items-center justify-center shrink-0 z-10 shadow-sm mt-0.5">
                  <span className="material-symbols-outlined text-[16px]">key</span>
                </div>
                <div className="flex-1 bg-surface-container-low p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-on-surface font-bold">API Secret Rotated</span>
                    <span className="font-label-xs text-on-surface-variant">Yesterday, 17:42</span>
                  </div>
                  <p className="font-body-sm text-on-surface-variant mt-1">
                    Automated monthly rotation for <span className="font-medium text-on-surface">CBSE Assessment Integration Webhook</span>. Verified handshake 200 OK.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-surface-container flex items-center justify-between">
            <span className="font-body-sm text-on-surface-variant">Cryptographic Log Hash:</span>
            <code className="font-label-xs text-outline font-numerical-data">SHA-256 #89c1...a4f2</code>
          </div>
        </div>
      </div>

      {/* Bottom Institutional Compliance Banner */}
      <div className="bg-surface-container-low rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm border border-surface-container">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-secondary shadow-sm">
            <span className="material-symbols-outlined text-[24px]">gavel</span>
          </div>
          <div>
            <h4 className="font-title-md text-on-surface font-semibold">Institutional Governance Policy v4.8</h4>
            <p className="font-body-sm text-on-surface-variant">Peevees Public School mandates quarterly privilege recertification for all administrative staff under state education guidelines.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onShowToast('Access Matrix PDF report generated and exported.')}
            className="h-9 px-3.5 rounded bg-surface-container-lowest text-on-surface font-label-md hover:bg-surface-container transition-colors shadow-sm flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">file_download</span>
            Export Access Matrix (PDF)
          </button>
          <button
            type="button"
            onClick={() => onShowToast('All institutional administrative roles recertified for Q4 2026.')}
            className="h-9 px-3.5 rounded bg-surface-container text-on-surface font-label-md hover:bg-surface-container-high transition-colors shadow-sm flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">refresh</span>
            Recertify All Roles
          </button>
        </div>
      </div>

      {/* Packet Trace Investigation Modal */}
      {showPacketTraceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-container/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-xl shadow-2xl overflow-hidden border border-outline-variant/30">
            <div className="p-5 bg-surface-container-low flex items-center justify-between border-b border-surface-container">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-error text-[22px]">policy</span>
                <h3 className="font-headline-sm text-on-surface font-bold">Firewall Packet Inspection</h3>
              </div>
              <button onClick={() => setShowPacketTraceModal(false)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-5 space-y-4 text-body-sm font-mono text-[12px]">
              <div className="p-3 bg-surface-container-low rounded-lg text-on-surface space-y-1">
                <div>[TIMESTAMP] 2026-10-15T06:14:02Z</div>
                <div>[SOURCE IP] 192.168.1.104 (Ethernet Port 14, Library Terminal 2)</div>
                <div>[DEST IP] 10.0.0.1 (Institutional Gateway Router)</div>
                <div>[AUTH_TARGET] bursar.office@peevees.edu.in</div>
                <div>[REASON] IP NOT IN APPROVED CIDR / FAILED TOTP (3 attempts)</div>
                <div className="text-error font-bold">[ACTION] TCP_RST + ACCOUNT_LOCKED_30_MINS</div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowPacketTraceModal(false)}
                  className="px-4 h-9 rounded-lg bg-primary-container text-on-primary font-label-md"
                >
                  Dismiss Trace
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Custom Role Modal */}
      {showCreateRoleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-container/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-xl shadow-2xl overflow-hidden border border-outline-variant/30">
            <div className="p-5 bg-surface-container-low flex items-center justify-between border-b border-surface-container">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[22px]">add_moderator</span>
                <h3 className="font-headline-sm text-on-surface font-bold">Create Custom Role</h3>
              </div>
              <button onClick={() => setShowCreateRoleModal(false)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onShowToast(`Created role "${newRoleName}" assigned under ${newRoleScope}.`);
                setShowCreateRoleModal(false);
              }}
              className="p-5 space-y-4"
            >
              <div>
                <label className="font-label-xs uppercase font-bold text-on-surface-variant block mb-1">Role Title</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Exam Superintendent / Hostel Warden"
                  value={newRoleName}
                  onChange={e => setNewRoleName(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-surface-container-low text-on-surface text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
                />
              </div>

              <div>
                <label className="font-label-xs uppercase font-bold text-on-surface-variant block mb-1">Department Scope</label>
                <select
                  value={newRoleScope}
                  onChange={e => setNewRoleScope(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-surface-container-low text-on-surface text-body-sm focus:outline-none"
                >
                  <option>Academic Operations</option>
                  <option>Examination &amp; Board Evaluation</option>
                  <option>Bursar &amp; Student Accounts</option>
                  <option>Campus Security &amp; Transport</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-surface-container">
                <button
                  type="button"
                  onClick={() => setShowCreateRoleModal(false)}
                  className="px-4 h-9 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 h-9 rounded-lg bg-secondary hover:bg-secondary-container text-on-secondary font-label-md shadow-sm"
                >
                  Establish Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
