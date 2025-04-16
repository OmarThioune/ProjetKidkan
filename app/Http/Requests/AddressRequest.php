<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddressRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'civil_number' => 'string|max:255',
            'street_name' => 'string|max:255',
            'postal_code' => 'string|max:255',
            'city' => 'string|max:255',
            'province' => 'string|max:255',
            'country' => 'string|max:255',
            'address_description' => 'string',
        ];
    }
}
