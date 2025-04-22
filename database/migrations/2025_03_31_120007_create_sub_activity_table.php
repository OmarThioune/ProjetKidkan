<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sub_activity', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('min_Age')->nullable(); 
            $table->integer('max_Age')->nullable();
            $table->text('description')->nullable();
            $table->string('sub_activity_range')->nullable();
            $table->unsignedBigInteger('activity_id')->nullable();
            $table->foreign('activity_id')->references('id')->on('activity')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sub_activity');
    }
};
