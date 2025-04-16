<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'string|max:255',
            'lastname' => 'string|max:255',
            'address' => 'string|max:255',
            'account_type' => 'integer',
            'email' => 'string|max:255|unique:user,email',
            'email_verified_at' => 'date',
            'password' => 'string|max:255',
            'remember_token' => 'string|max:100',
        ];
    }
}
