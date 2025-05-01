<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\InstanceActivityRequest;
use App\Http\Resources\InstanceActivityResource;
use App\Models\InstanceActivity;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class InstanceActivityController extends Controller
{
    public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        return InstanceActivityResource::collection(
            InstanceActivity::with(['subActivity.activity.subCategory.categories', 'address', 'pricings'])->latest()->paginate()
        );
    }

    public function store(InstanceActivityRequest $request): InstanceActivityResource|\Illuminate\Http\JsonResponse
    {
        try {
            $instanceActivity = InstanceActivity::create($request->validated());
            return new InstanceActivityResource($instanceActivity);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(InstanceActivity $instanceActivity): InstanceActivityResource
    {
        $instanceActivity->load(['subActivity.activity.subCategory.categories', 'address', 'pricings']);
        return InstanceActivityResource::make($instanceActivity);
    }

    public function update(InstanceActivityRequest $request, InstanceActivity $instanceActivity): InstanceActivityResource|\Illuminate\Http\JsonResponse
    {
        try {
            $instanceActivity->update($request->validated());
            return new InstanceActivityResource($instanceActivity);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(InstanceActivity $instanceActivity): \Illuminate\Http\JsonResponse
    {
        try {
            $instanceActivity->delete();
            return response()->json(['message' => 'Deleted successfully'], Response::HTTP_OK);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
