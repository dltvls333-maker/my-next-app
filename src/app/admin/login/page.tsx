import LoginForm from "@/components/login/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      {/* 여기서 LoginForm을 불러옵니다 */}
      <LoginForm />
    </div>
  );
}