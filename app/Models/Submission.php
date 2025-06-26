<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Submission extends Model
{
    protected $table = 'submissions';
    protected $primaryKey = 'id';
    protected $fillable = ['student_id', 'question_id', 'language_id', 'code', 'status', 'runtime', 'memory', 'submitted_at'];

    // 提交屬於一個學生
    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id', 'id');
    }

    // 提交屬於一個題目
    public function question()
    {
        return $this->belongsTo(Question::class, 'question_id', 'id');
    }

    // 提交屬於一個程式語言
    public function language()
    {
        return $this->belongsTo(ProgrammingLanguage::class, 'language_id', 'id');
    }
}
