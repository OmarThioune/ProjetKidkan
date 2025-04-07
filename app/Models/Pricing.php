<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pricing extends Model
{
    //
    protected $table = 'pricing';
    protected $primaryKey = 'pricing_id';
    protected $fillable = ['price', 'currency', 'instance_activity_id' ];
    
}
