<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Address;

class AddressController extends Controller
{
    /**
     * Récupérer toutes les adresses.
     */
    public function index()
    {
        return response()->json(Address::all(), 200);
    }

    /**
     * Enregistrer une nouvelle adresse.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'street' => 'required|string|max:255',
            'postal_code' => 'required|string|max:20',
            'city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'address_description' => 'nullable|string',
        ]);

        $address = Address::create($request->all());

        return response()->json($address, 201);
    }

    /**
     * Récupérer une adresse spécifique.
     */
    public function show($id)
    {
        $address = Address::find($id);
        if (!$address) {
            return response()->json(['message' => 'Adresse non trouvée'], 404);
        }
        return response()->json($address, 200);
    }

    /**
     * Mettre à jour une adresse.
     */
    public function update(Request $request, $id)
    {
        $address = Address::find($id);
        if (!$address) {
            return response()->json(['message' => 'Adresse non trouvée'], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'street' => 'required|string|max:255',
            'postal_code' => 'required|string|max:20',
            'city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'address_description' => 'nullable|string',
        ]);

        $address->update($request->all());

        return response()->json($address, 200);
    }

    /**
     * Supprimer une adresse.
     */
    public function destroy($id)
    {
        $address = Address::find($id);
        if (!$address) {
            return response()->json(['message' => 'Adresse non trouvée'], 404);
        }

        $address->delete();
        return response()->json(['message' => 'Adresse supprimée'], 200);
    }
}
