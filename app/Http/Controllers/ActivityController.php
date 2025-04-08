<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Activity;
use Inertia\Inertia;

class ActivityController extends Controller
{
    /**
     * Afficher la liste des activités (Vue Inertia).
     */
    public function index()
    {
        $activities = Activity::all();

        return Inertia::render('Activities/Index', [
            'activities' => $activities,
        ]);
    }

    /**
     * Afficher le formulaire de création.
     */
    public function create()
    {
        return Inertia::render('Activities/Create');
    }

    /**
     * Enregistrer une nouvelle activité.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
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

        Activity::create($validated);

        return redirect()->route('activities.index')
                         ->with('success', 'Activité créée avec succès.');
    }

    /**
     * Afficher une activité spécifique.
     */
    public function show($id)
    {
        $activity = Activity::findOrFail($id);

        return Inertia::render('Activities/Show', [
            'activity' => $activity,
        ]);
    }

    /**
     * Afficher le formulaire d’édition d’une activité.
     */
    public function edit($id)
    {
        $activity = Activity::findOrFail($id);

        return Inertia::render('Activities/Edit', [
            'activity' => $activity,
        ]);
    }

    /**
     * Mettre à jour une activité.
     */
    public function update(Request $request, $id)
    {
        $activity = Activity::findOrFail($id);

        $validated = $request->validate([
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

        $activity->update($validated);

        return redirect()->route('activities.index')
                         ->with('success', 'Activité mise à jour avec succès.');
    }

    /**
     * Supprimer une activité.
     */
    public function destroy($id)
    {
        $activity = Activity::findOrFail($id);
        $activity->delete();

        return redirect()->route('activities.index')
                         ->with('success', 'Activité supprimée avec succès.');
    }
}
