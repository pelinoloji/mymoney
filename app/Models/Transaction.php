<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Tag;

class Transaction extends Model
{
  use HasFactory;
  protected $fillable = ['amount'];

  public function currencies()
  {
    return $this->hasMany(Currency::class);
  }

  public function tags()
  {
    return $this->hasMany(Tag::class);
  }
}
