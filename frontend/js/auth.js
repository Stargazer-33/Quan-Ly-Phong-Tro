window.requireCurrentProfile = async function (allowedRoles = []) {
  const { data: { user }, error } = await window.supabaseClient.auth.getUser();
  if (error || !user) {
    window.location.replace("index.html");
    return null;
  }

  const { data: profile, error: profileError } = await window.supabaseClient
    .from("profiles")
    .select("id, full_name, role")
    .eq("id", user.id)
    .single();
  if (profileError || !profile || (allowedRoles.length && !allowedRoles.includes(profile.role))) {
    await window.supabaseClient.auth.signOut();
    window.location.replace("index.html");
    return null;
  }
  return { user, profile };
};

window.signOutAndReturnHome = async function () {
  await window.supabaseClient.auth.signOut();
  window.location.replace("index.html");
};
