<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\ActivityCategoryRequest;
use App\Http\Resources\ActivityCategoryResource;
use App\Models\ActivityCategory;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ActivityCategoryController extends Controller
{
    public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        return ActivityCategoryResource::collection(ActivityCategory::latest()->paginate());
    }

    public function store(ActivityCategoryRequest $request): ActivityCategoryResource|\Illuminate\Http\JsonResponse
    {
        try {
            $activityCategory = ActivityCategory::create($request->validated());
            return new ActivityCategoryResource($activityCategory);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(ActivityCategory $activityCategory): ActivityCategoryResource
    {
        return ActivityCategoryResource::make($activityCategory);
    }

    public function update(ActivityCategoryRequest $request, ActivityCategory $activityCategory): ActivityCategoryResource|\Illuminate\Http\JsonResponse
    {
        try {
            $activityCategory->update($request->validated());
            return new ActivityCategoryResource($activityCategory);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(ActivityCategory $activityCategory): \Illuminate\Http\JsonResponse
    {
        try {
            $activityCategory->delete();
            return response()->json(['message' => 'Deleted successfully'], Response::HTTP_OK);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
