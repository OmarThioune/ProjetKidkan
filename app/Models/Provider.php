<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Provider
 * 
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property int|null $star
 * @property string|null $head_office
 * @property string|null $url
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Collection|Activity[] $activities
 *
 * @package App\Models
 */
class Provider extends Model
{
	protected $table = 'provider';

	protected $casts = [
		'star' => 'int'
	];

	protected $fillable = [
		'name',
		'description',
		'star',
		'head_office',
		'url'
	];

	public function activities()
	{
		return $this->hasMany(Activity::class);
	}
}
