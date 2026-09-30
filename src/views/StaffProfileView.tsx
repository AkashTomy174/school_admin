import React, { useState } from 'react';
import { StaffMember } from '../data/portalData';

interface StaffProfileViewProps {
  staff: StaffMember;
  onBack: () => void;
  onShowToast: (msg: string) => void;
}

export function StaffProfileView({ staff, onBack, onShowToast }: StaffProfileViewProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states
  const [firstName, setFirstName] = useState('Anjali');
  const [lastName, setLastName] = useState('Menon');
  const [gender, setGender] = useState('Female');
  const [dob, setDob] = useState('14 May 1988');
  const [bloodGroup, setBloodGroup] = useState('O+ (Positive)');
  const [email, setEmail] = useState(staff.email || 'anjali.menon@peevees.edu.in');
  const [personalEmail, setPersonalEmail] = useState('anjali.menon.maths@gmail.com');
  const [phone, setPhone] = useState(staff.phone || '+91 98470 12345');
  const [emergencyPhone, setEmergencyPhone] = useState('Dr. K. Menon - Spouse - +91 98470 54321');
  const [address, setAddress] = useState('Flat 4B, Emerald Residency, Nilambur Road, Manjeri, Malappuram District, Kerala - 676121');
  const [dept, setDept] = useState(staff.department || 'Department of Mathematics');
  const [designation, setDesignation] = useState(staff.role || 'Post Graduate Teacher - PGT');
  
  // Class teacher toggle
  const [isClassTeacher, setIsClassTeacher] = useState(true);

  // Curricular allocations
  const [allocations, setAllocations] = useState([
    { id: 1, grade: '10', sec: 'A', subject: 'Advanced Mathematics', periods: 5, room: 'Room 304' },
    { id: 2, grade: '11', sec: 'B', subject: 'Calculus & Vectors', periods: 6, room: 'Room 202' },
    { id: 3, grade: '12', sec: 'A', subject: 'Pure Mathematics', periods: 4, room: 'Block B Lab' }
  ]);

  const [newGrade, setNewGrade] = useState('11');
  const [newSec, setNewSec] = useState('C');
  const [newSubj, setNewSubj] = useState('Applied Statistics');
  const [newPeriods, setNewPeriods] = useState(3);

  const totalPeriods = allocations.reduce((acc, curr) => acc + curr.periods, 0);

  const handleAddAllocation = () => {
    const newItem = {
      id: Date.now(),
      grade: newGrade,
      sec: newSec,
      subject: newSubj,
      periods: Number(newPeriods),
      room: 'Room 304'
    };
    setAllocations([...allocations, newItem]);
    onShowToast(`Assigned ${newSubj} to Grade ${newGrade}-${newSec} (${newPeriods} periods/wk).`);
  };

  const handleRemoveAllocation = (id: number, subj: string) => {
    setAllocations(allocations.filter(a => a.id !== id));
    onShowToast(`Removed teaching assignment for ${subj}.`);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      onShowToast(`Staff profile updated successfully for ${firstName} ${lastName} (${staff.id}).`);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 700);
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Breadcrumbs & Quick Meta */}
      <div className="flex items-center justify-between gap-4">
        <nav className="flex items-center gap-1.5 text-on-surface-variant font-label-md">
          <button onClick={onBack} className="hover:text-secondary transition-colors">Staff</button>
          <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
          <button onClick={onBack} className="hover:text-secondary transition-colors">Directory</button>
          <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
          <span className="text-on-surface font-semibold">{staff.id} ({staff.name})</span>
          <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
          <span className="text-secondary font-semibold bg-surface-container px-2 py-0.5 rounded-lg">Edit Profile</span>
        </nav>
        <div className="flex items-center gap-2 text-on-surface-variant font-label-xs bg-surface-container-low px-3 py-1.5 rounded-lg">
          <span className="material-symbols-outlined text-[16px] text-emerald-600">verified_user</span>
          <span>Faculty ID Validated • CBS-AFF-930214</span>
        </div>
      </div>

      {/* Staff Executive Header Banner */}
      <div className="relative bg-surface-container-lowest rounded-xl shadow-sm p-6 overflow-hidden border border-surface-container/60">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-secondary/5 rounded-full pointer-events-none blur-3xl"></div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start sm:items-center gap-4 min-w-0">
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-surface-container shadow-sm flex items-center justify-center border border-white">
                <img
                  className="w-full h-full object-cover"
                  src={staff.avatarUrl}
                  alt={staff.name}
                />
              </div>
              <button
                type="button"
                onClick={() => onShowToast('Upload new faculty photo.')}
                className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-primary-container text-on-primary rounded-full shadow-md flex items-center justify-center hover:bg-secondary transition-colors"
                title="Update Profile Picture"
              >
                <span className="material-symbols-outlined text-[14px]">photo_camera</span>
              </button>
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="font-headline-lg text-on-surface font-bold tracking-tight truncate">{staff.name}</h1>
                <span className="font-label-xs px-2 py-0.5 rounded-lg bg-surface-container-high text-on-surface-variant font-semibold">
                  {staff.qualifications || 'M.Sc. Mathematics, B.Ed.'}
                </span>
                <span className="inline-flex items-center gap-1.5 font-label-xs px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  Active • Good Standing
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-body-sm text-on-surface-variant">
                <span className="flex items-center gap-1 font-numerical-data font-semibold text-on-surface">
                  <span className="material-symbols-outlined text-[16px] text-secondary">badge</span>
                  {staff.id}
                </span>
                <span className="text-outline">•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-outline">account_tree</span>
                  {staff.department}
                </span>
                <span className="text-outline">•</span>
                <span className="flex items-center gap-1 font-medium text-secondary">
                  <span className="material-symbols-outlined text-[16px]">school</span>
                  Permanent Faculty • {staff.role}
                </span>
              </div>
            </div>
          </div>

          {/* Action Cluster */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onBack}
              className="px-4 h-9 rounded-lg bg-surface-container-low text-on-surface font-label-md hover:bg-surface-container transition-colors"
            >
              Cancel Changes
            </button>
            <button
              type="button"
              onClick={() => onShowToast(`Initiated deactivation protocol for ${staff.name}.`)}
              className="px-4 h-9 rounded-lg bg-error-container text-on-error-container font-label-md hover:bg-error hover:text-on-error transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">person_off</span>
              Deactivate
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className={`px-5 h-9 rounded-lg font-label-md shadow-sm flex items-center gap-1.5 transition-all text-on-primary ${
                saveSuccess
                  ? 'bg-emerald-700'
                  : 'bg-primary-container hover:bg-secondary'
              }`}
            >
              {isSaving ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                  <span>Saving...</span>
                </>
              ) : saveSuccess ? (
                <>
                  <span className="material-symbols-outlined text-[18px]">task_alt</span>
                  <span>Profile Updated!</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  <span>Save Staff Profile</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto bg-surface-container-low p-1.5 rounded-xl">
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-lg font-label-md transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'profile'
              ? 'bg-surface-container-lowest text-primary-container shadow-sm font-semibold'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined text-[18px] text-secondary">manage_accounts</span>
          Profile &amp; Teaching Assignment
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('leave')}
          className={`px-4 py-2 rounded-lg font-label-md transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'leave'
              ? 'bg-surface-container-lowest text-primary-container shadow-sm font-semibold'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">event_available</span>
          Leave &amp; Attendance
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('documents')}
          className={`px-4 py-2 rounded-lg font-label-md transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'documents'
              ? 'bg-surface-container-lowest text-primary-container shadow-sm font-semibold'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">folder_shared</span>
          Documents &amp; Credentials
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('payroll')}
          className={`px-4 py-2 rounded-lg font-label-md transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'payroll'
              ? 'bg-surface-container-lowest text-primary-container shadow-sm font-semibold'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">payments</span>
          Payroll &amp; Compensation
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 rounded-lg font-label-md transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'audit'
              ? 'bg-surface-container-lowest text-primary-container shadow-sm font-semibold'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">history</span>
          Audit History
        </button>
      </div>

      {/* Main Grid: Left 7 cols Personal/Appointment, Right 5 cols Allocations/Charge/Security */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column (7 Cols) */}
        <div className="xl:col-span-7 flex flex-col gap-6">
          {/* Section 1: Personal Information */}
          <section className="bg-surface-container-lowest rounded-xl shadow-sm p-6 border border-surface-container/60">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-surface-container">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-surface-container-high text-primary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">person</span>
                </div>
                <div>
                  <h2 className="font-headline-sm text-on-surface font-semibold">Personal Information</h2>
                  <p className="font-body-sm text-on-surface-variant">Legal identifiers, vital registration data, and demographics.</p>
                </div>
              </div>
              <span className="font-label-xs uppercase tracking-wider text-secondary font-bold bg-secondary/10 px-2 py-1 rounded-lg">Verified ID</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-on-surface">First Name <span className="text-error">*</span></label>
                <input
                  type="text"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-on-surface">Last Name <span className="text-error">*</span></label>
                <input
                  type="text"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-on-surface">Gender <span className="text-error">*</span></label>
                <select
                  value={gender}
                  onChange={e => setGender(e.target.value)}
                  className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 outline-none"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-on-surface">Date of Birth <span className="text-error">*</span></label>
                <div className="relative">
                  <input
                    type="text"
                    value={dob}
                    onChange={e => setDob(e.target.value)}
                    className="w-full h-10 px-3 pr-9 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 outline-none"
                  />
                  <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">calendar_month</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-on-surface">Blood Group</label>
                <select
                  value={bloodGroup}
                  onChange={e => setBloodGroup(e.target.value)}
                  className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 outline-none"
                >
                  <option value="O+ (Positive)">O+ (Positive)</option>
                  <option value="O- (Negative)">O- (Negative)</option>
                  <option value="A+ (Positive)">A+ (Positive)</option>
                  <option value="B+ (Positive)">B+ (Positive)</option>
                  <option value="AB+ (Positive)">AB+ (Positive)</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label className="font-label-md text-on-surface">Aadhaar / National ID</label>
                  <span className="font-label-xs text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">UIDAI Biometric Synced</span>
                </div>
                <div className="relative">
                  <input
                    readOnly
                    type="text"
                    value="•••• •••• 9842"
                    className="w-full h-10 px-3 pr-9 rounded-lg bg-surface-container-high/60 text-on-surface-variant font-numerical-data cursor-not-allowed outline-none"
                  />
                  <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">lock</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Contact & Emergency Details */}
          <section className="bg-surface-container-lowest rounded-xl shadow-sm p-6 border border-surface-container/60">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-surface-container">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-surface-container-high text-primary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">contact_mail</span>
                </div>
                <div>
                  <h2 className="font-headline-sm text-on-surface font-semibold">Contact &amp; Emergency Details</h2>
                  <p className="font-body-sm text-on-surface-variant">Communications channels and primary escalation point of contact.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-on-surface">Institutional Email <span className="text-error">*</span></label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full h-10 px-3 pr-9 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 outline-none"
                  />
                  <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-emerald-600 text-[18px]">check_circle</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-on-surface">Personal Email</label>
                <input
                  type="email"
                  value={personalEmail}
                  onChange={e => setPersonalEmail(e.target.value)}
                  className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-on-surface">Primary Mobile Number <span className="text-error">*</span></label>
                <div className="relative">
                  <input
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full h-10 px-3 pr-9 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 outline-none font-numerical-data"
                  />
                  <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">call</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-on-surface">Emergency Contact Person &amp; Phone <span className="text-error">*</span></label>
                <div className="relative">
                  <input
                    type="text"
                    value={emergencyPhone}
                    onChange={e => setEmergencyPhone(e.target.value)}
                    className="w-full h-10 px-3 pr-9 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 outline-none"
                  />
                  <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-error text-[18px]">emergency</span>
                </div>
              </div>
              <div className="flex flex-col gap-1 sm:col-span-2">
                <label className="font-label-md text-on-surface">Residential Address</label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="p-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 outline-none resize-none"
                />
              </div>
            </div>
          </section>

          {/* Section 3: Institutional Appointment */}
          <section className="bg-surface-container-lowest rounded-xl shadow-sm p-6 border border-surface-container/60">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-surface-container">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-surface-container-high text-primary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">corporate_fare</span>
                </div>
                <div>
                  <h2 className="font-headline-sm text-on-surface font-semibold">Institutional Appointment</h2>
                  <p className="font-body-sm text-on-surface-variant">Hierarchy, formal contract terms, and department alignment.</p>
                </div>
              </div>
              <span className="font-numerical-data text-on-surface-variant font-medium">Tenure: 6 yrs 9 mos</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-on-surface">Staff ID (Read-only)</label>
                <div className="relative">
                  <input
                    readOnly
                    type="text"
                    value={staff.id}
                    className="w-full h-10 px-3 pr-9 rounded-lg bg-surface-container-high/60 text-on-surface-variant font-numerical-data font-semibold cursor-not-allowed outline-none"
                  />
                  <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">lock</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-on-surface">Academic Department <span className="text-error">*</span></label>
                <select
                  value={dept}
                  onChange={e => setDept(e.target.value)}
                  className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 outline-none cursor-pointer"
                >
                  <option value="Department of Mathematics">Department of Mathematics</option>
                  <option value="Department of Physics">Department of Physics</option>
                  <option value="Department of Chemistry">Department of Chemistry</option>
                  <option value="Department of English">Department of English &amp; Humanities</option>
                  <option value="Department of Computer Science">Department of Computer Science</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-on-surface">Designation Title <span className="text-error">*</span></label>
                <input
                  type="text"
                  value={designation}
                  onChange={e => setDesignation(e.target.value)}
                  className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-on-surface">Employment Category</label>
                <select className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 outline-none cursor-pointer">
                  <option>Full-time Permanent</option>
                  <option>Probationary Period</option>
                  <option>Annual Contractual</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-on-surface">Official Date of Joining</label>
                <div className="relative">
                  <input
                    type="text"
                    defaultValue="12 June 2019"
                    className="w-full h-10 px-3 pr-9 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 outline-none"
                  />
                  <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">event</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-on-surface">Reporting Authority</label>
                <div className="relative">
                  <input
                    type="text"
                    defaultValue="Meera Joseph - Academic Dean"
                    className="w-full h-10 px-3 pr-9 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/30 outline-none"
                  />
                  <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">supervisor_account</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column (5 Cols) */}
        <div className="xl:col-span-5 flex flex-col gap-6">
          {/* Section 4: Teaching & Curricular Allocations */}
          <section className="bg-surface-container-lowest rounded-xl shadow-sm p-6 border border-surface-container/60">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-surface-container">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-surface-container-high text-primary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">assignment_ind</span>
                </div>
                <div>
                  <h2 className="font-headline-sm text-on-surface font-semibold">Curricular Allocations</h2>
                  <p className="font-body-sm text-on-surface-variant">AY 2026–2027 Teaching Timetable Load</p>
                </div>
              </div>
              <span className="font-label-xs bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded-lg font-bold">
                {totalPeriods} hrs / wk
              </span>
            </div>

            {/* Weekly Load Indicator Bar */}
            <div className="mb-4 bg-surface-container-low p-3 rounded-lg">
              <div className="flex items-center justify-between font-label-xs text-on-surface-variant mb-1.5">
                <span>Standard Target: 18 hrs / week</span>
                <span className="font-semibold text-secondary">
                  {Math.round((totalPeriods / 18) * 100)}% Allocated
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                <div
                  className="h-full bg-secondary rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (totalPeriods / 18) * 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Allocations List */}
            <div className="space-y-2 mb-4">
              {allocations.map(alloc => (
                <div
                  key={alloc.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-high flex flex-col items-center justify-center text-primary-container leading-none">
                      <span className="text-[14px] font-bold">{alloc.grade}</span>
                      <span className="font-label-xs text-[10px] text-on-surface-variant">SEC {alloc.sec}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-title-md text-on-surface font-semibold">{alloc.subject}</span>
                      <span className="font-label-xs text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px] text-secondary">schedule</span>
                        {alloc.periods} Periods / Week • {alloc.room}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveAllocation(alloc.id, alloc.subject)}
                    className="w-8 h-8 rounded-lg text-outline hover:text-error hover:bg-error-container transition-colors flex items-center justify-center"
                    title="Unassign Class"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Add Subject Allocation Form Segment */}
            <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container">
              <div className="flex items-center justify-between mb-3">
                <span className="font-label-md text-on-surface font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-secondary">add_circle</span>
                  Assign Additional Subject
                </span>
                <span className="font-label-xs text-outline">Term 1 &amp; 2</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="font-label-xs text-on-surface-variant block mb-1">Grade</label>
                  <select
                    value={newGrade}
                    onChange={e => setNewGrade(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm outline-none"
                  >
                    <option value="9">Grade 9</option>
                    <option value="10">Grade 10</option>
                    <option value="11">Grade 11</option>
                    <option value="12">Grade 12</option>
                  </select>
                </div>
                <div>
                  <label className="font-label-xs text-on-surface-variant block mb-1">Section</label>
                  <select
                    value={newSec}
                    onChange={e => setNewSec(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm outline-none"
                  >
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                    <option value="C">Section C</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="font-label-xs text-on-surface-variant block mb-1">Subject Offering</label>
                  <select
                    value={newSubj}
                    onChange={e => setNewSubj(e.target.value)}
                    className="w-full h-8 px-2 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm outline-none"
                  >
                    <option value="Applied Statistics">Applied Statistics</option>
                    <option value="Discrete Mathematics">Discrete Mathematics</option>
                    <option value="Linear Algebra">Linear Algebra</option>
                    <option value="Trigonometry Seminar">Trigonometry Seminar</option>
                  </select>
                </div>
                <div>
                  <label className="font-label-xs text-on-surface-variant block mb-1">Periods/Wk</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newPeriods}
                    onChange={e => setNewPeriods(Number(e.target.value))}
                    className="w-full h-8 px-2 rounded-lg bg-surface-container-lowest text-on-surface font-numerical-data outline-none"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleAddAllocation}
                className="w-full h-9 rounded-lg bg-surface-container-high hover:bg-secondary hover:text-on-secondary text-primary-container font-label-md font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">playlist_add</span>
                Add Subject Allocation
              </button>
            </div>
          </section>

          {/* Section 5: Class Teacher Charge */}
          <section className="bg-surface-container-lowest rounded-xl shadow-sm p-6 border border-surface-container/60">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-surface-container">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-surface-container-high text-primary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">co_present</span>
                </div>
                <div>
                  <h2 className="font-headline-sm text-on-surface font-semibold">Class Teacher Charge</h2>
                  <p className="font-body-sm text-on-surface-variant">Pastoral leadership &amp; morning roll register custody.</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-low mb-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col pr-4">
                  <span className="font-label-md text-on-surface font-semibold">Designate as Primary Class Teacher</span>
                  <span className="font-body-sm text-on-surface-variant">Empowers morning roll call, report card remarks, and parent liaison.</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsClassTeacher(!isClassTeacher);
                    onShowToast(`Class Teacher designation toggled to ${!isClassTeacher ? 'Active' : 'Unassigned'}.`);
                  }}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${
                    isClassTeacher ? 'bg-secondary' : 'bg-surface-container-high'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out mt-1 ml-1 ${
                      isClassTeacher ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className={`space-y-4 transition-opacity duration-200 ${isClassTeacher ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-on-surface">Assigned Class &amp; Home Room</label>
                <div className="flex items-center gap-2.5 p-3 rounded-lg bg-surface-container-high/40">
                  <span className="material-symbols-outlined text-secondary text-[22px]">meeting_room</span>
                  <div className="flex flex-col">
                    <span className="font-body-md text-on-surface font-semibold">Grade 10 - Section A</span>
                    <span className="font-body-sm text-on-surface-variant">Room 304, Academic Block 2 (Cap: 36 Students)</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-label-md text-on-surface">Academic Cohort</label>
                  <input
                    readOnly
                    type="text"
                    value="2026–2027"
                    className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface-variant font-numerical-data outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-md text-on-surface">Assistant Class Teacher</label>
                  <input
                    readOnly
                    type="text"
                    value="Sujith Kumar (Science)"
                    className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface-variant font-body-sm outline-none"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Account Security & Access Status */}
          <section className="bg-surface-container-lowest rounded-xl shadow-sm p-6 border border-surface-container/60">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-surface-container">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-surface-container-high text-primary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
                </div>
                <div>
                  <h2 className="font-headline-sm text-on-surface font-semibold">System Privileges &amp; Security</h2>
                  <p className="font-body-sm text-on-surface-variant">Identity federation, RBAC policy, and audit trail.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-secondary text-[20px]">vpn_key</span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-on-surface">Portal Authentication</span>
                    <span className="font-body-sm text-on-surface-variant">SSO mapped via Google Workspace</span>
                  </div>
                </div>
                <span className="font-label-xs px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-semibold">Enabled</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-secondary text-[20px]">security</span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-on-surface">Two-Factor Authentication (2FA)</span>
                    <span className="font-body-sm text-on-surface-variant">Hardware Token / TOTP Authenticator</span>
                  </div>
                </div>
                <span className="font-label-xs px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-semibold">Enforced</span>
              </div>

              <div className="p-4 rounded-lg bg-surface-container-low flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-on-surface">Assigned Role &amp; Permission Profile</span>
                  <button
                    onClick={() => onShowToast('RBAC Policy for Teacher Portal loaded.')}
                    className="font-label-xs text-secondary hover:underline"
                  >
                    View Policy
                  </button>
                </div>
                <span className="font-body-sm font-semibold text-primary-container">Teacher Portal + Gradebook Entry Access</span>
                <p className="font-body-sm text-on-surface-variant">Full access to Marks Submission, Timetable view, Attendance Marking, and Pastoral Notes.</p>
              </div>

              <div className="flex items-center justify-between text-on-surface-variant font-body-sm pt-1">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-outline">wifi</span>
                  Last active login:
                </span>
                <span className="font-numerical-data font-medium text-on-surface">Today, 08:15 AM (Campus Wi-Fi)</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
