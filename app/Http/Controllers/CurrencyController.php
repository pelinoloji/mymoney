<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Currency;

class CurrencyController extends Controller
{

  // public function index(Currency $currency)
  // {
  //   $currency = Currency::all();
  //   dd($currency, 'index in currencycontroller');
  // }

  public function store(Request $request)
  {
    $currency = new Currency();
    $currency->name = $request->get('name');
    $currency->save();
    return response()->json($currency->id);
  }
}
