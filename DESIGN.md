---
name: ATEMPO
description: Plataforma de bienestar psicofisiológico — un observatorio nocturno donde los datos vitales se leen con calma
colors:
  navy-observatory: "#0C1F3C"
  deep-blue-glass: "#1F3A5F"
  mustard: "#E2B84A"
  mustard-deep: "#c9a035"
  mustard-light: "#f0d070"
  cream: "#FAF6ED"
  ink: "#111827"
  stress-ok: "#4ade80"
  stress-critical: "#f87171"
  data-blue: "#60a5fa"
  accent-purple: "#c084fc"
  neutral-muted: "#7a8494"
typography:
  display:
    fontFamily: '"DM Serif Display", Georgia, serif'
    fontWeight: 400
  body:
    fontFamily: '"Outfit", system-ui, sans-serif'
  label:
    fontFamily: '"Outfit", system-ui, sans-serif'
    fontSize: "0.62rem"
    fontWeight: 500
    letterSpacing: "0.14em"
  metric:
    fontFamily: '"DM Mono", ui-monospace, monospace'
rounded:
  chip: "10px"
  input: "12px"
  card: "20px"
  dialog: "24px"
  pill: "999px"
components:
  button-primary:
    backgroundColor: "linear-gradient(135deg, {colors.mustard}, {colors.mustard-deep})"
    textColor: "{colors.navy-observatory}"
    rounded: "{rounded.input}"
    padding: "12px 18px"
  button-primary-hover:
    backgroundColor: "linear-gradient(135deg, {colors.mustard-light}, {colors.mustard})"
    textColor: "{colors.navy-observatory}"
  card-glass:
    backgroundColor: "rgba(31,58,95,0.32)"
    textColor: "{colors.cream}"
    rounded: "{rounded.card}"
  input-glass:
    backgroundColor: "rgba(255,255,255,0.05)"
    textColor: "{colors.cream}"
    rounded: "{rounded.input}"
  nav-item-active:
    backgroundColor: "linear-gradient(135deg, rgba(226,184,74,0.18), rgba(226,184,74,0.08))"
    textColor: "{colors.mustard}"
    rounded: "{rounded.input}"
---

# Design System: ATEMPO

## Overview

**Creative North Star: "El Observatorio Nocturno"**

ATEMPO es un cuarto oscuro y silencioso donde los datos vitales brillan con claridad. El fondo navy profundo no es un tema oscuro genérico: es el cielo del observatorio sobre el que flotan paneles de vidrio. El mustard dorado es la luz del instrumento — escaso, preciso, reservado para lo que importa (acción primaria, dato activo, estado de navegación).

El sistema es dark-first: la variante clara existe como cortesía (crema esmerilado con el mismo acento), pero la identidad vive en navy. Todo respira: superficies translúcidas, bordes redondeados generosos, movimiento lento (breathe, float, shimmer) que refuerza la promesa del producto — regular, no exigir.

**Key Characteristics:**
- Liquid glass en capas (`glass`, `glass-strong`, `glass-card`, `glass-mustard`) sobre fondo navy con orbs ambientales difuminados.
- Semáforo de estrés como lenguaje de datos universal: verde → mustard → rojo.
- Tipografía editorial serif para títulos; mono para métricas fisiológicas.
- Navegación flotante: sidebar píldora en desktop, barra inferior en móvil.
- Componentes serenos: sin sombras duras, sin bordes nítidos, sin densidad visual agresiva.

## Colors

La paleta es navy + mustard sobre vidrio; los colores vivos están reservados para datos (semáforo, signos vitales).

