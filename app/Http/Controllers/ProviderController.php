<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Provider;
use Inertia\Inertia;

class ProviderController extends Controller
{
    /**
     * Afficher tous les fournisseurs.
     */
    public function index()
    {
        $providers = Provider::all();

        return Inertia::render('Providers/Index', [
            'providers' => $providers
        ]);
    }

    /**
     * Afficher le formulaire de création.
     */
    public function create()
    {
        return Inertia::render('Providers/Create');
    }

    /**
     * Enregistrer un nouveau fournisseur.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'star' => 'required|integer|min:0|max:5',
            'Headquarters' => 'nullable|string|max:255',
            'link' => 'nullable|url',
        ]);

        $provider = Provider::create($validated);

        return redirect()->route('providers.index')->with('success', 'Fournisseur ajouté avec succès.');
    }

    /**
     * Afficher un fournisseur spécifique.
     */
    public function show($id)
    {
        $provider = Provider::findOrFail($id);

        return Inertia::render('Providers/Show', [
            'provider' => $provider
        ]);
    }

    /**
     * Afficher le formulaire d’édition.
     */
    public function edit($id)
    {
        $provider = Provider::findOrFail($id);

        return Inertia::render('Providers/Edit', [
            'provider' => $provider
        ]);
    }

    /**
     * Mettre à jour un fournisseur.
     */
    public function update(Request $request, $id)
    {
        $provider = Provider::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'star' => 'required|integer|min:0|max:5',
            'Headquarters' => 'nullable|string|max:255',
            'link' => 'nullable|url',
        ]);

        $provider->update($validated);

        return redirect()->route('providers.index')->with('success', 'Fournisseur mis à jour avec succès.');
    }

    /**
     * Supprimer un fournisseur.
     */
    public function destroy($id)
    {
        $provider = Provider::findOrFail($id);
        $provider->delete();

        return redirect()->route('providers.index')->with('success', 'Fournisseur supprimé avec succès.');
    }
}
