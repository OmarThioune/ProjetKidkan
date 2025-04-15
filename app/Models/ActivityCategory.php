<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ActivityCategory
 * 
 * @property int $activity_id
 * @property int $id
 * 
 * @property Activity $activity
 * @property Collection|Category[] $categories
 *
 * @package App\Models
 */
class ActivityCategory extends Model
{
	protected $table = 'activity_category';
	public $timestamps = false;

	protected $casts = [
		'activity_id' => 'int'
	];

	protected $fillable = [
		'activity_id'
	];

	public function activity()
	{
		return $this->belongsTo(Activity::class);
	}

	public function categories()
	{
		return $this->hasMany(Category::class);
	}
}
