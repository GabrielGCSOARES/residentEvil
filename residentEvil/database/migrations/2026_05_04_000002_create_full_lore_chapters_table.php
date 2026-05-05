<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('full_lore_chapters', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('number', 3);
            $table->string('title');
            $table->string('period');
            $table->string('focus');
            $table->string('character');
            $table->string('character_role');
            $table->string('accent', 7);
            $table->string('glow');
            $table->string('surface');
            $table->json('text');
            $table->text('impact');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('full_lore_chapters');
    }
};
