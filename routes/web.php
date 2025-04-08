<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\categoryController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\InstanceActivityController;
use App\Http\Controllers\KidController;
use App\Http\Controllers\PricingController;
use App\Http\Controllers\ProviderController;

Route::resource('providers', ProviderController::class);


Route::resource('pricings', PricingController::class);


Route::resource('kids', KidController::class);


Route::resource('instance-activities', InstanceActivityController::class);


Route::resource('images', ImageController::class);


Route::resource('categories', categoryController::class);
Route::resource('addresses', AddressController::class);
Route::resource('activities', ActivityController::class);


Route::get('/', function () {
    return Inertia::render('Accueil');
})->name('accueil');

Route::get('/activite', function () {
    return Inertia::render('Activite');
})->name('activite');

Route::middleware(['guest'])->group(function () {
    Route::get('/login', function () {
        return Inertia::render('Auth/Login');
    })->name('login');

    Route::get('/register', function () {
        return Inertia::render('Auth/Register');
    })->name('register');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/profile', function () {
        return Inertia::render('Profile');
    })->name('profile');
});

