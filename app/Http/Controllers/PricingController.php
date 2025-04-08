<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pricing;
use App\Models\Instance_Activity;
use Inertia\Inertia;

class PricingController extends Controller
{
    /**
     * Afficher toutes les tarifications.
     */
    public function index()
    {
        $pricings = Pricing::with('instanceActivity')->get();

        return Inertia::render('Pricings/Index', [
            'pricings' => $pricings
        ]);
    }

    /**
     * Afficher le formulaire de création.
     */
    public function create()
    {
        $instanceActivities = Instance_Activity::all();

        return Inertia::render('Pricings/Create', [
            'instanceActivities' => $instanceActivities
        ]);
    }

    /**
     * Enregistrer une nouvelle tarification.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'price' => 'required|numeric',
            'currency' => 'required|string',
            'instance_activity_id' => 'required|exists:instance__activities,instance__activities_id',
        ]);

        Pricing::create($validated);

        return redirect()->route('pricings.index')->with('success', 'Tarification ajoutée avec succès.');
    }

    /**
     * Afficher une tarification spécifique.
     */
    public function show($id)
    {
        $pricing = Pricing::with('instanceActivity')->findOrFail($id);

        return Inertia::render('Pricings/Show', [
            'pricing' => $pricing
        ]);
    }

    /**
     * Afficher le formulaire d’édition.
     */
    public function edit($id)
    {
        $pricing = Pricing::findOrFail($id);
        $instanceActivities = Instance_Activity::all();

        return Inertia::render('Pricings/Edit', [
            'pricing' => $pricing,
            'instanceActivities' => $instanceActivities
        ]);
    }

    /**
     * Mettre à jour une tarification.
     */
    public function update(Request $request, $id)
    {
        $pricing = Pricing::findOrFail($id);

        $validated = $request->validate([
            'price' => 'required|numeric',
            'currency' => 'required|string',
            'instance_activity_id' => 'required|exists:instance__activities,instance__activities_id',
        ]);

        $pricing->update($validated);

        return redirect()->route('pricings.index')->with('success', 'Tarification mise à jour avec succès.');
    }

    /**
     * Supprimer une tarification.
     */
    public function destroy($id)
    {
        $pricing = Pricing::findOrFail($id);
        $pricing->delete();

        return redirect()->route('pricings.index')->with('success', 'Tarification supprimée avec succès.');
    }
}
