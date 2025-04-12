
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://yjszklbpkqtyyrjjhnev.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlqc3prbGJwa3F0eXlyampobmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0OTEyMTgsImV4cCI6MjA2MDA2NzIxOH0.hvlHPCwjU80PTi97-ac21jGmvU0637d_TKFYAdNW5Wg";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

console.log("Supabase client initialized with URL:", SUPABASE_URL);
