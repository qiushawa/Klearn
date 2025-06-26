<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateViews extends Migration
{
    public function up()
    {
        $sql = file_get_contents(database_path('views/create_views.sql'));

        // Only include SET statements for MySQL
        if (DB::getDriverName() === 'mysql') {
            $prefix = <<<SQL
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET collation_connection = utf8mb4_unicode_ci;
SQL;
            $sql = $prefix . "\n" . $sql;
        }

        DB::statement($sql);
    }

    public function down()
    {
        DB::statement('DROP VIEW IF EXISTS student_ranking');
        DB::statement('DROP VIEW IF EXISTS student_submission_overview');
    }
}
