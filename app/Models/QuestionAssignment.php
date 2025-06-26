<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuestionAssignment extends Model
{
    protected $table = 'question_assignments';
    protected $fillable = ['question_id', 'class_id', 'assigned_at', 'deadline'];
    public $timestamps = true;

    // 題目指派屬於一個題目
    public function question()
    {
        return $this->belongsTo(Question::class, 'question_id', 'id');
    }

    // 題目指派屬於一個班級
    public function class()
    {
        return $this->belongsTo(SchoolClass::class, 'class_id', 'id');
    }
}
