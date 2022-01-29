import {createClient} from '@supabase/supabase-js'

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMwNjM3MCwiZXhwIjoxOTU4ODgyMzcwfQ.ukSGtYi6Gf0XbOAzhKG-GqcHl0kpxBmJcYuOsvBOLXU'

const SUPABASE_URL = 'https://kaigkexboiomrzjaelhi.supabase.co'

const supabaseClient = createClient(SUPABASE_URL,SUPABASE_ANON_KEY)

export default supabaseClient;