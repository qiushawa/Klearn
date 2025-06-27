<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// 使用 auth-klearn 子網域
Route::domain('auth-klearn.qiushawa.studio')->group(function () {
    // 驗證頁面
    Route::get('/', function () {
        return Inertia::render('auth/auth-form');
    })->name('auth-page');
});
