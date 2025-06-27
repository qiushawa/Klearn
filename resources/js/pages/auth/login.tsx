import AuthForm from '@/components/AuthForm';
export default function Login() {
    // 取得 Laravel 傳來的 success 訊息
    const params = new URLSearchParams(window.location.search);
    const message = params.get('success') || "";

    return (
        <AuthForm activeTab='login' message={message} />
    );
}
