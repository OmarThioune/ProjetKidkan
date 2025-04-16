<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubActivityResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->name,
            'min_Age' => $this->min_Age,
            'max_Age' => $this->max_Age,
            'description' => $this->description,
            'range' => $this->range,
            'activity_id' => $this->activity_id,
        ];
    }
}
