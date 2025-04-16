<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ActivityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'cancelation' => 'integer',
            'description' => 'string|max:255',
            'material' => 'string|max:255',
            'min_Age' => 'integer',
            'max_Age' => 'integer',
            'provider_id' => 'integer',
            'address_id' => 'integer',
            'sub_category_id' => 'integer',
        ];
    }
}
