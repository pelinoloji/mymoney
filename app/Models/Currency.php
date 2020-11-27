<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
  use HasFactory;

  public function transactions()
  {
    return $this->belongsToMany(Transactions::class);
  }
}
