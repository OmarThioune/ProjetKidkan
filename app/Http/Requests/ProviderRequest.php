<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProviderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'string|max:255',
            'description' => 'string',
            'star' => 'integer',
            'head_office' => 'string|max:255',
            'url' => 'string|max:255',
        ];
    }
}
