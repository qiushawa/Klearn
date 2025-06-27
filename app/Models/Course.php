<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Course extends Model
{
    protected $table = 'courses';
    protected $primaryKey = 'course_id'; // 使用 course_id 作為主鍵
    protected $fillable = ['course_name', 'teacher_id', 'created_at', 'updated_at'];
    public $timestamps = true;

    public function students(): BelongsToMany // 一堂課可以有多個學生，學生也可以選修多堂課
    {
        return $this->belongsToMany(
            Student::class,         // 關聯的模型
            'students_courses',     // 中間表名稱
            'course_id',            // 本模型的外鍵
            'student_id'            // 關聯模型的外鍵
        );
    }

    // 關聯到老師
    public function teacher(): BelongsTo
    {
        return $this->belongsTo(Teacher::class, 'teacher_id', 'id');
    }
}
