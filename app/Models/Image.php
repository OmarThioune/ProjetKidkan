<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Image
 * 
 * @property int $id
 * @property int|null $activity_id
 * @property string $image
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Activity|null $activity
 *
 * @package App\Models
 */
class Image extends Model
{
	protected $table = 'image';

	protected $casts = [
		'activity_id' => 'int'
	];

	protected $fillable = [
		'activity_id',
		'image'
	];

	public function activity()
	{
		return $this->belongsTo(Activity::class);
	}
}
