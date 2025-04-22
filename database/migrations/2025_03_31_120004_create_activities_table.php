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
        Schema::create('activity', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->boolean('cancelation');
            //$table->string('name'); // Name of the activity
            $table->text('description')->nullable(); // Description of the activity
            $table->string('material')->nullable(); // Material needed for the activity
            $table->integer('min_Age')->nullable(); // Minimum age for the activity
            $table->integer('max_Age')->nullable(); // Maximum age for the activity
            $table->unsignedBigInteger('provider_id')->nullable(); // Foreign key to providers table
            $table->unsignedBigInteger('address_id')->nullable(); // Foreign key to addresses table
            $table->unsignedBigInteger('sub_category_id')->nullable(); // Foregin key to sub_category table
            $table->foreign('provider_id')->references('id')->on('provider')->onDelete('set null');
            $table->foreign('address_id')->references('id')->on('address')->onDelete('set null');
            $table->foreign('sub_category_id')->references('id')->on('sub_category')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activity');
    }
};
