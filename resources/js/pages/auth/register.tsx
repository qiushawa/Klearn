import AuthForm from '@/components/AuthForm';
import { usePage } from '@inertiajs/react';
interface PageProps {
    message?: string;
    [key: string]: unknown; // Add index signature for compatibility
}
export default function Login() {
    // 取得 Laravel 傳來的 success 訊息
    const {props} = usePage<PageProps>();
    const message = props.message || '';
    return (
        <AuthForm activeTab='register' message={message} />
    );
}
