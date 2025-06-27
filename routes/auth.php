<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthController;

// 使用 auth-klearn 子網域
Route::domain('auth-klearn.qiushawa.studio')->group(function () {
    // 驗證頁面
    Route::get('/login', function () {
        return Inertia::render('auth/login');
    })->name('login.page');

    Route::get('/sign-up', function () {
        return Inertia::render('auth/register');
    })->name('register.page');

    Route::get('/reset-password', function () {
        return Inertia::render('auth/reset');
    })->name('password.reset.page');

    // post 驗證
    Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
    Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout');
    Route::post('/register', [AuthController::class, 'register'])->name('auth.register');
});
