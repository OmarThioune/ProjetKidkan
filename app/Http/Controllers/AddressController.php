<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Address;
use Inertia\Inertia;

class AddressController extends Controller
{
    /**
     * Afficher toutes les adresses.
     */
    public function index()
    {
        $addresses = Address::all();

        return Inertia::render('Addresses/Index', [
            'addresses' => $addresses,
        ]);
    }

    /**
     * Afficher le formulaire de création.
     */
    public function create()
    {
        return Inertia::render('Addresses/Create');
    }

    /**
     * Enregistrer une nouvelle adresse.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'street' => 'required|string|max:255',
            'postal_code' => 'required|string|max:20',
            'city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'address_description' => 'nullable|string',
        ]);

        Address::create($validated);

        return redirect()->route('addresses.index')
                         ->with('success', 'Adresse enregistrée avec succès.');
    }

    /**
     * Afficher une adresse spécifique.
     */
    public function show($id)
    {
        $address = Address::findOrFail($id);

        return Inertia::render('Addresses/Show', [
            'address' => $address,
        ]);
    }

    /**
     * Afficher le formulaire d’édition d’une adresse.
     */
    public function edit($id)
    {
        $address = Address::findOrFail($id);

        return Inertia::render('Addresses/Edit', [
            'address' => $address,
        ]);
    }

    /**
     * Mettre à jour une adresse.
     */
    public function update(Request $request, $id)
    {
        $address = Address::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'street' => 'required|string|max:255',
            'postal_code' => 'required|string|max:20',
            'city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'address_description' => 'nullable|string',
        ]);

        $address->update($validated);

        return redirect()->route('addresses.index')
                         ->with('success', 'Adresse mise à jour avec succès.');
    }

    /**
     * Supprimer une adresse.
     */
    public function destroy($id)
    {
        $address = Address::findOrFail($id);
        $address->delete();

        return redirect()->route('addresses.index')
                         ->with('success', 'Adresse supprimée avec succès.');
    }
}
