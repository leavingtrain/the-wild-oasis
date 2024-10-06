import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://uvybpixxbdsezknmuctd.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2eWJwaXh4YmRzZXprbm11Y3RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc2OTE1OTQsImV4cCI6MjA0MzI2NzU5NH0.VFS9T30e0yGmyKvBSmxPaHCORsEixceQ0sWkkXieHs0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
