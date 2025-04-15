<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class WaitingList
 * 
 * @property int $id
 * @property Carbon $date
 * @property int|null $kid_id
 * @property int|null $instance_activity_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property InstanceActivity|null $instance_activity
 * @property Kid|null $kid
 *
 * @package App\Models
 */
class WaitingList extends Model
{
	protected $table = 'waiting_list';

	protected $casts = [
		'date' => 'datetime',
		'kid_id' => 'int',
		'instance_activity_id' => 'int'
	];

	protected $fillable = [
		'date',
		'kid_id',
		'instance_activity_id'
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
