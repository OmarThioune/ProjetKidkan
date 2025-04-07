<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class activity extends Model
{
    protected $table = 'activities';
    protected $primaryKey = 'activity_id';
    protected $fillable = ['name', 'description', 'material', 'minAge', 'maxAge', 'provider_id', 'address_id', 'duration', 'price', 'capacity', 'status'];
    
    public function instanceActivities()
    {
        return $this->hasMany(InstanceActivity::class, 'activity_id', 'activity_id');
    }
    public function provider()
    {
        return $this->belongsTo(Provider::class, 'provider_id', 'provider_id');
    }
    public function address()
    {
        return $this->belongsTo(Address::class, 'address_id', 'address_id');
    }
}
