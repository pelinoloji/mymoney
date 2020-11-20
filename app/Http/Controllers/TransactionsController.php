<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transactions;

class TransactionsController extends Controller
{
  public function index(Transactions $transactions)
  {
    $transactions = Transactions::all();
    return response()->json($transactions);
  }

  public function show(Transactions $transactions)
  {
    return $transactions;
  }

  public function store()
  {
    //
  }

  public function create()
  {
    //
  }

  public function validateTransaction()
  {
    return request()->validate([
      'title' => 'required',
      'excerpt' => 'required',
      'body' => 'required',

    ]);
  }
}
