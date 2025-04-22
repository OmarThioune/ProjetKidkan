<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class SubActivity
 * 
 * @property int $id
 * @property string $name
 * @property int|null $min_Age
 * @property int|null $max_Age
 * @property string|null $description
 * @property string|null $sub_activity_range
 * @property int|null $activity_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Activity|null $activity
 * @property Collection|InstanceActivity[] $instance_activities
 *
 * @package App\Models
 */
class SubActivity extends Model
{
	protected $table = 'sub_activity';

	protected $casts = [
		'min_Age' => 'int',
		'max_Age' => 'int',
		'activity_id' => 'int'
	];

	protected $fillable = [
		'name',
		'min_Age',
		'max_Age',
		'description',
		'sub_activity_range',
		'activity_id'
	];

	public function activity()
	{
		return $this->belongsTo(Activity::class);
	}

	public function instance_activities()
	{
		return $this->hasMany(InstanceActivity::class);
	}
}
