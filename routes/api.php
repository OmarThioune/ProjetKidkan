<?php
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\ProviderController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\InstanceActivityController;
use App\Http\Controllers\PricingController;
use App\Http\Controllers\KidController;

Route::apiResource('/activities', App\Http\Controllers\API\ActivityController::class);
Route::apiResource('/activity_categories', App\Http\Controllers\API\ActivityCategoryController::class);
Route::apiResource('/addresses', App\Http\Controllers\API\AddressController::class);
Route::apiResource('/categories', App\Http\Controllers\API\CategoryController::class);
Route::apiResource('/images', App\Http\Controllers\API\ImageController::class);
Route::apiResource('/instance_activities', App\Http\Controllers\API\InstanceActivityController::class);
Route::apiResource('/kids', App\Http\Controllers\API\KidController::class);
Route::apiResource('/opinions', App\Http\Controllers\API\OpinionController::class);
Route::apiResource('/pricings', App\Http\Controllers\API\PricingController::class);
Route::apiResource('/providers', App\Http\Controllers\API\ProviderController::class);
Route::apiResource('/sub_activities', App\Http\Controllers\API\SubActivityController::class);
Route::apiResource('/subscription_kids', App\Http\Controllers\API\SubscriptionKidController::class);
Route::apiResource('/users', App\Http\Controllers\API\UserController::class);
Route::apiResource('/waiting_lists', App\Http\Controllers\API\WaitingListController::class);
Route::apiResource('/sub_categories', App\Http\Controllers\API\SubCategoryController::class);
