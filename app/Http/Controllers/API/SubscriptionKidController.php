<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\SubscriptionKidRequest;
use App\Http\Resources\SubscriptionKidResource;
use App\Models\SubscriptionKid;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SubscriptionKidController extends Controller
{
    public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        return SubscriptionKidResource::collection(
            SubscriptionKid::with(['instanceActivity'])->latest()->paginate()
        );
    
    }

    public function store(SubscriptionKidRequest $request): SubscriptionKidResource|\Illuminate\Http\JsonResponse
    {
        try {
            $subscriptionKid = SubscriptionKid::create($request->validated());
            return new SubscriptionKidResource($subscriptionKid);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(SubscriptionKid $subscriptionKid): SubscriptionKidResource
    {
        $subscriptionKid->load(['instanceActivity']);
        return SubscriptionKidResource::make($subscriptionKid);
    }

    public function update(SubscriptionKidRequest $request, SubscriptionKid $subscriptionKid): SubscriptionKidResource|\Illuminate\Http\JsonResponse
    {
        try {
            $subscriptionKid->update($request->validated());
            return new SubscriptionKidResource($subscriptionKid);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(SubscriptionKid $subscriptionKid): \Illuminate\Http\JsonResponse
    {
        try {
            $subscriptionKid->delete();
            return response()->json(['message' => 'Deleted successfully'], Response::HTTP_OK);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
