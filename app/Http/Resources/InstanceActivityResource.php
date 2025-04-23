<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InstanceActivityResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'start' => $this->start,
            'end' => $this->end,
            'deadline' => $this->deadline,
            'places' => $this->places,
            'nb_inscription' => $this->nb_inscription,
            'debutHour' => $this->debutHour,
            'endHour' => $this->endHour,
            'status' => $this->status,
            'minutes' => $this->minutes,
            'debutSubscription' => $this->debutSubscription,
            'location' => $this->location,
            'cancelation' => $this->cancelation,
            'address_id' => $this->address_id,
            'sub_activity_id' => $this->sub_activity_id,
        ];
    }
}
