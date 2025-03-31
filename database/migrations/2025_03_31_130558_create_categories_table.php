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
        Schema::create('categories', function (Blueprint $table) {
            $table->id('category_id'); 
            $table->string('name'); 
            $table->unsignedBigInteger('sub_categories_id')->nullable(); 
            $table->unsignedBigInteger('activities_id')->nullable(); 
            $table->timestamps();
            $table->foreign('sub_categories_id')->references('id')->on('sub_categories')->onDelete('set null');
            $table->foreign('activiteCategorie_id')->references('id')->on('activite_categories')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
