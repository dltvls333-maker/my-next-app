import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://wgpylcuigawjllhsbnqi.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndncHlsY3VpZ2F3amxsaHNibnFpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjYwMjE1NywiZXhwIjoyMTAyMTc4MTU3fQ.LxykZFQjT4mvo5P_5PJ4S6t36skgCSntaPCj1BkOSRc";
export const supabase = createClient(supabaseUrl, supabaseKey);