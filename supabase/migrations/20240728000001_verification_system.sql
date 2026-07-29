-- Update Profiles Table with new fields
ALTER TABLE profiles 
ADD COLUMN roll_no TEXT UNIQUE,
ADD COLUMN department TEXT,
ADD COLUMN verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
ADD COLUMN is_admin BOOLEAN DEFAULT false;

-- Add a comment for clarity
COMMENT ON COLUMN profiles.verification_status IS 'Pending = Student signed up but not yet verified by admin';

-- Update RLS policies to reflect verification status
-- Only verified students can list items
DROP POLICY IF EXISTS "Users can create items" ON items;
CREATE POLICY "Only verified users can create items" 
ON items FOR INSERT WITH CHECK (
  auth.uid() = seller_id AND 
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND verification_status = 'verified'
  )
);
