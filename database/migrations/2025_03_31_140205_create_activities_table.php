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
        Schema::create('activities', function (Blueprint $table) {
            $table->id('activies_id'); // Primary key
            $table->string('name'); // Name of the activity
            $table->string('description')->nullable(); // Description of the activity
            $table->string('material')->nullable(); // Material needed for the activity
            $table->integer('minAge')->nullable(); // Minimum age for the activity
            $table->integer('maxAge')->nullable(); // Maximum age for the activity
            $table->unsignedBigInteger('provider_id')->nullable(); // Foreign key to providers table
            $table->unsignedBigInteger('address_id')->nullable(); // Foreign key to addresses table
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};
