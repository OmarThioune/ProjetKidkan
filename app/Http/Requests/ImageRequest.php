<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ImageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id'=>'integer',
            'activity_id' => 'integer',
            'image' => 'string|max:255',
        ];
    }
}
