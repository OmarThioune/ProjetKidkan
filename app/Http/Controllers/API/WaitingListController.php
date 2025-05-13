<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\WaitingListRequest;
use App\Http\Resources\WaitingListResource;
use App\Models\WaitingList;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class WaitingListController extends Controller
{
    public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        return WaitingListResource::collection(WaitingList::latest()->paginate());
    }

    public function store(WaitingListRequest $request): WaitingListResource|\Illuminate\Http\JsonResponse
    {
        try {
            $waitingList = WaitingList::create($request->validated());
            return new WaitingListResource($waitingList);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(WaitingList $waitingList): WaitingListResource
    {
        return WaitingListResource::make($waitingList);
    }

    public function update(WaitingListRequest $request, WaitingList $waitingList): WaitingListResource|\Illuminate\Http\JsonResponse
    {
        try {
            $waitingList->update($request->validated());
            return new WaitingListResource($waitingList);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(WaitingList $waitingList): \Illuminate\Http\JsonResponse
    {
        try {
            $waitingList->delete();
            return response()->json(['message' => 'Deleted successfully'], Response::HTTP_OK);
        } catch (\Exception $exception) {
            report($exception);
            return response()->json(['error' => 'There is an error.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
