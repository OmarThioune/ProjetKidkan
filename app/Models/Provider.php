<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Provider extends Model
{
    //
    protected $table = 'providers';
    protected $primaryKey = 'provider_id';  
    protected $fillable = ['name', 'description', 'star', 'Headquarters', 'link'];
}
