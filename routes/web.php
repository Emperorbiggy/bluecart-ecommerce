<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/products/{id}', function ($id) {
    return Inertia::render('ProductDetails');
});
Route::get('/products', function () {
    return Inertia::render('Products');
});
Route::get('/contact', function () {
    return Inertia::render('ContactUs');
});
Route::get('/about', function () {
    return Inertia::render('AboutUs');
});

Route::get('/cart', function () {
    return Inertia::render('Cart');
});
Route::get('/checkout', function () {
    return Inertia::render('Checkout');
});


Route::get('/', fn () => Inertia::render('Welcome'));
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
