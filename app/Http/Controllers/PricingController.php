<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pricing;

class PricingController extends Controller
{
    /**
     * Récupérer toutes les entrées de tarification.
     */
    public function index()
    {
        return response()->json(Pricing::all(), 200);
    }

    /**
     * Enregistrer une nouvelle entrée de tarification.
     */
    public function store(Request $request)
    {
        $request->validate([
            'price' => 'required|numeric',
            'currency' => 'required|string',
            'instance_activity_id' => 'required|exists:instance__activities,instance__activities_id', // Vérifier l'existence de l'instance d'activité
        ]);

        $pricing = Pricing::create($request->all());

        return response()->json($pricing, 201);
    }

    /**
     * Récupérer une entrée de tarification spécifique.
     */
    public function show($id)
    {
        $pricing = Pricing::find($id);

        if (!$pricing) {
            return response()->json(['message' => 'Tarification non trouvée'], 404);
        }

        return response()->json($pricing, 200);
    }

    /**
     * Mettre à jour une entrée de tarification.
     */
    public function update(Request $request, $id)
    {
        $pricing = Pricing::find($id);

        if (!$pricing) {
            return response()->json(['message' => 'Tarification non trouvée'], 404);
        }

        $request->validate([
            'price' => 'required|numeric',
            'currency' => 'required|string',
            'instance_activity_id' => 'required|exists:instance__activities,instance__activities_id',
        ]);

        $pricing->update($request->all());

        return response()->json($pricing, 200);
    }

    /**
     * Supprimer une entrée de tarification.
     */
    public function destroy($id)
    {
        $pricing = Pricing::find($id);

        if (!$pricing) {
            return response()->json(['message' => 'Tarification non trouvée'], 404);
        }

        $pricing->delete();

        return response()->json(['message' => 'Tarification supprimée'], 200);
    }
}
