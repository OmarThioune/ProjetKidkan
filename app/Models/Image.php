<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $table = 'images';
    protected $primaryKey = 'image_id';

    protected $fillable = ['image', 'activity_id'];

    public function activity()
    {
        return $this->belongsTo(Activity::class, 'activity_id');
    }
}
