<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
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

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});