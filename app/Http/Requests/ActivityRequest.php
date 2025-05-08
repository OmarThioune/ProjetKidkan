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
            'id'=>'integer',
            'name' => 'string|max:255',
            'description' => 'string',
            'provider_id' => 'integer',
            'sub_category_id' => 'integer',
        ];
    }
}
