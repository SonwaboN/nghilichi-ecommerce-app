-- Create discounts table
    CREATE TABLE IF NOT EXISTS discounts (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      description TEXT,
      type TEXT NOT NULL CHECK (type IN ('percentage', 'fixed_amount')),
      value NUMERIC NOT NULL,
      start_date TIMESTAMPTZ,
      end_date TIMESTAMPTZ,
      code TEXT UNIQUE,
      usage_limit INTEGER,
      usage_count INTEGER DEFAULT 0,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    );

    -- Enable RLS
    ALTER TABLE discounts ENABLE ROW LEVEL SECURITY;

    -- Create policies
    CREATE POLICY "Admins can manage discounts"
      ON discounts
      FOR ALL
      TO admin
      USING (true)
      WITH CHECK (true);

    -- Create updated_at trigger
    CREATE OR REPLACE FUNCTION update_updated_at()
    RETURNS trigger AS $$
    BEGIN
      NEW.updated_at = now();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER discounts_updated_at
      BEFORE UPDATE ON discounts
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at();
