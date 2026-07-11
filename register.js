const SUPABASE_URL = "https://fsasedzkypyucdrnvyvw.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzYXNlZHpreXB5dWNkcm52eXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1OTA5ODcsImV4cCI6MjA5OTE2Njk4N30.mDGLBxu4wFoQytx7aMb95NlHyfUbFNRyE_C8EsmkBV0";

const { createClient } = supabase;
const client = createClient(SUPABASE_URL, SUPABASE_KEY);

async function register() {

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const country = document.getElementById("country").value;
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;
  const status = document.getElementById("status");

  if (!username || !email || !password || !confirm) {
    status.innerHTML = "❌ Please fill all fields.";
    return;
  }

  if (password !== confirm) {
    status.innerHTML = "❌ Passwords do not match.";
    return;
  }

  // Create Auth account
  const { data, error } = await client.auth.signUp({
    email,
    password
  });

  if (error) {
    alert("Signup Error:\n" + error.message);
    return;
  }

  if (!data.user) {
    alert("No user returned from Supabase.");
    return;
  }

  // Save profile
  const { error: insertError } = await client
    .from("users")
    .insert({
      auth_user_id: data.user.id,
      username: username,
      country: country,
      avatar: "default.png",
      role: "user"
    });

  if (insertError) {
    alert("Insert Error:\n" + insertError.message);
    console.error(insertError);
    return;
  }

  alert("✅ Account created successfully!");

  window.location.replace("index.html");
}
