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
            $table->id();
            $table->unsignedBigInteger('kid_id')->nullable();
            $table->foreign('kid_id')->references('id')->on('kids')->onDelete('cascade');
            $table->string('favorite')->nullable();
            $table->enum('status', ['En cours', 'En attente', 'Cours terminé', 'Inscrit']);
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
