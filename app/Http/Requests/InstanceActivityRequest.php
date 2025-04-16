<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InstanceActivityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'start' => 'date',
            'end' => 'date',
            'deadline' => 'date',
            'places' => 'integer',
            'nb_inscription' => 'integer',
            'debutHour' => 'string',
            'endHour' => 'string',
            'status' => 'string|max:255',
            'level' => 'string|max:255',
            'minutes' => 'integer',
            'debutSubscription' => 'date',
            'location' => 'string|max:255',
            'address_id' => 'integer',
            'sub_activity_id' => 'integer',
        ];
    }
}
