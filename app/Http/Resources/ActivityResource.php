<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ActivityResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'name' => $this->name,
            'description' => $this->description,
            'provider_id' => $this->provider_id,
            'sub_category_id' => $this->sub_category_id,
            'sub_category' => new SubCategoryResource($this->whenLoaded('subCategory')),

        ];
    }
}
