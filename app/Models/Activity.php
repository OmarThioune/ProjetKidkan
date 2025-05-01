<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Activity
 * 
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property int|null $provider_id
 * @property int|null $sub_category_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Provider|null $provider
 * @property SubCategory|null $sub_category
 * @property Collection|Category[] $categories
 * @property Collection|Image[] $images
 * @property Collection|Opinion[] $opinions
 * @property Collection|SubActivity[] $sub_activities
 *
 * @package App\Models
 */
class Activity extends Model
{
	protected $table = 'activity';

	protected $casts = [
		'provider_id' => 'int',
		'sub_category_id' => 'int'
	];

	protected $fillable = [
		'name',
		'description',
		'provider_id',
		'sub_category_id'
	];

	public function provider()
	{
		return $this->belongsTo(Provider::class);
	}

	public function subCategory()
	{
		return $this->belongsTo(SubCategory::class);
	}

	public function categories()
	{
		return $this->belongsToMany(Category::class)
					->withPivot('id');
	}

	public function images()
	{
		return $this->hasMany(Image::class);
	}

	public function opinions()
	{
		return $this->hasMany(Opinion::class);
	}

	public function sub_activities()
	{
		return $this->hasMany(SubActivity::class);
	}
}
