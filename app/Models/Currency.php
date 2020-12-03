<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Transaction;

class Currency extends Model
{
  protected $fillable = ['name'];

  use HasFactory;

  public function transactions()
  {
    return $this->hasMany(Transaction::class);
  }
}
