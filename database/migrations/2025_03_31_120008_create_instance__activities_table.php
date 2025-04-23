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
        Schema::create('instance_activity', function (Blueprint $table) {
            $table->id();
            $table->dateTime('start');
            $table->dateTime('end');
            $table->dateTime('deadline')->nullable();
            $table->integer('places');
            $table->integer('nb_inscription');
            $table->time('debutHour');
            $table->time('endHour');
            $table->string('status');
            $table->integer('minutes'); //Time of the course in minutes
            $table->dateTime('debutSubscription')->nullable();
            $table->string('location');
            $table->boolean('cancelation');
            $table->unsignedBigInteger('address_id');
            $table->unsignedBigInteger('sub_activity_id');
            $table->foreign('address_id')->references('id')->on('address')->onDelete('cascade');
            $table->foreign('sub_activity_id')->references('id')->on('sub_activity')->onDelete('cascade');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('instance_activity');
    }
};
