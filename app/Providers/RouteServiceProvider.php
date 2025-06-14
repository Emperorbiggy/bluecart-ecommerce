<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use App\Http\Middleware\IsAdmin;

class RouteServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // Register custom middleware
        Route::middleware('isadmin', IsAdmin::class);

        // Load web routes
        Route::middleware('web')
            ->group(base_path('routes/web.php'));

        // Load API routes
        Route::middleware('api')
            ->prefix('api')
            ->group(base_path('routes/api.php'));
    }
}
