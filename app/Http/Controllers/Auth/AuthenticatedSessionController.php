<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;


class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
{
    if (auth()->check()) {
        return redirect()->route(auth()->user()->role === 'admin' ? 'admin.dashboard' : 'dashboard');
    }

    return Inertia::render('Auth/Login', [
        'canResetPassword' => Route::has('password.request'),
        'status' => session('status'),
    ]);
}


    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
{
    $credentials = $request->only('email', 'password');

    if (!$token = JWTAuth::attempt($credentials)) {
        return response()->json(['error' => 'Invalid credentials'], 401);
    }

    return response()->json([
        'access_token' => $token,
        'token_type' => 'bearer',
        'expires_in' => JWTAuth::factory()->getTTL() * 60, // ✅ correct usage
        'user' => auth('api')->user(), // or JWTAuth::user()
    ]);
}


public function users()
{
    try {
        // Get the authenticated user from the token
        $user = JWTAuth::parseToken()->authenticate();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        return response()->json([
            'user' => $user,
        ]);
    } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
        return response()->json(['error' => 'Token expired'], 401);
    } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
        return response()->json(['error' => 'Token invalid'], 401);
    } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
        return response()->json(['error' => 'Token absent'], 401);
    }
}

public function destroy(Request $request)
{
    try {
        $token = $request->bearerToken(); // Get token from header

        Log::info('Logout request token:', ['token' => $token]); // ✅ Log token for debugging

        if (!$token) {
            return response()->json(['error' => 'Token not provided'], 401);
        }

        JWTAuth::setToken($token)->invalidate(); // Invalidate token

        return response()->json([
            'message' => 'Successfully logged out'
        ], 200);

    } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
        Log::warning('TokenInvalidException during logout', ['exception' => $e]);
        return response()->json([
            'error' => 'Token is already invalidated or does not exist'
        ], 401);
    } catch (\Exception $e) {
        Log::error('Exception during logout', ['exception' => $e]);
        return response()->json([
            'error' => 'Failed to logout, please try again.'
        ], 500);
    }
}



}
