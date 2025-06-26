<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SchoolClass extends Model
{
    protected $table = 'classes';
    protected $fillable = ['class_name', 'created_at', 'updated_at'];
    public $timestamps = true;

    // 一個班級有多個學生
    public function students()
    {
        return $this->hasMany(Student::class, 'class_id', 'id');
    }

    // 一個班級可以被指派多個題目
    public function questionAssignments()
    {
        return $this->hasMany(QuestionAssignment::class, 'class_id', 'id');
    }

    // 透過題目指派關聯到題目（多對多）
    public function questions()
    {
        return $this->belongsToMany(Question::class, 'question_assignments', 'class_id', 'question_id')
                    ->withPivot('assigned_at', 'deadline');
    }
}
