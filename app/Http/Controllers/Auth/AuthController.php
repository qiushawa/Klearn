<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Student;
use Inertia\Inertia;

class AuthController extends Controller
{
    /**
     * 顯示登入頁面
     */
    public function showLoginPage()
    {
        // 如果已經登入，則重定向到首頁
        if (auth()->guard('students')->check()) {
            return redirect()->route('home');
        }
        // 獲取註冊成功訊息
        $message = session('success') ? '註冊成功，請使用您的學號和密碼登入。' : '';

        return Inertia::render('auth/login', [
            'message' => $message,
        ]);
    }
    /**
     * 顯示註冊頁面
     */
    public function showRegisterPage()
    {
        // 如果已經登入，則重定向到首頁
        if (auth()->guard('students')->check()) {
            return redirect()->route('home');
        }
        return Inertia::render('auth/register');
    }
    public function login()
    {
        // 驗證輸入資料
        $data = request()->validate([
            'student_id' => 'required|string',
            'password' => 'required|string',
            'remember' => 'boolean',
        ]);

        // 檢查學生 ID 是否在 students 表中存在
        $student = Student::where('student_id', $data['student_id'])->first();

        if (!$student) {
            // 認證失敗（電子郵件不存在），返回錯誤訊息
            return back()->withErrors([
                'student_id' => '該學號不存在，請確認您的學號是否正確，或先註冊。',
            ])->withInput();
        }

        if (Auth::guard('students')->attempt([
            'student_id' => $data['student_id'],
            'password' => $data['password'],
        ], $data['remember'] ?? false)) {
            request()->session()->regenerate();

            // * 暫時重定導向到首頁，日後可以改為重定向到學生主頁或其他頁面
            // from auth-klearn.qiushawa.studio to klearn.qiushawa.studio
            return Inertia::location('https://klearn.qiushawa.studio');
        }

        // 認證失敗（密碼錯誤），返回錯誤訊息
        return back()->withErrors([
            'password' => '密碼錯誤，請確認您的密碼是否正確。',
        ])->withInput();
    }

    public function logout()
    {
        Auth::guard('students')->logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();

        return redirect()->route('home')->with('success', '登出成功！');
    }

    public function register()
    {
        // 驗證輸入資料
        $data = request()->validate([
            'name' => 'required|string|max:255',
            'student_id' => 'required|string|max:20|unique:students,student_id',
            'email' => 'required|email|unique:students,email',
            'password' => 'required|string|min:8|confirmed',
        ]);
        // 創建新的學生記錄
        Student::create([
            'student_id' => $data['student_id'],
            'password' => bcrypt($data['password']),
            'name' => $data['name'],
            'email' => $data['email'],
        ]);
        // 重定向到登入頁面並顯示成功訊息
        return redirect()->route('login.page')->with('success', true);
    }
}
