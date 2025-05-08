<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PricingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id'=>'integer',
            'price' => 'string|max:255',
            'type' => 'string|max:255',
            'instance_activity_id' => 'integer',
        ];
    }
}
