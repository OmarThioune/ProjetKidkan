<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Pricing
 * 
 * @property int $id
 * @property string|null $price
 * @property string|null $type
 * @property int|null $instance_activity_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property InstanceActivity|null $instance_activity
 *
 * @package App\Models
 */
class Pricing extends Model
{
	protected $table = 'pricing';

	protected $casts = [
		'instance_activity_id' => 'int'
	];

	protected $fillable = [
		'price',
		'type',
		'instance_activity_id'
	];

	public function instance_activity()
	{
		return $this->belongsTo(InstanceActivity::class);
	}
}
