<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('game_summaries', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('year', 4);
            $table->string('accent', 7);
            $table->string('setting');
            $table->text('focus');
            $table->text('summary');
            $table->text('lore');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('game_summaries');
    }
};
