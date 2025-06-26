<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateQuestionAssignmentsTable extends Migration
{
    public function up()
    {
        Schema::create('question_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('question_id')->constrained('questions')->onDelete('cascade');
            $table->foreignId('class_id')->constrained('classes')->onDelete('cascade');
            $table->dateTime('assigned_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->dateTime('deadline')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('question_assignments');
    }
}
