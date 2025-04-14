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
        Schema::create('category', function (Blueprint $table) {
            $table->id(); 
            $table->string('name'); 
            $table->unsignedBigInteger('sub_category_id')->nullable(); 
            $table->unsignedBigInteger('activity_category_id')->nullable(); 
            $table->timestamps();
            $table->foreign('sub_category_id')->references('id')->on('sub_category')->onDelete('set null');
            $table->foreign('activity_category_id')->references('id')->on('activity_category')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('category');
    }
};
