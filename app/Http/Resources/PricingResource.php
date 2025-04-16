<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PricingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'price' => $this->price,
            'type' => $this->type,
            'instance_activity_id' => $this->instance_activity_id,
        ];
    }
}
