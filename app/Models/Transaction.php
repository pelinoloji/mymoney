<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Tag;
use App\Models\Currency;

class Transaction extends Model
{
  use HasFactory;
  protected $fillable = ['amount', 'currency', 'date', 'tag'];

  public function currency()
  {
    return $this->belongsTo(Currency::class);
  }

  public function tag()
  {
    return $this->belongsToMany(Tag::class);
  }
}
