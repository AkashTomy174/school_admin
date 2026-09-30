import React, { useState } from 'react';
import { Shell, NavPath } from './components/layout/Shell';
import { DashboardView } from './views/DashboardView';
import { StudentsView } from './views/StudentsView';
import { StaffView } from './views/StaffView';
import { StaffProfileView } from './views/StaffProfileView';
import { AcademicsView } from './views/AcademicsView';
import { AnalyticsView } from './views/AnalyticsView';
import { SettingsView } from './views/SettingsView';
import { LoginView } from './views/LoginView';
import {
  AddStudentModal,
  RecordAttendanceModal,
  PublishCircularModal,
  Ut2ApprovalModal,
  FleetMapModal,
  StudentDossierModal
} from './components/modals/GlobalModals';
import { INITIAL_STAFF, Student, StaffMember } from './data/portalData';

export default function App() {
  const [currentPath, setCurrentPath] = useState<NavPath>('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userRole, setUserRole] = useState('Super Admin');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Selected records for inspection
  const [selectedStaff, setSelectedStaff] = useState<StaffMember>(INITIAL_STAFF[0]);
  const [selectedStudentForDossier, setSelectedStudentForDossier] = useState<Student | null>(null);

  // Modals state
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);
  const [isCircularOpen, setIsCircularOpen] = useState(false);
  const [isUt2Open, setIsUt2Open] = useState(false);
  const [isFleetMapOpen, setIsFleetMapOpen] = useState(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(prev => (prev === message ? null : prev));
    }, 3800);
  };

  const handleNavigate = (path: NavPath) => {
    if (path === 'login') {
      setIsLoggedIn(false);
      return;
    }
    // Deep links
    if (path === 'attendance') {
      setIsAttendanceOpen(true);
      return;
    }
    if (path === 'exams-results') {
      setIsUt2Open(true);
      return;
    }
    if (path === 'communications') {
      setIsCircularOpen(true);
      return;
    }
    if (path === 'reports') {
      setCurrentPath('analytics');
      showToast('Redirected to Executive Analytics & Reports Cockpit.');
      return;
    }
    if (path === 'assignments') {
      setCurrentPath('academics');
      showToast('Redirected to Curricular Subject & Assignments Setup.');
      return;
    }
    setCurrentPath(path);
  };

  const handleLogin = (role: string) => {
    setUserRole(role);
    setIsLoggedIn(true);
    setCurrentPath('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    showToast('Signed out of administrative terminal.');
  };

  const handleSelectStaffProfile = (staff: StaffMember) => {
    setSelectedStaff(staff);
    setCurrentPath('staff-profile');
  };

  if (!isLoggedIn) {
    return (
      <>
        <LoginView onLogin={handleLogin} onShowToast={showToast} />
        {/* Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl bg-primary-container text-on-primary shadow-xl border border-white/10 animate-in fade-in slide-in-from-bottom-4">
            <span className="material-symbols-outlined text-secondary-fixed text-[20px]">check_circle</span>
            <span className="font-body-sm font-medium">{toastMessage}</span>
          </div>
        )}
      </>
    );
  }

  return (
    <Shell
      currentPath={currentPath}
      onNavigate={handleNavigate}
      userRole={userRole}
      onLogout={handleLogout}
    >
      {/* Dynamic View Switcher */}
      {currentPath === 'dashboard' && (
        <DashboardView
          onOpenAddStudent={() => setIsAddStudentOpen(true)}
          onOpenAddStaff={() => setCurrentPath('staff')}
          onOpenCircular={() => setIsCircularOpen(true)}
          onOpenAttendance={() => setIsAttendanceOpen(true)}
          onOpenUt2={() => setIsUt2Open(true)}
          onOpenFleetMap={() => setIsFleetMapOpen(true)}
          onShowToast={showToast}
        />
      )}

      {currentPath === 'students' && (
        <StudentsView
          onOpenAddStudent={() => setIsAddStudentOpen(true)}
          onOpenStudentDossier={(student) => setSelectedStudentForDossier(student)}
          onShowToast={showToast}
        />
      )}

      {currentPath === 'staff' && (
        <StaffView
          onSelectStaffProfile={handleSelectStaffProfile}
          onShowToast={showToast}
        />
      )}

      {currentPath === 'staff-profile' && (
        <StaffProfileView
          staff={selectedStaff}
          onBack={() => setCurrentPath('staff')}
          onShowToast={showToast}
        />
      )}

      {currentPath === 'academics' && (
        <AcademicsView
          onShowToast={showToast}
          onOpenTeacherProfile={() => handleSelectStaffProfile(INITIAL_STAFF[0])}
        />
      )}

      {currentPath === 'analytics' && (
        <AnalyticsView onShowToast={showToast} />
      )}

      {currentPath === 'settings' && (
        <SettingsView onShowToast={showToast} />
      )}

      {/* Global Interactive Modals */}
      <AddStudentModal
        isOpen={isAddStudentOpen}
        onClose={() => setIsAddStudentOpen(false)}
        onSuccess={showToast}
      />

      <RecordAttendanceModal
        isOpen={isAttendanceOpen}
        onClose={() => setIsAttendanceOpen(false)}
        onSuccess={showToast}
      />

      <PublishCircularModal
        isOpen={isCircularOpen}
        onClose={() => setIsCircularOpen(false)}
        onSuccess={showToast}
      />

      <Ut2ApprovalModal
        isOpen={isUt2Open}
        onClose={() => setIsUt2Open(false)}
        onSuccess={showToast}
      />

      <FleetMapModal
        isOpen={isFleetMapOpen}
        onClose={() => setIsFleetMapOpen(false)}
      />

      <StudentDossierModal
        student={selectedStudentForDossier}
        isOpen={!!selectedStudentForDossier}
        onClose={() => setSelectedStudentForDossier(null)}
        onSuccess={showToast}
      />

      {/* Global Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl bg-primary-container text-on-primary shadow-xl border border-white/10 animate-in fade-in slide-in-from-bottom-4">
          <span className="material-symbols-outlined text-secondary-fixed text-[20px]">check_circle</span>
          <span className="font-body-sm font-medium">{toastMessage}</span>
        </div>
      )}
    </Shell>
  );
}
