<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubscriptionKid extends Model
{
    //
    protected $table = 'subscription_kids';
    protected $primaryKey = 'subscription_kid_id';
    protected $fillable = [ 'kid_id', 'status', 'favorite'];
}
