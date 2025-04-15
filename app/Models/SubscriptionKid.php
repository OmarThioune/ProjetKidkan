<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class SubscriptionKid
 * 
 * @property int $id
 * @property int|null $kid_id
 * @property int|null $instance_activity_id
 * @property string|null $favorite
 * @property string $status
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property InstanceActivity|null $instance_activity
 * @property Kid|null $kid
 *
 * @package App\Models
 */
class SubscriptionKid extends Model
{
	protected $table = 'subscription_kid';

	protected $casts = [
		'kid_id' => 'int',
		'instance_activity_id' => 'int'
	];

	protected $fillable = [
		'kid_id',
		'instance_activity_id',
		'favorite',
		'status'
	];

	public function instance_activity()
	{
		return $this->belongsTo(InstanceActivity::class);
	}

	public function kid()
	{
		return $this->belongsTo(Kid::class);
	}
}
