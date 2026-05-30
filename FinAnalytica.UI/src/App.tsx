import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './features/auth/LoginPage'
import Dashboard from './features/dashboard/Dashboard';
import PageUnderConstruction from './components/dashboard/PageUnderConstruction';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pageUnderConstruction" element={<PageUnderConstruction />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
