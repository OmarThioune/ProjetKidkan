<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class User
 * 
 * @property int $id
 * @property string $name
 * @property string $lastname
 * @property string $address
 * @property bool $account_type
 * @property string $email
 * @property Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Collection|Kid[] $kids
 * @property Collection|Opinion[] $opinions
 *
 * @package App\Models
 */
class User extends Model
{
	protected $table = 'user';

	protected $casts = [
		'account_type' => 'bool',
		'email_verified_at' => 'datetime'
	];

	protected $hidden = [
		'password',
		'remember_token'
	];

	protected $fillable = [
		'name',
		'lastname',
		'address',
		'account_type',
		'email',
		'email_verified_at',
		'password',
		'remember_token'
	];

	public function kids()
	{
		return $this->hasMany(Kid::class);
	}

	public function opinions()
	{
		return $this->hasMany(Opinion::class);
	}
}
