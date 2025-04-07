<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Activity;

class ActivityController extends Controller
{
    /**
     * Récupérer toutes les activités.
     */
    public function index()
    {
        return response()->json(Activity::all(), 200);
    }

    /**
     * Enregistrer une nouvelle activité.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'material' => 'nullable|string',
            'minAge' => 'nullable|integer',
            'maxAge' => 'nullable|integer',
            'provider_id' => 'nullable|integer',
            'address_id' => 'nullable|integer',
            'duration' => 'nullable|integer',
            'price' => 'nullable|numeric',
            'capacity' => 'nullable|integer',
            'status' => 'required|boolean',
        ]);

        $activity = Activity::create($request->all());

        return response()->json($activity, 201);
    }

    /**
     * Récupérer une activité spécifique.
     */
    public function show($id)
    {
        $activity = Activity::find($id);
        if (!$activity) {
            return response()->json(['message' => 'Activité non trouvée'], 404);
        }
        return response()->json($activity, 200);
    }

    /**
     * Mettre à jour une activité.
     */
    public function update(Request $request, $id)
    {
        $activity = Activity::find($id);
        if (!$activity) {
            return response()->json(['message' => 'Activité non trouvée'], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'material' => 'nullable|string',
            'minAge' => 'nullable|integer',
            'maxAge' => 'nullable|integer',
            'provider_id' => 'nullable|integer',
            'address_id' => 'nullable|integer',
            'duration' => 'nullable|integer',
            'price' => 'nullable|numeric',
            'capacity' => 'nullable|integer',
            'status' => 'required|boolean',
        ]);

        $activity->update($request->all());

        return response()->json($activity, 200);
    }

    /**
     * Supprimer une activité.
     */
    public function destroy($id)
    {
        $activity = Activity::find($id);
        if (!$activity) {
            return response()->json(['message' => 'Activité non trouvée'], 404);
        }

        $activity->delete();
        return response()->json(['message' => 'Activité supprimée'], 200);
    }
}
