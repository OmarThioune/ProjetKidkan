<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Kid
 * 
 * @property int $id
 * @property int|null $user_id
 * @property string|null $name
 * @property int|null $age
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property User|null $user
 * @property Collection|SubscriptionKid[] $subscription_kids
 * @property Collection|WaitingList[] $waiting_lists
 *
 * @package App\Models
 */
class Kid extends Model
{
	protected $table = 'kid';

	protected $casts = [
		'user_id' => 'int',
		'age' => 'int'
	];

	protected $fillable = [
		'user_id',
		'name',
		'age'
	];

	public function user()
	{
		return $this->belongsTo(User::class);
	}

	public function subscriptionKids()
	{
		return $this->hasMany(SubscriptionKid::class);
	}

	public function waiting_lists()
	{
		return $this->hasMany(WaitingList::class);
	}
}
