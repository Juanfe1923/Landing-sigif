# SIGIF Landing - Refactoring Plan

## Steps

### Step 1: Workflow → Carousel with Animated Line
- [x] Add new keyframes for carousel slide transitions in tailwind.config.js
- [x] Rewrite Workflow.tsx as a carousel:
  - Auto-play 4s interval (pause on hover)
  - Sliding transitions for detail panel (direction-aware)
  - Left/right navigation arrows on the panel
  - Pagination dots below panel
  - Smooth progress line with cubic-bezier easing
  - Vertical mobile layout remains, enhanced with animations

### Step 2: Move CTA to Bottom & Make Smaller + More Animations
- [x] Move CTA component after Footer in App.tsx
- [x] Rewrite CTA.tsx: compact layout, more compact form, enhanced animations
  - Staggered field entrance animations
  - Animated gradient border/glow on container
  - Focus micro-interactions (scale, border glow)
  - Enhanced success animation (confetti-drop)

### Step 3: Additional Polish & Hero Animations (User feedback)
- [x] Removed scan-line animation from hero dashboard (looked like loading bar)
- [x] Removed animate-pulse-glow from dashboard glow (looked like pulsing loading)
- [x] Removed "Actualizando..." label with pulsing dot from bar chart area
- [x] Removed animate-pulse from sidebar "Inventario" dot
- [x] Added hover:scale-[1.01] and hover:-translate-y-1 to dashboard mockup
- [x] Added hover transition effects to all data cards (hover:-translate-y-0.5)
- [x] Added micro-interactions to feature badges (rotate, scale icons on hover)
- [x] Added animated gradient border accent on dashboard hover
- [x] Added hover:shadow-xl hover:shadow-amber-500/10 to CTA container
- [x] Added active:scale-[0.98] press effect on CTA submit button
- [x] AnimatedBars now starts immediately without observer delay
- [x] Removed animate-pulse-glow from CTA (was causing pulsing loading effect)
- [x] Build: 0 errors

### Step 4: Review and Test
- [x] Verify all animations work correctly
- [x] Check responsiveness
- [x] npm run build - 0 errors

