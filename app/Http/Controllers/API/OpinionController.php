<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\OpinionRequest;
use App\Http\Resources\OpinionResource;
use App\Models\Opinion;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class OpinionController extends Controller
{
    public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        return OpinionResource::collection(Opinion::latest()->paginate(10));
    }

    public function store(OpinionRequest $request): OpinionResource|\Illuminate\Http\JsonResponse
    {
        try {
            $opinion = Opinion::create($request->validated());
            return new OpinionResource($opinion);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(Opinion $opinion): OpinionResource
    {
        return OpinionResource::make($opinion);
    }

    public function update(OpinionRequest $request, Opinion $opinion): OpinionResource|\Illuminate\Http\JsonResponse
    {
        try {
            $opinion->update($request->validated());
            return new OpinionResource($opinion);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(Opinion $opinion): \Illuminate\Http\JsonResponse
    {
        try {
            $opinion->delete();
            return response()->json(['message' => 'Deleted successfully'], Response::HTTP_OK);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
