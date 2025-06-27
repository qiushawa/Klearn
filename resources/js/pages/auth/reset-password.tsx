import { Head, useForm, Link } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';

// Interface for form data
interface FormData {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
  [key: string]: string; // Add index signature for compatibility
}

interface FieldConfig {
  key: string;
  type: string;
  label: string;
  placeholder: string;
  icon: React.ReactNode;
}

// Form fields configuration
const fields: FieldConfig[] = [
  {
    key: 'email',
    type: 'email',
    label: '電子郵件',
    placeholder: '輸入您的電子郵件',
    icon: <FaEnvelope className="h-5 w-5 text-gray-400" />,
  },
  {
    key: 'password',
    type: 'password',
    label: '新密碼',
    placeholder: '輸入您的新密碼',
    icon: <FaLock className="h-5 w-5 text-gray-400" />,
  },
  {
    key: 'password_confirmation',
    type: 'password',
    label: '確認新密碼',
    placeholder: '再次輸入您的新密碼',
    icon: <FaLock className="h-5 w-5 text-gray-400" />,
  },
];

// Reusable InputField component
interface InputFieldProps {
  field: FieldConfig;
  data: FormData;
  setData: (key: string, value: string) => void;
  errors: Partial<Record<string, string>>;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
}

const InputField: React.FC<InputFieldProps> = ({ field, data, setData, errors, showPassword, setShowPassword }) => (
  <div>
    <label htmlFor={field.key} className="block text-sm font-medium text-gray-700">
      {field.label}
    </label>
    <div className="mt-1 relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {field.icon}
      </div>
      <input
        id={field.key}
        type={field.type === 'password' && showPassword ? 'text' : field.type}
        value={data[field.key] ?? ''}
        onChange={(e) => setData(field.key, e.target.value)}
        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder={field.placeholder}
        required
      />
      {field.type === 'password' && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {showPassword ? '隱藏' : '顯示'}
          </button>
        </div>
      )}
    </div>
    {errors[field.key] && <p className="mt-2 text-sm text-red-600">{errors[field.key]}</p>}
  </div>
);

interface ResetPasswordProps {
  token: string;
  email: string;
  status?: string;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ token, email, status }) => {
  const [showPassword, setShowPassword] = useState(false);

  // Decode the email to display properly (e.g., qiushawa@gmail.com instead of qiushawa%40gmail.com)
  const decodedEmail = decodeURIComponent(email ?? '');

  const { data, setData, post, processing, errors } = useForm<FormData>({
    email: decodedEmail,
    password: '',
    password_confirmation: '',
    token: token ?? '',
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitting reset password form:', data);
    post(route('password.update'), {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        window.location.href = route('login.page');
      },
    });
  };

  return (
    <>
      <Head title="重設密碼" />
      <div className="min-h-screen bg-gray-50 font-sans antialiased flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">重設密碼</h2>
          <p className="text-center text-gray-600 mb-8">輸入您的新密碼以完成重設。</p>
          {status && <p className="text-center text-green-400 mb-8">{status}</p>}
          {errors.token && <p className="text-center text-red-600 mb-8">{errors.token}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            {fields.map((field) => (
              <InputField
                key={field.key}
                field={field}
                data={data}
                setData={setData}
                errors={errors}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            ))}
            <input
              type="hidden"
              name="token"
              value={data.token}
            />
            <button
              type="submit"
              disabled={processing}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-semibold text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50"
            >
              {processing ? '重設密碼中...' : '重設密碼'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              回到{' '}
              <Link href={route('login.page')} className="text-blue-600 hover:text-blue-800 font-medium">
                登入
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
