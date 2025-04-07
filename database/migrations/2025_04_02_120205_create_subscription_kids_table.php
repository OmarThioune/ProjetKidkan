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
        Schema::create('subscription_kids', function (Blueprint $table) {
            $table->id( 'subscription_kid_id');


            $table->foreignId('subscription_id')->constrained('subscriptions', 'subscription_id')->onDelete('cascade');
            $table->foreignId('kid_id')->constrained('kids', 'kid_id')->onDelete('cascade');
            $table->string('name')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subscription_kids');
    }
};
