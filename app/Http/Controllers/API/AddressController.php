<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddressRequest;
use App\Http\Resources\AddressResource;
use App\Models\Address;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AddressController extends Controller
{
    public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        return AddressResource::collection(Address::latest()->paginate());
    }

    public function store(AddressRequest $request): AddressResource|\Illuminate\Http\JsonResponse
    {
        try {
            $address = Address::create($request->validated());
            return new AddressResource($address);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(Address $address): AddressResource
    {
        return AddressResource::make($address);
    }

    public function update(AddressRequest $request, Address $address): AddressResource|\Illuminate\Http\JsonResponse
    {
        try {
            $address->update($request->validated());
            return new AddressResource($address);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(Address $address): \Illuminate\Http\JsonResponse
    {
        try {
            $address->delete();
            return response()->json(['message' => 'Deleted successfully'], Response::HTTP_OK);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
