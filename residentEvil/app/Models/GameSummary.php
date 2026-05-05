<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GameSummary extends Model
{
    protected $fillable = [
        'slug',
        'title',
        'year',
        'accent',
        'setting',
        'focus',
        'summary',
        'lore',
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
