import { createFileRoute, Outlet, Link, useRouterState, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Award, 
  GraduationCap, 
  CalendarDays, 
  Image as ImageIcon, 
  MessageSquare,
  LogOut,
  FileText,
  FileCheck,
  Bell,
  ListChecks,
  Megaphone
} from 'lucide-react';

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
});

function AdminLayout() {
  const routerState = useRouterState();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isLoginPage = routerState.location.pathname.endsWith('/login');

  useEffect(() => {
    if (isLoginPage) return;
    
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.href = '/admin/login';
    } else {
      setIsAuthenticated(true);
    }
  }, [isLoginPage]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  if (isLoginPage) {
    return <Outlet />;
  }

  // Prevent flashing of admin content before redirect
  if (!isAuthenticated) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Popup Modal', icon: Megaphone, path: '/admin?tab=popup' },
    { name: 'Management', icon: Users, path: '/admin?tab=management' },
    { name: 'Achievers', icon: Award, path: '/admin?tab=achievers' },
    { name: 'Alumni', icon: GraduationCap, path: '/admin?tab=alumni' },
    { name: 'Events', icon: CalendarDays, path: '/admin?tab=events' },
    { name: 'Gallery', icon: ImageIcon, path: '/admin?tab=gallery' },
    { name: 'Exam Schedules', icon: CalendarDays, path: '/admin?tab=exam-schedules' },
    { name: 'Exam Results', icon: FileCheck, path: '/admin?tab=exam-results' },
    { name: 'Exam Notices', icon: Bell, path: '/admin?tab=exam-notices' },
    { name: 'Exam Guidelines', icon: ListChecks, path: '/admin?tab=exam-guidelines' },
    { name: 'Enquiries', icon: MessageSquare, path: '/admin?tab=enquiries' },
  ];

  const currentTab = new URLSearchParams(routerState.location.search).get('tab') || 'dashboard';

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed inset-y-0 left-0">
        <div className="p-6 border-b border-gray-200 flex items-center gap-3">
          <img src="/lfs-logo.png" alt="LFS Logo" className="w-10 h-10 object-contain" />
          <div>
            <h1 className="text-xl font-bold text-gray-900 font-display">LFS Admin</h1>
            <p className="text-xs text-gray-500 mt-1">Management Portal</p>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const itemTab = item.path.includes('tab=') 
              ? new URLSearchParams(item.path.split('?')[1]).get('tab') 
              : 'dashboard';
            const isActive = currentTab === itemTab;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700 font-semibold' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <item.icon size={18} className={isActive ? 'text-blue-700' : 'text-gray-500'} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 min-h-screen p-8 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
