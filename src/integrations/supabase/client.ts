import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPERBASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPERBASE_PUBLIC_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

