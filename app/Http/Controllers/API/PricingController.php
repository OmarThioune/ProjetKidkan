<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\PricingRequest;
use App\Http\Resources\PricingResource;
use App\Models\Pricing;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PricingController extends Controller
{
    public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        return PricingResource::collection(Pricing::latest()->paginate());
    }

    public function store(PricingRequest $request): PricingResource|\Illuminate\Http\JsonResponse
    {
        try {
            $pricing = Pricing::create($request->validated());
            return new PricingResource($pricing);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(Pricing $pricing): PricingResource
    {
        return PricingResource::make($pricing);
    }

    public function update(PricingRequest $request, Pricing $pricing): PricingResource|\Illuminate\Http\JsonResponse
    {
        try {
            $pricing->update($request->validated());
            return new PricingResource($pricing);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(Pricing $pricing): \Illuminate\Http\JsonResponse
    {
        try {
            $pricing->delete();
            return response()->json(['message' => 'Deleted successfully'], Response::HTTP_OK);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
