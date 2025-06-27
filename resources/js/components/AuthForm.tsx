import { Head, useForm, Link } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { LuIdCard } from "react-icons/lu";
// Interface for form data with index signature
interface FormData {
  email: string;
  student_id?: string; // Optional for register and forgot-password tabs
  password?: string;
  password_confirmation?: string;
  name?: string;
  remember?: boolean;
  [key: string]: string | boolean | undefined;
}

interface FieldConfig {
  key: string;
  type: string;
  label: string;
  placeholder: string;
  icon: React.ReactNode;
}

interface TabConfig {
  name: 'login' | 'register' | 'forgot-password';
  title: string;
  subtitle: string;
  submitRoute: string;
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
    route: route('login.page'), // Adjusted to use Inertia route helper
    submitRoute: route('auth.login'), // Adjusted to use Inertia route helper
    buttonText: '登入',
    fields: [
      { key: 'student_id', type: 'number', label: '學號', placeholder: '輸入您的學號', icon: <LuIdCard className="h-5 w-5 text-gray-400" /> },
      { key: 'password', type: 'password', label: '密碼', placeholder: '輸入您的密碼', icon: <FaLock className="h-5 w-5 text-gray-400" /> },
    ],
  },
  {
    name: 'register',
    title: '註冊',
    subtitle: '加入程式練習平台！請填寫以下資訊。',
    route: route('register.page'), // Adjusted to use Inertia route helper
    submitRoute: route('auth.register'), // Adjusted to use Inertia route helper
    buttonText: '註冊',
    fields: [
      { key: 'name', type: 'text', label: '姓名', placeholder: '輸入您的姓名', icon: <FaUser className="h-5 w-5 text-gray-400" /> },
      { key: 'student_id', type: 'number', label: '學號', placeholder: '輸入您的學號', icon: <LuIdCard className="h-5 w-5 text-gray-400" /> },
      { key: 'email', type: 'email', label: '電子郵件', placeholder: '輸入您的電子郵件', icon: <FaEnvelope className="h-5 w-5 text-gray-400" /> },
      { key: 'password', type: 'password', label: '密碼', placeholder: '輸入您的密碼', icon: <FaLock className="h-5 w-5 text-gray-400" /> },
      { key: 'password_confirmation', type: 'password', label: '確認密碼', placeholder: '再次輸入您的密碼', icon: <FaLock className="h-5 w-5 text-gray-400" /> },
    ],
  },
  {
    name: 'forgot-password',
    title: '忘記密碼',
    subtitle: '輸入您的電子郵件以忘記密碼。',
    route: route('forgot-password.page'),
    submitRoute: route('password.email'),
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
    {(() => {
      let inputType: string;
      if (field.type === 'password' && showPassword) {
        inputType = 'text';
      } else if (field.type === 'number') {
        inputType = 'number';
      } else {
        inputType = field.type;
      }
      return (
        <input
          id={field.key}
          type={inputType}
          value={(data[field.key] as string | undefined) ?? ''}
          onChange={(e) => setData(field.key, e.target.value)}
          className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder={field.placeholder}
          required
        />
      );
    })()}
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

interface AuthFormProps {
  activeTab: 'login' | 'register' | 'forgot-password';
  message?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ activeTab, message }) => {
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
    console.log('Submitting form for:', currentTab.name);
    console.log('currentTab.route:', currentTab.submitRoute);
    post(currentTab.submitRoute);
  };

  return (
    <>
      <Head title={currentTab.title} />
      <div className="min-h-screen bg-gray-50 font-sans antialiased flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">{currentTab.title}</h2>
          {/* <p className="text-center text-gray-600 mb-8">{currentTab.subtitle}</p> */}

          {/* Tab Navigation */}
          {activeTab !== 'forgot-password' && (
            <div className="flex justify-center mb-6 space-x-4">
              {tabs
                .filter((tab) => tab.name !== 'forgot-password')
                .map((tab) => (
                  <Link
                    key={tab.name}
                    href={tab.route}
                    className={`px-4 py-2 text-sm font-medium ${activeTab === tab.name ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                  >
                    {tab.title}
                  </Link>
                ))}
            </div>
          )}
          <hr className="my-6 border-gray-200" />
          {/* Form */}
          <p className='text-center text-green-400 mb-8'>{message}</p>
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
                    name='remember'
                    type="checkbox"
                    checked={data.remember ?? false}
                    onChange={(e) => setData('remember', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-600">
                    記住我
                  </label>
                </div>
                <Link
                  href={route('forgot-password.page')}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  忘記密碼？
                </Link>
              </div>
            )}
            <button
              type="submit"
              disabled={processing}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-semibold text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50"
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
                  <Link href={route('register.page')} className="text-blue-600 hover:text-blue-800 font-medium">
                    註冊
                  </Link>
                </>
              )}
              {activeTab === 'register' && (
                <>
                  已有帳號？{' '}
                  <Link href={route('login.page')} className="text-blue-600 hover:text-blue-800 font-medium">
                    登入
                  </Link>
                </>
              )}
              {activeTab === 'forgot-password' && (
                <>
                  回到{' '}
                  <Link href={route('login.page')} className="text-blue-600 hover:text-blue-800 font-medium">
                    登入
                  </Link>
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
