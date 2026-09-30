import React, { useState } from 'react';
import { CAMPUS_ACADEMIC_WING_IMAGE } from '../data/portalData';

interface AcademicsViewProps {
  onShowToast: (msg: string) => void;
  onOpenTeacherProfile: () => void;
}

export function AcademicsView({ onShowToast, onOpenTeacherProfile }: AcademicsViewProps) {
  const [selectedGrade, setSelectedGrade] = useState('Grade 10');
  const [selectedSection, setSelectedSection] = useState('Section A');
  const [expandedGrades, setExpandedGrades] = useState<string[]>(['Grade 10']);
  const [treeSearch, setTreeSearch] = useState('');
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);

  // Subject allocations for selected section
  const [subjects, setSubjects] = useState([
    {
      name: 'English Literature & Comm.',
      code: 'ENG-101 • CBSE Core',
      load: '6 hrs / wk',
      faculty: 'Meera Joseph',
      facultyRole: 'HOD Languages',
      initials: 'MJ',
      color: 'bg-secondary-fixed text-on-secondary-fixed',
      syllabusPct: 72,
      syllabusColor: 'bg-emerald-600'
    },
    {
      name: 'Advanced Mathematics',
      code: 'MAT-102 • CBSE Standard',
      load: '7 hrs / wk',
      faculty: 'Anjali Menon',
      facultyRole: 'PGT Mathematics',
      initials: 'AM',
      color: 'bg-primary text-on-primary',
      syllabusPct: 68,
      syllabusColor: 'bg-secondary'
    },
    {
      name: 'Physics (Theory + Practical)',
      code: 'PHY-103 • Science Stream',
      load: '5 hrs / wk',
      faculty: 'Rahul Thomas',
      facultyRole: 'PGT Physics',
      initials: 'RT',
      color: 'bg-secondary-container text-on-secondary-container',
      syllabusPct: 80,
      syllabusColor: 'bg-emerald-600'
    },
    {
      name: 'Chemistry',
      code: 'CHM-104 • Lab Integrated',
      load: '5 hrs / wk',
      faculty: 'Dr. S. K. Roy',
      facultyRole: 'Sr. Lab Director',
      initials: 'SR',
      color: 'bg-surface-container-highest text-on-surface',
      syllabusPct: 60,
      syllabusColor: 'bg-amber-600'
    },
    {
      name: 'Biology',
      code: 'BIO-105 • Life Sciences',
      load: '4 hrs / wk',
      faculty: 'Neha George',
      facultyRole: 'TGT Sciences',
      initials: 'NG',
      color: 'bg-secondary-fixed text-on-secondary-fixed',
      syllabusPct: 75,
      syllabusColor: 'bg-emerald-600'
    },
    {
      name: 'Social Science & History',
      code: 'SOC-106 • Humanities',
      load: '4 hrs / wk',
      faculty: 'Rajesh Varma',
      facultyRole: 'PGT History',
      initials: 'RV',
      color: 'bg-surface-container-highest text-on-surface',
      syllabusPct: 70,
      syllabusColor: 'bg-emerald-600'
    },
    {
      name: 'Computer Applications',
      code: 'CMP-107 • IT Elective',
      load: '3 hrs / wk',
      faculty: 'Priya Nair',
      facultyRole: 'IT Systems Faculty',
      initials: 'PN',
      color: 'bg-secondary-fixed text-on-secondary-fixed',
      syllabusPct: 85,
      syllabusColor: 'bg-emerald-600'
    }
  ]);

  const [newSubjName, setNewSubjName] = useState('Environmental Studies');
  const [newSubjLoad, setNewSubjLoad] = useState('2');
  const [newSubjFaculty, setNewSubjFaculty] = useState('Dr. S. K. Roy');

  const toggleGradeExpand = (grade: string) => {
    setExpandedGrades(prev => 
      prev.includes(grade) ? prev.filter(g => g !== grade) : [...prev, grade]
    );
  };

  const handleAddSubjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry = {
      name: newSubjName,
      code: 'EVS-108 • Elective Track',
      load: `${newSubjLoad} hrs / wk`,
      faculty: newSubjFaculty,
      facultyRole: 'Adjunct Specialist',
      initials: newSubjFaculty.split(' ').map(n => n[0]).join('').substring(0, 2),
      color: 'bg-secondary-fixed text-on-secondary-fixed',
      syllabusPct: 45,
      syllabusColor: 'bg-emerald-600'
    };

    setSubjects([...subjects, newEntry]);
    setShowAddSubjectModal(false);
    onShowToast(`Added offering "${newSubjName}" to Grade 10 - Section A.`);
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Header & Global Actions */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-label-xs uppercase tracking-wider text-secondary font-bold">Curriculum Architecture</span>
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            <span className="font-label-xs text-on-surface-variant font-medium">AY 2026-2027 Management</span>
          </div>
          <h1 className="font-headline-xl text-on-surface tracking-tight">Academic Hierarchy &amp; Curriculum Setup</h1>
          <p className="font-body-md text-on-surface-variant mt-0.5">
            Configure institutional tiers, grades, class sections, subject mappings, and teacher allocations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-surface-container-lowest shadow-sm rounded-lg px-4 py-2 border border-surface-container/60">
            <span className="material-symbols-outlined text-[18px] text-secondary">school</span>
            <span className="font-label-md text-on-surface">Academic Year 2026–27 (Current Active)</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-label-xs font-semibold bg-emerald-50 text-emerald-800 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              Term 1 in Session
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onShowToast('Add Grade wizard initialized.')}
              className="h-9 px-3 rounded-lg bg-surface-container-lowest text-on-surface font-label-md hover:bg-surface-container-low transition-colors shadow-sm flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">add_circle</span>
              <span>+ Add Grade</span>
            </button>
            <button
              onClick={() => onShowToast('Add Class Section dialog opened.')}
              className="h-9 px-3 rounded-lg bg-surface-container-lowest text-on-surface font-label-md hover:bg-surface-container-low transition-colors shadow-sm flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">domain_add</span>
              <span>+ Add Section</span>
            </button>
            <button
              onClick={() => setShowAddSubjectModal(true)}
              className="h-9 px-4 rounded-lg bg-primary-container text-on-primary font-label-md hover:bg-on-background transition-colors shadow-sm flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px] text-primary-fixed">library_add</span>
              <span>+ Add Subject Offering</span>
            </button>
          </div>
        </div>
      </div>

      {/* Operational Stat Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex items-center justify-between border border-surface-container/60">
          <div>
            <div className="font-label-xs uppercase text-on-surface-variant font-semibold">Active Cohort Tiers</div>
            <div className="font-headline-lg text-on-surface font-bold tracking-tight mt-0.5">3 Levels</div>
            <div className="font-label-xs text-secondary font-medium mt-1">Middle, Secondary, Senior Sec</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-[22px]">account_tree</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex items-center justify-between border border-surface-container/60">
          <div>
            <div className="font-label-xs uppercase text-on-surface-variant font-semibold">Configured Sections</div>
            <div className="font-headline-lg text-on-surface font-bold tracking-tight mt-0.5">12 Sections</div>
            <div className="font-label-xs text-emerald-700 font-medium mt-1">100% Class Teachers Assigned</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-[22px]">meeting_room</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex items-center justify-between border border-surface-container/60">
          <div>
            <div className="font-label-xs uppercase text-on-surface-variant font-semibold">Weekly Periods Booked</div>
            <div className="font-headline-lg text-on-surface font-bold tracking-tight mt-0.5">418 Hrs</div>
            <div className="font-label-xs text-on-surface-variant font-medium mt-1">Target: 420 Hrs Capacity</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-[22px]">schedule</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex items-center justify-between border border-surface-container/60">
          <div>
            <div className="font-label-xs uppercase text-on-surface-variant font-semibold">Curriculum Compliance</div>
            <div className="font-headline-lg text-on-surface font-bold tracking-tight mt-0.5">98.4%</div>
            <div className="font-label-xs text-secondary font-medium mt-1">CBSE Norms Aligned</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-[22px]">verified</span>
          </div>
        </div>
      </div>

      {/* Main Split Layout: 5 Cols Left Tree vs 7 Cols Right Allocations */}
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* Left Panel: Hierarchy Tree */}
        <div className="col-span-12 xl:col-span-5 bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-surface-container/60 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-surface-container">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-secondary">schema</span>
              <h2 className="font-title-md text-on-surface font-bold">Institutional Hierarchy Tree</h2>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setExpandedGrades(['Grade 8', 'Grade 9', 'Grade 10'])}
                className="p-1 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors"
                title="Expand All"
              >
                <span className="material-symbols-outlined text-[18px]">unfold_more</span>
              </button>
              <button
                onClick={() => setExpandedGrades([])}
                className="p-1 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors"
                title="Collapse All"
              >
                <span className="material-symbols-outlined text-[18px]">unfold_less</span>
              </button>
            </div>
          </div>

          {/* Quick Search */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-outline text-[16px]">filter_list</span>
            <input
              type="text"
              placeholder="Filter grades, section code, or teacher..."
              value={treeSearch}
              onChange={e => setTreeSearch(e.target.value)}
              className="w-full h-8 pl-8 pr-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm placeholder:text-outline focus:outline-none focus:bg-surface-container transition-all"
            />
          </div>

          {/* Tree Canvas */}
          <div className="space-y-3 font-body-sm text-on-surface">
            {/* Root Node */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-container text-on-primary font-semibold shadow-sm w-fit">
              <span className="material-symbols-outlined text-[18px] text-primary-fixed">domain</span>
              <span>Academic Year 2026–27</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-secondary text-on-secondary font-label-xs uppercase">Active Session</span>
            </div>

            <div className="ml-4 pl-4 border-l-2 border-surface-container space-y-3 pt-1">
              {/* Node 1: Grade 8 */}
              <div>
                <div
                  onClick={() => toggleGradeExpand('Grade 8')}
                  className="flex items-start justify-between p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant group-hover:text-secondary transition-colors">
                      {expandedGrades.includes('Grade 8') ? 'expand_more' : 'chevron_right'}
                    </span>
                    <div>
                      <div className="font-label-md font-bold text-on-surface flex items-center gap-2">
                        Grade 8 <span className="font-normal text-on-surface-variant text-label-xs">(Middle School)</span>
                      </div>
                      <div className="font-label-xs text-on-surface-variant mt-0.5">124 Students • 4 Sections</div>
                    </div>
                  </div>
                </div>

                {expandedGrades.includes('Grade 8') && (
                  <div className="ml-6 pl-3 space-y-1.5 pt-2 border-l border-surface-container">
                    <div className="flex items-center justify-between p-2 rounded bg-surface-bright hover:bg-surface-container transition-colors cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-outline"></div>
                        <span className="font-label-md text-on-surface font-semibold">Section A</span>
                        <span className="text-on-surface-variant text-[12px]">Rajesh Varma • Rm 201</span>
                      </div>
                      <span className="text-[11px] font-label-xs text-on-surface-variant">31/35</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-surface-bright hover:bg-surface-container transition-colors cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-outline"></div>
                        <span className="font-label-md text-on-surface font-semibold">Section B</span>
                        <span className="text-on-surface-variant text-[12px]">Sneha K. • Rm 202</span>
                      </div>
                      <span className="text-[11px] font-label-xs text-on-surface-variant">31/35</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Node 2: Grade 9 */}
              <div>
                <div
                  onClick={() => toggleGradeExpand('Grade 9')}
                  className="flex items-start justify-between p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant group-hover:text-secondary transition-colors">
                      {expandedGrades.includes('Grade 9') ? 'expand_more' : 'chevron_right'}
                    </span>
                    <div>
                      <div className="font-label-md font-bold text-on-surface flex items-center gap-2">
                        Grade 9 <span className="font-normal text-on-surface-variant text-label-xs">(Secondary Tier)</span>
                      </div>
                      <div className="font-label-xs text-on-surface-variant mt-0.5">138 Students • 4 Sections</div>
                    </div>
                  </div>
                </div>

                {expandedGrades.includes('Grade 9') && (
                  <div className="ml-6 pl-3 space-y-1.5 pt-2 border-l border-surface-container">
                    <div className="flex items-center justify-between p-2 rounded bg-surface-bright hover:bg-surface-container transition-colors cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-outline"></div>
                        <span className="font-label-md text-on-surface font-semibold">Section A</span>
                        <span className="text-on-surface-variant text-[12px]">Priya Menon • Rm 208</span>
                      </div>
                      <span className="text-[11px] font-label-xs text-on-surface-variant">34/35</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-surface-bright hover:bg-surface-container transition-colors cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-outline"></div>
                        <span className="font-label-md text-on-surface font-semibold">Section B</span>
                        <span className="text-on-surface-variant text-[12px]">Rahul Thomas • Rm 209</span>
                      </div>
                      <span className="text-[11px] font-label-xs text-on-surface-variant">35/35</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Node 3: Grade 10 [Expanded & Selected] */}
              <div>
                <div
                  onClick={() => {
                    toggleGradeExpand('Grade 10');
                    setSelectedGrade('Grade 10');
                  }}
                  className="flex items-start justify-between p-2.5 rounded-lg bg-secondary-fixed text-on-secondary-fixed shadow-sm cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-secondary font-bold">
                      {expandedGrades.includes('Grade 10') ? 'expand_more' : 'chevron_right'}
                    </span>
                    <div>
                      <div className="font-label-md text-on-secondary-fixed font-bold flex items-center gap-2">
                        Grade 10 <span className="font-normal text-on-secondary-fixed-variant text-label-xs">(Secondary Board)</span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-secondary text-on-secondary font-bold">SELECTED</span>
                      </div>
                      <div className="font-label-xs text-on-secondary-fixed-variant mt-0.5">142 Students • 4 Sections • AISSE Track</div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
                </div>

                {expandedGrades.includes('Grade 10') && (
                  <div className="ml-6 pl-3 space-y-2 pt-2 border-l border-surface-container">
                    {/* Section A Active */}
                    <div
                      onClick={() => setSelectedSection('Section A')}
                      className={`flex items-center justify-between p-2.5 rounded-lg transition-all cursor-pointer ${
                        selectedSection === 'Section A'
                          ? 'bg-surface-container-lowest shadow-md ring-2 ring-secondary/20'
                          : 'bg-surface-bright hover:bg-surface-container'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-secondary"></div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-label-md text-secondary font-bold">Section A</span>
                            <span className="px-1.5 py-0.2 rounded text-[10px] bg-secondary-fixed text-on-secondary-fixed font-semibold">Active Inspector</span>
                          </div>
                          <div className="text-[12px] text-on-surface font-medium mt-0.5">Class Teacher: Anjali Menon • Block B Rm 304</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-label-md text-secondary font-bold">36/40</span>
                        <div className="text-[10px] text-on-surface-variant">Enrolled</div>
                      </div>
                    </div>

                    {/* Section B */}
                    <div
                      onClick={() => {
                        setSelectedSection('Section B');
                        onShowToast('Inspecting Grade 10 - Section B curriculum allocations.');
                      }}
                      className="flex items-center justify-between p-2 rounded bg-surface-bright hover:bg-surface-container transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-outline"></div>
                        <div>
                          <span className="font-label-md text-on-surface font-semibold">Section B</span>
                          <span className="text-on-surface-variant text-[12px] ml-1.5">David Fernandez • Rm 305</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-label-xs text-on-surface-variant">35/40</span>
                    </div>

                    {/* Section C */}
                    <div
                      onClick={() => {
                        setSelectedSection('Section C');
                        onShowToast('Inspecting Grade 10 - Section C curriculum allocations.');
                      }}
                      className="flex items-center justify-between p-2 rounded bg-surface-bright hover:bg-surface-container transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-outline"></div>
                        <div>
                          <span className="font-label-md text-on-surface font-semibold">Section C</span>
                          <span className="text-on-surface-variant text-[12px] ml-1.5">Fatima Zahra • Rm 306</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-label-xs text-on-surface-variant">35/40</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Campus Photograph Card */}
          <div className="rounded-xl overflow-hidden shadow-sm relative group mt-4">
            <img
              src={CAMPUS_ACADEMIC_WING_IMAGE}
              alt="Academic Wing"
              className="w-full h-32 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-container/90 via-primary-container/40 to-transparent p-4 flex flex-col justify-end">
              <span className="font-label-xs text-primary-fixed uppercase tracking-wider font-semibold">Classroom Space Allocation</span>
              <span className="font-body-sm text-white font-medium">Block B (Senior Secondary Wing) operates at 92% capacity</span>
            </div>
          </div>
        </div>

        {/* Right Panel: Section Details & Governance */}
        <div className="col-span-12 xl:col-span-7 flex flex-col gap-6">
          {/* Card 1: Section Details & Class Teacher */}
          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-surface-container/60 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-surface-container">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-secondary">tune</span>
                <div>
                  <h2 className="font-title-md text-on-surface font-bold">Section Details &amp; Governance</h2>
                  <p className="font-label-xs text-on-surface-variant">Inspector Context: Academic Year 2026-27 • Board Curriculum</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded bg-surface-container-high text-on-surface font-label-xs font-semibold">
                UID: SEC-G10-A-2627
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg bg-surface-container-low">
                <span className="font-label-xs text-on-surface-variant block uppercase font-medium">Standard Grade</span>
                <span className="font-label-md text-on-surface font-bold mt-0.5 block">{selectedGrade}</span>
                <span className="text-[11px] text-secondary font-medium">AISSE Track</span>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-low">
                <span className="font-label-xs text-on-surface-variant block uppercase font-medium">Section Division</span>
                <span className="font-label-md text-on-surface font-bold mt-0.5 block">{selectedSection}</span>
                <span className="text-[11px] text-on-surface-variant">Morning Shift</span>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-low">
                <span className="font-label-xs text-on-surface-variant block uppercase font-medium">Assigned Venue</span>
                <span className="font-label-md text-on-surface font-bold mt-0.5 block truncate">Block B - Room 304</span>
                <span className="text-[11px] text-on-surface-variant">Smart Board Enabled</span>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-low">
                <span className="font-label-xs text-on-surface-variant block uppercase font-medium">Class Capacity</span>
                <span className="font-label-md text-on-surface font-bold mt-0.5 block">36 / 40 Enrolled</span>
                <div className="w-full bg-surface-container-highest h-1.5 rounded-full mt-1 overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>

            {/* Class Teacher Card */}
            <div className="p-4 rounded-xl bg-surface-container flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  className="w-12 h-12 rounded-full object-cover shadow-sm border border-white"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOr3CNOHoxPvHr5HeGkwPbAKajPEyHIkfMW-f2U44XgasM588hl2lEm0TKcbT0mfz7qr4a3kH4fbcQGOs1Oek45-ltwKE4x4sLcv7-rMPxHZUwv019iteTukxTVe4X80U7DxP7L_AAbTj3NPwAeX9PCyb2Yu3t95zIg_tfWQ5WkKO30zf4Y9gtUhH7w3T009N_9DGkkfpd6YJ8PE4n2t_iFZVRkmvsc_oe8RR2GWKWpvlxeFlcsh-6"
                  alt="Anjali Menon"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-label-xs uppercase tracking-wider text-secondary font-bold">Designated Class Teacher</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-100 text-emerald-800 font-semibold">Active In-Charge</span>
                  </div>
                  <div className="font-title-md text-on-surface font-bold mt-0.5">Anjali Menon, M.Sc., B.Ed.</div>
                  <div className="font-body-sm text-on-surface-variant">PGT Mathematics • Employee ID: PV-FAC-0142 • 8 Yrs Service</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onShowToast('Select alternative teacher dialogue opened.')}
                  className="h-8 px-3 rounded-lg bg-surface-container-lowest text-on-surface font-label-md hover:bg-surface transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px] text-secondary">swap_horiz</span>
                  <span>Change Teacher</span>
                </button>
                <button
                  type="button"
                  onClick={onOpenTeacherProfile}
                  className="h-8 px-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-label-md hover:bg-surface transition-colors shadow-sm"
                  title="View Teacher Dossier"
                >
                  <span className="material-symbols-outlined text-[16px]">visibility</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Subject & Faculty Allocations Table */}
          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-surface-container/60 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-surface-container">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-secondary">menu_book</span>
                <div>
                  <h2 className="font-title-md text-on-surface font-bold">Subject &amp; Faculty Allocations (Grade 10-A)</h2>
                  <p className="font-label-xs text-on-surface-variant">Mandatory Core Subjects (7 Offerings) • Weekly Load: 35 Hours</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddSubjectModal(true)}
                className="h-8 px-3 rounded-lg bg-secondary text-on-secondary font-label-md hover:bg-secondary-container transition-colors shadow-sm flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>Assign Subject</span>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-body-sm">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant font-label-md uppercase tracking-wider">
                    <th className="py-2.5 px-3 rounded-l-lg">Subject Name &amp; Code</th>
                    <th className="py-2.5 px-3">Weekly Load</th>
                    <th className="py-2.5 px-3">Assigned Faculty</th>
                    <th className="py-2.5 px-3">Syllabus Term 1</th>
                    <th className="py-2.5 px-3 text-right rounded-r-lg">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-low">
                  {subjects.map((sub, i) => (
                    <tr key={i} className="hover:bg-surface-container-low/60 transition-colors">
                      <td className="py-3 px-3">
                        <div className="font-label-md text-on-surface font-bold">{sub.name}</div>
                        <div className="text-[11px] text-on-surface-variant">Code: {sub.code}</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-surface-container font-label-xs font-semibold text-on-surface">
                          {sub.load}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${sub.color}`}>
                            {sub.initials}
                          </div>
                          <div>
                            <div className="font-label-md text-on-surface font-semibold">{sub.faculty}</div>
                            <div className="text-[11px] text-on-surface-variant">{sub.facultyRole}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[12px] font-semibold text-emerald-700">{sub.syllabusPct}%</span>
                          <div className="w-16 bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                            <div className={`${sub.syllabusColor} h-full rounded-full`} style={{ width: `${sub.syllabusPct}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => onShowToast(`Adjusting periods for ${sub.name}.`)}
                            className="p-1 rounded text-on-surface-variant hover:text-secondary hover:bg-surface-container transition-colors"
                            title="Edit Hours"
                          >
                            <span className="material-symbols-outlined text-[16px]">pace</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => onShowToast(`Reassigning faculty for ${sub.name}.`)}
                            className="p-1 rounded text-on-surface-variant hover:text-secondary hover:bg-surface-container transition-colors"
                            title="Reassign Faculty"
                          >
                            <span className="material-symbols-outlined text-[16px]">person_pin</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => onShowToast(`Syllabus checklist opened for ${sub.name}.`)}
                            className="p-1 rounded text-on-surface-variant hover:text-secondary hover:bg-surface-container transition-colors"
                            title="Syllabus Tracker"
                          >
                            <span className="material-symbols-outlined text-[16px]">checklist</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Timetable Distribution */}
            <div className="pt-3 border-t border-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-label-xs uppercase font-bold text-on-surface-variant">Class Load Distribution:</span>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded bg-secondary"></span>
                  <span className="text-[11px] text-on-surface-variant">Maths (7h)</span>
                  <span className="w-3 h-3 rounded bg-secondary-fixed ml-2"></span>
                  <span className="text-[11px] text-on-surface-variant">Sciences (14h)</span>
                  <span className="w-3 h-3 rounded bg-surface-container-highest ml-2"></span>
                  <span className="text-[11px] text-on-surface-variant">Languages &amp; Others (14h)</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onShowToast('Downloading official Grade 10-A Weekly Timetable (PDF).')}
                className="font-label-xs text-secondary hover:underline font-bold flex items-center gap-1"
              >
                <span>Download Section Timetable PDF</span>
                <span className="material-symbols-outlined text-[14px]">download</span>
              </button>
            </div>
          </div>

          {/* Quick Action Card: Assign New Offering */}
          <div className="bg-surface-container-low rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 border border-surface-container">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[20px]">post_add</span>
              </div>
              <div>
                <div className="font-title-md text-on-surface font-bold">+ Assign New Subject Offering to Grade 10-A</div>
                <p className="font-body-sm text-on-surface-variant">Introduce elective tracks, vocational modules, or language labs for this section division.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowAddSubjectModal(true)}
              className="h-9 px-4 rounded-lg bg-primary-container text-on-primary font-label-md hover:bg-on-background transition-colors shadow-sm flex items-center justify-center gap-1.5 whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[18px] text-primary-fixed">add</span>
              <span>Configure Course Offering</span>
            </button>
          </div>
        </div>
      </div>

      {/* Add Course Offering Modal */}
      {showAddSubjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-container/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-xl shadow-2xl overflow-hidden border border-outline-variant/30">
            <div className="p-4 bg-surface-container-low flex items-center justify-between border-b border-surface-container">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[22px]">post_add</span>
                <h3 className="font-headline-sm text-on-surface font-bold">Add Subject Offering</h3>
              </div>
              <button onClick={() => setShowAddSubjectModal(false)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAddSubjectSubmit} className="p-4 space-y-4">
              <div>
                <label className="font-label-xs uppercase font-bold text-on-surface-variant block mb-1">Subject Title</label>
                <input
                  required
                  type="text"
                  value={newSubjName}
                  onChange={e => setNewSubjName(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-surface-container-low text-on-surface text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-label-xs uppercase font-bold text-on-surface-variant block mb-1">Weekly Load (Hours)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newSubjLoad}
                    onChange={e => setNewSubjLoad(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg bg-surface-container-low text-on-surface text-body-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-label-xs uppercase font-bold text-on-surface-variant block mb-1">Assigned Faculty</label>
                  <select
                    value={newSubjFaculty}
                    onChange={e => setNewSubjFaculty(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg bg-surface-container-low text-on-surface text-body-sm focus:outline-none"
                  >
                    <option>Dr. S. K. Roy</option>
                    <option>Anjali Menon</option>
                    <option>Rahul Thomas</option>
                    <option>Priya Nair</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-surface-container">
                <button
                  type="button"
                  onClick={() => setShowAddSubjectModal(false)}
                  className="px-4 h-9 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 h-9 rounded-lg bg-secondary hover:bg-secondary-container text-on-secondary font-label-md shadow-sm"
                >
                  Save Subject Offering
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
