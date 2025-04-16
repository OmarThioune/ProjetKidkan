<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AddressResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'civil_number' => $this->civil_number,
            'street_name' => $this->street_name,
            'postal_code' => $this->postal_code,
            'city' => $this->city,
            'province' => $this->province,
            'country' => $this->country,
            'address_description' => $this->address_description,
        ];
    }
}
