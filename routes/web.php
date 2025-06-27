<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    $student = auth()->guard('students')->user();
    return Inertia::render('welcome', [
        'student_name' => $student?->name,
    ]);
})->name('home');


require __DIR__ . '/auth.php';
