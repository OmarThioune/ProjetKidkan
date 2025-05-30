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
        Schema::create('activity_category', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('activity_id'); 
            $table->foreign('activity_id')->references('id')->on('activity')->onDelete('cascade');
            $table->unsignedBigInteger('category_id'); 
            $table->foreign('category_id')->references('id')->on('category')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activity_category');
        
    }
};
