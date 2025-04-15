<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Opinion
 * 
 * @property int $id
 * @property int|null $activity_id
 * @property int|null $user_id
 * @property string|null $comment
 * @property int|null $grade
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Activity|null $activity
 * @property User|null $user
 *
 * @package App\Models
 */
class Opinion extends Model
{
	protected $table = 'opinion';

	protected $casts = [
		'activity_id' => 'int',
		'user_id' => 'int',
		'grade' => 'int'
	];

	protected $fillable = [
		'activity_id',
		'user_id',
		'comment',
		'grade'
	];

	public function activity()
	{
		return $this->belongsTo(Activity::class);
	}

	public function user()
	{
		return $this->belongsTo(User::class);
	}
}
