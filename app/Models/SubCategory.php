<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class SubCategory
 * 
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property int|null $category_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Category|null $category
 * @property Collection|Activity[] $activities
 *
 * @package App\Models
 */
class SubCategory extends Model
{
	protected $table = 'sub_category';

	protected $casts = [
		'category_id' => 'int'
	];

	protected $fillable = [
		'name',
		'description',
		'category_id'
	];

	public function category()
	{
		return $this->belongsTo(Category::class);
	}

	public function activities()
	{
		return $this->hasMany(Activity::class);
	}
}
