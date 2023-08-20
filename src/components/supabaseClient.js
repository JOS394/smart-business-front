import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ulazpntcysmvopcopqup.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsYXpwbnRjeXNtdm9wY29wcXVwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MTA4OTQ0NiwiZXhwIjoyMDA2NjY1NDQ2fQ.Y2Iq4TscDgwEkzYCMJlt977jQU9DxgZiDXOibrqdUPk'
);

export default supabase;