<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
//rota para cadastrar usario - register é o método no AuthController 
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->get('/user', function () {
    Route::post('/logout', [AuthController::class,'logout']);
    Route::post('/user',fn(Request $request)=>$request->user);
});