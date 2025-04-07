<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Waitinglist extends Model
{
    //
    protected $table = 'waitinglist';
    protected $primaryKey = 'waitinglist_id';
    protected $fillable = [ 'instance__activities_id',  'date'];
}
