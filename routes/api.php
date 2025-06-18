<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\OrderController;

Route::middleware(['auth:api'])->group(function () {
    Route::post('/products', [ProductController::class, 'store']);
});
Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('api.login');
Route::middleware('auth:api')->post('/logout', [AuthenticatedSessionController::class, 'destroy']);
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::middleware('auth:api')->get('/admin/orders', [OrderController::class, 'allOrders']);



Route::middleware('auth:api')->get('/me', [AuthenticatedSessionController::class, 'users']);
Route::post('/payments/verify', [OrderController::class, 'verify']);
Route::middleware('auth:api')->get('/payments', [OrderController::class, 'all']);
Route::middleware('auth:api')->patch('/orders/{order}/status', [OrderController::class, 'updateStatus']);
Route::middleware('auth:api')->get('/user/role', [AuthenticatedSessionController::class, 'checkRole']);


Route::get('/products', [ProductController::class, 'index']);
Route::put('/products/{id}', [ProductController::class, 'update']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/products/{id}/related', [ProductController::class, 'getRelatedProducts']);
Route::middleware('auth:api')->group(function () {
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
});
Route::middleware('auth:api')->group(function () {
    Route::post('/update-profile', [AuthenticatedSessionController::class, 'updateProfile']);
    Route::post('/change-password', [AuthenticatedSessionController::class, 'changePassword']);
});