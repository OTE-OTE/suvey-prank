import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fdinllidvayzsbgomqbsg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkaW5saWR2YXl6c2Jnb21xYnNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExODMzODYsImV4cCI6MjA5Njc1OTM4Nn0.Lci75v__V33GjSaYq_3hj1pmOk1xtHHrbpr9F4DyJPI'

export const supabase = createClient(supabaseUrl, supabaseKey)
