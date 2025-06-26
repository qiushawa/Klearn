<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuestionData extends Model
{
    protected $table = 'question_data';
    protected $primaryKey = 'id';
    protected $fillable = ['question_id', 'sample_input', 'sample_output', 'testcase_generator', 'standard_solution', 'created_at', 'updated_at'];

    // 題目資料屬於一個題目
    public function question()
    {
        return $this->belongsTo(Question::class, 'question_id', 'id');
    }
}
