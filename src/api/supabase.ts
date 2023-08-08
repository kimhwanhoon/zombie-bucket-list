import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_BASE_KEY;
const supabase = createClient(supabaseUrl as string, supabaseKey as string);

export default supabase;
