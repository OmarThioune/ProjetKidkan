<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Address
 * 
 * @property int $id
 * @property string $civil_number
 * @property string $street_name
 * @property string $postal_code
 * @property string $city
 * @property string $province
 * @property string $country
 * @property string|null $address_description
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Collection|InstanceActivity[] $instance_activities
 *
 * @package App\Models
 */
class Address extends Model
{
	protected $table = 'address';

	protected $fillable = [
		'civil_number',
		'street_name',
		'postal_code',
		'city',
		'province',
		'country',
		'address_description'
	];

	public function instance_activities()
	{
		return $this->hasMany(InstanceActivity::class);
	}
}
