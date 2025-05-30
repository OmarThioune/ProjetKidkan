<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class KidResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'user_id' => $this->user_id,
            'name' => $this->name,
            'age' => $this->age,
            'user' => new UserResource($this->whenLoaded('user')),
            
            'subscription_kid' => SubscriptionKidResource::collection($this->whenLoaded('subscriptionKids')),
        ];
    }
}
