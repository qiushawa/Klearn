<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $table = 'questions';
    protected $primaryKey = 'id';
    protected $fillable = ['title', 'description', 'input_description', 'output_description', 'teacher_id', 'difficulty', 'created_at', 'updated_at'];

    // 驗證 difficulty 範圍（1~5）
    public function setDifficultyAttribute($value)
    {
        if ($value < 1 || $value > 5) {
            throw new \InvalidArgumentException('Difficulty must be between 1 and 5');
        }
        $this->attributes['difficulty'] = $value;
    }

    // 題目屬於一個教師
    public function teacher()
    {
        return $this->belongsTo(Teacher::class, 'teacher_id', 'id');
    }

    // 一個題目有多個題目資料
    public function questionData()
    {
        return $this->hasMany(QuestionData::class, 'question_id', 'id');
    }

    // 一個題目有多個測資
    public function testcases()
    {
        return $this->hasMany(Testcase::class, 'question_id', 'id');
    }

    // 一個題目有多個提交記錄
    public function submissions()
    {
        return $this->hasMany(Submission::class, 'question_id', 'id');
    }

    // 一個題目有多個指派
    public function questionAssignments()
    {
        return $this->hasMany(QuestionAssignment::class, 'question_id', 'id');
    }
}
