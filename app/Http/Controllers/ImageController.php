<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Image;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ImageController extends Controller
{
    /**
     * Afficher toutes les images.
     */
    public function index()
    {
        $images = Image::with('activity')->get();

        return Inertia::render('Images/Index', [
            'images' => $images,
        ]);
    }

    /**
     * Afficher le formulaire de création d'image.
     */
    public function create()
    {
        return Inertia::render('Images/Create');
    }

    /**
     * Enregistrer une nouvelle image.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'activity_id' => 'required|exists:activities,activity_id',
        ]);

        // Sauvegarde du fichier dans le dossier public/storage/uploads
        $path = $request->file('image')->store('uploads', 'public');

        // Enregistrement dans la base de données
        Image::create([
            'image' => $path,
            'activity_id' => $validated['activity_id'],
        ]);

        return redirect()->route('images.index')->with('success', 'Image ajoutée avec succès.');
    }

    /**
     * Afficher une image spécifique.
     */
    public function show($id)
    {
        $image = Image::findOrFail($id);

        return Inertia::render('Images/Show', [
            'image' => $image,
        ]);
    }

    /**
     * Supprimer une image.
     */
    public function destroy($id)
    {
        $image = Image::findOrFail($id);

        // Supprimer le fichier du disque
        Storage::disk('public')->delete($image->image);

        // Supprimer l'entrée de la base de données
        $image->delete();

        return redirect()->route('images.index')->with('success', 'Image supprimée avec succès.');
    }
}
