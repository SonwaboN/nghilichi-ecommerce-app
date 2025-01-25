/*
  # Admin Dashboard Schema

  1. New Tables
    - products
      - Product catalog with inventory tracking
    - inventory_updates
      - Track inventory changes and history
    - deliveries
      - Delivery tracking and management
    - delivery_updates
      - Delivery status updates and history
    - couriers
      - Courier information and management

  2. Security
    - Enable RLS on all tables
    - Add policies for admin access
*/

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  stock_level integer NOT NULL DEFAULT 0,
  category text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Inventory Updates Table
CREATE TABLE IF NOT EXISTS inventory_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products NOT NULL,
  quantity integer NOT NULL,
  type text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users NOT NULL
);

-- Couriers Table
CREATE TABLE IF NOT EXISTS couriers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  contact_number text NOT NULL,
  email text,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Deliveries Table
CREATE TABLE IF NOT EXISTS deliveries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders NOT NULL,
  courier_id uuid REFERENCES couriers,
  status text NOT NULL DEFAULT 'pending',
  tracking_number text,
  estimated_delivery timestamptz,
  actual_delivery timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Delivery Updates Table
CREATE TABLE IF NOT EXISTS delivery_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  delivery_id uuid REFERENCES deliveries NOT NULL,
  status text NOT NULL,
  location text,
  notes text,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users NOT NULL
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE couriers ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_updates ENABLE ROW LEVEL SECURITY;

-- Create admin role if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'admin') THEN
    CREATE ROLE admin;
  END IF;
END
$$;

-- Admin Policies
CREATE POLICY "Admins have full access to products"
  ON products
  FOR ALL
  TO admin
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins have full access to inventory updates"
  ON inventory_updates
  FOR ALL
  TO admin
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins have full access to couriers"
  ON couriers
  FOR ALL
  TO admin
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins have full access to deliveries"
  ON deliveries
  FOR ALL
  TO admin
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins have full access to delivery updates"
  ON delivery_updates
  FOR ALL
  TO admin
  USING (true)
  WITH CHECK (true);

-- Create function for analytics
CREATE OR REPLACE FUNCTION get_order_analytics()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN json_build_object(
    'total_orders', (SELECT count(*) FROM orders),
    'total_revenue', (SELECT coalesce(sum(total), 0) FROM orders),
    'average_order_value', (SELECT coalesce(avg(total), 0) FROM orders),
    'top_products', (
      SELECT json_agg(row_to_json(p))
      FROM (
        SELECT product_id, count(*) as total_sales
        FROM order_items
        GROUP BY product_id
        ORDER BY total_sales DESC
        LIMIT 5
      ) p
    )
  );
END;
$$;

-- Add updated_at triggers
CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER couriers_updated_at
  BEFORE UPDATE ON couriers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER deliveries_updated_at
  BEFORE UPDATE ON deliveries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
