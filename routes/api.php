<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::middleware(['auth:sanctum', 'isadmin'])->group(function () {
    Route::post('/products', [ProductController::class, 'store']);
});
