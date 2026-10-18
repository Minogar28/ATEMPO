# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Confirmado: `frontend/` es React 19 + TypeScript + Vite + Material UI 9 (tema propio) + React Router 7 + Recharts.
Por decidir: stack de `backend/` (la estimación de proyecto menciona Node/Express + JWT + bcrypt) y la app móvil del paciente (superficie futura, plataforma por decidir).

## Users

Cuatro roles sobre los mismos módulos de dominio:

- **Paciente** (usuario principal): registra episodios de estrés, ve sus signos vitales desde la CAREband, hace pausas de autorregulación guiadas, agenda citas y ve su avatar/estado.
- **Psicólogo**: gestiona su agenda, da seguimiento a pacientes asignados (evolución, notas clínicas) y genera reportes de sus pacientes.
- **Administrador de empresa**: gestiona usuarios de su organización, ve información de psicólogos, agendas y evolución de pacientes, y genera reportes.
- **Superadministrador**: revisa todos los módulos (auditoría y administración global).

## Product Purpose

ATEMPO es una plataforma de bienestar psicofisiológico: monitorea el estado fisiológico y emocional del paciente (wearable CAREband + autoreporte), lo conecta con seguimiento clínico real por un psicólogo, y entrega a la empresa métricas agregadas de bienestar. El éxito es que el paciente regule mejor su estrés día a día y que psicólogo y empresa puedan actuar con evidencia.

## Positioning

El puente entre dato fisiológico continuo (CAREband: HR, SpO₂, temperatura, GSR, HRV) y el flujo clínico y organizacional. No es una app de mindfulness suelta ni un dashboard de RRHH: el signo vital del paciente alimenta la atención del psicólogo y la métrica agregada de la empresa, con anonimización por diseño.

## Operating Context

- Uso diario del paciente; consulta periódica del psicólogo y del admin de empresa.
- Idioma: español (Colombia). Login por usuario/contraseña o por **cédula**.
- Reportes exportables en PDF y Excel.
- La CAREband transmite por BLE; hoy los datos de módulos son mock hasta que exista el backend.

## Capabilities and Constraints

- Datos de salud: consentimientos revocables, anonimización obligatoria en reportes de empresa, acceso clínico individual solo para el psicólogo asignado. Marco: Ley 1581 (habeas data, Colombia).
- Un solo módulo por dominio con vistas por rol (`views/` dentro del feature); roles filtran visibilidad y acciones, no duplican carpetas. Rutas, menú y permisos se derivan de `frontend/src/routes/modules.tsx`.
- Backend, app móvil y integración BLE reales están por implementar (decisiones abiertas).

## Brand Commitments

- Identidad "liquid glass" ya implementada: navy `#0C1F3C` + deep-blue `#1F3A5F` + mustard `#E2B84A` + cream `#FAF6ED`; tipografías DM Serif Display / Outfit / DM Mono.
- Sistema semafórico de estrés: verde `#4ade80` (<35), mustard `#E2B84A` (<65), rojo `#f87171` (≥65).
- Metáfora climática del avatar (tormenta → nublado → despejado) y microcopy calmado en español.

## Evidence on Hand

- `psicologia/` — prototipo de referencia (Figma Make + Tailwind): autoridad visual y de producto de la que se extrajeron estilos y módulos.
- `psicologia/src/imports/pasted_text/atempo-project-estimate.md` — estimación de alcance (backend JWT, app paciente, paneles web, QA).
- `frontend/` — scaffold funcional con 11 módulos implementados con datos mock.

## Product Principles

1. **El paciente primero** — la experiencia diaria de bienestar optimiza antes que cualquier panel.
2. **Privacidad by design** — lo clínico no se agrega ni se expone sin consentimiento y anonimización.
3. **Calma operativa** — el diseño reduce carga: fondo oscuro, vidrio, semáforo legible, animación suave.
4. **Un módulo, varias vistas** — el rol cambia la vista y las acciones, nunca duplica el feature.
5. **La biometría complementa** — los signos vitales enriquecen el autoreporte y el juicio clínico, no los reemplazan.

## Accessibility & Inclusion

- WCAG AA como estándar explícito (contraste, teclado, lectores de pantalla).
- Privacidad de datos de salud con consentimientos revocables y anonimización (Ley 1581, Colombia).
