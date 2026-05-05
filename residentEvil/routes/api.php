<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FullLoreChapterController;
use App\Http\Controllers\GameSummaryController;
use Illuminate\Http\Request;

// ROTA DE TESTE - Adicione esta linha
Route::get('/ping', function() {
    return response()->json([
        'success' => true,
        'message' => 'API Resident Evil funcionando!',
        'version' => '1.0.0',
        'timestamp' => now()
    ]);
});

// Suas rotas existentes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/game-summaries', [GameSummaryController::class, 'index']);
Route::post('/game-summaries', [GameSummaryController::class, 'store']);
Route::put('/game-summaries/{gameSummary}', [GameSummaryController::class, 'update']);
Route::get('/full-lore-chapters', [FullLoreChapterController::class, 'index']);
Route::put('/full-lore-chapters/{fullLoreChapter}', [FullLoreChapterController::class, 'update']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});
