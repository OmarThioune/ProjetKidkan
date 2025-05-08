<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WaitingListResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'date' => $this->date,
            'kid_id' => $this->kid_id,
            'instance_activity_id' => $this->instance_activity_id,
        ];
    }
}
