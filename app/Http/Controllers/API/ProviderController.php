<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProviderRequest;
use App\Http\Resources\ProviderResource;
use App\Models\Provider;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ProviderController extends Controller
{
    public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        return ProviderResource::collection(Provider::latest()->paginate(10));
    }

    public function store(ProviderRequest $request): ProviderResource|\Illuminate\Http\JsonResponse
    {
        try {
            $provider = Provider::create($request->validated());
            return new ProviderResource($provider);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(Provider $provider): ProviderResource
    {
        return ProviderResource::make($provider);
    }

    public function update(ProviderRequest $request, Provider $provider): ProviderResource|\Illuminate\Http\JsonResponse
    {
        try {
            $provider->update($request->validated());
            return new ProviderResource($provider);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(Provider $provider): \Illuminate\Http\JsonResponse
    {
        try {
            $provider->delete();
            return response()->json(['message' => 'Deleted successfully'], Response::HTTP_OK);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
