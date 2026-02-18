
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wrbuwsrrvetmncqbouye.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndyYnV3c3JydmV0bW5jcWJvdXllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzMTUyMTIsImV4cCI6MjA4Njg5MTIxMn0.zImGb5LpmLViIdrwEPWuDIlqTqDILwxVDty-76ZeCLQ';

export const supabase = createClient(supabaseUrl, supabaseKey);
