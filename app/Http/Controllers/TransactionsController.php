<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\Tag;

class TransactionsController extends Controller
{

  public function index(Transaction $transaction)
  {
    $transaction = Transaction::all();
    return response()->json($transaction);
  }

  public function create()
  {
    $tags = Tag::all();
  }

  public function update(Transaction $transaction)
  {
    $transaction->update($this->validateTransactions());
    return redirect('/');
  }

  public function store(Request $request)
  {
    $this->validateTransactions();

    $transaction = new Transaction();

    $transaction->amount = $request->get('amount');
    $transaction->tag = $request->get('tag');
    $transaction->currency = $request->get('currency');
    $transaction->expense = $request->get('expense');
    $transaction->date = $request->get('transaction_date');
    $transaction->save();

    return redirect('/');
  }

  public function edit(Transaction $transaction)
  {

    return $transaction;
  }

  public function validateTransactions()
  {
    return request()->validate([
      'amount' => 'required',
      'tag' => 'required',
      'currency' => 'required',
      'expense' => 'required',
      // 'date' => 'required'
    ]);
  }
}
