<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Image;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    /**
     * Récupérer toutes les images.
     */
    public function index()
    {
        return response()->json(Image::all(), 200);
    }

    /**
     * Enregistrer une nouvelle image.
     */
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'activity_id' => 'required|exists:activities,activity_id',
        ]);

        // Sauvegarde de l'image
        $path = $request->file('image')->store('uploads', 'public');

        // Création de l'entrée en base de données
        $image = Image::create([
            'image' => $path,
            'activity_id' => $request->activity_id,
        ]);

        return response()->json($image, 201);
    }

    /**
     * Récupérer une image spécifique.
     */
    public function show($id)
    {
        $image = Image::find($id);
        if (!$image) {
            return response()->json(['message' => 'Image non trouvée'], 404);
        }
        return response()->json($image, 200);
    }

    /**
     * Supprimer une image.
     */
    public function destroy($id)
    {
        $image = Image::find($id);
        if (!$image) {
            return response()->json(['message' => 'Image non trouvée'], 404);
        }

        // Supprimer l'image du stockage
        Storage::disk('public')->delete($image->image);

        $image->delete();
        return response()->json(['message' => 'Image supprimée'], 200);
    }
}
