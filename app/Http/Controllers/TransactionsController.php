<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;

class TransactionsController extends Controller
{
  public function index(Transaction $transaction)
  {
    $transaction = Transaction::all();
    return response()->json($transaction);
  }

  public function store()
  {
    // $this->validateTransaction();

    // $transaction = new Transaction(request(['amount', 'tag']));
    // $transaction->save();
    // return response()->json($transaction);
  }

  public function create()
  {
    //
  }

  // public function validateTransaction()
  // {
  //   return request()->validate([
  //     'amount' => 'required',
  //     'tag' => 'required',
  //   ]);
  // }
}
