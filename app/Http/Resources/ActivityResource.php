<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ActivityResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'cancelation' => $this->cancelation,
            'description' => $this->description,
            'material' => $this->material,
            'min_Age' => $this->min_Age,
            'max_Age' => $this->max_Age,
            'provider_id' => $this->provider_id,
            'address_id' => $this->address_id,
            'sub_category_id' => $this->sub_category_id,
        ];
    }
}
