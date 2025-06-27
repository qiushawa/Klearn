<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Student;

class AuthController extends Controller
{
    public function login()
    {
        // 驗證輸入資料
        $data = request()->validate([
            'email' => 'required|email',
            'password' => 'required|string',
            'remember' => 'boolean',
        ]);

        // 檢查電子郵件是否在 students 表中存在
        $student = Student::where('email', $data['email'])->first();

        if (!$student) {
            // 認證失敗（電子郵件不存在），返回錯誤訊息
            return back()->withErrors([
                'email' => '該電子郵件地址未註冊，請先註冊。',
            ])->withInput();
        }

        if (Auth::guard('student')->attempt(['email' => $data['email'], 'password' => $data['password']], $data['remember'] ?? false)) {
            request()->session()->regenerate();

            // * 暫時重定導向到首頁，日後可以改為重定向到學生主頁或其他頁面
            return redirect()->route('home')->with('success', '登入成功！');
        }

        // 認證失敗（密碼錯誤），返回錯誤訊息
        return back()->withErrors([
            'email' => '密碼錯誤，請確認您的密碼是否正確。',
        ])->withInput();
    }

    public function logout()
    {
        Auth::guard('student')->logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();

        return redirect()->route('home')->with('success', '登出成功！');
    }

    public function register()
    {
        // 驗證輸入資料
        $data = request()->validate([
            'name' => 'required|string|max:255',
            'student_number' => 'required|string|max:20|unique:students,student_number',
            'email' => 'required|email|unique:students,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // 創建新的學生帳戶
        // Student::create([
        //     'name' => $data['name'],
        //     'student_number' => $data['student_number'],
        //     'email' => $data['email'],
        //     'password' => bcrypt($data['password']),
        //     'created_at' => now(),
        //     'updated_at' => now(),
        // ]);
        // 學生資料表需修復與班級資料表的關聯

        // 重定向到登入頁面並顯示成功訊息
        return redirect()->route('login.page')->with('success', '註冊成功！請使用您的電子郵件和密碼登入。');

    }
}
