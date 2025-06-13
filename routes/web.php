<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
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

Route::get('/dashboard', function () {
    return Inertia::render('UserDashboard');
});
Route::middleware(['auth', 'isadmin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('admin.dashboard');

    Route::get('/products', function () {
        return Inertia::render('AllProducts');
    });

    Route::get('/create/product', function () {
        return Inertia::render('AddProduct');
    });

    Route::get('/orders', function () {
        return Inertia::render('Orders');
    });

    Route::get('/profile', function () {
        return Inertia::render('AdminProfilePage');
    });
});

Route::get('/cart', function () {
    return Inertia::render('Cart');
});
Route::get('/checkout', function () {
    return Inertia::render('Checkout');
});


Route::get('/', fn () => Inertia::render('Welcome'));
// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });
Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
Route::post('/login', [AuthenticatedSessionController::class, 'store']);

require __DIR__.'/auth.php';
