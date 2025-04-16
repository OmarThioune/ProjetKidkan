<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ActivityCategoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'activity_id' => $this->activity_id,
        ];
    }
}
