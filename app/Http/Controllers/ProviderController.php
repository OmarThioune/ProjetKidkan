<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Provider;

class ProviderController extends Controller
{
    /**
     * Récupérer tous les fournisseurs.
     */
    public function index()
    {
        return response()->json(Provider::all(), 200);
    }

    /**
     * Enregistrer un nouveau fournisseur.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'star' => 'required|integer|min:0|max:5',
            'Headquarters' => 'nullable|string|max:255',
            'link' => 'nullable|url',
        ]);

        $provider = Provider::create($request->all());

        return response()->json($provider, 201);
    }

    /**
     * Récupérer un fournisseur spécifique.
     */
    public function show($id)
    {
        $provider = Provider::find($id);
        if (!$provider) {
            return response()->json(['message' => 'Fournisseur non trouvé'], 404);
        }
        return response()->json($provider, 200);
    }

    /**
     * Mettre à jour un fournisseur.
     */
    public function update(Request $request, $id)
    {
        $provider = Provider::find($id);
        if (!$provider) {
            return response()->json(['message' => 'Fournisseur non trouvé'], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'star' => 'required|integer|min:0|max:5',
            'Headquarters' => 'nullable|string|max:255',
            'link' => 'nullable|url',
        ]);

        $provider->update($request->all());

        return response()->json($provider, 200);
    }

    /**
     * Supprimer un fournisseur.
     */
    public function destroy($id)
    {
        $provider = Provider::find($id);
        if (!$provider) {
            return response()->json(['message' => 'Fournisseur non trouvé'], 404);
        }

        $provider->delete();
        return response()->json(['message' => 'Fournisseur supprimé'], 200);
    }
}
