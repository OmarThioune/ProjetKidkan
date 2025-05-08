<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OpinionRequest extends FormRequest
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
            'user_id' => 'integer',
            'comment' => 'string',
            'grade' => 'integer',
        ];
    }
}
