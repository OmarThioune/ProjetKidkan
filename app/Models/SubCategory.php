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
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Collection|Activity[] $activities
 * @property Collection|Category[] $categories
 *
 * @package App\Models
 */
class SubCategory extends Model
{
	protected $table = 'sub_category';

	protected $fillable = [
		'name',
		'description'
	];

	public function activities()
	{
		return $this->hasMany(Activity::class);
	}

	public function categories()
	{
		return $this->hasMany(Category::class);
	}
}
