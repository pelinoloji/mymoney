<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Transaction;

class Tag extends Model
{
  use HasFactory;

  public function transactions()
  {
    return $this->hasMany(Transaction::class)->withTimeStamps();
  }
}
