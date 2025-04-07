<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    /**
     * Récupérer toutes les catégories.
     */
    public function index()
    {
        return response()->json(Category::all(), 200);
    }

    /**
     * Enregistrer une nouvelle catégorie.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'sub_categories_id' => 'nullable|integer',
            'activiteCategorie_id' => 'nullable|integer',
        ]);

        $category = Category::create($request->all());

        return response()->json($category, 201);
    }

    /**
     * Récupérer une catégorie spécifique.
     */
    public function show($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Catégorie non trouvée'], 404);
        }
        return response()->json($category, 200);
    }

    /**
     * Mettre à jour une catégorie.
     */
    public function update(Request $request, $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Catégorie non trouvée'], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'sub_categories_id' => 'nullable|integer',
            'activiteCategorie_id' => 'nullable|integer',
        ]);

        $category->update($request->all());

        return response()->json($category, 200);
    }

    /**
     * Supprimer une catégorie.
     */
    public function destroy($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Catégorie non trouvée'], 404);
        }

        $category->delete();
        return response()->json(['message' => 'Catégorie supprimée'], 200);
    }
}
