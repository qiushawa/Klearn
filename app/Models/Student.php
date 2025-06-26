<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;

class Student extends Authenticatable
{
    use Notifiable;

    protected $table = 'students';
    protected $primaryKey = 'id';
    protected $fillable = ['student_number', 'password', 'class_id', 'name', 'email', 'created_at', 'updated_at'];
    protected $hidden = ['password', 'remember_token'];
    public $timestamps = true;

    // 自訂認證欄位（使用 student_number 代替預設的 email）
    public function getAuthIdentifierName()
    {
        return 'student_number';
    }

    // 查詢學生解題總覽
    public function getSubmissionOverview()
    {
        return DB::table('student_submission_overview')
            ->where('student_id', $this->id)
            ->first();
    }

    // 查詢學生排行榜（可選：限制班級）
    public static function getRanking($className = null)
    {
        $query = DB::table('student_ranking');
        if ($className) {
            $query->where('class_name', $className);
        }
        return $query->orderBy('class_rank')->get();
    }

    // 學生屬於一個班級
    public function class()
    {
        return $this->belongsTo(SchoolClass::class, 'class_id', 'id');
    }

    // 學生有多個提交記錄
    public function submissions()
    {
        return $this->hasMany(Submission::class, 'student_id', 'id');
    }
}
