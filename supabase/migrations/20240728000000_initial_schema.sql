-- 1. Create Categories Table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Profiles Table (Linked to Auth)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  college_email TEXT UNIQUE,
  whatsapp_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Items Table
CREATE TABLE items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  images TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'sold', 'pending')),
  condition TEXT CHECK (condition IN ('New', 'Like New', 'Good', 'Fair')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- 5. Set up RLS Policies

-- Categories: Anyone can read
CREATE POLICY "Categories are viewable by everyone" 
ON categories FOR SELECT USING (true);

-- Profiles: Anyone can read, but only the owner can update
CREATE POLICY "Public profiles are viewable by everyone" 
ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" 
ON profiles FOR UPDATE USING (auth.uid() = id);

-- Items: Anyone can read available items
CREATE POLICY "Available items are viewable by everyone" 
ON items FOR SELECT USING (status = 'available');

-- Items: Only logged-in users can create
CREATE POLICY "Users can create items" 
ON items FOR INSERT WITH CHECK (auth.uid() = seller_id);

-- Items: Only the seller can update or delete their items
CREATE POLICY "Users can update own items" 
ON items FOR UPDATE USING (auth.uid() = seller_id);

CREATE POLICY "Users can delete own items" 
ON items FOR DELETE USING (auth.uid() = seller_id);

-- 6. Insert Initial Categories
INSERT INTO categories (name, slug, icon) VALUES
('Books', 'books', 'book-open'),
('Electronics', 'electronics', 'laptop'),
('Furniture', 'furniture', 'sofa'),
('Dorm Essentials', 'dorm-essentials', 'home'),
('Clothing', 'clothing', 'shirt');
