import React, { useState, useMemo } from 'react';
import { INITIAL_STAFF, StaffMember } from '../data/portalData';

interface StaffViewProps {
  onSelectStaffProfile: (staff: StaffMember) => void;
  onShowToast: (msg: string) => void;
}

export function StaffView({ onSelectStaffProfile, onShowToast }: StaffViewProps) {
  const [staffList, setStaffList] = useState<StaffMember[]>(INITIAL_STAFF);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');
  const [activeStatus, setActiveStatus] = useState<'all' | 'Active' | 'On Leave' | 'Inactive'>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Drawer & Deactivate modal state
  const [showAddDrawer, setShowAddDrawer] = useState(false);
  const [deactivateTarget, setDeactivateTarget] = useState<StaffMember | null>(null);

  // New staff form state
  const [newStaff, setNewStaff] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: 'Mathematics',
    role: 'Teacher (PGT)',
    classTeacherFor: 'None',
    assignedSubjects: 'Grade 10-A, Grade 11-B',
    joiningDate: '2026-06-01',
    status: 'Active' as const
  });

  const filteredStaff = useMemo(() => {
    return staffList.filter(staff => {
      const matchesSearch = 
        staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.department.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDept = selectedDept === 'all' || staff.department.toLowerCase().includes(selectedDept.toLowerCase());
      const matchesRole = selectedRole === 'all' || staff.role.toLowerCase().includes(selectedRole.toLowerCase());
      const matchesStatus = activeStatus === 'all' || staff.status === activeStatus;

      return matchesSearch && matchesDept && matchesRole && matchesStatus;
    });
  }, [staffList, searchQuery, selectedDept, selectedRole, activeStatus]);

  const handleToggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredStaff.map(s => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleRow = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDept('all');
    setSelectedRole('all');
    setActiveStatus('all');
  };

  const handleConfirmDeactivate = () => {
    if (deactivateTarget) {
      setStaffList(prev => prev.map(s => s.id === deactivateTarget.id ? { ...s, status: 'Inactive' } : s));
      onShowToast(`Staff record ${deactivateTarget.name} (${deactivateTarget.id}) successfully deactivated.`);
      setDeactivateTarget(null);
    }
  };

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `EMP-2026-0${Math.floor(Math.random() * 90) + 10}`;
    const created: StaffMember = {
      id: newId,
      name: `${newStaff.firstName} ${newStaff.lastName}`,
      email: newStaff.email || `${newStaff.firstName.toLowerCase()}.${newStaff.lastName.toLowerCase()}@peevees.edu.in`,
      phone: newStaff.phone || '+91 98470 99999',
      role: newStaff.role,
      department: newStaff.department,
      assignedSubjects: newStaff.assignedSubjects.split(',').map(s => s.trim()),
      classTeacherFor: newStaff.classTeacherFor === 'None' ? null : newStaff.classTeacherFor,
      joiningDate: newStaff.joiningDate,
      status: 'Active',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBP6Fci0znOmBudcTlL-lPpUOoCm7GMEQRHcWZSWGGbeJ0THwBhYMC5lyPzNqd8_7BgY-M8fEvYhAYwh-RzwZ-OFzjtaWf7V7Jsn-k1coFCUHPVesth3QtTAxDmG6FAOfb_wqxf5IQTrqocFw75nXG_dCQWm0qny7vupMSp7CIJ_J2GdrPpXLvf0CNjDG2A8yOnLEx30ujBjF5FEiGJ1McnaoksfxalmtLTzh3Dhc7YtJHw_D8MC9Bc'
    };

    setStaffList([created, ...staffList]);
    setShowAddDrawer(false);
    onShowToast(`New staff member added with ID ${newId} and welcome credentials issued.`);
  };

  const isAllSelected = filteredStaff.length > 0 && selectedIds.length === filteredStaff.length;

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-on-surface-variant font-label-xs uppercase tracking-wider mb-1">
            <span>Administration</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-secondary font-semibold">Faculty &amp; Operations</span>
          </div>
          <h1 className="font-headline-xl text-on-surface tracking-tight">Staff Directory &amp; Management</h1>
          <p className="font-body-md text-on-surface-variant mt-0.5">
            Manage academic faculty, department allocations, teaching assignments, and administrative staff.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onShowToast('Generating official school faculty export (XLS/CSV).')}
            className="h-[38px] px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Export Directory (XLS/CSV)</span>
          </button>
          <button
            onClick={() => setShowAddDrawer(true)}
            className="h-[38px] px-4 rounded-xl bg-primary-container hover:bg-on-background text-on-primary font-label-md transition-colors flex items-center gap-1.5 shadow-md"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            <span>+ Add New Staff</span>
          </button>
        </div>
      </div>

      {/* Macro KPIs Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-xs uppercase tracking-wider text-on-surface-variant">Active Faculty</span>
            <span className="font-headline-lg font-bold text-on-surface mt-1">81 <span className="font-body-sm text-on-surface-variant font-normal">/ 86</span></span>
            <span className="font-label-xs text-emerald-600 mt-1 flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[12px]">arrow_upward</span>94.2% Attendance rate
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-surface-container-low text-secondary flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">badge</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-xs uppercase tracking-wider text-on-surface-variant">Class In-Charges</span>
            <span className="font-headline-lg font-bold text-on-surface mt-1">24 <span className="font-body-sm text-on-surface-variant font-normal">Assigned</span></span>
            <span className="font-label-xs text-secondary mt-1 flex items-center gap-0.5">All 24 Sections Covered</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-surface-container-low text-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">supervisor_account</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-xs uppercase tracking-wider text-on-surface-variant">On Approved Leave</span>
            <span className="font-headline-lg font-bold text-tertiary-container mt-1">03 <span className="font-body-sm text-on-surface-variant font-normal">Staff</span></span>
            <span className="font-label-xs text-on-tertiary-container mt-1 flex items-center gap-0.5">2 Substitutes Assigned</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-tertiary-fixed/30 text-on-tertiary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">event_busy</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-xs uppercase tracking-wider text-on-surface-variant">Departments</span>
            <span className="font-headline-lg font-bold text-on-surface mt-1">7 <span className="font-body-sm text-on-surface-variant font-normal">Faculties</span></span>
            <span className="font-label-xs text-on-surface-variant mt-1 flex items-center gap-0.5">38 PGT, 28 TGT, 15 PRT</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-surface-container-low text-on-surface-variant flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">account_tree</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Toolbar Container */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm p-4 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[280px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
            <input
              type="text"
              placeholder="Search by staff name, employee ID, email, or subject..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full h-[38px] pl-9 pr-8 rounded-xl bg-surface-container-low text-on-surface font-body-sm placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>

          {/* Filters Group */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Department */}
            <div className="relative">
              <select
                value={selectedDept}
                onChange={e => setSelectedDept(e.target.value)}
                className="h-[38px] pl-3 pr-8 rounded-xl bg-surface-container-low text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 appearance-none cursor-pointer"
              >
                <option value="all">All Departments</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
                <option value="Social Science">Social Sciences</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Administration">Administration</option>
                <option value="Physical Education">Physical Education</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-outline text-[16px] pointer-events-none">expand_more</span>
            </div>

            {/* Role */}
            <div className="relative">
              <select
                value={selectedRole}
                onChange={e => setSelectedRole(e.target.value)}
                className="h-[38px] pl-3 pr-8 rounded-xl bg-surface-container-low text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 appearance-none cursor-pointer"
              >
                <option value="all">All Roles</option>
                <option value="Teacher (PGT)">Senior PGT</option>
                <option value="Teacher (TGT)">TGT</option>
                <option value="Teacher (PRT)">PRT</option>
                <option value="Head of Department">Head of Department</option>
                <option value="Senior Office Superintendent">Senior Office Staff</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-outline text-[16px] pointer-events-none">expand_more</span>
            </div>

            {/* Status Filter Pills */}
            <div className="flex items-center bg-surface-container-low p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveStatus('all')}
                className={`px-3 py-1 rounded-lg font-label-md transition-colors ${
                  activeStatus === 'all'
                    ? 'bg-surface-container-lowest text-secondary shadow-sm font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                All (86)
              </button>
              <button
                type="button"
                onClick={() => setActiveStatus('Active')}
                className={`px-3 py-1 rounded-lg font-label-md transition-colors ${
                  activeStatus === 'Active'
                    ? 'bg-surface-container-lowest text-secondary shadow-sm font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Active (81)
              </button>
              <button
                type="button"
                onClick={() => setActiveStatus('On Leave')}
                className={`px-3 py-1 rounded-lg font-label-md transition-colors ${
                  activeStatus === 'On Leave'
                    ? 'bg-surface-container-lowest text-secondary shadow-sm font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                On Leave (3)
              </button>
              <button
                type="button"
                onClick={() => setActiveStatus('Inactive')}
                className={`px-3 py-1 rounded-lg font-label-md transition-colors ${
                  activeStatus === 'Inactive'
                    ? 'bg-surface-container-lowest text-secondary shadow-sm font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Inactive (2)
              </button>
            </div>

            <button
              type="button"
              onClick={handleResetFilters}
              className="text-secondary font-label-md hover:underline px-2 py-1"
            >
              Clear filters
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-surface-container/60 text-on-surface-variant font-body-sm">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-secondary">filter_list</span>
            <span className="font-medium text-on-surface">Showing {filteredStaff.length} total staff members</span>
            <span className="text-outline">• Academic Year 2026–27 roster</span>
          </div>
          <div className="flex items-center gap-2 text-label-xs">
            <span>Sort by:</span>
            <span className="font-semibold text-on-surface flex items-center">Employee ID <span className="material-symbols-outlined text-[14px]">arrow_downward</span></span>
          </div>
        </div>
      </div>

      {/* Staff Data Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant font-label-md uppercase tracking-wider">
                <th className="py-3 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={e => handleToggleSelectAll(e.target.checked)}
                    className="w-4 h-4 rounded text-secondary focus:ring-0 cursor-pointer accent-secondary"
                  />
                </th>
                <th className="py-3 px-4">Employee ID</th>
                <th className="py-3 px-4">Staff Name &amp; Email</th>
                <th className="py-3 px-4">Role &amp; Cadre</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Assigned Subjects</th>
                <th className="py-3 px-4">Class Teacher For</th>
                <th className="py-3 px-4">Joining Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container/60 font-body-sm text-body-sm">
              {filteredStaff.map(staff => {
                const isSelected = selectedIds.includes(staff.id);
                const isInactive = staff.status === 'Inactive';
                return (
                  <tr
                    key={staff.id}
                    className={`hover:bg-surface-container-low/60 transition-colors group ${
                      isInactive ? 'opacity-70' : ''
                    } ${isSelected ? 'bg-surface-container-low/50' : ''}`}
                  >
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleRow(staff.id)}
                        className="w-4 h-4 rounded text-secondary focus:ring-0 cursor-pointer accent-secondary"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-numerical-data px-2 py-0.5 rounded bg-surface-container font-mono text-on-surface font-semibold">
                        {staff.id}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 bg-primary/10 border border-white shadow-sm">
                          <img
                            src={staff.avatarUrl}
                            alt={staff.name}
                            className={`w-full h-full object-cover ${isInactive ? 'grayscale' : ''}`}
                          />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <button
                            onClick={() => onSelectStaffProfile(staff)}
                            className="font-semibold text-on-surface group-hover:text-secondary transition-colors text-left truncate"
                          >
                            {staff.name}
                          </button>
                          <span className="text-on-surface-variant font-label-xs truncate">{staff.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded font-label-xs font-semibold ${
                        staff.role.includes('Head')
                          ? 'bg-primary-fixed text-on-primary-fixed'
                          : 'bg-surface-container text-on-surface'
                      }`}>
                        {staff.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-on-surface font-medium">{staff.department}</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {staff.assignedSubjects.length > 0 ? (
                          staff.assignedSubjects.map((sub, idx) => (
                            <span key={idx} className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-xs">
                              {sub}
                            </span>
                          ))
                        ) : (
                          <span className="text-on-surface-variant font-label-xs italic">Unassigned</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {staff.classTeacherFor ? (
                        <span className="px-2 py-0.5 rounded-full bg-secondary-fixed/50 text-on-secondary-fixed font-label-xs font-semibold">
                          {staff.classTeacherFor}
                        </span>
                      ) : (
                        <span className="text-on-surface-variant font-label-xs italic">None</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-on-surface-variant font-numerical-data">{staff.joiningDate}</td>
                    <td className="py-3 px-4">
                      {staff.status === 'Active' && (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-label-xs font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Active
                        </span>
                      )}
                      {staff.status === 'On Leave' && (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-label-xs font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>On Leave
                        </span>
                      )}
                      {staff.status === 'Inactive' && (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-xs font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-outline"></span>Inactive
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onSelectStaffProfile(staff)}
                          className="w-8 h-8 rounded-lg text-on-surface-variant hover:text-secondary hover:bg-surface-container flex items-center justify-center transition-colors"
                          title="View Profile"
                        >
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </button>
                        {isInactive ? (
                          <button
                            onClick={() => {
                              setStaffList(prev => prev.map(s => s.id === staff.id ? { ...s, status: 'Active' } : s));
                              onShowToast(`Active status restored for ${staff.name}.`);
                            }}
                            className="w-8 h-8 rounded-lg text-on-surface-variant hover:text-emerald-700 hover:bg-emerald-50 flex items-center justify-center transition-colors"
                            title="Reactivate Staff"
                          >
                            <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => setDeactivateTarget(staff)}
                            className="w-8 h-8 rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container/40 flex items-center justify-center transition-colors"
                            title="Deactivate Staff"
                          >
                            <span className="material-symbols-outlined text-[18px]">person_off</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Bulk Action & Pagination Bar */}
        <div className="p-4 bg-surface-container-low flex flex-col md:flex-row items-center justify-between gap-4 border-t border-surface-container/60">
          <div className="flex items-center gap-4">
            <span className="font-body-sm font-medium text-on-surface-variant">
              Selected {selectedIds.length} of {staffList.length} staff
            </span>
            {selectedIds.length > 0 && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onShowToast(`Bulk reassigning department for ${selectedIds.length} faculty.`)}
                  className="px-2.5 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface font-label-md hover:bg-surface-container-high transition-colors flex items-center gap-1 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px] text-secondary">domain</span>
                  <span>Assign Dept</span>
                </button>
                <button
                  onClick={() => onShowToast(`Dispatched bulk faculty email/SMS notice to ${selectedIds.length} staff.`)}
                  className="px-2.5 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface font-label-md hover:bg-surface-container-high transition-colors flex items-center gap-1 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px] text-secondary">send</span>
                  <span>Send Notice</span>
                </button>
                <button
                  onClick={() => onShowToast(`Exporting ${selectedIds.length} selected staff dossier to CSV.`)}
                  className="px-2.5 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface font-label-md hover:bg-surface-container-high transition-colors flex items-center gap-1 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px] text-secondary">file_download</span>
                  <span>Export</span>
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-on-surface-variant font-body-sm">
              <span>Rows per page:</span>
              <select className="bg-surface-container-lowest text-on-surface rounded-md px-2 py-1 text-body-sm font-medium border border-surface-container cursor-pointer shadow-sm">
                <option>15</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
            <span className="font-body-sm text-on-surface-variant font-medium">Page 1 of 6</span>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-lg bg-surface-container-lowest text-outline flex items-center justify-center opacity-50 cursor-not-allowed" disabled>
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <button className="w-8 h-8 rounded-lg bg-primary-container text-on-primary font-label-md flex items-center justify-center shadow-sm">1</button>
              <button className="w-8 h-8 rounded-lg bg-surface-container-lowest text-on-surface font-label-md hover:bg-surface-container flex items-center justify-center transition-colors">2</button>
              <button className="w-8 h-8 rounded-lg bg-surface-container-lowest text-on-surface font-label-md hover:bg-surface-container flex items-center justify-center transition-colors">3</button>
              <button className="w-8 h-8 rounded-lg bg-surface-container-lowest text-on-surface flex items-center justify-center hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Deactivate Confirmation Modal */}
      {deactivateTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-container/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-xl shadow-2xl overflow-hidden border border-outline-variant/30">
            <div className="p-5 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-error-container text-error flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-[26px]">warning</span>
              </div>
              <h3 className="font-headline-sm text-on-surface font-bold">Deactivate Faculty Record?</h3>
              <p className="font-body-md text-on-surface-variant mt-2">
                You are about to revoke system access for <strong className="text-on-surface">{deactivateTarget.name}</strong> (<span className="font-mono text-label-xs">{deactivateTarget.id}</span>).
              </p>
              <div className="bg-surface-container-low p-4 rounded-lg mt-4 text-on-surface-variant font-body-sm space-y-1.5">
                <div className="flex items-center gap-2 text-error font-medium">
                  <span className="material-symbols-outlined text-[16px]">info</span>
                  <span>Immediate Consequences:</span>
                </div>
                <p>• Associated Class In-Charge status will become unassigned.</p>
                <p>• Access to Peevees Teacher Portal will be instantly terminated.</p>
                <p>• Active timetable allocations must be transferred to a proxy teacher.</p>
              </div>
              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setDeactivateTarget(null)}
                  className="px-4 h-[38px] rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDeactivate}
                  className="px-4 h-[38px] rounded-xl bg-error hover:bg-on-error-container text-on-error font-label-md transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">person_off</span>
                  <span>Confirm Deactivation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slide-over Drawer: Register New Staff */}
      {showAddDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-primary-container/30 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-surface-container-lowest w-full max-w-xl h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-5 bg-surface-container-low flex items-center justify-between border-b border-surface-container">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary text-on-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">person_add</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-on-surface font-bold">Register New Staff Member</h3>
                  <span className="font-label-xs text-on-surface-variant">Central HR &amp; Educational Cadre Database</span>
                </div>
              </div>
              <button
                onClick={() => setShowAddDrawer(false)}
                className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateStaff} className="p-5 flex-1 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label-xs uppercase font-bold text-on-surface-variant block mb-1">First Name</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Anand"
                    value={newStaff.firstName}
                    onChange={e => setNewStaff({ ...newStaff, firstName: e.target.value })}
                    className="w-full h-[38px] px-3 rounded-lg bg-surface-container-low text-on-surface text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
                  />
                </div>
                <div>
                  <label className="font-label-xs uppercase font-bold text-on-surface-variant block mb-1">Last Name</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Pillai"
                    value={newStaff.lastName}
                    onChange={e => setNewStaff({ ...newStaff, lastName: e.target.value })}
                    className="w-full h-[38px] px-3 rounded-lg bg-surface-container-low text-on-surface text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label-xs uppercase font-bold text-on-surface-variant block mb-1">Official Email</label>
                  <input
                    type="email"
                    placeholder="name@peevees.edu.in"
                    value={newStaff.email}
                    onChange={e => setNewStaff({ ...newStaff, email: e.target.value })}
                    className="w-full h-[38px] px-3 rounded-lg bg-surface-container-low text-on-surface text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
                  />
                </div>
                <div>
                  <label className="font-label-xs uppercase font-bold text-on-surface-variant block mb-1">Contact Phone</label>
                  <input
                    required
                    type="tel"
                    placeholder="+91 98470 00000"
                    value={newStaff.phone}
                    onChange={e => setNewStaff({ ...newStaff, phone: e.target.value })}
                    className="w-full h-[38px] px-3 rounded-lg bg-surface-container-low text-on-surface text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label-xs uppercase font-bold text-on-surface-variant block mb-1">Department</label>
                  <select
                    value={newStaff.department}
                    onChange={e => setNewStaff({ ...newStaff, department: e.target.value })}
                    className="w-full h-[38px] px-3 rounded-lg bg-surface-container-low text-on-surface text-body-sm focus:outline-none"
                  >
                    <option>Mathematics</option>
                    <option>Science</option>
                    <option>English Literature</option>
                    <option>Social Science</option>
                    <option>Computer Science</option>
                    <option>Administration</option>
                    <option>Physical Education</option>
                  </select>
                </div>
                <div>
                  <label className="font-label-xs uppercase font-bold text-on-surface-variant block mb-1">Designation Cadre</label>
                  <select
                    value={newStaff.role}
                    onChange={e => setNewStaff({ ...newStaff, role: e.target.value })}
                    className="w-full h-[38px] px-3 rounded-lg bg-surface-container-low text-on-surface text-body-sm focus:outline-none"
                  >
                    <option>Teacher (PGT)</option>
                    <option>Teacher (TGT)</option>
                    <option>Teacher (PRT)</option>
                    <option>Head of Department</option>
                    <option>Senior Office Superintendent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-label-xs uppercase font-bold text-on-surface-variant block mb-1">Assign Class Teacher Role</label>
                <select
                  value={newStaff.classTeacherFor}
                  onChange={e => setNewStaff({ ...newStaff, classTeacherFor: e.target.value })}
                  className="w-full h-[38px] px-3 rounded-lg bg-surface-container-low text-on-surface text-body-sm focus:outline-none"
                >
                  <option value="None">None (Subject Teacher Only)</option>
                  <option value="Grade 8-A">Grade 8-A</option>
                  <option value="Grade 9-A">Grade 9-A</option>
                  <option value="Grade 10-A">Grade 10-A</option>
                  <option value="Grade 11-A">Grade 11-A</option>
                  <option value="Grade 12-A">Grade 12-A</option>
                </select>
              </div>

              <div>
                <label className="font-label-xs uppercase font-bold text-on-surface-variant block mb-1">Assigned Subjects / Division</label>
                <input
                  type="text"
                  placeholder="e.g. Grade 10-A Mathematics, Grade 11-B Calculus"
                  value={newStaff.assignedSubjects}
                  onChange={e => setNewStaff({ ...newStaff, assignedSubjects: e.target.value })}
                  className="w-full h-[38px] px-3 rounded-lg bg-surface-container-low text-on-surface text-body-sm focus:outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-surface-container">
                <button
                  type="button"
                  onClick={() => setShowAddDrawer(false)}
                  className="px-4 h-[38px] rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="px-5 h-[38px] rounded-xl bg-primary-container hover:bg-primary text-on-primary font-label-md shadow-md flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">save</span>
                  <span>Save &amp; Generate ID</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
