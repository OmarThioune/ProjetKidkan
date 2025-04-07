<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kid;

class KidController extends Controller
{
    /**
     * Récupérer tous les enfants.
     */
    public function index()
    {
        return response()->json(Kid::all(), 200);
    }

    /**
     * Ajouter un nouvel enfant.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'age' => 'required|integer',
            'user_id' => 'required|exists:users,id', // Vérifie que l'utilisateur existe
        ]);

        $kid = Kid::create($request->all());

        return response()->json($kid, 201);
    }

    /**
     * Récupérer un enfant spécifique.
     */
    public function show($id)
    {
        $kid = Kid::find($id);

        if (!$kid) {
            return response()->json(['message' => 'Enfant non trouvé'], 404);
        }

        return response()->json($kid, 200);
    }

    /**
     * Mettre à jour un enfant.
     */
    public function update(Request $request, $id)
    {
        $kid = Kid::find($id);

        if (!$kid) {
            return response()->json(['message' => 'Enfant non trouvé'], 404);
        }

        $request->validate([
            'name' => 'required|string',
            'age' => 'required|integer',
            'user_id' => 'required|exists:users,id',
        ]);

        $kid->update($request->all());

        return response()->json($kid, 200);
    }

    /**
     * Supprimer un enfant.
     */
    public function destroy($id)
    {
        $kid = Kid::find($id);

        if (!$kid) {
            return response()->json(['message' => 'Enfant non trouvé'], 404);
        }

        $kid->delete();

        return response()->json(['message' => 'Enfant supprimé'], 200);
    }
}
