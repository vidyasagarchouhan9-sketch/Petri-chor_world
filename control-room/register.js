const SUPABASE_URL = "https://fsasedzkypyucdrnvyvw.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzYXNlZHpreXB5dWNkcm52eXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1OTA5ODcsImV4cCI6MjA5OTE";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

async function register() {

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const country = document.getElementById("country").value;
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;
  const status = document.getElementById("status");

  if (password !== confirm) {
    status.innerHTML = "❌ Passwords do not match.";
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password
  });

  if (error) {
    status.innerHTML = "❌ " + error.message;
    return;
  }

  status.innerHTML = "✅ Account created successfully!";

}
