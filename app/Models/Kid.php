<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kid extends Model
{
    //
    protected $table = 'kids';
    protected $primaryKey = 'kid_id'; 
    protected $fillable = ['name', 'age', 'user_id'];
}
