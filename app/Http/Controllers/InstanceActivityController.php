<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Instance_Activity;

class InstanceActivityController extends Controller
{
    /**
     * Récupérer toutes les instances d'activités.
     */
    public function index()
    {
        return response()->json(Instance_Activity::all(), 200);
    }

    /**
     * Enregistrer une nouvelle instance d'activité.
     */
    public function store(Request $request)
    {
        $request->validate([
            'start' => 'required|date',
            'end' => 'required|date',
            'deadline' => 'required|date',
            'places' => 'required|integer',
            'subscription' => 'nullable|string',
            'debutHour' => 'required|date_format:H:i',
            'endHour' => 'required|date_format:H:i',
            'status' => 'required|string',
            'level' => 'required|string',
            'minutes' => 'required|integer',
            'debutSubscription' => 'required|date_format:H:i',
            'location' => 'required|string',
            'address_id' => 'required|exists:addresses,address_id', // Assurer que l'adresse existe
        ]);

        $instanceActivity = Instance_Activity::create($request->all());

        return response()->json($instanceActivity, 201);
    }

    /**
     * Récupérer une instance d'activité spécifique.
     */
    public function show($id)
    {
        $instanceActivity = Instance_Activity::find($id);

        if (!$instanceActivity) {
            return response()->json(['message' => 'Instance d\'activité non trouvée'], 404);
        }

        return response()->json($instanceActivity, 200);
    }

    /**
     * Mettre à jour une instance d'activité.
     */
    public function update(Request $request, $id)
    {
        $instanceActivity = Instance_Activity::find($id);

        if (!$instanceActivity) {
            return response()->json(['message' => 'Instance d\'activité non trouvée'], 404);
        }

        $request->validate([
            'start' => 'required|date',
            'end' => 'required|date',
            'deadline' => 'required|date',
            'places' => 'required|integer',
            'subscription' => 'nullable|string',
            'debutHour' => 'required|date_format:H:i',
            'endHour' => 'required|date_format:H:i',
            'status' => 'required|string',
            'level' => 'required|string',
            'minutes' => 'required|integer',
            'debutSubscription' => 'required|date_format:H:i',
            'location' => 'required|string',
            'address_id' => 'required|exists:addresses,address_id',
        ]);

        $instanceActivity->update($request->all());

        return response()->json($instanceActivity, 200);
    }

    /**
     * Supprimer une instance d'activité.
     */
    public function destroy($id)
    {
        $instanceActivity = Instance_Activity::find($id);

        if (!$instanceActivity) {
            return response()->json(['message' => 'Instance d\'activité non trouvée'], 404);
        }

        $instanceActivity->delete();

        return response()->json(['message' => 'Instance d\'activité supprimée'], 200);
    }
}
