<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubActivityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'string|max:255',
            'min_Age' => 'integer',
            'max_Age' => 'integer',
            'description' => 'string',
            'sub_activity_range' => 'string|max:255',
            'activity_id' => 'integer',
        ];
    }
}
