<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $table = 'address';
    protected $primaryKey = 'address_id';
    protected $fillable = ['name', 'street', 'postal_code', 'city', 'country', 'address_description', 'country'];
}
