<?php
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\CampaignController;

use App\Http\Controllers\EmailTrackerController;
use App\Http\Controllers\CampaignSubscriberController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);



Route::post('/subscriptions', [SubscriptionController::class, 'store']);
Route::delete('/subscriptions', [SubscriptionController::class, 'destroy']);
Route::get('/subscriptions', [SubscriptionController::class, 'index']);
Route::post('/subscriptions/filter', [SubscriptionController::class, 'filterBy']);


Route::get('/compaigns', [CampaignController::class, 'index']);
Route::post('/compaigns', [CampaignController::class, 'store']);
Route::patch('/compaigns/{id}', [CampaignController::class, 'update']);
Route::get('/{campaignId}/subscriber/{subscriberId}', [CampaignController::class, 'getCampaignSubscriber']);



Route::post('/newsletters', [NewsletterController::class, 'store']);
Route::get('/newsletters', [NewsletterController::class, 'index']);
Route::get('/newsletters/{title}', [NewsletterController::class, 'getByTitle']);


Route::post('/campaigns/subscribe', [CampaignSubscriberController::class, 'subscribeToCampaign']);
Route::post('/email-tracker',[EmailTrackerController::class, 'trackEmail'] );







