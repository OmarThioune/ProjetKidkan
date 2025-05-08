<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class KidRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id'=>'integer',
            'user_id' => 'integer',
            'name' => 'string|max:255',
            'age' => 'integer',
        ];
    }
}
