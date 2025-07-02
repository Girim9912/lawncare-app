import { Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout'
import Home from '../pages/Home'
import Quote from '../pages/Quote'
import Diagnose from '../pages/Diagnose'
import Planner from '../pages/Planner'
import NotFound from '../pages/NotFound'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="quote" element={<Quote />} />
        <Route path="diagnose" element={<Diagnose />} />
        <Route path="planner" element={<Planner />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}