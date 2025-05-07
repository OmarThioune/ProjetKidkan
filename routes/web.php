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
Route::get('/recherche', fn () => Inertia::render('Recherche'))->name('recherche');
Route::get('/apropos', fn () => Inertia::render('APropos'))->name('apropos');
Route::get('/categorie', fn () => Inertia::render('Categorie'))->name('categorie');
Route::get('/ajouter', fn () => Inertia::render('Ajouter'))->name('ajouter');
Route::get('/activite', fn () => Inertia::render('Activite'))->name('activite');

// 🔹 Dashboard protégé (déjà en place)
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// 🔹 Profil (auth requis)
//Route::middleware(['auth', 'verified'])->group(function () {
Route::get('/profil', fn () => Inertia::render('Profil'))->name('profil');

Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
//});

// Auth routes Breeze
require __DIR__.'/auth.php';
