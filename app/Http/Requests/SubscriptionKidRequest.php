<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubscriptionKidRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'kid_id' => 'integer',
            'instance_activity_id' => 'integer',
            'favorite' => 'string|max:255',
            'status' => 'string|max:255',
        ];
    }
}
