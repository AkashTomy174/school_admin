import React, { useState, useMemo } from 'react';
import { INITIAL_STUDENTS, Student } from '../data/portalData';

interface StudentsViewProps {
  onOpenAddStudent: () => void;
  onOpenStudentDossier: (student: Student) => void;
  onShowToast: (msg: string) => void;
}

export function StudentsView({ onOpenAddStudent, onOpenStudentDossier, onShowToast }: StudentsViewProps) {
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('Grade 10');
  const [selectedSection, setSelectedSection] = useState('All');
  const [selectedStanding, setSelectedStanding] = useState('All');
  const [selectedIds, setSelectedIds] = useState<string[]>(['PV-2022-1048', 'PV-2022-1089', 'PV-2022-1102']);

  // Filter students
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = 
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.guardianName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.rollNumber.includes(searchQuery);

      const matchesGrade = selectedGrade === 'All' || student.grade === selectedGrade;
      const matchesSection = selectedSection === 'All' || student.section === selectedSection;
      const matchesStanding = selectedStanding === 'All' || student.academicStatus.includes(selectedStanding);

      return matchesSearch && matchesGrade && matchesSection && matchesStanding;
    });
  }, [students, searchQuery, selectedGrade, selectedSection, selectedStanding]);

  // Bulk selection handlers
  const handleToggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredStudents.map(s => s.id));
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
    setSelectedGrade('Grade 10');
    setSelectedSection('All');
    setSelectedStanding('All');
    onShowToast('Student filters reset to Grade 10 active cohort.');
  };

  const isAllSelected = filteredStudents.length > 0 && selectedIds.length === filteredStudents.length;

  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Top Stats Strip */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-xs uppercase tracking-wider text-outline">Total Active Enrollment</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-headline-lg text-on-surface font-bold">1,248</span>
              <span className="font-label-xs text-emerald-600 font-semibold flex items-center">
                <span className="material-symbols-outlined text-[14px]">arrow_upward</span>+3.4%
              </span>
            </div>
            <span className="font-label-xs text-on-surface-variant mt-0.5">AY 2026–27 verified records</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-[22px]">groups</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-xs uppercase tracking-wider text-outline">Grade 10 Cohort</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-headline-lg text-on-surface font-bold">142</span>
              <span className="font-label-xs text-on-surface-variant">Across Sec A, B, C</span>
            </div>
            <span className="font-label-xs text-secondary font-medium mt-0.5">100% capacity filled</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary-container">
            <span className="material-symbols-outlined text-[22px]">class</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-xs uppercase tracking-wider text-outline">Attendance Health</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-headline-lg text-on-surface font-bold">95.4%</span>
              <span className="font-label-xs text-emerald-600 font-semibold flex items-center">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>Optimal
              </span>
            </div>
            <span className="font-label-xs text-on-surface-variant mt-0.5">7 students below 85% alert</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-emerald-600">
            <span className="material-symbols-outlined text-[22px]">fact_check</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-xs uppercase tracking-wider text-outline">Parent Portal Sync</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-headline-lg text-on-surface font-bold">98.2%</span>
              <span className="font-label-xs text-amber-700 font-semibold">12 pending</span>
            </div>
            <span className="font-label-xs text-on-surface-variant mt-0.5">SMS &amp; App sync status</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-on-tertiary-container">
            <span className="material-symbols-outlined text-[22px]">devices_other</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-label-xs uppercase tracking-widest text-secondary font-bold">Academic Registry</span>
            <span className="text-outline text-label-xs">•</span>
            <span className="font-label-xs text-on-surface-variant">Central Student Database</span>
          </div>
          <h1 className="font-headline-xl text-on-surface font-bold tracking-tight">Student Directory &amp; Records</h1>
          <p className="font-body-md text-on-surface-variant mt-0.5">
            Manage student profiles, enrollments, class sectioning, and academic standing across Peevees Public School.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onShowToast('Exporting student directory matrix as CSV/PDF.')}
            className="h-9 px-3.5 bg-surface-container-lowest hover:bg-surface-container-low text-on-surface font-label-md rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-outline">ios_share</span>
            <span>Export Records (CSV/PDF)</span>
          </button>
          <button
            onClick={() => onShowToast('Bulk CSV Import dialog ready. Please choose student roster file.')}
            className="h-9 px-3.5 bg-surface-container-lowest hover:bg-surface-container-low text-on-surface font-label-md rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">file_upload</span>
            <span>Bulk Import CSV</span>
          </button>
          <button
            onClick={onOpenAddStudent}
            className="h-9 px-4 bg-primary-container hover:bg-inverse-surface text-on-primary font-label-md rounded-lg shadow-sm flex items-center gap-2 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            <span>+ Add Student</span>
          </button>
        </div>
      </div>

      {/* Search, Filter & View Bar */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm p-4 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-xl">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
            <input
              type="text"
              placeholder="Search students by name, roll number, admission ID, or parent contact..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-10 rounded-lg bg-surface-container-low text-on-surface font-body-sm placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[16px]">cancel</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 justify-between lg:justify-end">
            <div className="px-3 py-1.5 bg-surface-container rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span className="font-label-xs text-on-surface font-semibold">
                Showing {filteredStudents.length} of 1,248 enrolled students
              </span>
            </div>
            <button
              onClick={() => onShowToast('Configured columns for Central Student Registry.')}
              className="h-9 px-3 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container flex items-center gap-1 font-label-md"
            >
              <span className="material-symbols-outlined text-[18px]">view_column</span>
              <span className="hidden sm:inline">Columns</span>
            </button>
            <button
              onClick={() => onShowToast('Student roster refreshed with latest SIS sync.')}
              className="h-9 px-3 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container flex items-center justify-center font-label-md"
              title="Refresh Table"
            >
              <span className="material-symbols-outlined text-[18px]">refresh</span>
            </button>
          </div>
        </div>

        {/* Tier 2 Contextual Filter Drops */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 pt-2 border-t border-surface-container/60">
          <div>
            <label className="font-label-xs text-outline mb-1 font-semibold uppercase block">Academic Year</label>
            <select className="w-full h-9 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm focus:outline-none">
              <option>AY 2026–27 (Current)</option>
              <option>AY 2025–26 (Previous)</option>
              <option>AY 2024–25</option>
            </select>
          </div>

          <div>
            <label className="font-label-xs text-outline mb-1 font-semibold uppercase block">Class / Grade</label>
            <select
              value={selectedGrade}
              onChange={e => setSelectedGrade(e.target.value)}
              className="w-full h-9 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm focus:outline-none"
            >
              <option value="All">All Grades (1–12)</option>
              <option value="Grade 10">Grade 10</option>
              <option value="Grade 9">Grade 9</option>
              <option value="Grade 8">Grade 8</option>
              <option value="Grade 11">Grade 11 (Science)</option>
              <option value="Grade 12">Grade 12 (Science)</option>
            </select>
          </div>

          <div>
            <label className="font-label-xs text-outline mb-1 font-semibold uppercase block">Section</label>
            <select
              value={selectedSection}
              onChange={e => setSelectedSection(e.target.value)}
              className="w-full h-9 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm focus:outline-none"
            >
              <option value="All">All Sections (A, B, C)</option>
              <option value="A">Section A (48 Students)</option>
              <option value="B">Section B (47 Students)</option>
              <option value="C">Section C (47 Students)</option>
            </select>
          </div>

          <div>
            <label className="font-label-xs text-outline mb-1 font-semibold uppercase block">Academic Standing</label>
            <select
              value={selectedStanding}
              onChange={e => setSelectedStanding(e.target.value)}
              className="w-full h-9 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Honors">Honors (A1)</option>
              <option value="Proficient">Proficient (B1/B2)</option>
              <option value="Watch">Academic Watch (C1/C2)</option>
            </select>
          </div>

          <div className="flex flex-col justify-end">
            <button
              onClick={handleResetFilters}
              className="h-9 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-secondary font-label-md flex items-center justify-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">filter_alt_off</span>
              <span>Reset Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions Sticky Floating Action Capsule */}
      {selectedIds.length > 0 && (
        <div className="sticky top-20 z-30 transition-all duration-200 animate-in fade-in slide-in-from-top-2">
          <div className="bg-primary-container text-on-primary rounded-xl px-5 py-2.5 shadow-lg flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center font-bold text-on-secondary text-label-sm">
                {selectedIds.length}
              </div>
              <div className="flex flex-col">
                <span className="font-title-md font-semibold text-white leading-tight">Students Selected</span>
                <span className="font-label-xs text-on-primary-container">Multi-record batch operations enabled</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => onShowToast(`Promote batch dialogue launched for ${selectedIds.length} candidates.`)}
                className="h-8 px-3 rounded bg-white/10 hover:bg-white/20 text-white font-label-xs flex items-center gap-1.5 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">upgrade</span>
                <span>Promote to Next Grade</span>
              </button>
              <button
                onClick={() => onShowToast(`Section transfer tool initialized for ${selectedIds.length} students.`)}
                className="h-8 px-3 rounded bg-white/10 hover:bg-white/20 text-white font-label-xs flex items-center gap-1.5 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">move_up</span>
                <span>Transfer Section</span>
              </button>
              <button
                onClick={() => onShowToast(`Batch section allocation mapped.`)}
                className="h-8 px-3 rounded bg-white/10 hover:bg-white/20 text-white font-label-xs flex items-center gap-1.5 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">grid_goldenratio</span>
                <span>Assign Section</span>
              </button>
              <button
                onClick={() => onShowToast(`Parent portal sync dispatched for ${selectedIds.length} selected profiles.`)}
                className="h-8 px-3 rounded bg-white/10 hover:bg-white/20 text-white font-label-xs flex items-center gap-1.5 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">supervised_user_circle</span>
                <span>Link Parent Account</span>
              </button>
              <button
                onClick={() => onShowToast(`Generated high-resolution official ID cards for ${selectedIds.length} students.`)}
                className="h-8 px-3 rounded bg-secondary hover:bg-secondary-container text-on-secondary font-label-xs flex items-center gap-1.5 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">badge</span>
                <span>Generate ID Cards</span>
              </button>
              <button
                onClick={() => setSelectedIds([])}
                className="h-8 w-8 rounded bg-white/5 hover:bg-white/10 text-on-primary-container hover:text-white flex items-center justify-center transition-colors ml-1"
                title="Deselect all"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Student Data Table Container */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-outline uppercase font-label-xs tracking-wider">
                <th className="w-12 px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={e => handleToggleSelectAll(e.target.checked)}
                    className="w-4 h-4 rounded text-secondary bg-surface-container-lowest focus:ring-0 cursor-pointer accent-secondary"
                  />
                </th>
                <th className="px-4 py-3 font-semibold">Student ID &amp; Roll</th>
                <th className="px-4 py-3 font-semibold">Student Name &amp; Profile</th>
                <th className="px-4 py-3 font-semibold">Class / Sec</th>
                <th className="px-4 py-3 font-semibold">Guardian / Primary Contact</th>
                <th className="px-4 py-3 font-semibold">Attendance Rate</th>
                <th className="px-4 py-3 font-semibold">Academic Status</th>
                <th className="px-4 py-3 font-semibold">Portal Sync</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container text-body-sm font-body-sm text-on-surface">
              {filteredStudents.map(student => {
                const isSelected = selectedIds.includes(student.id);
                return (
                  <tr
                    key={student.id}
                    className={`hover:bg-surface-container-low transition-colors ${
                      isSelected ? 'bg-surface-container-low/50' : ''
                    }`}
                  >
                    <td className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleRow(student.id)}
                        className="w-4 h-4 rounded text-secondary bg-surface-container-lowest focus:ring-0 cursor-pointer accent-secondary"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="font-numerical-data font-semibold text-primary">{student.id}</span>
                        <span className="font-label-xs text-outline">Roll #{student.rollNumber} • CBSE Reg</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-surface-container shrink-0 border border-white shadow-sm">
                          <img
                            src={student.avatarUrl}
                            alt={student.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-title-md text-on-surface font-semibold truncate">{student.name}</span>
                            <span className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-xs text-[10px]">
                              {student.gender} • {student.age}y
                            </span>
                          </div>
                          <span className="font-label-xs text-on-surface-variant">DOB: {student.dob} • {student.type}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 rounded-md bg-surface-container font-label-md font-bold text-on-surface">
                        {student.grade} - {student.section}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="font-label-md text-on-surface font-medium">{student.guardianName} ({student.guardianRelation})</span>
                        <span className="font-numerical-data text-outline flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">phone</span>{student.guardianPhone}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1 w-32">
                        <div className="flex items-center justify-between">
                          <span className="font-numerical-data font-bold text-on-surface">{student.attendanceRate}%</span>
                          <span className={`font-label-xs text-[10px] font-bold uppercase ${
                            student.attendanceRate > 95 ? 'text-emerald-600' : 'text-amber-700'
                          }`}>
                            {student.attendanceRate > 98 ? 'Exemplary' : student.attendanceRate > 95 ? 'High' : 'Moderate'}
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${student.attendanceRate > 95 ? 'bg-emerald-600' : 'bg-amber-500'}`}
                            style={{ width: `${student.attendanceRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded font-label-xs font-semibold ${
                        student.academicStatus.includes('Honors')
                          ? 'bg-surface-container-high text-on-surface'
                          : student.academicStatus.includes('Watch')
                          ? 'bg-error-container text-on-error-container'
                          : 'bg-surface-container text-on-surface'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${
                          student.academicStatus.includes('Honors') ? 'bg-secondary' : student.academicStatus.includes('Watch') ? 'bg-error' : 'bg-secondary-container'
                        }`}></span>
                        {student.academicStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {student.portalSync === 'Active' ? (
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-label-xs font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                          Active
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-label-xs font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                          Pending Parent Activation
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onOpenStudentDossier(student)}
                          className="w-8 h-8 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors"
                          title="View Student Dossier"
                        >
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </button>
                        <button
                          onClick={() => onShowToast(`Editing records for ${student.name} (${student.id})`)}
                          className="w-8 h-8 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors"
                          title="Edit Student"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button
                          onClick={() => onShowToast(`Action options opened for ${student.name}`)}
                          className="w-8 h-8 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors"
                          title="More Options"
                        >
                          <span className="material-symbols-outlined text-[18px]">more_vert</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Pagination & Footer */}
        <div className="p-4 bg-surface-container-low/50 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-surface-container/60">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="font-body-sm text-on-surface-variant">Rows per page:</span>
              <select className="h-8 pl-2 pr-6 rounded bg-surface-container-lowest text-on-surface font-label-md border border-surface-container cursor-pointer">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
            <span className="text-outline">•</span>
            <span className="font-body-sm text-on-surface-variant">
              Displaying <strong className="text-on-surface font-semibold">1 – {filteredStudents.length}</strong> of <strong className="text-on-surface font-semibold">142</strong> records (Grade 10)
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button className="h-8 px-2.5 rounded bg-surface-container-lowest text-outline opacity-50 cursor-not-allowed flex items-center justify-center font-label-md" disabled>
              <span className="material-symbols-outlined text-[16px]">first_page</span>
            </button>
            <button className="h-8 px-3 rounded bg-surface-container-lowest text-outline opacity-50 cursor-not-allowed flex items-center justify-center gap-1 font-label-md" disabled>
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
              <span>Previous</span>
            </button>
            <div className="flex items-center gap-1">
              <button className="h-8 w-8 rounded bg-primary-container text-on-primary font-label-md font-bold flex items-center justify-center">1</button>
              <button className="h-8 w-8 rounded bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md flex items-center justify-center transition-colors">2</button>
              <button className="h-8 w-8 rounded bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md flex items-center justify-center transition-colors">3</button>
              <span className="px-1 text-outline font-label-xs">...</span>
              <button className="h-8 w-8 rounded bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md flex items-center justify-center transition-colors">6</button>
            </div>
            <button className="h-8 px-3 rounded bg-surface-container-lowest hover:bg-surface-container text-on-surface flex items-center justify-center gap-1 font-label-md transition-colors">
              <span>Next</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
            <button className="h-8 px-2.5 rounded bg-surface-container-lowest hover:bg-surface-container text-on-surface flex items-center justify-center font-label-md transition-colors">
              <span className="material-symbols-outlined text-[16px]">last_page</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Administrative Information Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Section Distribution */}
        <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-title-md font-bold text-on-surface">Section Distribution</span>
              <span className="font-label-xs bg-surface-container px-2 py-0.5 rounded text-on-surface-variant font-semibold">Grade 10</span>
            </div>
            <p className="font-body-sm text-on-surface-variant mb-4">Current seat allocation across Section A, B, and C for AY 2026–27.</p>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-body-sm mb-1">
                  <span className="font-medium text-on-surface">Section A (Room 204)</span>
                  <span className="font-numerical-data font-semibold text-on-surface">48 / 50 seats</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: '96%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-body-sm mb-1">
                  <span className="font-medium text-on-surface">Section B (Room 205)</span>
                  <span className="font-numerical-data font-semibold text-on-surface">47 / 50 seats</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-secondary-container rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-body-sm mb-1">
                  <span className="font-medium text-on-surface">Section C (Room 206)</span>
                  <span className="font-numerical-data font-semibold text-on-surface">47 / 50 seats</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-surface-tint rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-4 mt-4 border-t border-surface-container/60 flex items-center justify-between text-on-surface-variant">
            <span className="font-label-xs">Class Teacher: Mrs. Lakshmi R. (10-A)</span>
            <button
              onClick={() => onShowToast('Grade 10 section capacity rebalance wizard triggered.')}
              className="font-label-xs text-secondary font-bold hover:underline"
            >
              Rebalance Seats
            </button>
          </div>
        </div>

        {/* CBSE Enrollment Sync */}
        <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-title-md font-bold text-on-surface">CBSE Enrollment Sync</span>
              <span className="flex items-center gap-1 font-label-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>Operational
              </span>
            </div>
            <p className="font-body-sm text-on-surface-variant mb-4">Real-time sync status with CBSE LOC (List of Candidates) Portal for Grade 10 Board registration.</p>
            <div className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-2">
              <div className="flex items-center justify-between text-body-sm">
                <span className="text-on-surface-variant">Board Examination Fees</span>
                <span className="font-label-md text-emerald-700 font-bold">138 Cleared (4 Pending)</span>
              </div>
              <div className="flex items-center justify-between text-body-sm">
                <span className="text-on-surface-variant">Aadhaar &amp; Birth Certificate</span>
                <span className="font-label-md text-emerald-700 font-bold">142 Verified (100%)</span>
              </div>
              <div className="flex items-center justify-between text-body-sm">
                <span className="text-on-surface-variant">LOC Batch Finalization</span>
                <span className="font-label-md text-secondary font-bold">Draft Locked</span>
              </div>
            </div>
          </div>
          <div className="pt-4 mt-4 border-t border-surface-container/60 flex items-center justify-between gap-2">
            <button
              onClick={() => onShowToast('CBSE Data Integrity Audit passed with 0 fatal checksum errors.')}
              className="h-8 px-3 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-xs font-semibold transition-colors"
            >
              Run Integrity Audit
            </button>
            <button
              onClick={() => onShowToast('Generating CBSE Official LOC Encrypted Submission Packet.')}
              className="h-8 px-3 rounded bg-secondary hover:bg-secondary-container text-on-secondary font-label-xs font-semibold transition-colors"
            >
              Download LOC Packet
            </button>
          </div>
        </div>

        {/* Recent Administrative Activity Log */}
        <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-title-md font-bold text-on-surface">Registry Activity</span>
              <span className="font-label-xs text-outline">Today</span>
            </div>
            <p className="font-body-sm text-on-surface-variant mb-4">Administrative modifications, transfers, and updates recorded in this session.</p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-secondary shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[14px]">edit_note</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-body-sm text-on-surface font-medium leading-snug">Parent contact verified for Diya Nambiar (PV-2022-1089)</span>
                  <span className="font-label-xs text-outline">14 mins ago • by Bursar Office</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-body-sm text-on-surface font-medium leading-snug">Section change confirmed: Farhan moved to Grade 10-B</span>
                  <span className="font-label-xs text-outline">1 hour ago • by Dr. Radhakrishnan</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[14px]">sms</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-body-sm text-on-surface font-medium leading-snug">Portal activation invite dispatched to Thomas Elizabeth</span>
                  <span className="font-label-xs text-outline">2 hours ago • System Bot</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-4 mt-4 border-t border-surface-container/60 flex items-center justify-end">
            <button
              onClick={() => onShowToast('Complete registry modification audit trail exported.')}
              className="font-label-xs text-secondary font-bold hover:underline flex items-center gap-1"
            >
              <span>View Complete Audit Trail</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
