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
        Schema::create('instance__activities', function (Blueprint $table) {
            $table->id( 'instance_activity_id');
            $table->dateTime('start');
            $table->dateTime('end');
            $table->dateTime('deadline')->nullable();
            $table->integer('places');
            $table->boolean('subscription')->default(false);
            $table->time('debutHour');
            $table->time('endHour');
            $table->string('status');
            $table->string('level');
            $table->integer('minutes');
            $table->dateTime('debutSubscription')->nullable();
            $table->string('location');
            $table->unsignedBigInteger('address_id');
            $table->timestamps();

            $table->foreign('address_id')->references('id')->on('addresses')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('instance__activities');
    }
};
