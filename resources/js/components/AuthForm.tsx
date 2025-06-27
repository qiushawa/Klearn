import { Head, useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';

// Interface for form data with index signature to satisfy FormDataType
interface FormData {
  email: string;
  password?: string;
  password_confirmation?: string;
  name?: string;
  remember?: boolean;
  [key: string]: string | boolean | undefined; // Index signature for dynamic access
}

interface FieldConfig {
  key: string; // Explicitly string to match htmlFor and id
  type: string;
  label: string;
  placeholder: string;
  icon: React.ReactNode;
}

interface TabConfig {
  name: 'login' | 'register' | 'reset';
  title: string;
  subtitle: string;
  route: string;
  buttonText: string;
  fields: FieldConfig[];
}

// Tab configurations
const tabs: TabConfig[] = [
  {
    name: 'login',
    title: '登入',
    subtitle: '歡迎回到程式練習平台！請輸入您的帳號密碼。',
    route: '/login',
    buttonText: '登入',
    fields: [
      { key: 'email', type: 'email', label: '電子郵件', placeholder: '輸入您的電子郵件', icon: <FaEnvelope className="h-5 w-5 text-gray-400" /> },
      { key: 'password', type: 'password', label: '密碼', placeholder: '輸入您的密碼', icon: <FaLock className="h-5 w-5 text-gray-400" /> },
    ],
  },
  {
    name: 'register',
    title: '註冊',
    subtitle: '加入程式練習平台！請填寫以下資訊。',
    route: '/register',
    buttonText: '註冊',
    fields: [
      { key: 'name', type: 'text', label: '使用者名稱', placeholder: '輸入您的使用者名稱', icon: <FaUser className="h-5 w-5 text-gray-400" /> },
      { key: 'email', type: 'email', label: '電子郵件', placeholder: '輸入您的電子郵件', icon: <FaEnvelope className="h-5 w-5 text-gray-400" /> },
      { key: 'password', type: 'password', label: '密碼', placeholder: '輸入您的密碼', icon: <FaLock className="h-5 w-5 text-gray-400" /> },
      { key: 'password_confirmation', type: 'password', label: '確認密碼', placeholder: '再次輸入您的密碼', icon: <FaLock className="h-5 w-5 text-gray-400" /> },
    ],
  },
  {
    name: 'reset',
    title: '重置密碼',
    subtitle: '輸入您的電子郵件以重置密碼。',
    route: '/password/email',
    buttonText: '發送重置連結',
    fields: [
      { key: 'email', type: 'email', label: '電子郵件', placeholder: '輸入您的電子郵件', icon: <FaEnvelope className="h-5 w-5 text-gray-400" /> },
    ],
  },
];

// Reusable InputField component
interface InputFieldProps {
  field: FieldConfig;
  data: FormData;
  setData: (key: string, value: string | boolean) => void;
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
        value={(data[field.key] as string | undefined) ?? ''} // Use ?? for nullish coalescing
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
      {errors[field.key] && <p className="mt-2 text-sm text-red-600">{errors[field.key]}</p>}
    </div>
  </div>
);

const AuthForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'reset'>('login');
  const [showPassword, setShowPassword] = useState(false);

  const { data, setData, post, processing, errors } = useForm<FormData>({
    email: '',
    password: '',
    password_confirmation: '',
    name: '',
    remember: false,
  });

  const currentTab = tabs.find((tab) => tab.name === activeTab)!;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(currentTab.route);
  };

  return (
    <>
      <Head title={currentTab.title} />
      <div className="min-h-screen bg-gray-50 font-sans antialiased flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">{currentTab.title} Klearn</h2>
          <p className="text-center text-gray-600 mb-8">{currentTab.subtitle}</p>

          {/* Tab Navigation */}
          {activeTab !== 'reset' && (
            <div className="flex justify-center mb-6 space-x-4">
              {tabs
                .filter((tab) => tab.name !== 'reset')
                .map((tab) => (
                  <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={`px-4 py-2 text-sm font-medium ${activeTab === tab.name ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                  >
                    {tab.title}
                  </button>
                ))}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 min-h-[400px]">
            {currentTab.fields.map((field) => (
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
            {activeTab === 'login' && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={data.remember ?? false} // Use ?? for nullish coalescing
                    onChange={(e) => setData('remember', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-600">
                    記住我
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('reset')}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  忘記密碼？
                </button>
              </div>
            )}
            <button
              type="submit"
              disabled={processing}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-semibold text-white bg-blue-700
 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50"
            >
              {processing ? `${currentTab.buttonText}中...` : currentTab.buttonText}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {activeTab === 'login' && (
                <>
                  還沒有帳號？{' '}
                  <button
                    onClick={() => setActiveTab('register')}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    註冊
                  </button>
                </>
              )}
              {activeTab === 'register' && (
                <>
                  已有帳號？{' '}
                  <button
                    onClick={() => setActiveTab('login')}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    登入
                  </button>
                </>
              )}
              {activeTab === 'reset' && (
                <>
                  回到{' '}
                  <button
                    onClick={() => setActiveTab('login')}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    登入
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
