<?php

//use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// 🔹 Page d’accueil
Route::get('/', function () {
    return Inertia::render('Accueil');
})->name('Accueil');

// 🔹 Pages publiques
Route::get('/compte', fn () => Inertia::render('Compte'))->name('compte');
Route::get('/apropos', fn () => Inertia::render('APropos'))->name('apropos');
Route::get('/categorie', fn () => Inertia::render('Categorie'))->name('categorie');
Route::get('/activite', fn () => Inertia::render('Activite'))->name('activite');
Route::get('/activities', fn () => Inertia::render('Activities'))->name('activities');

//Route::get('/instance', fn () => Inertia::render('Instance'))->name('instance');
Route::get('/sub', fn () => Inertia::render('Sub'))->name('sub');
Route::get('/map', fn () => Inertia::render('Map'))->name('map');

// 🔹 Dashboard protégé (déjà en place)
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// 🔹 Profil (auth requis)
Route::middleware(['auth', 'verified'])->group(function () {
Route::get('/profil', fn () => Inertia::render('Profil'))->name('profil');
Route::get('/ajouter', fn () => Inertia::render('Ajouter'))->name('ajouter');

Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Auth routes Breeze
require __DIR__.'/auth.php';
