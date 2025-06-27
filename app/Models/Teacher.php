<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Teacher extends Authenticatable
{
    use Notifiable;

    protected $table = 'teachers';
    protected $primaryKey = 'id';
    protected $fillable = ['teacher_id', 'password', 'name', 'email', 'created_at', 'updated_at'];
    protected $hidden = ['password', 'remember_token'];
    public $timestamps = true;

    // 自訂認證欄位（使用 teacher_id 代替預設的 email）
    public function getAuthIdentifierName()
    {
        return 'teacher_id';
    }

    // 一位教師可以創建多個課程
    public function courses(): HasMany
    {
        return $this->hasMany(Course::class, 'teacher_id', 'id'); // 假設有 teacher_id 外鍵
    }

}
