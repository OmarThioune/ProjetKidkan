<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class InstanceActivity
 * 
 * @property int $id
 * @property Carbon $start
 * @property Carbon $end
 * @property Carbon|null $deadline
 * @property int $places
 * @property int $nb_inscription
 * @property Carbon $debutHour
 * @property Carbon $endHour
 * @property string $status
 * @property string $level
 * @property int $minutes
 * @property Carbon|null $debutSubscription
 * @property string $location
 * @property int $address_id
 * @property int $sub_activity_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Address $address
 * @property SubActivity $sub_activity
 * @property Collection|Pricing[] $pricings
 * @property Collection|SubscriptionKid[] $subscription_kids
 * @property Collection|WaitingList[] $waiting_lists
 *
 * @package App\Models
 */
class InstanceActivity extends Model
{
	protected $table = 'instance_activity';

	protected $casts = [
		'start' => 'datetime',
		'end' => 'datetime',
		'deadline' => 'datetime',
		'places' => 'int',
		'nb_inscription' => 'int',
		'debutHour' => 'datetime',
		'endHour' => 'datetime',
		'minutes' => 'int',
		'debutSubscription' => 'datetime',
		'address_id' => 'int',
		'sub_activity_id' => 'int'
	];

	protected $fillable = [
		'start',
		'end',
		'deadline',
		'places',
		'nb_inscription',
		'debutHour',
		'endHour',
		'status',
		'level',
		'minutes',
		'debutSubscription',
		'location',
		'address_id',
		'sub_activity_id'
	];

	public function address()
	{
		return $this->belongsTo(Address::class);
	}

	public function sub_activity()
	{
		return $this->belongsTo(SubActivity::class);
	}

	public function pricings()
	{
		return $this->hasMany(Pricing::class);
	}

	public function subscription_kids()
	{
		return $this->hasMany(SubscriptionKid::class);
	}

	public function waiting_lists()
	{
		return $this->hasMany(WaitingList::class);
	}
}
