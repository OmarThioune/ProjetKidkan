<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Opinion extends Model
{
    protected $table = 'opinions';
    protected $primaryKey = 'opinion_id';
    protected $fillable = ['activity_id', 'user_id', 'comment', 'grade'];


}
