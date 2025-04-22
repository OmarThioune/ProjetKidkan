<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Category
 * 
 * @property int $id
 * @property int|null $sub_category_id
 * @property string $name
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property SubCategory|null $sub_category
 * @property Collection|Activity[] $activities
 *
 * @package App\Models
 */
class Category extends Model
{
	protected $table = 'category';

	protected $casts = [
		'sub_category_id' => 'int'
	];

	protected $fillable = [
		'sub_category_id',
		'name'
	];

	public function sub_category()
	{
		return $this->belongsTo(SubCategory::class);
	}

	public function activities()
	{
		return $this->belongsToMany(Activity::class)
					->withPivot('id');
	}
}
