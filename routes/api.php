<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

Route::middleware(['auth:api'])->group(function () {
    Route::post('/products', [ProductController::class, 'store']);
});
Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('api.login');

Route::middleware('auth:api')->get('/me', [AuthenticatedSessionController::class, 'users']);

