<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class ActivityCategory
 * 
 * @property int $id
 * @property int $activity_id
 * @property int $category_id
 * 
 * @property Activity $activity
 * @property Category $category
 *
 * @package App\Models
 */
class ActivityCategory extends Model
{
	protected $table = 'activity_category';
	public $timestamps = false;

	protected $casts = [
		'activity_id' => 'int',
		'category_id' => 'int'
	];

	protected $fillable = [
		'activity_id',
		'category_id'
	];

	public function activity()
	{
		return $this->belongsTo(Activity::class);
	}

	public function category()
	{
		return $this->belongsTo(Category::class);
	}
}
