<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kid;
use App\Models\User;
use Inertia\Inertia;

class KidController extends Controller
{
    /**
     * Afficher tous les enfants.
     */
    public function index()
    {
        $kids = Kid::with('user')->get();

        return Inertia::render('Kids/Index', [
            'kids' => $kids
        ]);
    }

    /**
     * Afficher le formulaire de création.
     */
    public function create()
    {
        $users = User::all();

        return Inertia::render('Kids/Create', [
            'users' => $users
        ]);
    }

    /**
     * Enregistrer un nouvel enfant.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'age' => 'required|integer',
            'user_id' => 'required|exists:users,id',
        ]);

        Kid::create($validated);

        return redirect()->route('kids.index')->with('success', 'Enfant ajouté avec succès.');
    }

    /**
     * Afficher un enfant spécifique.
     */
    public function show($id)
    {
        $kid = Kid::with('user')->findOrFail($id);

        return Inertia::render('Kids/Show', [
            'kid' => $kid
        ]);
    }

    /**
     * Afficher le formulaire de modification.
     */
    public function edit($id)
    {
        $kid = Kid::findOrFail($id);
        $users = User::all();

        return Inertia::render('Kids/Edit', [
            'kid' => $kid,
            'users' => $users
        ]);
    }

    /**
     * Mettre à jour un enfant.
     */
    public function update(Request $request, $id)
    {
        $kid = Kid::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string',
            'age' => 'required|integer',
            'user_id' => 'required|exists:users,id',
        ]);

        $kid->update($validated);

        return redirect()->route('kids.index')->with('success', 'Enfant mis à jour avec succès.');
    }

    /**
     * Supprimer un enfant.
     */
    public function destroy($id)
    {
        $kid = Kid::findOrFail($id);
        $kid->delete();

        return redirect()->route('kids.index')->with('success', 'Enfant supprimé avec succès.');
    }
}
