-- ===============================
-- USUARIOS (perfiles internos)
-- ===============================
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  code text unique,                       -- Ej: "U-001"
  full_name text not null,
  email text not null unique,
  role text not null check (role in ('asesor', 'administrador')),
  created_at timestamptz not null default now()
);

comment on table public.profiles is 'Perfiles internos (asesores / administradores) ligados a auth.users';
comment on column public.profiles.code is 'ID legible para el UI, ej: U-001';


-- ===============================
-- CONTACTOS (prospectos y clientes)
-- ===============================
create table public.contacts (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('lead', 'client')),
  full_name text not null,
  phone text not null,
  email text,
  source text,               -- Facebook, TikTok, en persona, etc.
  age int,
  address text,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

comment on table public.contacts is 'Prospectos y clientes. type = lead/client';
comment on column public.contacts.source is 'Fuente: Facebook, TikTok, en persona, etc.';


-- ===============================
-- SEGUIMIENTOS DE CONTACTOS
-- (para "Último seguimiento" en Leads/Clients)
-- ===============================
create table public.contact_followups (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid not null references public.contacts (id) on delete cascade,
  channel text not null,         -- Llamada, WhatsApp, Email, etc.
  note text not null,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create index idx_contact_followups_contact_created_at
  on public.contact_followups (contact_id, created_at desc);


-- ===============================
-- VEHÍCULOS
-- ===============================
create table public.vehicles (
  id uuid primary key default gen_random_uuid(),

  -- Identificador externo (Copart)
  lot_id text not null unique,      -- Ej: "LOT-10234" o el lot real
  status text not null default 'En subasta'
    check (status in ('En subasta', 'Subasta perdida', 'En logística', 'Vendido')),

  -- Datos básicos del workflow (VehicleData)
  company_name text not null,           -- Copart, IAAI, etc.
  company_description text,
  year int,
  make text,
  model text,
  trim text,
  condition text,
  auction_date date,
  location text,
  title_type text,
  timezone text,
  language text,
  source_url text,

  -- Detalles Copart opcionales como JSON (CopartVehicleDetails)
  copart_details jsonb,

  -- Relaciones
  advisor_id uuid references public.profiles (id) on delete set null,
  client_id uuid references public.contacts (id) on delete set null,

  created_at timestamptz not null default now()
);

comment on table public.vehicles is 'Vehículos importados/cotizados';
comment on column public.vehicles.lot_id is 'ID de lote externo (Copart, etc.)';


-- ===============================
-- COTIZACIONES
-- ===============================
create table public.quotes (
  id uuid primary key default gen_random_uuid(),
  code text unique,                             -- Ej: "Q-001" para mostrar en UI

  vehicle_id uuid not null references public.vehicles (id) on delete cascade,
  client_id uuid references public.contacts (id) on delete set null,

  created_at timestamptz not null default now(),
  created_by uuid references public.profiles (id) on delete set null,

  -- Datos de costos (QuoteData)
  remate numeric(12,2) not null default 0,
  grua numeric(12,2) not null default 0,
  transporte numeric(12,2) not null default 0,
  fob numeric(12,2) not null default 0,
  fees numeric(12,2) not null default 0,
  transfer_usa numeric(12,2) not null default 0,
  comision numeric(12,2) not null default 0,
  documentacion numeric(12,2) not null default 0,
  poliza numeric(12,2) not null default 0,

  total_usd numeric(12,2) not null default 0,
  tasa_paralelo numeric(10,4),
  tasa_oficial numeric(10,4),
  total_paralelo numeric(14,2),
  total_oficial numeric(14,2)
);

create index idx_quotes_vehicle_id on public.quotes (vehicle_id);
create index idx_quotes_client_id on public.quotes (client_id);
create index idx_quotes_created_at on public.quotes (created_at desc);


-- ===============================
-- VISTAS DE APOYO (opcionales)
-- ===============================

-- Vista para "Última actividad" en el panel:
-- toma últimas acciones de creación de prospectos y cotizaciones.
create or replace view public.dashboard_recent_activity as
select
  c.created_at,
  'Prospecto'::text as activity_type,
  c.full_name as title,
  'Nuevo prospecto creado'::text as description,
  c.created_by
from public.contacts c
where c.type = 'lead'
union all
select
  q.created_at,
  'Cotización'::text as activity_type,
  v.lot_id as title,
  'Cotización ' || coalesce(q.code, q.id::text) || ' creada' as description,
  q.created_by
from public.quotes q
join public.vehicles v on v.id = q.vehicle_id
order by 1 desc
limit 50;