<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class activity extends Model
{
    protected $table = 'activities';
    protected $primaryKey = 'activity_id';
    protected $fillable = ['name', 'description', 'material', 'minAge', 'maxAge', 'provider_id', 'address_id', 'duration', 'price', 'capacity', 'status']; 
}