### Primary
- **Mustard** (#E2B84A): el único acento de acción. Botones primarios (con degradado a #c9a035), estado activo de navegación, foco de inputs, switches encendidos, barras de progreso, XP del avatar. También es el escalón medio del semáforo de estrés — el mismo dorado significa "atención" en ambos contextos.
- **Mustard Deep** (#c9a035): extremo oscuro del degradado primario; hover inverso y borde de `glass-mustard`.
- **Mustard Light** (#f0d070): extremo claro del degradado en hover y brillo de barras de progreso.

### Secondary
- **Data Blue** (#60a5fa): datos fisiológicos y elementos informativos (HRV, SpO₂, enlaces, info chips). Nunca compite con mustard en la misma superficie para la acción principal.
- **Accent Purple** (#c084fc): acento terciario para gamificación y estados especiales del avatar/insignias.

### Neutral
- **Navy Observatory** (#0C1F3C): fondo raíz de la app, sobre el que viven los orbs radiales.
- **Deep Blue Glass** (#1F3A5F): tinte de las superficies `glass-card` (a 32% de opacidad con blur 28px).
- **Cream** (#FAF6ED): texto primario en modo oscuro; también fondo del modo claro.
- **Ink** (#111827): texto del modo claro y orbs fríos del fondo animado.
- **Neutral Muted** (#7a8494): datos sin lectura / estados neutros del semáforo.

### Data / Status
- **Stress Ok** (#4ade80): nivel de estrés < 35. Anillos, barras, chips de episodio.
- **Stress Critical** (#f87171): nivel ≥ 65. Mismo token para errores de formulario.
- **Warning**: el propio mustard (#E2B84A) — la advertencia en ATEMPO es dorada, no naranja.

### Named Rules
**La Regla del 10% Dorado.** El mustard se usa en ≤10% de cualquier pantalla: una acción primaria, un estado activo, un foco. Si dos elementos piden mustard, uno es secundario — su rareza es su autoridad.

**La Regla del Semáforo.** El nivel de estrés se comunica siempre por color vía `stressColor(level)` (verde <35, mustard <65, rojo ≥65). Nunca se inventa un cuarto color ni se usa el rojo fuera del contexto estrés/error.

## Typography

**Display Font:** DM Serif Display (Georgia, serif) — peso 400 siempre.
**Body Font:** Outfit (system-ui, sans-serif).
**Metric/Mono Font:** DM Mono (ui-monospace) — exclusiva para números: BPM, SpO₂, XP, umbrales del semáforo.

**Character:** Serif editorial tranquila arriba, sans geométrica limpia abajo, mono técnica para el dato — lectura de instrumento con voz humana.

### Hierarchy
- **Display/Headline** (DM Serif Display, 400): títulos de página, saludos, nombre de módulo. Nunca en negrita ni en all-caps.
- **Title/Subtitle** (Outfit, 500): subtítulos de sección y encabezados de card.
- **Body** (Outfit, 400–500): texto general, microcopy calmado en español.
- **Label** (Outfit, 500, 0.62rem, uppercase, tracking 0.14em): etiquetas de sección (`SectionLabel`), captions de campos, metadatos.
- **Metric** (DM Mono): todo número fisiológico o cuantitativo.

### Named Rules
**La Regla del Número Mono.** Todo valor medible (BPM, %, XP, minutos) va en DM Mono. La serif jamás renderiza dígitos de instrumento; Outfit jamás renderiza una métrica destacada.

## Layout

- **Desktop**: sidebar flotante tipo píldora (264px expandido / 76px colapsado) con `glass-sidebar`, separado del borde de la ventana; topbar glass de 64px; contenido sobre el fondo `bg-animated` con 2–3 orbs difuminados (`blur(90px)`).
- **Móvil**: el sidebar desaparece; navegación por `glass-bottombar` flotante con 4 acciones + "Más" (drawer).
- **Contenido**: tarjetas `glass-card` en grid con ritmo generoso de espaciado; secciones precedidas por `SectionLabel` en tracking amplio.
- **Densidad**: baja a media. El observatorio no apiña datos; las pantallas densas (gestión, reportes) compensan con tipografía pequeña y filas aireadas.

## Elevation & Depth

La profundidad no viene de sombras: viene de **capas de vidrio** — translucidez, blur y bordes de luz (`inset 0 1px 0` highlight). Las sombras que existen son ambientales y suaves (`0 4px 24px rgba(0,0,0,.22)`), nunca estructurales ni duras.

### Shadow Vocabulary
- **glass-strong** (`0 8px 32px rgba(0,0,0,.28)` + inset highlight): modales, cards hero, superficies que flotan sobre otras.
- **glass-card** (`0 4px 24px rgba(0,0,0,.22)`): card estándar.
- **glass-sidebar / bottombar** (`4px 0 40px` / `0 -4px 32px`): cromo de navegación.
- **Glows de estado** (`avatarGlowSx`, `pulse-ring`): el único "shadow" expresivo — marca el estado emocional del avatar y el anillo de estrés en vivo.

### Named Rules
**La Regla del Vidrio en Reposo.** Una superficie en reposo nunca proyecta sombra dura; la elevación se expresa con blur + highlight interior. La sombra ambiental solo aparece donde la capa realmente flota (diálogo, sidebar, bottombar).

## Shapes

- Esquinas grandes y continuas: cards 20px, diálogos 24px, inputs/botones 12px, chips 10px, barras de progreso y toggles pill (999px).
- Los instrumentos (StressRing, Gauge, avatar climático) son **circulares** — el círculo es la geometría del dato fisiológico.
- Bordes siempre de 1px con luz (`rgba(255,255,255,.08–.16)`), nunca líneas oscuras de contorno.
- Forma recurrente: la **píldora flotante** (sidebar, bottom-nav, chips de mood/trigger).

## Components

### Buttons
- **Shape:** 12px, padding-inline 18px (`sizeLarge`: padding-block 12px).
- **Primary:** degradado mustard 135° → mustard-deep, texto navy, `fontWeight 600`, sin elevación (`disableElevation`); hover invierte a mustard-light → mustard.
- **Ghost/secondary:** texto cream sobre vidrio sutil; nunca un segundo degradado.

### Cards / Containers
- `glass-card` por defecto (el override de `MuiPaper`/`MuiCard` ya es glass): deep-blue al 32% + blur(28px) + borde de luz + radio 20px.
- Variantes: `glass-strong` (hero/modal), `glass-mustard` (acento informativo), `glass` (chips/zonas ligeras).

### Inputs
- Glass: fondo blanco al 5%, blur(12px), radio 12px, outline tenue; label en uppercase 0.8rem tracking 0.1em.
- Foco: borde mustard al 45% + halo `0 0 0 3px rgba(226,184,74,.1)`. Nunca borde azul MUI por defecto.

### Chips
- Radio 10px, peso 500. Variantes de selección (mood, triggers) en vidrio; el activo toma `navActiveSx` o tinte del color de estado.

### Navigation
- **Sidebar item activo:** degradado mustard tenue + borde mustard 28% (`navActiveSx`); secciones separadas por labels uppercase.
- **Bottom-nav móvil:** píldora `glass-bottombar`, icono+label, activo en mustard.

### Data Displays
- **StressRing / Gauge:** circulares, color del semáforo, número en DM Mono; ring con `pulse-ring` cuando el dato es vivo.
- **Barras de progreso:** pista `rgba(255,255,255,.07)`, barra pill con degradado mustard triple.
- **Tablas (`DataTable`):** filas aireadas sobre vidrio, headers en label uppercase.

### Dialogs / Menus
- Navy translúcido con blur alto (36px/28px); diálogos 24px, menús 16px; nunca fondo blanco opaco en dark.

### Toggles & Feedback
- Switch checked en mustard; sliders en mustard; scrollbar con tinte dorado tenue.

## Do's and Don'ts

**Do**
- Dark-first: diseña sobre navy; valida el modo claro como variante, no como base.
- Usa los helpers de `theme/brand.ts` (`glassSx`, `glassCardSx`, `glassMustardSx`, `navActiveSx`, `bgAnimatedSx`, `orbSx`, `progressBarSx`, `avatarGlowSx`) en vez de reescribir vidrio a mano.
- Métricas en DM Mono; títulos en DM Serif Display; etiquetas de sección en `SectionLabel`.
- Semáforo siempre por `stressColor()`; el mustard se gana, no se reparte.
- Motion lento y calmado (`breathe`, `float`, `riseIn` 0.5s) — la app regula, no sobresalta.

**Don't**
- Nada de superficies blancas opacas ni grises planos en modo oscuro: si no es vidrio, no es ATEMPO.
- No introducir un segundo color de acción (naranja/amarillo puro, verde como CTA): mustard es la única voz.
- No usar sombras `MUI elevation` duras ni `backgroundImage` de Paper — el glass ya las reemplaza.
- No renderizar datos fisiológicos con Outfit ni títulos con DM Mono.
- No duplicar vistas por rol con estilos distintos: el mundo visual es uno; el rol solo cambia contenido y acciones.
