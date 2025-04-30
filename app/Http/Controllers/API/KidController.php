<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\KidRequest;
use App\Http\Resources\KidResource;
use App\Models\Kid;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class KidController extends Controller
{
    public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        return KidResource::collection(Kid::latest()->paginate(10));
    }

    public function store(KidRequest $request): KidResource|\Illuminate\Http\JsonResponse
    {
        try {
            $kid = Kid::create($request->validated());
            return new KidResource($kid);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(Kid $kid): KidResource
    {
        $kid->load('user');
        return KidResource::make($kid);
    }

    public function update(KidRequest $request, Kid $kid): KidResource|\Illuminate\Http\JsonResponse
    {
        try {
            $kid->update($request->validated());
            return new KidResource($kid);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(Kid $kid): \Illuminate\Http\JsonResponse
    {
        try {
            $kid->delete();
            return response()->json(['message' => 'Deleted successfully'], Response::HTTP_OK);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
