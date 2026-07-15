/*
# Create demo_requests and testimonials tables for SIGIF landing page

1. New Tables
- `demo_requests`
  - id (uuid, primary key)
  - name (text, not null) — person requesting the demo
  - email (text, not null) — contact email
  - company (text, nullable) — company name
  - message (text, nullable) — optional message
  - created_at (timestamptz, default now())
- `testimonials`
  - id (uuid, primary key)
  - name (text, not null) — person giving the testimonial
  - role (text, not null) — job role/title
  - company (text, not null) — company name
  - content (text, not null) — testimonial text
  - rating (int, default 5, 1-5)
  - display_order (int, default 0) — for sorting
  - created_at (timestamptz, default now())

2. Security
- Enable RLS on both tables.
- demo_requests: allow anon INSERT (public form submission), no SELECT/UPDATE/DELETE for anon (private data).
- testimonials: allow anon SELECT (public display), no INSERT/UPDATE/DELETE for anon (managed internally).

3. Important Notes
- This is a single-tenant landing page with no sign-in screen.
- demo_requests is write-only for anon (form submissions), read is restricted to authenticated (admin only).
- testimonials is read-only for anon (public display on the landing page).
*/

-- demo_requests table
CREATE TABLE IF NOT EXISTS demo_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_demo_requests" ON demo_requests;
CREATE POLICY "anon_insert_demo_requests"
ON demo_requests FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_select_demo_requests" ON demo_requests;
CREATE POLICY "auth_select_demo_requests"
ON demo_requests FOR SELECT
TO authenticated USING (true);

-- testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  company text NOT NULL,
  content text NOT NULL,
  rating int NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  display_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_testimonials" ON testimonials;
CREATE POLICY "anon_select_testimonials"
ON testimonials FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_testimonials" ON testimonials;
CREATE POLICY "auth_insert_testimonials"
ON testimonials FOR INSERT
TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_testimonials" ON testimonials;
CREATE POLICY "auth_update_testimonials"
ON testimonials FOR UPDATE
TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_testimonials" ON testimonials;
CREATE POLICY "auth_delete_testimonials"
ON testimonials FOR DELETE
TO authenticated USING (true);

-- Seed initial testimonials
INSERT INTO testimonials (name, role, company, content, rating, display_order) VALUES
('Carlos Mendoza', 'Jefe de Taller', 'MotoRepuestos del Valle', 'Desde que implementamos SIGIF, el control del inventario se volvió mucho más preciso. Ya no perdemos piezas ni tenemos ventas sin registrar. El módulo de auditoría nos da tranquilidad total.', 5, 1),
('Laura Gutiérrez', 'Administradora', 'Repuestos La 80', 'La facturación integrada al inventario nos ahorra horas de trabajo manual. Cada venta descuenta el stock automáticamente. Es exactamente lo que necesitábamos para el negocio.', 5, 2),
('Andrés Ramírez', 'Gerente', 'MotoCentro Premium', 'Los roles de usuario nos permiten controlar quién puede ver y modificar qué. El sistema es seguro, fácil de usar y el equipo lo adoptó sin problemas. La mejor decisión para la empresa.', 5, 3),
('María Fernanda López', 'Vendedora', 'Importadora Motocross', 'El carrito de compras integrado hace que las ventas sean rápidas. Puedo atender a un cliente en menos de la mitad del tiempo que antes. El historial de movimientos es muy útil.', 5, 4),
('Diego Torres', 'Propietario', 'MotoHouse', 'SIGIF centralizó toda la información del negocio. Antes teníamos todo en hojas de cálculo, ahora todo está en un solo sistema. La toma de decisiones es mucho más ágil.', 5, 5)
ON CONFLICT DO NOTHING;
