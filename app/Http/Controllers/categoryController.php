<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Afficher toutes les catégories.
     */
    public function index()
    {
        $categories = Category::all();

        return Inertia::render('Categories/Index', [
            'categories' => $categories,
        ]);
    }

    /**
     * Afficher le formulaire de création.
     */
    public function create()
    {
        return Inertia::render('Categories/Create');
    }

    /**
     * Enregistrer une nouvelle catégorie.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sub_categories_id' => 'nullable|integer',
            'activiteCategorie_id' => 'nullable|integer',
        ]);

        Category::create($validated);

        return redirect()->route('categories.index')
                         ->with('success', 'Catégorie créée avec succès.');
    }

    /**
     * Afficher une catégorie spécifique.
     */
    public function show($id)
    {
        $category = Category::findOrFail($id);

        return Inertia::render('Categories/Show', [
            'category' => $category,
        ]);
    }

    /**
     * Afficher le formulaire d’édition.
     */
    public function edit($id)
    {
        $category = Category::findOrFail($id);

        return Inertia::render('Categories/Edit', [
            'category' => $category,
        ]);
    }

    /**
     * Mettre à jour une catégorie.
     */
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sub_categories_id' => 'nullable|integer',
            'activiteCategorie_id' => 'nullable|integer',
        ]);

        $category->update($validated);

        return redirect()->route('categories.index')
                         ->with('success', 'Catégorie mise à jour avec succès.');
    }

    /**
     * Supprimer une catégorie.
     */
    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return redirect()->route('categories.index')
                         ->with('success', 'Catégorie supprimée avec succès.');
    }
}
