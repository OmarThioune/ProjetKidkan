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
 * @property bool $cancelation
 * @property string|null $description
 * @property string|null $material
 * @property int|null $min_Age
 * @property int|null $max_Age
 * @property int|null $provider_id
 * @property int|null $address_id
 * @property int|null $sub_category_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Address|null $address
 * @property Provider|null $provider
 * @property SubCategory|null $sub_category
 * @property Collection|ActivityCategory[] $activity_categories
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
		'cancelation' => 'bool',
		'min_Age' => 'int',
		'max_Age' => 'int',
		'provider_id' => 'int',
		'address_id' => 'int',
		'sub_category_id' => 'int'
	];

	protected $fillable = [
		'cancelation',
		'description',
		'material',
		'min_Age',
		'max_Age',
		'provider_id',
		'address_id',
		'sub_category_id'
	];

	public function address()
	{
		return $this->belongsTo(Address::class);
	}

	public function provider()
	{
		return $this->belongsTo(Provider::class);
	}

	public function sub_category()
	{
		return $this->belongsTo(SubCategory::class);
	}

	public function activity_categories()
	{
		return $this->hasMany(ActivityCategory::class);
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
