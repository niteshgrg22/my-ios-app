
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sgpubmimoymfvjpibdfc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNncHVibWltb3ltZnZqcGliZGZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxNDgwNTMsImV4cCI6MjA2MzcyNDA1M30.yTUfnzgts7hdtRAjkTIUM96cG14ns5JFeYdxkhRf784';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
