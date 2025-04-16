<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\ActivityRequest;
use App\Http\Resources\ActivityResource;
use App\Models\Activity;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ActivityController extends Controller
{
    public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        return ActivityResource::collection(Activity::latest()->paginate(10));
    }

    public function store(ActivityRequest $request): ActivityResource|\Illuminate\Http\JsonResponse
    {
        try {
            $activity = Activity::create($request->validated());
            return new ActivityResource($activity);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(Activity $activity): ActivityResource
    {
        return ActivityResource::make($activity);
    }

    public function update(ActivityRequest $request, Activity $activity): ActivityResource|\Illuminate\Http\JsonResponse
    {
        try {
            $activity->update($request->validated());
            return new ActivityResource($activity);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(Activity $activity): \Illuminate\Http\JsonResponse
    {
        try {
            $activity->delete();
            return response()->json(['message' => 'Deleted successfully'], Response::HTTP_OK);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
