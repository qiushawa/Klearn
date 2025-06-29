<?php
it('can register a student and login', function () {

    $test_student = [
        'name' => 'Test',
        'student_id' => '12345678',
        'email' => 'qiushawa@gmail.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ];

    $registerResponse = $this->post(route('auth.register'), $test_student);
    // 檢查是否有成功訊息
    $registerResponse->assertSessionHas('success', true);
    // 檢查學生是否已經被創建
    $this->assertDatabaseHas('students', [
        'student_id' => $test_student['student_id'],
        'email' => $test_student['email'],
    ]);

    // 嘗試登錄
    $loginResponse = $this->post(route('auth.login'), [
        'student_id' => $test_student['student_id'],
        'password' => $test_student['password'],
        'remember' => true,
    ]);
    // 檢查是否有成功訊息
    $loginResponse->assertSessionHas('success');

    // 嘗試登出
    $logoutResponse = $this->post(route('auth.logout'));
    // 檢查是否有成功訊息
    $logoutResponse->assertSessionHas('success', '登出成功！');
    // 檢查是否已經登出
    $this->assertGuest('students');
});
