import { Box } from '@mui/material'
import { bgAnimatedSx, orbSx } from '@src/theme/brand'
import Navbar from './Navbar'
import Hero from './Hero'
import DashboardDemos from './DashboardDemos'
import AppsDemos from './AppsDemos'
import Features from './Features'
import ElementsPreview from './ElementsPreview'
import Team from './Team'
import WhatYouGet from './WhatYouGet'
import Footer from './Footer'

// Landing pública de ATEMPO — fondo navy con orbs, mismas secciones del
// scaffold (nav, hero, módulos, experiencia, roles, privacidad, footer).
const LandingPage = () => (
  <Box
    className="scroll-area"
    sx={[
      bgAnimatedSx,
      {
        minHeight: '100vh',
        height: '100vh',
        overflowY: 'auto',
        position: 'relative',
      },
    ]}
  >
    {/* Orbs ambientales */}
    <Box sx={[orbSx, { width: 520, height: 520, top: -180, left: -140, background: 'radial-gradient(circle, rgba(31,58,95,0.55), transparent 70%)' }]} />
    <Box sx={[orbSx, { width: 420, height: 420, bottom: '10%', right: -160, background: 'radial-gradient(circle, rgba(226,184,74,0.1), transparent 70%)' }]} />

    <Box sx={{ position: 'relative' }}>
      <Navbar />
      <Hero />
      <DashboardDemos />
      <AppsDemos />
      <Features />
      <ElementsPreview />
      <Team />
      <WhatYouGet />
      <Footer />
    </Box>
  </Box>
)

export default LandingPage
