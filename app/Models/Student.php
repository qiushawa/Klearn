<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Student extends Authenticatable
{
    use Notifiable;

    protected $table = 'students';
    protected $primaryKey = 'student_id'; // 使用 student_id 作為主鍵
    protected $fillable = ['student_id', 'password', 'class_id', 'name', 'email', 'created_at', 'updated_at'];
    protected $hidden = ['password', 'remember_token'];
    public $timestamps = true;

    // 自訂認證欄位（使用 student_number 代替預設的 email）
    public function getAuthIdentifierName()
    {
        return 'student_id';
    }

    public function courses(): BelongsToMany
    {
        return $this->belongsToMany(
            Course::class,           // 關聯的模型
            'students_courses',     // 中間表名稱
            'student_id',           // 本模型的外鍵
            'course_id'             // 關聯模型的外鍵
        );
    }
}
