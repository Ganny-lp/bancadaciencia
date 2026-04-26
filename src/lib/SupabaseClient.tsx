import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eitkqkewmuhoxwhskwia.storage.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpdGtxa2V3bXVob3h3aHNrd2lhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMDQyODIsImV4cCI6MjA5MTc4MDI4Mn0._IQeZd-cG1_yLL4knObm61LhhxniyVvylhQNJmgbi84'
export const supabase = createClient(supabaseUrl, supabaseKey)