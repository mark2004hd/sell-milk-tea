import { AppState } from 'react-native'
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

// Define or import SUPABASE_URL and SUPABASE_ANON_KEY
const SUPABASE_URL = "https://jxccjgieelqcbxjyvuos.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4Y2NqZ2llZWxxY2J4anl2dW9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2NjM5ODQsImV4cCI6MjA1OTIzOTk4NH0.BXSpTR2g-D2Rb2mgeLRDICa-nT89Y0mcE5AQnJYUGKU"


const supabaseUrl = SUPABASE_URL
const supabaseAnonKey = SUPABASE_ANON_KEY


export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})