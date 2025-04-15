<?php
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\ProviderController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\InstanceActivityController;
use App\Http\Controllers\PricingController;
use App\Http\Controllers\KidController;

Route::apiResource('kids', KidController::class);
Route::apiResource('pricing', PricingController::class);
Route::apiResource('instance_activities', InstanceActivityController::class);
Route::apiResource('images', ImageController::class);
Route::apiResource('providers', ProviderController::class);
Route::apiResource('addresses', AddressController::class);
Route::apiResource('categories', CategoryController::class);
Route::apiResource('activities', ActivityController::class);

