import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Overview from './pages/Overview';
import Attendance from './pages/Attendance';
import Engagement from './pages/Engagement';
import Safety from './pages/Safety';
import Students from './pages/Students';
import LiveFeed from './pages/LiveFeed';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-[#080e1a]">
        <Sidebar />
        <div className="flex flex-col flex-1 ml-60 min-h-screen">
          <Routes>
            <Route path="/"           element={<Overview />}   />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/engagement" element={<Engagement />} />
            <Route path="/safety"     element={<Safety />}     />
            <Route path="/students"   element={<Students />}   />
            <Route path="/live"       element={<LiveFeed />}   />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
