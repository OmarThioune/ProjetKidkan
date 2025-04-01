<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class ActivitiesCategories extends Pivot
{
    protected $table = 'activities_categories';

    protected $primaryKey = null; 
    public $incrementing = false; 

    protected $fillable = ['activity_id', 'category_id']; 

    public function activity()
    {
        return $this->belongsTo(Activity::class, 'activity_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
