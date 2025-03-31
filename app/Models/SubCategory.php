<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubCategory extends Model
{
    protected $table = 'sub_categories';
    protected $primaryKey = 'sub_categories_id';

    protected $fillable = ['name', 'description'];
}
