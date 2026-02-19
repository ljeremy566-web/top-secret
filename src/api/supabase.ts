import { createClient } from "@supabase/supabase-js";
import { getRequiredEnv } from '../lib/env';

const supabaseUrl = getRequiredEnv('VITE_SUPABASE_URL');
const supabaseKey = getRequiredEnv('VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY');

export const supabase = createClient(supabaseUrl, supabaseKey);
