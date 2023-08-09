import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseServiceKey = process.env.REACT_APP_SUPABASE_SERVICE_KEY
const supabaseService = createClient(supabaseUrl, supabaseServiceKey)

export default supabaseService;