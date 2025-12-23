import { supabase } from "../Supabase/client";

export default function ResetPassword() {
  const submit = async (e) => {
    e.preventDefault();
    await supabase.auth.resetPasswordForEmail(e.target.email.value);
    alert("Password reset email sent");
  };

  return (
    <form onSubmit={submit}>
      <input name="email" placeholder="Email" />
      <button>Reset Password</button>
    </form>
  );
}
