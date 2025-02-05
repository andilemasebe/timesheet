import { Routes, Route } from 'react-router-dom';
import PerformancePage from './components/Performance/PerformancePage';

function App() {
  return (
    <Routes>
      <Route path="/performance" element={<PerformancePage />} />
      {/* Other routes */}
    </Routes>
  );
}
