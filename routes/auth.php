<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthController;

Route::prefix('auth')->group(function () {
    // 驗證頁面
    $guestRoutes = [
        ['uri' => '/login', 'view' => 'auth/login', 'name' => 'login.page'],
        ['uri' => '/sign-up', 'view' => 'auth/register', 'name' => 'register.page'],
        ['uri' => '/reset-password', 'view' => 'auth/reset', 'name' => 'password.reset.page'],
    ];

    foreach ($guestRoutes as $route) {
        Route::get($route['uri'], function () use ($route) {
            if (auth()->guard('students')->check()) {
                return redirect()->route('home');
            }
            return Inertia::render($route['view']);
        })->name($route['name']);
    }

    // post 驗證
    Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
    Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout');
    Route::post('/register', [AuthController::class, 'register'])->name('auth.register');
});
