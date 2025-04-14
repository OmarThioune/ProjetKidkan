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
        Schema::create('waitinglists', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->unsignedBigInteger('kid_id')->nullable();
            $table->foreign('kid_id')->references('id')->on('kids')->onDelete('cascade');
            $table->unsignedBigInteger('instance_activity_id')->nullable();
            $table->foreign('instance_activity_id')->references('id')->on('instance__activities')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('waitinglists');
    }
};
