<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FullLoreChapter extends Model
{
    protected $fillable = [
        'slug',
        'number',
        'title',
        'period',
        'focus',
        'character',
        'character_role',
        'accent',
        'glow',
        'surface',
        'text',
        'impact',
    ];

    protected $casts = [
        'text' => 'array',
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
