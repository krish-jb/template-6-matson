import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://your-project-url.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'your-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Simple types for our needs
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]