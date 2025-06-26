<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testcase extends Model
{
    protected $table = 'testcases';
    protected $fillable = ['question_id', 'input', 'output', 'is_hidden', 'created_at', 'updated_at'];
    public $timestamps = true;

    // 測資屬於一個題目
    public function question()
    {
        return $this->belongsTo(Question::class, 'question_id', 'id');
    }
}
