<?php

use App\Http\Controllers\API\ApiProductController;
use App\Http\Controllers\API\ApiTransactionController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rules;

// untuk get user dan logout hanya bisa diakses didalam middleware auth
Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', function (Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->noContent();
    });
});

// Untuk login
Route::post("/login", function(Request $request) {
    $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
        'device_name' => ['required']
    ]);

    $user = User::where('email', $request->email)->first();

    if(!$user || !Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }

    return response()->json([
        'token' => $user->createToken($request->device_name)->plainTextToken
    ]);
});

// Untuk register
Route::post("/register", function(Request $request) {
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
        'password' => ['required', 'confirmed', Rules\Password::defaults()],
        'device_name' => ['required']
    ]);

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

    event(new Registered($user));

    return response()->json([
        'token' => $user->createToken($request->device_name)->plainTextToken
    ]);
});

// untuk lupa password
Route::post("/forgot-password", [PasswordResetLinkController::class, 'store']);

Route::get("/products", [ApiProductController::class, 'index']);
Route::get("/transactions", [ApiTransactionController::class, 'index']);