-- Create discount_products table
    CREATE TABLE IF NOT EXISTS discount_products (
      discount_id UUID REFERENCES discounts ON DELETE CASCADE NOT NULL,
      product_id UUID REFERENCES products ON DELETE CASCADE NOT NULL,
      PRIMARY KEY (discount_id, product_id)
    );

    -- Enable RLS
    ALTER TABLE discount_products ENABLE ROW LEVEL SECURITY;

    -- Create policies
    CREATE POLICY "Admins can manage discount_products"
      ON discount_products
      FOR ALL
      TO admin
      USING (true)
      WITH CHECK (true);

    -- Create discount_categories table
    CREATE TABLE IF NOT EXISTS discount_categories (
      discount_id UUID REFERENCES discounts ON DELETE CASCADE NOT NULL,
      category TEXT NOT NULL,
      PRIMARY KEY (discount_id, category)
    );

    -- Enable RLS
    ALTER TABLE discount_categories ENABLE ROW LEVEL SECURITY;

    -- Create policies
    CREATE POLICY "Admins can manage discount_categories"
      ON discount_categories
      FOR ALL
      TO admin
      USING (true)
      WITH CHECK (true);

    -- Create discount_users table
    CREATE TABLE IF NOT EXISTS discount_users (
      discount_id UUID REFERENCES discounts ON DELETE CASCADE NOT NULL,
      user_id UUID REFERENCES auth.users ON DELETE CASCADE,
      email TEXT,
      PRIMARY KEY (discount_id, user_id, email)
    );

    -- Enable RLS
    ALTER TABLE discount_users ENABLE ROW LEVEL SECURITY;

    -- Create policies
    CREATE POLICY "Admins can manage discount_users"
      ON discount_users
      FOR ALL
      TO admin
      USING (true)
      WITH CHECK (true);

    -- Create order_discounts table
    CREATE TABLE IF NOT EXISTS order_discounts (
      order_id UUID REFERENCES orders ON DELETE CASCADE NOT NULL,
      discount_id UUID REFERENCES discounts ON DELETE CASCADE NOT NULL,
      discount_amount NUMERIC NOT NULL,
      PRIMARY KEY (order_id, discount_id)
    );

    -- Enable RLS
    ALTER TABLE order_discounts ENABLE ROW LEVEL SECURITY;

    -- Create policies
    CREATE POLICY "Users can view own order_discounts"
      ON order_discounts
      FOR SELECT
      TO authenticated
      USING (auth.uid() = (SELECT user_id FROM orders WHERE orders.id = order_discounts.order_id));

    CREATE POLICY "Admins can manage order_discounts"
      ON order_discounts
      FOR ALL
      TO admin
      USING (true)
      WITH CHECK (true);
