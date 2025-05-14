<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

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
