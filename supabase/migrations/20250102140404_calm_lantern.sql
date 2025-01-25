/*
  # Guest Orders Implementation

  1. New Tables
    - `guest_orders`
      - `id` (uuid, primary key)
      - `order_id` (text, unique)
      - `tracking_token` (text, unique)
      - `email` (text)
      - `name` (text)
      - `phone` (text, optional)
      - `status` (order_status)
      - `total` (numeric)
      - `shipping_address` (jsonb)
      - `payment_method` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policy for public read access using tracking token
*/

CREATE TABLE IF NOT EXISTS guest_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id text UNIQUE NOT NULL,
  tracking_token text UNIQUE NOT NULL,
  email text NOT NULL,
  name text NOT NULL,
  phone text,
  status order_status NOT NULL DEFAULT 'pending',
  total numeric NOT NULL,
  shipping_address jsonb NOT NULL,
  payment_method jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE guest_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read guest orders with tracking token"
  ON guest_orders
  FOR SELECT
  USING (true);

-- Trigger for updating updated_at
CREATE TRIGGER guest_orders_updated_at
  BEFORE UPDATE ON guest_orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
