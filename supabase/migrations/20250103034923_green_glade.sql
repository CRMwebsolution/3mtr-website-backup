-- Drop existing views and tables to start fresh
DROP VIEW IF EXISTS public_availability;
DROP TABLE IF EXISTS availability CASCADE;
DROP TABLE IF EXISTS trailers CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;

-- Create trailers table
CREATE TABLE trailers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('enclosed', 'flatbed', 'equipment')),
  size text,
  description text,
  is_active boolean DEFAULT true NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create admin_users table
CREATE TABLE admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  role text NOT NULL CHECK (role = 'admin'),
  created_at timestamptz DEFAULT now()
);

-- Create availability table
CREATE TABLE availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trailer_id uuid REFERENCES trailers(id) ON DELETE CASCADE,
  date date NOT NULL,
  status text NOT NULL CHECK (status IN ('available', 'unavailable')),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT unique_trailer_date UNIQUE (trailer_id, date)
);

-- Enable RLS
ALTER TABLE trailers ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;

-- Create policies for trailers
CREATE POLICY "Public can view active trailers"
  ON trailers FOR SELECT
  TO PUBLIC
  USING (is_active = true);

CREATE POLICY "Admins can manage trailers"
  ON trailers FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- Create policies for admin_users
CREATE POLICY "Public can read admin emails"
  ON admin_users FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Users can insert their own admin record"
  ON admin_users FOR INSERT
  WITH CHECK (
    auth.uid() = id AND
    role = 'admin'
  );

-- Create policies for availability
CREATE POLICY "Public can view availability"
  ON availability FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Admins can manage availability"
  ON availability FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_trailers_is_active ON trailers(is_active);
CREATE INDEX idx_trailers_type ON trailers(type);
CREATE INDEX idx_availability_trailer_date ON availability(trailer_id, date);
CREATE INDEX idx_availability_date ON availability(date);
CREATE INDEX idx_admin_users_email ON admin_users(email);

-- Grant necessary permissions
GRANT ALL ON trailers TO authenticated;
GRANT ALL ON admin_users TO authenticated;
GRANT ALL ON availability TO authenticated;
GRANT SELECT ON trailers TO anon;
GRANT SELECT ON admin_users TO anon;
GRANT SELECT ON availability TO anon;

-- Insert initial admin user if not exists
INSERT INTO admin_users (id, email, role)
SELECT id, email, 'admin'
FROM auth.users 
WHERE email = 'cody@3mtrailerrental.com'
ON CONFLICT (email) DO NOTHING;