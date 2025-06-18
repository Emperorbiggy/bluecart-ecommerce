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
    return Inertia::render('ProductDetails', ['id' => $id]);
});
Route::get('/products', function () {
    return Inertia::render('Products');
});
Route::get('/categories', function () {
    return Inertia::render('Categories');
});
Route::get('/categories/{slug}', function ($slug) {
    return Inertia::render('Categories', [
        'initialCategory' => $slug
    ]);
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
Route::prefix('admin')->group(function () {
    Route::get('/dashboard', fn () => Inertia::render('AdminDashboard'))->name('admin.dashboard');
    Route::get('/products', fn () => Inertia::render('AllProducts'))->name('admin.products');
    Route::get('/create/product', fn () => Inertia::render('AddProduct'))->name('admin.products.create');
    Route::get('/orders', fn () => Inertia::render('Orders'))->name('admin.orders');
    Route::get('/payments', fn () => Inertia::render('PaymentsPage'))->name('admin.payments');
    Route::get('/profile', fn () => Inertia::render('AdminProfilePage'))->name('admin.profile');
});


Route::get('/cart', function () {
    return Inertia::render('Cart');
});
Route::get('/checkout', function () {
    return Inertia::render('Checkout');
})->name('payments.verify'); // 👈 This is important!



Route::get('/', fn () => Inertia::render('Welcome'));
// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });
// Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
// Route::post('/login', [AuthenticatedSessionController::class, 'store']);

require __DIR__.'/auth.php';
