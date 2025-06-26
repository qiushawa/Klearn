<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProgrammingLanguage extends Model
{
    protected $table = 'programming_languages';
    protected $primaryKey = 'id';
    protected $fillable = ['name'];

    // 一個程式語言有多個提交記錄
    public function submissions()
    {
        return $this->hasMany(Submission::class, 'language_id', 'id');
    }
}
