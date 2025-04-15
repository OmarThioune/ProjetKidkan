<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Category
 * 
 * @property int $id
 * @property string $name
 * @property int|null $sub_category_id
 * @property int|null $activity_category_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property ActivityCategory|null $activity_category
 * @property SubCategory|null $sub_category
 *
 * @package App\Models
 */
class Category extends Model
{
	protected $table = 'category';

	protected $casts = [
		'sub_category_id' => 'int',
		'activity_category_id' => 'int'
	];

	protected $fillable = [
		'name',
		'sub_category_id',
		'activity_category_id'
	];

	public function activity_category()
	{
		return $this->belongsTo(ActivityCategory::class);
	}

	public function sub_category()
	{
		return $this->belongsTo(SubCategory::class);
	}
}
