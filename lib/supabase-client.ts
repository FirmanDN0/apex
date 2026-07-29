import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hezemcosocnqhrsolhxk.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'sb_publishable_lFuzT1InT_Qj0tCEXtYZiA_K_l2rmGE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
