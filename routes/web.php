<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// 使用 klearn 子網域
Route::domain('klearn.qiushawa.studio')->group(function () {
    Route::get('/', function () {
        return Inertia::render('welcome');
    })->name('home');
});

require __DIR__ . '/auth.php';
