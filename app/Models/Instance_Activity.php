<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Instance_Activity extends Model
{
    //
        protected $table = 'instance__activities';
        protected $primaryKey = 'instance__activities_id';
        protected $fillable = ['start' , 'end' , 'deadline' , 'places' , 'subscription' , 'debutHour', 'endHour', 'status', 'level' , 'minutes', 'debutSubscription', 'location', 'address_id'];
}
