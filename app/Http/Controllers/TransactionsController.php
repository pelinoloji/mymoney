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

  public function store(Request $request)
  {
    $transaction = new Transaction();

    $transaction->amount = $request->get('amount');
    $transaction->tag = $request->get('tag');
    $transaction->currency = $request->get('currency');
    $transaction->expense = $request->get('expense');

    $transaction->save();

    return redirect('/');;
  }
}
