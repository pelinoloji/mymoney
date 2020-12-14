<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Tag;
use App\Models\Currency;

class Transaction extends Model
{
  use HasFactory;
  protected $fillable = ['amount', 'date', 'currency_id', 'tag_id', 'recurrence'];

  public function currency()

  {
    return $this->belongsTo(Currency::class, 'currency_id');
  }

  public function tag()
  {
    return $this->belongsToMany(Tag::class, 'tag_transaction', 'tag_id', 'transaction_id');
  }
}
