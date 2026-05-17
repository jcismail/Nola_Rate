import { createClient } from "@supabase/supabase-js";

function getSupabaseServerConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const enabled = process.env.SUPABASE_LEADS_ENABLED === "true";
  return { url, serviceRoleKey, enabled };
}

export function getSupabaseAdminClient() {
  const { url, serviceRoleKey } = getSupabaseServerConfig();
  if (!url || !serviceRoleKey) return null;

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function isSupabaseLeadsEnabled() {
  const { enabled, url, serviceRoleKey } = getSupabaseServerConfig();
  return enabled && Boolean(url) && Boolean(serviceRoleKey);
}
