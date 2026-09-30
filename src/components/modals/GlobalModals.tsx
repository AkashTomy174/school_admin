import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (msg: string) => void;
}

export function AddStudentModal({ isOpen, onClose, onSuccess }: ModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    gender: 'M',
    dob: '2010-05-15',
    grade: 'Grade 10',
    section: 'A',
    guardian: '',
    phone: '',
    type: 'Day Scholar'
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-container/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-xl shadow-2xl overflow-hidden border border-outline-variant/30">
        <div className="p-space-lg bg-surface-container-low flex items-center justify-between border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[22px]">person_add</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Admit New Student</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-surface-container text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          onSuccess?.(`Student "${formData.name || 'New Student'}" enrolled into ${formData.grade}-${formData.section} successfully.`);
          onClose();
        }} className="p-space-lg space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-label-xs text-label-xs uppercase text-on-surface-variant font-bold block mb-1">Full Name</label>
              <input
                required
                type="text"
                placeholder="e.g. Navin Chandran"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full h-9 px-3 rounded-lg bg-surface-container-low text-on-surface text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
              />
            </div>
            <div>
              <label className="font-label-xs text-label-xs uppercase text-on-surface-variant font-bold block mb-1">Gender</label>
              <select
                value={formData.gender}
                onChange={e => setFormData({ ...formData, gender: e.target.value })}
                className="w-full h-9 px-3 rounded-lg bg-surface-container-low text-on-surface text-body-sm focus:outline-none"
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-label-xs text-label-xs uppercase text-on-surface-variant font-bold block mb-1">Assigned Grade</label>
              <select
                value={formData.grade}
                onChange={e => setFormData({ ...formData, grade: e.target.value })}
                className="w-full h-9 px-3 rounded-lg bg-surface-container-low text-on-surface text-body-sm focus:outline-none"
              >
                <option>Grade 8</option>
                <option>Grade 9</option>
                <option>Grade 10</option>
                <option>Grade 11</option>
                <option>Grade 12</option>
              </select>
            </div>
            <div>
              <label className="font-label-xs text-label-xs uppercase text-on-surface-variant font-bold block mb-1">Section Division</label>
              <select
                value={formData.section}
                onChange={e => setFormData({ ...formData, section: e.target.value })}
                className="w-full h-9 px-3 rounded-lg bg-surface-container-low text-on-surface text-body-sm focus:outline-none"
              >
                <option>A</option>
                <option>B</option>
                <option>C</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-label-xs text-label-xs uppercase text-on-surface-variant font-bold block mb-1">Guardian Name</label>
              <input
                required
                type="text"
                placeholder="Parent / Guardian"
                value={formData.guardian}
                onChange={e => setFormData({ ...formData, guardian: e.target.value })}
                className="w-full h-9 px-3 rounded-lg bg-surface-container-low text-on-surface text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
              />
            </div>
            <div>
              <label className="font-label-xs text-label-xs uppercase text-on-surface-variant font-bold block mb-1">Primary Phone</label>
              <input
                required
                type="tel"
                placeholder="+91 98450 00000"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full h-9 px-3 rounded-lg bg-surface-container-low text-on-surface text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
              />
            </div>
          </div>

          <div>
            <label className="font-label-xs text-label-xs uppercase text-on-surface-variant font-bold block mb-1">Enrollment Category</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-body-sm cursor-pointer">
                <input
                  type="radio"
                  name="enrollType"
                  checked={formData.type === 'Day Scholar'}
                  onChange={() => setFormData({ ...formData, type: 'Day Scholar' })}
                  className="accent-secondary"
                />
                Day Scholar
              </label>
              <label className="flex items-center gap-2 text-body-sm cursor-pointer">
                <input
                  type="radio"
                  name="enrollType"
                  checked={formData.type === 'Hostel Boarder'}
                  onChange={() => setFormData({ ...formData, type: 'Hostel Boarder' })}
                  className="accent-secondary"
                />
                Hostel Boarder
              </label>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-surface-container">
            <button
              type="button"
              onClick={onClose}
              className="px-4 h-9 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 h-9 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md shadow-md flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">check</span>
              Admit & Generate Roll
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function RecordAttendanceModal({ isOpen, onClose, onSuccess }: ModalProps) {
  const [selectedClass, setSelectedClass] = useState('Grade 10 - Section A');
  const [session, setSession] = useState('Morning Roll Call');
  const [presentCount, setPresentCount] = useState(38);
  const [absentCount, setAbsentCount] = useState(2);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-container/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-xl shadow-2xl overflow-hidden border border-outline-variant/30">
        <div className="p-space-lg bg-surface-container-low flex items-center justify-between border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[22px]">assignment_turned_in</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Daily Attendance Register</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-surface-container text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-space-lg space-y-4">
          <div>
            <label className="font-label-xs text-label-xs uppercase text-on-surface-variant font-bold block mb-1">Target Class Cohort</label>
            <select
              value={selectedClass}
              onChange={e => setSelectedClass(e.target.value)}
              className="w-full h-9 px-3 rounded-lg bg-surface-container-low text-on-surface text-body-sm focus:outline-none"
            >
              <option>Grade 10 - Section A (Room 304)</option>
              <option>Grade 10 - Section B (Room 305)</option>
              <option>Grade 10 - Section C (Room 306)</option>
              <option>Grade 12 - Section A (PCM)</option>
              <option>Grade 9 - Section B</option>
            </select>
          </div>

          <div>
            <label className="font-label-xs text-label-xs uppercase text-on-surface-variant font-bold block mb-1">Session Timing</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSession('Morning Roll Call')}
                className={`flex-1 py-1.5 rounded-lg font-label-md text-label-md transition-colors ${
                  session === 'Morning Roll Call'
                    ? 'bg-primary-container text-on-primary font-bold'
                    : 'bg-surface-container text-on-surface'
                }`}
              >
                Morning (08:30 AM)
              </button>
              <button
                type="button"
                onClick={() => setSession('Afternoon Reconciliation')}
                className={`flex-1 py-1.5 rounded-lg font-label-md text-label-md transition-colors ${
                  session === 'Afternoon Reconciliation'
                    ? 'bg-primary-container text-on-primary font-bold'
                    : 'bg-surface-container text-on-surface'
                }`}
              >
                Afternoon (01:45 PM)
              </button>
            </div>
          </div>

          <div className="p-3 bg-surface-container-low rounded-lg grid grid-cols-2 gap-3 text-center">
            <div className="bg-surface-container-lowest p-2 rounded">
              <span className="font-label-xs text-emerald-700 font-bold block">PRESENT</span>
              <div className="flex items-center justify-center gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => setPresentCount(Math.max(0, presentCount - 1))}
                  className="w-6 h-6 rounded bg-surface-container flex items-center justify-center text-on-surface"
                >
                  -
                </button>
                <span className="font-headline-sm font-bold text-on-surface">{presentCount}</span>
                <button
                  type="button"
                  onClick={() => setPresentCount(presentCount + 1)}
                  className="w-6 h-6 rounded bg-surface-container flex items-center justify-center text-on-surface"
                >
                  +
                </button>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-2 rounded">
              <span className="font-label-xs text-error font-bold block">ABSENT / SICK</span>
              <div className="flex items-center justify-center gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => setAbsentCount(Math.max(0, absentCount - 1))}
                  className="w-6 h-6 rounded bg-surface-container flex items-center justify-center text-on-surface"
                >
                  -
                </button>
                <span className="font-headline-sm font-bold text-error">{absentCount}</span>
                <button
                  type="button"
                  onClick={() => setAbsentCount(absentCount + 1)}
                  className="w-6 h-6 rounded bg-surface-container flex items-center justify-center text-on-surface"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-label-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px] text-emerald-600">biometrics</span>
            <span>Biometric RFID turnstiles synced 3 mins ago.</span>
          </div>

          <div className="pt-2 flex justify-end gap-2 border-t border-surface-container">
            <button
              type="button"
              onClick={onClose}
              className="px-4 h-9 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onSuccess?.(`Attendance verified & locked for ${selectedClass} (${presentCount} present, ${absentCount} absent). SMS notices queued.`);
                onClose();
              }}
              className="px-5 h-9 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md shadow-md flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              Lock & Sync SIS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PublishCircularModal({ isOpen, onClose, onSuccess }: ModalProps) {
  const [title, setTitle] = useState('');
  const [targetAudience, setTargetAudience] = useState('All Parents & Students');
  const [urgency, setUrgency] = useState('Normal');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-container/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-xl shadow-2xl overflow-hidden border border-outline-variant/30">
        <div className="p-space-lg bg-surface-container-low flex items-center justify-between border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[22px]">campaign</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Publish Institutional Circular</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-surface-container text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          onSuccess?.(`Circular "${title || 'Academic Notice'}" published and broadcast to ${targetAudience}.`);
          onClose();
        }} className="p-space-lg space-y-4">
          <div>
            <label className="font-label-xs text-label-xs uppercase text-on-surface-variant font-bold block mb-1">Circular Heading</label>
            <input
              required
              type="text"
              placeholder="e.g. Schedule for CBSE Midterm Term 1 Practical Examinations"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full h-9 px-3 rounded-lg bg-surface-container-low text-on-surface text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-label-xs text-label-xs uppercase text-on-surface-variant font-bold block mb-1">Target Audience</label>
              <select
                value={targetAudience}
                onChange={e => setTargetAudience(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-surface-container-low text-on-surface text-body-sm focus:outline-none"
              >
                <option>All Parents & Students</option>
                <option>Secondary Wing (Grades 8 to 10)</option>
                <option>Senior Secondary (Grades 11 & 12)</option>
                <option>Teaching Faculty Only</option>
                <option>Hostel Residents</option>
              </select>
            </div>
            <div>
              <label className="font-label-xs text-label-xs uppercase text-on-surface-variant font-bold block mb-1">Priority Level</label>
              <select
                value={urgency}
                onChange={e => setUrgency(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-surface-container-low text-on-surface text-body-sm focus:outline-none"
              >
                <option>Normal (Portal Digest)</option>
                <option>High (Instant App Push & SMS)</option>
                <option>Urgent / Emergency Advisory</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-label-xs text-label-xs uppercase text-on-surface-variant font-bold block mb-1">Circular Body / Instructions</label>
            <textarea
              rows={4}
              placeholder="Write official notification details, guidelines, venue, timing, and contact coordinates..."
              className="w-full p-3 rounded-lg bg-surface-container-low text-on-surface text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 resize-none"
              defaultValue="Dear Parents and Faculty, Please be advised that the academic schedule for upcoming assessments has been updated in compliance with CBSE circular Ref: ACAD/2026/41."
            />
          </div>

          <div className="pt-2 flex justify-end gap-2 border-t border-surface-container">
            <button
              type="button"
              onClick={onClose}
              className="px-4 h-9 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 h-9 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md shadow-md flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">send</span>
              Authorize & Broadcast
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function Ut2ApprovalModal({ isOpen, onClose, onSuccess }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-container/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-xl rounded-xl shadow-2xl overflow-hidden border border-outline-variant/30">
        <div className="p-space-lg bg-surface-container-low flex items-center justify-between border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[22px]">verified</span>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Review & Approve Grade 10-A UT-2 Results</h3>
              <span className="font-label-xs text-on-surface-variant">Mathematics • Teacher: Anjali Menon • AISSE Track</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-surface-container text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-space-lg space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-surface-container-low rounded-lg">
              <span className="text-[11px] text-on-surface-variant font-semibold block">CANDIDATES</span>
              <span className="font-headline-sm font-bold text-on-surface">36 / 36</span>
              <span className="text-[10px] text-emerald-600 block mt-0.5">100% Evaluated</span>
            </div>
            <div className="p-3 bg-surface-container-low rounded-lg">
              <span className="text-[11px] text-on-surface-variant font-semibold block">CLASS AVERAGE</span>
              <span className="font-headline-sm font-bold text-secondary">88.4%</span>
              <span className="text-[10px] text-secondary font-medium block mt-0.5">+4.2% vs UT-1</span>
            </div>
            <div className="p-3 bg-surface-container-low rounded-lg">
              <span className="text-[11px] text-on-surface-variant font-semibold block">DISTINCTIONS</span>
              <span className="font-headline-sm font-bold text-emerald-700">18 (50%)</span>
              <span className="text-[10px] text-on-surface-variant block mt-0.5">Score &gt;85%</span>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-lg text-emerald-800 text-body-sm flex items-start gap-2">
            <span className="material-symbols-outlined text-[18px] text-emerald-600 mt-0.5">check_circle</span>
            <div>
              <span className="font-semibold block">Moderation Checks Passed</span>
              <span>All 36 marks have been digitally reconciled with paper answer sheets. Standard deviation is 6.2 (within CBSE tolerance limits). Zero anomaly flags raised.</span>
            </div>
          </div>

          <div className="border border-surface-container rounded-lg overflow-hidden text-body-sm">
            <div className="bg-surface-container-low px-3 py-2 font-label-md font-bold text-on-surface flex justify-between">
              <span>Performance Breakdown</span>
              <span>Distribution</span>
            </div>
            <div className="divide-y divide-surface-container-low p-2 space-y-1">
              <div className="flex justify-between text-[12px] px-2 py-1">
                <span>Grade A1 (91% - 100%)</span>
                <span className="font-bold text-emerald-700">14 Students</span>
              </div>
              <div className="flex justify-between text-[12px] px-2 py-1">
                <span>Grade A2 (81% - 90%)</span>
                <span className="font-bold text-secondary">12 Students</span>
              </div>
              <div className="flex justify-between text-[12px] px-2 py-1">
                <span>Grade B1 (71% - 80%)</span>
                <span className="font-bold text-on-surface">8 Students</span>
              </div>
              <div className="flex justify-between text-[12px] px-2 py-1">
                <span>Grade B2 (61% - 70%)</span>
                <span className="font-bold text-on-surface">2 Students</span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2 border-t border-surface-container">
            <button
              type="button"
              onClick={onClose}
              className="px-4 h-9 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onSuccess?.('Grade 10-A Mathematics UT-2 marks approved & signed off by Principal. Published to Parent Portal.');
                onClose();
              }}
              className="px-5 h-9 rounded-lg bg-secondary hover:bg-secondary-container text-on-secondary font-label-md shadow-md flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">verified</span>
              Principal Signoff & Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FleetMapModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-container/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden border border-outline-variant/30">
        <div className="p-space-lg bg-surface-container-low flex items-center justify-between border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[22px]">directions_bus</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Campus Transport Fleet Telemetry</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-surface-container text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-space-lg space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-surface-container-low rounded-lg text-center">
              <span className="text-[11px] text-on-surface-variant font-bold block uppercase">Total Buses</span>
              <span className="font-headline-sm font-bold text-on-surface">14 Vehicles</span>
            </div>
            <div className="p-3 bg-surface-container-low rounded-lg text-center">
              <span className="text-[11px] text-on-surface-variant font-bold block uppercase">On-Schedule</span>
              <span className="font-headline-sm font-bold text-emerald-700">11 Routes</span>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg text-center">
              <span className="text-[11px] text-amber-800 font-bold block uppercase">Delayed (Roadworks)</span>
              <span className="font-headline-sm font-bold text-amber-800">3 Routes</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="p-3 bg-surface-container-low rounded-lg flex items-center justify-between">
              <div>
                <span className="font-label-md font-bold text-on-surface block">Route 4: Nilambur Bypass → Campus</span>
                <span className="text-[12px] text-on-surface-variant">Driver: K. Raghavan • Reg: KL-10-AZ-4102</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900">+15 mins delay</span>
            </div>
            <div className="p-3 bg-surface-container-low rounded-lg flex items-center justify-between">
              <div>
                <span className="font-label-md font-bold text-on-surface block">Route 7: Manjeri Town → Campus</span>
                <span className="text-[12px] text-on-surface-variant">Driver: Suresh Babu • Reg: KL-10-AZ-4107</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900">+12 mins delay</span>
            </div>
            <div className="p-3 bg-surface-container-low rounded-lg flex items-center justify-between">
              <div>
                <span className="font-label-md font-bold text-on-surface block">Route 11: Wandoor Junction → Campus</span>
                <span className="text-[12px] text-on-surface-variant">Driver: M. Haridas • Reg: KL-10-AZ-4111</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900">+14 mins delay</span>
            </div>
          </div>

          <div className="p-3 bg-blue-50 text-secondary text-body-sm rounded-lg flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">cell_tower</span>
            <span>Automated GPS geofence alerts have been dispatched to 148 registered parents on these routes.</span>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 h-9 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StudentDossierModal({ student, isOpen, onClose, onSuccess }: { student: any; isOpen: boolean; onClose: () => void; onSuccess?: (msg: string) => void }) {
  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-container/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-xl rounded-xl shadow-2xl overflow-hidden border border-outline-variant/30">
        <div className="p-space-lg bg-surface-container-low flex items-center justify-between border-b border-surface-container">
          <div className="flex items-center gap-3">
            <img src={student.avatarUrl} alt={student.name} className="w-12 h-12 rounded-full object-cover border border-white shadow-sm" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">{student.name}</h3>
                <span className="px-2 py-0.5 rounded text-[10px] bg-secondary-fixed text-on-secondary-fixed font-bold">{student.grade} - {student.section}</span>
              </div>
              <span className="font-label-xs text-on-surface-variant">ID: {student.id} • Roll #{student.rollNumber} • {student.type}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-surface-container text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-space-lg space-y-4 text-body-sm">
          <div className="grid grid-cols-3 gap-3">
            <div className="p-2.5 bg-surface-container-low rounded-lg text-center">
              <span className="text-[10px] text-on-surface-variant uppercase font-bold block">Attendance</span>
              <span className="font-headline-sm font-bold text-emerald-700">{student.attendanceRate}%</span>
            </div>
            <div className="p-2.5 bg-surface-container-low rounded-lg text-center">
              <span className="text-[10px] text-on-surface-variant uppercase font-bold block">Standing</span>
              <span className="font-label-md font-bold text-secondary block mt-1">{student.academicStatus}</span>
            </div>
            <div className="p-2.5 bg-surface-container-low rounded-lg text-center">
              <span className="text-[10px] text-on-surface-variant uppercase font-bold block">Portal Sync</span>
              <span className="font-label-md font-bold text-emerald-700 block mt-1">{student.portalSync}</span>
            </div>
          </div>

          <div className="space-y-2 bg-surface-container-low/50 p-3 rounded-lg">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Date of Birth:</span>
              <span className="font-semibold text-on-surface">{student.dob} ({student.age} years)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Primary Guardian:</span>
              <span className="font-semibold text-on-surface">{student.guardianName} ({student.guardianRelation})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Contact Phone:</span>
              <span className="font-semibold text-on-surface font-numerical-data">{student.guardianPhone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">CBSE Registration Status:</span>
              <span className="font-semibold text-emerald-700">Verified & LOC Linked</span>
            </div>
          </div>

          <div className="pt-2 flex justify-between items-center border-t border-surface-container">
            <button
              type="button"
              onClick={() => {
                onSuccess?.(`Dispatched verification SMS and PIN reset to ${student.guardianPhone}.`);
              }}
              className="text-secondary font-label-md hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">sms</span>
              Resend Parent Portal Invite
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 h-9 rounded-lg bg-primary-container text-on-primary font-label-md shadow-sm"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
