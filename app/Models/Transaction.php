<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Tag;
use App\Models\Currency;

class Transaction extends Model
{
  use HasFactory;
  protected $fillable = ['amount'];

  public function currencies()
  {
    return $this->belongsTo(Currency::class);
  }

  public function tags()
  {
    return $this->belongsTo(Tag::class);
  }
}
