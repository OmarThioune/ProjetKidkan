<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\SubCategoryRequest;
use App\Http\Resources\SubCategoryResource;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SubCategoryController extends Controller
{
    public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        return SubCategoryResource::collection(SubCategory::latest()->paginate(10));
    }

    public function store(SubCategoryRequest $request): SubCategoryResource|\Illuminate\Http\JsonResponse
    {
        try {
            $subCategory = SubCategory::create($request->validated());
            return new SubCategoryResource($subCategory);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(SubCategory $subCategory): SubCategoryResource
    {
        return SubCategoryResource::make($subCategory);
    }

    public function update(SubCategoryRequest $request, SubCategory $subCategory): SubCategoryResource|\Illuminate\Http\JsonResponse
    {
        try {
            $subCategory->update($request->validated());
            return new SubCategoryResource($subCategory);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(SubCategory $subCategory): \Illuminate\Http\JsonResponse
    {
        try {
            $subCategory->delete();
            return response()->json(['message' => 'Deleted successfully'], Response::HTTP_OK);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
