<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubscriptionKidResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'kid_id' => $this->kid_id,
            'instance_activity_id' => $this->instance_activity_id,
            'favorite' => $this->favorite,
            'status' => $this->status,
        ];
    }
}
