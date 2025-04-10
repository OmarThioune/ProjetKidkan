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
        Schema::create('sub_categories', function (Blueprint $table) {
            $table->id('sub_categories_id'); // Primary key
            $table->string('name'); // Name of the sub-category
            $table->string('description')->nullable(); // Description of the sub-category
            $table->unsignedBigInteger('sousCategorie_id')->nullable(); // Foreign key to categories table
            $table->unsignedBigInteger('activiteCategorie_id')->nullable(); // Foreign key to activities table
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sub_categories');
    }
};
