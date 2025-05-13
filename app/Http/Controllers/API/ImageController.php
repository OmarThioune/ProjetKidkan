<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\ImageRequest;
use App\Http\Resources\ImageResource;
use App\Models\Image;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ImageController extends Controller
{
    public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        return ImageResource::collection(Image::latest()->paginate());
    }

    public function store(ImageRequest $request): ImageResource|\Illuminate\Http\JsonResponse
    {
        try {
            $image = Image::create($request->validated());
            return new ImageResource($image);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(Image $image): ImageResource
    {
        return ImageResource::make($image);
    }

    public function update(ImageRequest $request, Image $image): ImageResource|\Illuminate\Http\JsonResponse
    {
        try {
            $image->update($request->validated());
            return new ImageResource($image);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(Image $image): \Illuminate\Http\JsonResponse
    {
        try {
            $image->delete();
            return response()->json(['message' => 'Deleted successfully'], Response::HTTP_OK);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
