<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = 'categories';
    protected $primaryKey = 'category_id';

    protected $fillable = ['name', 'sub_categories_id', 'activiteCategorie_id'];
  

    public function sousCategorie()
    {
        return $this->hasMany(SousCategorie::class, 'category_id');
    }

    public function activiteCategorie()
    {
        return $this->hasMany(ActiviteCategorie::class, 'category_id');
    }
}
