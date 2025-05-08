<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubActivityResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'name' => $this->name,
            'min_Age' => $this->min_Age,
            'max_Age' => $this->max_Age,
            'description' => $this->description,
            'material' => $this->material,
            'level' => $this->level,
            'activity_id' => $this->activity_id,
            'activity' => new ActivityResource($this->whenLoaded('activity')),
        ];
    }
}
