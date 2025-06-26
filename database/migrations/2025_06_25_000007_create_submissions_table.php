<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateSubmissionsTable extends Migration
{
    public function up()
    {
        Schema::create('submissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('students')->onDelete('restrict');
            $table->foreignId('question_id')->constrained('questions')->onDelete('restrict');
            $table->foreignId('language_id')->constrained('programming_languages')->onDelete('restrict');
            $table->text('code');
            $table->string('status', 20);
            $table->integer('runtime')->nullable();
            $table->integer('memory')->nullable();
            $table->dateTime('submitted_at')->default(DB::raw('CURRENT_TIMESTAMP'));
        });
    }

    public function down()
    {
        Schema::dropIfExists('submissions');
    }
}
