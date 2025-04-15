<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Instance_Activity;
use App\Models\Address;
use Inertia\Inertia;

class InstanceActivityController extends Controller
{
    /**
     * Afficher toutes les instances d'activités.
     */
    public function index()
    {
        $instances = Instance_Activity::with('address')->get();

        return Inertia::render('InstanceActivities/Index', [
            'instances' => $instances
        ]);
    }

    /**
     * Afficher le formulaire de création.
     */
    public function create()
    {
        $addresses = Address::all();

        return Inertia::render('InstanceActivities/Create', [
            'addresses' => $addresses
        ]);
    }

    /**
     * Enregistrer une nouvelle instance d'activité.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
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

        Instance_Activity::create($validated);

        return redirect()->route('instance-activities.index')->with('success', 'Instance ajoutée avec succès.');
    }

    /**
     * Afficher une instance spécifique.
     */
    public function show($id)
    {
        $instance = Instance_Activity::with('address')->findOrFail($id);

        return Inertia::render('InstanceActivities/Show', [
            'instance' => $instance
        ]);
    }

    /**
     * Afficher le formulaire d'édition.
     */
    public function edit($id)
    {
        $instance = Instance_Activity::findOrFail($id);
        $addresses = Address::all();

        return Inertia::render('InstanceActivities/Edit', [
            'instance' => $instance,
            'addresses' => $addresses
        ]);
    }

    /**
     * Mettre à jour une instance d'activité.
     */
    public function update(Request $request, $id)
    {
        $instance = Instance_Activity::findOrFail($id);

        $validated = $request->validate([
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

        $instance->update($validated);

        return redirect()->route('instance-activities.index')->with('success', 'Instance mise à jour avec succès.');
    }

    /**
     * Supprimer une instance.
     */
    public function destroy($id)
    {
        $instance = Instance_Activity::findOrFail($id);
        $instance->delete();

        return redirect()->route('instance-activities.index')->with('success', 'Instance supprimée avec succès.');
    }
}
