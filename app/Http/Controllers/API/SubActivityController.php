<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\SubActivityRequest;
use App\Http\Resources\SubActivityResource;
use App\Models\SubActivity;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SubActivityController extends Controller
{
    public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        return SubActivityResource::collection(SubActivity::latest()->paginate(10));
    }

    public function store(SubActivityRequest $request): SubActivityResource|\Illuminate\Http\JsonResponse
    {
        try {
            $subActivity = SubActivity::create($request->validated());
            return new SubActivityResource($subActivity);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(SubActivity $subActivity): SubActivityResource
    {
        return SubActivityResource::make($subActivity);
    }

    public function update(SubActivityRequest $request, SubActivity $subActivity): SubActivityResource|\Illuminate\Http\JsonResponse
    {
        try {
            $subActivity->update($request->validated());
            return new SubActivityResource($subActivity);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(SubActivity $subActivity): \Illuminate\Http\JsonResponse
    {
        try {
            $subActivity->delete();
            return response()->json(['message' => 'Deleted successfully'], Response::HTTP_OK);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
