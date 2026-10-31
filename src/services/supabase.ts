import { createClient } from '@supabase/supabase-js';

// Retrieve environment variables from Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

/**
 * Helper flag indicating whether valid Supabase credentials have been supplied in .env
 */
export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL &&
  import.meta.env.VITE_SUPABASE_ANON_KEY &&
  !import.meta.env.VITE_SUPABASE_URL.includes('your-project-id')
);

if (!isSupabaseConfigured) {
  console.warn(
    '[VibeRoom] Supabase credentials not found or using placeholders. App running in offline/demo mode. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file to enable live database and realtime sync.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

